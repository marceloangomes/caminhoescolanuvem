"use strict";
(() => {

    //Biblioteca
    const selector = document.querySelector.bind(document);
    const selectorAll = document.querySelectorAll.bind(document);

    const Fade = (element, duration, clean) => {
        let opacity = clean ? 1 : 0;
        const alvoOpacidade = clean ? 0 : 1;
        const durationFrame = 10;
        const incrementFrame = durationFrame / duration;

        function animation() {
            if (alvoOpacidade == 0)
                if (opacity > alvoOpacidade) {
                    opacity -= incrementFrame;
                    element.style.opacity = opacity;
                    requestAnimationFrame(animation);
                } else
                    element.style.opacity = alvoOpacidade;
            else
                if (opacity < alvoOpacidade) {
                    opacity += incrementFrame;
                    element.style.opacity = opacity;
                    requestAnimationFrame(animation);
                } else
                    element.style.opacity = alvoOpacidade;
        }
        animation();
    };

    const Show = (sel, fade = false) => {
        let elements = selectorAll(sel);
        if (elements.length == 0)
            return;
        if (fade)
            elements.forEach(element => Fade(element, 2000, true));
        elements.forEach(element => element.style.display = '');
    }

    const Hide = (sel, fade = false) => {
        let elements = selectorAll(sel);
        if (elements.length == 0)
            return;
        if (fade)
            elements.forEach(element => Fade(element, 2000, false));
        elements.forEach(element => element.style.display = 'none');
    }

    const Sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const AsyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

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

    //document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
        let schoolsRay = [];
        let distanceCloses = [];
        let geocoder = new google.maps.Geocoder();
        let service = new google.maps.DistanceMatrixService();
        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer({
            //suppressMarkers: true
        });

        directionsDisplay.setMap(mapa);
        Hide("#Map");
        Hide("#alert");

        const PopulateSchools = (schools) => {
            //Não filtra pela cidade devido a poder haver school em São Bernardo 
            //mais próxima de um aluno do que São Caetano e vice-versa
            schools.sort((escolaA, escolaB) => {
                if (escolaA.nome < escolaB.nome)
                    return -1
                else if (escolaA.nome > escolaB.nome)
                    return 1
                else
                    return 0
            });

            schools.forEach(school => {
                if (!school.vizinha) {
                    school.de = "SAO BERNARDO DO CAMPO";
                    school.selected = false;
                    const selEscola = document.getElementById("selEscola");
                    const option = document.createElement("option");
                    option.value = school.codigo_cie;
                    option.text = school.nome;
                    selEscola.add(option);
                }
            })
        }
        let schools = localStorage.getItem('schools');
        if (schools) {
            schools = JSON.parse(schools);
            PopulateSchools(schools);
        }
        else {
            fetch('Escola.json')
                .then(response => {
                    response.text()
                        .then(data => {
                            schools = JSON.parse(data);
                            schools.forEach(school => {
                                school.vizinha = false;
                            });
                            PopulateSchools(schools);
                        })
                        .then(() => {
                            fetch('EscolaVizinha.json')
                                .then(response => {
                                    response.text()
                                        .then(data => {
                                            const escolaVizinhas = JSON.parse(data);
                                            escolaVizinhas.forEach(escolaVizinha => {
                                                const school = {
                                                    "de": escolaVizinha.DE,
                                                    "codigo_cie": escolaVizinha.codigo_cie,
                                                    "nome": escolaVizinha.nome,
                                                    "address": escolaVizinha.COMPLEND + " " + escolaVizinha.ENDESC + ", " + escolaVizinha.NUMESC + " - " + escolaVizinha.BAIESC,
                                                    "contato": "",
                                                    "lat": parseFloat(escolaVizinha.lat.replace(",", ".")),
                                                    "lng": parseFloat(escolaVizinha.lng.replace(",", ".")),
                                                    "selecionada": false,
                                                    "vizinha": true
                                                };
                                                schools.push(school);
                                            })
                                        })
                                        .then(() => {
                                            localStorage.setItem('schools', JSON.stringify(schools));
                                        })
                                })
                        })
                })
        }

        const PopulateYears = (years) => {
            //Preencher controles                
            years.forEach((ano) => {
                const selAno = document.getElementById("selAno");
                const option = document.createElement("option");
                option.value = ano.id;
                option.text = ano.descricao;
                selAno.add(option);
            })
        }
        let years = localStorage.getItem('years');
        if (years) {
            years = JSON.parse(years);
            PopulateYears(years);
        }
        else
            fetch('Ano.json')
                .then(response => {
                    response.text()
                        .then(data => {
                            localStorage.setItem('years', data);
                            years = JSON.parse(data)
                        })
                        .then(() => {
                            PopulateYears(years)
                        });
                })


        const PopulateShifts = (shifts) => {
            //Preencher controles                
            shifts.forEach((shift) => {
                const selTurno = document.getElementById("selTurno");
                const option = document.createElement("option");
                option.value = shift.id;
                option.text = shift.descricao;
                selTurno.add(option);
            });
        }
        let shifts = localStorage.getItem('shifts');
        if (shifts) {
            shifts = JSON.parse(shifts);
            PopulateShifts(shifts);
        }
        else
            fetch('Turno.json')
                .then(response => {
                    response.text()
                        .then(data => {
                            localStorage.setItem('shifts', data);
                            shifts = JSON.parse(data)
                        })
                        .then(() => {
                            PopulateShifts(shifts);
                        })
                })

        let junctions = localStorage.getItem('junctions');
        if (junctions)
            junctions = JSON.parse(junctions);
        else
            fetch('Juncao.json')
                .then(response => {
                    response.text()
                        .then(data => {
                            localStorage.setItem('junctions', data);
                            junctions = JSON.parse(data)
                        })
                })


        let models = localStorage.getItem('models');
        if (models)
            models = JSON.parse(models);
        else
            fetch('Modelo.json')
                .then(response => {
                    response.text()
                        .then(data => {
                            localStorage.setItem('models', data);
                            models = JSON.parse(data)
                        })
                })

        let modelShifts = localStorage.getItem('modelShifts');
        if (modelShifts)
            modelShifts = JSON.parse(modelShifts);
        else
            fetch('ModeloTurno.json')
                .then(response => {
                    response.text()
                        .then(data => {
                            localStorage.setItem('modelShifts', data);
                            modelShifts = JSON.parse(data)
                        })
                })


        let schoolJunctions = localStorage.getItem('schoolJunctions');
        if (schoolJunctions)
            schoolJunctions = JSON.parse(schoolJunctions);
        else
            fetch('EscolaJuncao.json')
                .then(response => {
                    response.text()
                        .then(data => {
                            localStorage.setItem('schoolJunctions', data);
                            schoolJunctions = JSON.parse(data)
                        })
                })


        let message = localStorage.getItem('message');
        if (message)
            message = JSON.parse(message);
        else
            fetch("Mensagem.json")
                .then(response => {
                    response.text()
                        .then(data => {
                            localStorage.setItem('message', data);
                            message = JSON.parse(data)
                        })
                });


        const ShowAlert = (m) => {
            Hide("#aguarde");
            selector('#mensageAlert').innerHTML = m;
            selector('#txtOrigem').focus();
            Show('#alert', true);
            // setTimeout(function () {
            //     $("#alert").hide('fade');
            // }, 5000)
        }

        //Events
        selector(".btnCalcular").addEventListener("click", async () => {
            await Update();
        });

        selector("#btnAlert").addEventListener("click", () => {
            Hide("#alert", true);
        });

        selector("#txtOrigem").addEventListener("keyup", (e) => {
            if (e.keyCode === 13)
                selector(".btnCalcular").dispatchEvent(new Event("click"));
        });

        let markersArray = [];

        google.maps.Map.prototype.clearMarkers = () => {
            markersArray.forEach(markerArray => {
                markerArray.setMap(null);
            });
            markersArray.length = 0;
        };

        const Update = async () => {
            //ClearResult();
            distanceCloses = [];
            let schoolsFiltered = [];
            if (!selector("#txtOrigem").value) {
                ShowAlert(message.enderecoVazio);
                return;
            }

            let year = selector('#selAno').value;
            if (year == 0) {
                ShowAlert(message.selecioneAno)
                return;
            }

            let models = [];
            selectorAll("input[type=checkbox]").forEach((e) => {
                if (e.checked == true)
                    models.push(e.value);
            });

            if (models.length == 0) {
                selector("#chkModeloParcial").checked = true;
                selector("#chkModeloIntegral").checked = true
                models = [1, 2];
            }

            var addressOrigin = selector("#txtOrigem").value;
            if (isNaN(parseFloat(addressOrigin))) {
                var cidade = selector("#selCidadeOrigem").value;
                if (cidade !== "Todas") {
                    addressOrigin += ', ' + selector("#selCidadeOrigem").value + ', SP';
                }
            }

            schools.forEach(school => {
                if (school.selected)
                    school.selected = false;
            });

            const schoolSelected = selector('#selEscola').value;
            if (schoolSelected > 0) {
                schools.every(school => {
                    if (school.codigo_cie == schoolSelected) {
                        school.selected = true;
                        school.junctionsId = [];
                        schoolsFiltered.push(school)
                        return false
                    }
                    return true;
                })
            }

            let shift = selector('#selTurno').value;
            let shiftsT = [];
            if (shift > 0)
                shiftsT = shifts.filter(t => { return t.id == shift });
            else
                shiftsT = shifts;

            let filters = [];

            models.forEach(model => {
                shiftsT.forEach(shift => {
                    filters.push({ "id_modelo": model, "id_turno": shift.id, "id_ano": year });
                })
            })

            Show("#aguarde");
            const junctionsId = [];
            filters.forEach(filter => {
                junctions.filter(junction => {
                    return junction.id_modelo == filter.id_modelo && junction.id_turno == filter.id_turno && junction.id_ano == filter.id_ano;
                }).forEach(junction => {
                    junctionsId.push(junction.id);
                })
            })

            schools.forEach(school => {
                if (school.vizinha)
                    schoolsFiltered.push(school);
                else {
                    const schoolJunction = schoolJunctions.filter(schoolJunction => { return school.codigo_cie == schoolJunction.codigo_cie })[0]
                    junctionsId.every(id => {
                        if (schoolJunction.juncao.indexOf(id) > -1) {
                            let insert = true;
                            schoolsFiltered.every(schoolFiltered => {
                                if (school.codigo_cie == schoolFiltered.codigo_cie) {
                                    if (!schoolFiltered.junctionsId)
                                        schoolFiltered.junctionsId = [];
                                    schoolFiltered.junctionsId.push(id)
                                    insert = false;
                                    return false;
                                }
                                return true;
                            });
                            if (insert) {
                                let schoolFiltered = school;
                                schoolFiltered.junctionsId = [];
                                schoolFiltered.junctionsId.push(id)
                                schoolsFiltered.push(schoolFiltered);
                            }
                            return false;
                        }
                        return true;
                    })
                }
            })

            // Verificar se o Local de origin é válido
            VerifyLocalOrigin(geocoder, addressOrigin, schoolsRay, schoolsFiltered, FilterSchools, ShowAlert, message, ProcessSchoolsRay, AsyncForEach, Sleep, CalculateDistance, FormatResult);
        };
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

        const FilterSchools = (origin, school) => {
            if (school.lat && school.lng) {
                let destiny = new google.maps.LatLng(school.lat, school.lng);
                let d = google.maps.geometry.spherical.computeDistanceBetween(origin, destiny);
                return d && d <= 2000;
            }
            return false;
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

        const FormatResult = (schoolsRay) => {
            if (distanceCloses.length === schoolsRay.length) {
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
                    let container = document.querySelector("#tContainer").content.cloneNode(true);
                    el = container.querySelector("#pills");
                    el.id += "-" + i;
                    el.setAttribute("aria-labelledby", el.id + "-tab")
                    el.querySelector("#txtOther").value = neighbors;
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
                //Update o mapa.   
                // if (DistancesVision[0]) {
                //     selector("#txtOrigemResultado").value = distanceCloses[0].addressOrigin;
                //     distanceCloses[0].addressDestiny += ' escola';
                //     UpdateMap(DistancesVision[0])
                // }
                // else
                return true;
            }
            return false;
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

        const CalculateDistance = async (school, origin) => {
            const destiny = new google.maps.LatLng(school.lat, school.lng);
            // Executa o DistanceMatrixService.
            await service.getDistanceMatrix({
                origins: [origin], // Origem
                destinations: [destiny], // Destino
                travelMode: google.maps.TravelMode.WALKING, // Modo (DRIVING | WALKING | BICYCLING)
                unitSystem: google.maps.UnitSystem.METRIC // Sistema de medida (METRIC | IMPERIAL)            
            }, (response, status) => {
                TrateSchools(response, status, school)
            });
        }

        const TrateSchools = (response, status, school) => {
            // Verificar o status.
            if (status != google.maps.DistanceMatrixStatus.OK) { // Se o status não for "OK".            
                ShowAlert(status);
            } else { // Se o status for "OK".      
                var time = response.rows[0].elements[0].duration.text;
                // Popula o objeto distance.            
                distanceCloses.push({ "school": school, "distance": response.rows[0].elements[0].distance.value, "addressDestiny": response.destinationAddresses, "addressOrigin": response.originAddresses, "distanceLong": response.rows[0].elements[0].distance.text, "time": time });
            }
        }

        const ProcessSchoolsRay = (AsyncForEach, schoolsRay, sleep, CalculateDistance, FormatResult, ShowAlert, origin) => {
            let i = 0;
            AsyncForEach(schoolsRay, async (school) => {
                i++;
                if (i % 2 === 0)
                    await sleep(1010);
                await CalculateDistance(school, origin);
            }).then(async () => {
                if (!FormatResult(schoolsRay)) {
                    ShowAlert(message.estouroTempo);
                }
            }).catch(reason => {
                ShowAlert(reason);
            }).finally(() => {
                Hide("#aguarde");
            });
        }

        const VerifyLocalOrigin = (geocoder, addressOrigin, schoolsRay, schools, FilterSchools, ShowAlert, message, ProcessSchoolsRay, asyncForEach, sleep, CalculateDistance, FormatResult) => {
            geocoder.geocode({ 'address': addressOrigin, 'region': 'BR' }, async function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    const origin = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    //Filtrar schools fora do raio de 2 KM, mantendo a school selecionada.
                    schoolsRay = schools.filter(school => school.selected == true || FilterSchools(origin, school));
                    if (schoolsRay.length === 0) {
                        ShowAlert(message.escolaNaoEncontrada);
                        return;
                    }

                    ProcessSchoolsRay(asyncForEach, schoolsRay, sleep, CalculateDistance, FormatResult, ShowAlert, origin);
                }
                else {
                    if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                        ShowAlert(message.enderecoAlunoNaoEncontrado);
                    }
                    else {
                        ShowAlert(status);
                    }
                }
            });
        }

    });
})();


