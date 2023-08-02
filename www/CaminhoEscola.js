import { selector, selectorAll, Show, Hide, Sleep, AsyncForEach, ShowAlert } from './Library.js';
import { GetData } from './Data.js';
import { Populate } from './Populate.js';
import { AssociateEvents } from './Event.js';
import { CreateFilter } from './Filter.js';


"use strict";
(() => {
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

    window.addEventListener('load', async () => {
        let schoolsRay = [];
        let distanceCloses = [];
        let geocoder = new google.maps.Geocoder();
        let service = new google.maps.DistanceMatrixService();
        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer({
            //suppressMarkers: true
        });

        //directionsDisplay.setMap(mapa);        
        Hide("#alert");

        // let markersArray = [];

        // google.maps.Map.prototype.clearMarkers = () => {
        //     markersArray.forEach(markerArray => {
        //         markerArray.setMap(null);
        //     });
        //     markersArray.length = 0;
        // };

        const Update = async (data) => {
            distanceCloses = [];
            let schoolsFiltered = [];
            if (!selector("#txtOrigem").value) {
                ShowAlert(data.message.enderecoVazio);
                return;
            }

            let year = selector('#selAno').value;
            if (year == 0) {
                ShowAlert(data.message.selecioneAno)
                return;
            }

            const schoolFound = data.schools.find(school => school.selected);
            if (schoolFound)
                schoolFound.selected = false;

            const schoolSelected = selector('#selEscola').value;
            if (schoolSelected > 0) {
                const schoolFound = data.schools.find(school => school.codigo_cie == schoolSelected);
                if (schoolFound) {
                    schoolFound.selected = true;
                    schoolFound.junctionsId = [];
                    schoolsFiltered.push(schoolFound);
                }
            }
            const filter = CreateFilter(data, year);

            Show("#aguarde");
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

            //POC
            filter.addressOrigin = "Rua Princesa Maria da Glória, 176, São Bernardo do Campo, SP"

            const locationOrigin = await AddressOriginToLocation(filter.addressOrigin);
            schoolsRay = FilterSchoolsByRay(locationOrigin, data.schools, data.message);
            if (!schoolsRay)
                return;
            const distancesClose = await ProcessSchoolsRay(locationOrigin, schoolsRay);
            FormatResult(distancesClose);
        }

        const CalculateRoute = (start, end) => {
            var request = {
                origin: start,
                destination: end,
                provideRouteAlternatives: true,
                travelMode: google.maps.TravelMode.WALKING, // Modo (DRIVING | WALKING | BICYCLING)
                unitSystem: google.maps.UnitSystem.METRIC // Sistema de medida (METRIC | IMPERIAL)                                     
            };
            directionsService.route(request, function (result, status) {
                if (status == 'OK') {
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

        const FilterSchoolsByRay = (locationOrigin, schools, message) => {
            let schoolsRay = schools;
            let distanceRay = 2100;
            do {
                schoolsRay = schoolsRay.filter(school => school.selected || ValidationSchoolsByRay(school, locationOrigin, distanceRay));
                distanceRay -= 10;
            } while (schoolsRay.length > 7 || distanceRay === 10);

            if (schoolsRay.length === 0) {
                throw new Error(message.escolaNaoEncontrada);
            }
            return schoolsRay;
        };

        const ClearResult = async () => {
            distanceCloses = [];
            schoolsRay = [];
            Hide("#pills-tab li a");
            selector("#txtDestinoResultado").value = ""
            selector("#txtDistancia").value = "";
            selector("#txtDestinoEscola").value = "";
            selector("#txtDestinoContato").value = "";
            selector("#txtTempo").value = "";
            selector("#txtOrigemResultado").value = "";
            // await initMap();
            // directionsDisplay.setMap(mapa);
            Hide("#alert");
            return true;
        }

        const FormatResult = (distanceCloses) => {
            distanceCloses.sort((a, b) => {
                if (a.school.selected < b.school.selected)
                    return 1
                else if (a.school.selected > b.school.selected)
                    return -1
                else
                    return a.distance - b.distance
            });
            let DistancesVision = distanceCloses.filter(distance => { return !distance.school.vizinha });
            DistancesVision = DistancesVision.slice(0, 3 + DistancesVision.filter(distance => { return distance.school.selected == true }).length);
            const distanceNeighbor = distanceCloses.filter(distance => { return distance.school.vizinha == true });
            selectorAll("#pills-tabContent #txtInformacoes").forEach(e => {
                e.value = "";
            })

            let neighbors = ""
            distanceNeighbor.forEach(distance => {
                neighbors += "Escola: " + distance.school.nome + " - DE: " + distance.school.de + "\n";
                neighbors += "   Distância: " + distance.distanceLong + "\n";
                neighbors += "   Endereço: " + distance.school.endereco + "\n";
                neighbors += "   Caminhando: " + distance.time + "\n";
            });

            if (neighbors.length > 0) {
                const i = DistancesVision.length;
                let tab = document.querySelector("#tTab").content.cloneNode(true);
                let el = tab.querySelector("#pills");
                el.id += "-" + i + "-tab";
                el.href += "-" + i;
                el.textContent = "Outra DE";
                Show("#" + el.id)
                let container = document.querySelector("#tContainerNeighbor").content.cloneNode(true);
                el = container.querySelector("#pills");
                el.id += "-" + i;
                el.setAttribute("aria-labelledby", el.id + "-tab")
                el.querySelector("#txtNeighbor").value = neighbors;
                Show("#" + el.id)
            }

            DistancesVision.forEach((d, i) => {
                let tab = document.querySelector("#tTab").content.cloneNode(true);
                let el = tab.querySelector("#pills");
                el.id += "-" + i + "-tab";
                el.href += "-" + i;
                el.setAttribute("aria-controls", "pills-" + i);
                el.textContent = d.school.nome;
                selector("#pills-tab").appendChild(el);
                Show("#" + el.id)
                let container = document.querySelector("#tContainer").content.cloneNode(true);
                el = container.querySelector("#pills");
                el.id += "-" + i;
                el.setAttribute("aria-labelledby", el.id + "-tab")
                container.querySelector("#txtDestinoResultado").value = d.school.endereco;
                container.querySelector("#txtDistancia").value = d.distanceLong;
                container.querySelector("#txtDestinoEscola").value = d.school.nome;
                container.querySelector("#txtDestinoContato").value = d.school.contato;
                container.querySelector("#txtTempo").value = d.time;
                const informations = d.school.junctionsId.map(juncaoId => {
                    const junction = junctions.filter(junction => { return junction.id == juncaoId })[0];
                    const modelShift = modelShifts.filter(modelShift => { return modelShift.id_turno == junction.id_turno && modelShift.id_modelo == junction.id_modelo })[0];
                    const shift = shifts.filter(shift => { return shift.id == junction.id_turno })[0];
                    const model = models.filter(model => { return model.id == junction.id_modelo })[0];
                    if (modelShift)
                        return "Modelo: " + model.descricao + " Período: " + shift.descricao + " de: " + modelShift.horario.inicio.substring(0, 5) + " até " + modelShift.horario.fim.substring(0, 5) + "\n";
                    return;
                });

                if (informations)
                    informations.forEach(information => {
                        if (information) {
                            container.querySelector("#txtInformacoes").value += information;
                        }
                    })
                if (i == 0) {
                    selector("#txtOrigemResultado").value = d.addressOrigin;
                    d.addressDestiny += ' escola';
                    FormatSelected(d, i);
                }
                el.addEventListener('click', () => { UpdateMap(distanceCloses[i]) });
                selector("#pills-tabContent").appendChild(el);
                Show("#" + el.id);
            })
        }

        const FormatSelected = (d, i) => {
            if (d.school.selected) {
                let tab = selector("#pills-" + i + "-tab");
                const neighborDistances = DistancesVision.filter(distanceVision => { return distanceVision.school.selected == false });
                const maior = neighborDistances.filter((neighborDistance) => { return d.distance > neighborDistance.distance }).length > 0;
                tab.textContent += "  ";
                let el = document.createElement("i");
                tab.appendChild(el);
                el.classList.add("fa-regular");
                el.classList.add("fa-shake");
                if (maior) {
                    el.classList.add("fa-thumbs-down");
                }
                else {
                    el.classList.add("fa-thumbs-up");
                }
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


        const GetDistanceMatrixPromise = (service, options) => {
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
            const response = await GetDistanceMatrixPromise(service, {
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

        const GeocodePromise = (service, options) => {
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
            const response = await GeocodePromise(service, { 'address': addressOrigin, 'region': 'BR' });
            const lat = response[0].geometry.location.lat();
            const lng = response[0].geometry.location.lng();
            return new google.maps.LatLng(lat, lng);
        }

        Show("#aguade");
        const data = await GetData();
        Populate(data);
        AssociateEvents(Update, data);
        Hide("#aguade");
    });
})();


