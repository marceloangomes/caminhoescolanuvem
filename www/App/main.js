import { selector, selectorAll, Show, Hide, Sleep, AsyncForEach, ShowAlert } from './Library.js';
import { GetData } from './Data.js';
import { Populate } from './Populate.js';
import { AssociateEvents } from './Event.js';
import { CreateFilter } from './Filter.js';
import { SchoolHead } from './Component/schoolHead.js'
import { SchoolClose } from './Component/schoolClose.js';
import { SchoolNeighbor } from './Component/schoolNeighbor.js';
import { FactoryComponent } from './Component/factoryComponent.js';
import { Modal } from './Component/modal.js';
export { FormatResult };

"use strict";
let mapa;
const initMap = async () => {
    var saoBernardo = new google.maps.LatLng(-23.69389, -46.565);
    var mapOptions = {
        zoom: 12,
        center: saoBernardo,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    mapa = new google.maps.Map(selector('#map'), mapOptions);
}

Hide("#alert");

// let markersArray = [];

// google.maps.Map.prototype.clearMarkers = () => {
//     markersArray.forEach(markerArray => {
//         markerArray.setMap(null);
//     });
//     markersArray.length = 0;
// };

const Update = async (data, components) => {
    try {

        ClearResult(selector("#ways"));

        if (!selector("#txtOrigem").value) {
            ShowAlert(data.message.enderecoVazio);
            return;
        }

        let year = selector('#selAno').value;
        if (year == 0) {
            ShowAlert(data.message.selecioneAno)
            return;
        }
        Show("#aguarde");
        const filter = CreateFilter(data, year);
        const schoolSelected = SchoolSelected(data.schools, selector('#selEscola').value);
        const schoolsFiltered = ApplyFilter(filter, data, schoolSelected);

        //POC
        filter.addressOrigin = "Rua Princesa Maria da Glória, 176, São Bernardo do Campo, SP"

        const locationOrigin = await AddressOriginToLocation(filter.addressOrigin);
        const schoolsRay = FilterSchoolsByRay(locationOrigin, schoolsFiltered, data.message);
        if (!schoolsRay)
            throw (new Error(data.message.escolaNaoEncontrada));
        const wayCloses = await ProcessSchoolsRay(locationOrigin, schoolsRay);
        if (!wayCloses)
            throw (new Error(data.message.noLocation));

        FormatResult(FilterWays(wayCloses), FilterNeighbors(wayCloses),
            {
                'junctions': data.junctions,
                'modelShifts': data.modelShifts,
                'shifts': data.shifts,
                'models': data.models
            }, components);
        // } catch (error) {
        //     ShowAlert(error);
    } finally {
        Hide("#aguarde");
    }
}

const SchoolSelected = (schools, school_id) => {
    const schoolFound = schools.find(school => school.selected);
    if (schoolFound)
        schoolFound.selected = false;

    if (school_id == 0) {
        const schoolFound = schools.find(school => school.codigo_cie == school_id);
        if (schoolFound) {
            schoolFound.selected = true;
            schoolFound.junctionsId = [];
        }
    }
    return schoolFound;;
}

const ApplyFilter = (filter, data, schoolSelected) => {
    let schoolsFiltered = [];
    if (schoolSelected)
        schoolsFiltered.push(schoolSelected);
    const junctionsId = [];
    filter.parameters.forEach(parameter => {
        data.junctions.filter(junction => {
            return junction.id_modelo == parameter.model_id && junction.id_turno == parameter.shift_id && junction.id_ano == parameter.year_id;
        }).forEach(junction => {
            junctionsId.push(junction.id);
        })
    })

    data.schools.forEach(school => {
        if (school.vizinha)
            schoolsFiltered.push(school);
        else {
            const schoolJunction = data.schoolJunctions.find(schoolJunction => school.codigo_cie == schoolJunction.codigo_cie)
            const junctionsIdFound = junctionsId.find(id => schoolJunction.juncao.indexOf(id) > -1);
            if (junctionsIdFound) {
                const schoolFound = schoolsFiltered.find(schoolFiltered => school.codigo_cie == schoolFiltered.codigo_cie)
                if (schoolFound) {
                    if (!schoolFound.junctionsId)
                        schoolFound.junctionsId = [];
                    schoolFound.junctionsId.push(junctionsIdFound);
                } else {
                    let schoolFiltered = school;
                    schoolFiltered.junctionsId = [];
                    schoolFiltered.junctionsId.push(junctionsIdFound);
                    schoolsFiltered.push(schoolFiltered);
                }
            }
        }
    })
    return schoolsFiltered;
}

const CalculateRoute = (start, end) => {
    var request = {
        origin: start,
        destination: end,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.WALKING, // Modo (DRIVING | WALKING | BICYCLING)
        unitSystem: google.maps.UnitSystem.METRIC // Sistema de medida (METRIC | IMPERIAL)                                     
    };
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            let directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setDirections(result);
            mapa.setCenter(result.routes[0].legs[0].start_location);
            // mapa.clearMarkers();                          
            // let markerAluno = new google.maps.Marker({
            //     map: mapa,
            //     position: result.routes[0].legs[0].start_location,
            //     title:"Aluno",
            //     animation:google.maps.Animation.DROP,
            //     // label:"Aluno",
            //     icon: new google.maps.MarkerImage('aluno.png',
            //         new google.maps.Size(32, 32),
            //         new google.maps.Point(0, 0),
            //         new google.maps.Point(0, 32))                
            // });                 
            // let markerEscola = new google.maps.Marker({
            //     map: mapa,
            //     position: result.routes[0].legs[0].end_location,
            //     title:"Escola",
            //     // label:"Escola",
            //     icon: new google.maps.MarkerImage('school.png',
            //         new google.maps.Size(32, 32),
            //         new google.maps.Point(0, 0),
            //         new google.maps.Point(0, 32))   
            // });                 
            // markersArray=[markerAluno, markerEscola]
            Hide("#aguarde", true);
        }
    });
}

const ValidationSchoolsByRay = (school, locationOrigin, distanceRay) => {
    if (school.lat && school.lng) {
        let locationDestiny = new google.maps.LatLng(school.lat, school.lng);
        let distance = google.maps.geometry.spherical.computeDistanceBetween(locationOrigin, locationDestiny);
        return distance && distance <= distanceRay;
    }
    return false;
};

const FilterSchoolsByRay = (locationOrigin, schools) => {
    let schoolsRay = schools;
    let distanceRay = 2100;
    do {
        schoolsRay = schoolsRay.filter(school => school.selected || ValidationSchoolsByRay(school, locationOrigin, distanceRay));
        distanceRay -= 10;
    } while (schoolsRay.length > 7 || distanceRay === 10);

    return schoolsRay;
};

const ClearResult = async (ways) => {
    while (ways.firstChild) {
        ways.removeChild(ways.firstChild);
    }
    return true;
}

const FilterWays = (wayCloses) => {
    wayCloses.sort((a, b) => {
        if (a.school.selected < b.school.selected)
            return 1
        else if (a.school.selected > b.school.selected)
            return -1
        else
            return a.distance - b.distance
    });
    const schoolSelected = wayCloses.find(way => { return way.school.selected == true })
    const wayVisions = wayCloses.filter(way => { return !way.school.vizinha })
        .slice(0, 3 + (schoolSelected ? 1 : 0));
    wayVisions.map(way =>
        way.addressDestiny += ' escola'
    );
    return wayVisions;
}

const FilterNeighbors = (wayCloses) => {
    return wayCloses.filter(way => { return way.school.vizinha == true });
}

const FormatResult = (wayVisions, wayNeighbors, data, components) => {
    selector("#txtOrigemResultado").value = wayVisions[0].addressOrigin;
    const indNeighbors = wayNeighbors.length > 0 ? wayVisions.length : -1;
    let elWays = selector("#ways");
    elWays.appendChild(components.schoolHead.Init({ wayVisions: wayVisions, indNeighbors: indNeighbors }));
    elWays.appendChild(components.schoolClose.Init({ wayVisions: wayVisions, data: data }));
    elWays.appendChild(components.modal.Init({ }));
    if (wayNeighbors.length > 0) {
        if (indNeighbors > 0) {
            elWays = elWays.querySelector('#pills-tabContent');
        }
        elWays.appendChild(components.schoolNeighbor.Init({ wayNeighbors: wayNeighbors, indNeighbors: indNeighbors }));
    }
}

const UpdateMap = (address) => {
    let map = selector('#map');
    $(map).show();
    function loaded() {
        $("#aguarde").hide('fade');
    };

    CalculateRoute(address.addressOrigin.toStrinHideg(), address.addressDestiny.toString());
    //$("#map").attr("src", "https://maps.google.com/maps?saddr=" + address.addressOrigin + "&daddr=" + address.addressDestiny + "&output=embed" + "&dirflg=w");                                           

    if (map.complete) {
        loaded();
    }
    else {
        map.addEventListener('load', loaded);
    }
    Hide("#aguarde", true);
}

const GetDistanceMatrixPromise = (options) => {
    const service = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
        service.getDistanceMatrix(options, (response, status) => {
            if (status === google.maps.DistanceMatrixStatus.OK) {
                resolve(response);
            } else {
                reject(new Error('Não foi possível calcular as distâncias, tente novamente.'));
            }
        });
    });
}

const CalculateDistance = async (school, locationOrigin, locationDestiny) => {
    const response = await GetDistanceMatrixPromise({
        origins: [locationOrigin],
        destinations: [locationDestiny],
        travelMode: google.maps.TravelMode.WALKING, // Modo (DRIVING | WALKING | BICYCLING)
        unitSystem: google.maps.UnitSystem.METRIC // Sistema de medida (METRIC | IMPERIAL)            
    });
    return { "school": school, "distance": response.rows[0].elements[0].distance.value, "addressDestiny": response.destinationAddresses, "addressOrigin": response.originAddresses, "distanceLong": response.rows[0].elements[0].distance.text, "time": response.rows[0].elements[0].duration.text };
}

const ProcessSchoolsRay = async (locationOrigin, schoolsRay) => {
    let i = 0;
    let distances = [];
    await new Promise((resolve) => {
        AsyncForEach(schoolsRay, async (school) => {
            i++;
            if (i % 4 === 0)
                await Sleep(1010);
            const locationDestiny = new google.maps.LatLng(school.lat, school.lng);
            distances.push(await CalculateDistance(school, locationOrigin, locationDestiny));
            if (i === schoolsRay.length)
                resolve();
        });
    });
    return distances;
}

const GeocodePromisse = (options) => {
    let geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode(options, (response, status) => {
            if (status === google.maps.GeocoderStatus.OK)
                resolve(response);
            else if (status === google.maps.GeocoderStatus.ZERO_RESULTS)
                reject(new Error(data.message.enderecoAlunoNaoEncontrado));
            else
                reject(new Error('Não foi possível geolocalizar, tente novamente.'));
        });
    });
};

const AddressOriginToLocation = async (addressOrigin) => {
    const response = await GeocodePromisse({ 'address': addressOrigin, 'region': 'BR' });
    const lat = response[0].geometry.location.lat();
    const lng = response[0].geometry.location.lng();
    return new google.maps.LatLng(lat, lng);
}

const CreateComponents = () => {
    const schoolHead = new FactoryComponent('school-head', SchoolHead);
    const schoolClose = new FactoryComponent('school-close', SchoolClose);
    const schoolNeighbor = new FactoryComponent('school-neighbor', SchoolNeighbor);
    const modal = new FactoryComponent('modal-close', Modal);
    return { 'schoolHead': schoolHead, 'schoolClose': schoolClose, 'schoolNeighbor': schoolNeighbor, 'modal': modal };
}

(() => {
    window.addEventListener('load', async () => {
        Show("#aguarde");
        const data = await GetData();
        Populate(data);
        AssociateEvents(Update, data, CreateComponents());
        Hide("#aguarde");
    });
})();


