import { selector, selectorAll, Show, Hide, Sleep, AsyncForEach, ShowAlert, Collapse } from './Library.js';
import { GetData } from './Data.js';
import { Populate } from './Populate.js';
import { AssociateEvents } from './Event.js';
import { CreateFilter } from './Filter.js';
import { SchoolHead } from './Component/schoolHead.js'
import { SchoolClose } from './Component/schoolClose.js';
import { SchoolNeighbor } from './Component/schoolNeighbor.js';
import { FactoryComponent } from './Component/factoryComponent.js';
import { Map } from './Component/map.js';
export { FormatResult };

"use strict";
Hide("#alert");

const InitMap = async () => {
    const { Map } = await google.maps.importLibrary("maps");
    const { Geometry } = await google.maps.importLibrary("geometry");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
}

InitMap();

const Update = async (data, components) => {
    try {

        ClearResult(selector("#ways"));

        if (!selector("#txtOrigem").value) {
            ShowAlert(data.message.emptyAddress);
            return;
        }

        let year = parseInt(selector('#selAno').value);
        if (year == 0) {
            ShowAlert(data.message.selectYear)
            return;
        }
        await Show("#aguarde");
        const filter = CreateFilter(data, year);
        const schoolSelected = SchoolSelected(data, parseInt(selector('#selEscola').value));
        const schoolsFiltered = ApplyFilter(filter, data, schoolSelected);

        //POC
        filter.addressOrigin = "Rua Princesa Maria da Glória, 176, São Bernardo do Campo, SP"
        //filter.addressOrigin = 'R. Me. de Deus, 263 - Mooca, São Paulo - SP, 03119-000'
        //filter.addressOrigin = 'Av. Dona Ruyce Ferraz Alvim, 631 - Serraria, Diadema - SP, 09961-540';
        //filter.addressOrigin = 'Av. Fundibem, 1010 - Casa Grande, Diadema - SP, 09961-390';
        //filter.addressOrigin = 'Av. Humberto de Alencar Castelo Branco, 2563 - Chácara Dublin Paulista, São Bernardo do Campo - SP, 09851-320';

        const locationOrigin = await AddressOriginToLocation(filter.addressOrigin);
        const schoolsRay = FilterSchoolsByRay(locationOrigin, schoolsFiltered, data.message);
        if (!schoolsRay)
            throw (new Error(data.message.noFindedSchool));
        const wayCloses = await ProcessSchoolsRay(locationOrigin, schoolsRay);
        if (!wayCloses)
            throw (new Error(data.message.noLocation));

        FormatResult(FilterWays(wayCloses), FilterNeighbors(wayCloses), data, components);
        // } catch (error) {
        //     ShowAlert(error);
    } finally {
        Hide("#aguarde");
    }
}

const SchoolSelected = (data, school_id) => {
    let schoolFound = data.schools.find(school => school.selected);
    if (schoolFound)
        schoolFound.selected = false;
    if (school_id === 0)
        return false;
    schoolFound = data.schools.find(school => school.school_id == school_id);
    if (schoolFound) {
        schoolFound.selected = true;
        schoolFound.junctionsId = [];
        return schoolFound;
    }
    throw Error(data.message.noFindedSchool);
}

const ApplyFilter = (filter, data, schoolSelected) => {
    let schoolsFiltered = [];
    if (schoolSelected)
        schoolsFiltered.push(schoolSelected);
    const junctionsId = [];
    filter.parameters.forEach(parameter => {
        data.junctions.filter(junction => {
            return junction.model_id == parameter.model_id && junction.shift_id == parameter.shift_id && junction.year_id == parameter.year_id;
        }).forEach(junction => {
            junctionsId.push(junction.id);
        })
    })

    data.schools.forEach(school => {
        if (school.neighbor)
            schoolsFiltered.push(school);
        else {
            const schoolJunction = data.schoolJunctions.find(schoolJunction => school.school_id == schoolJunction.school_id)
            const junctionsIdFound = junctionsId.find(id => schoolJunction.junction.indexOf(id) > -1);
            if (junctionsIdFound) {
                const schoolFound = schoolsFiltered.find(schoolFiltered => school.school_id == schoolFiltered.school_id)
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
    } while ((schoolsRay.filter(schoolRay => { return !schoolRay.neighbor && !schoolRay.selected }).length > 7) || distanceRay === 10);

    const counterSchools = schoolsRay.filter(schoolRay => { return !schoolRay.neighbor && !schoolRay.selected }).length
    if (counterSchools < 3) {
        distanceRay += 10;
        do {
            distanceRay += 10;
            schoolsRay = schools.filter(school => school.selected || ValidationSchoolsByRay(school, locationOrigin, distanceRay));
        } while (schoolsRay.filter(schoolRay => { return !schoolRay.neighbor && !schoolRay.selected }).length < 3 || distanceRay === 15000);
    };
    return schoolsRay;
}

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
    const schoolSelected = wayCloses.find(way => way.school.selected);
    const wayVisions = wayCloses.filter(way => { return !way.school.neighbor })
        .slice(0, 3 + (schoolSelected ? 1 : 0));
    wayVisions.map(way =>
        way.addressDestiny += ' escola'
    );
    return wayVisions;
}

const FilterNeighbors = (wayCloses) => {
    return wayCloses.filter(way => { return way.school.neighbor === true });
}

const FormatResult = (wayVisions, wayNeighbors, data, components) => {
    if (wayVisions.length > 0)
        selector("#txtOrigemResultado").value = wayVisions[0].addressOrigin;
    else
        selector("#txtOrigemResultado").value = wayNeighbors[0].addressOrigin;
    const indNeighbors = wayNeighbors.length > 0 ? wayVisions.length : -1;
    let elWays = selector("#ways");
    selector('#response').style.display = 'block';
    elWays.appendChild(components.schoolHead.Init({ wayVisions: wayVisions, indNeighbors: indNeighbors }));
    if (wayVisions.length > 0)
        elWays.appendChild(components.schoolClose.Init({ wayVisions: wayVisions, data: data, componentMap: components.map }));
    if (indNeighbors > -1) {
        if (wayVisions.length > 0)
            elWays = elWays.querySelector('#pills-tabContent');
        elWays.appendChild(components.schoolNeighbor.Init({ wayNeighbors: wayNeighbors, indNeighbors: indNeighbors }));
    }
    Collapse(selector('.card-header.collapsible'));
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
    return { "school": school, "locationOrigin": locationOrigin, "locationDestiny": locationDestiny, "distance": response.rows[0].elements[0].distance.value, "addressDestiny": response.destinationAddresses, "addressOrigin": response.originAddresses, "distanceLong": response.rows[0].elements[0].distance.text, "time": response.rows[0].elements[0].duration.text };
}

const ProcessSchoolsRay = async (locationOrigin, schoolsRay) => {
    let i = 0;
    let ways = [];
    await new Promise((resolve) => {
        AsyncForEach(schoolsRay, async (school) => {
            i++;
            if (i % 4 === 0)
                await Sleep(1010);
            const locationDestiny = new google.maps.LatLng(school.lat, school.lng);
            ways.push(await CalculateDistance(school, locationOrigin, locationDestiny));
            if (i === schoolsRay.length)
                resolve();
        });
    });
    return ways;
}

const GeocodePromisse = (options) => {
    let geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode(options, (response, status) => {
            if (status === google.maps.GeocoderStatus.OK)
                resolve(response);
            else if (status === google.maps.GeocoderStatus.ZERO_RESULTS)
                reject(new Error(data.message.noFindedAddress));
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
    const map = new FactoryComponent('map-close', Map);
    return { 'schoolHead': schoolHead, 'schoolClose': schoolClose, 'schoolNeighbor': schoolNeighbor, 'map': map };
}

(() => {
    window.addEventListener('load', async () => {
        Show("#aguarde");
        const data = await GetData(localStorage);
        Populate(data);
        AssociateEvents(Update, data, CreateComponents());
        Collapse(selector('.card-header.collapsible'));
        Hide("#aguarde");
    });
})();


