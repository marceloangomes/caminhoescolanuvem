let mapa
$(() => {
    initMap = function () {
        var saoBernardo = new google.maps.LatLng(-23.69389, -46.565);
        var mapOptions = {
            zoom: 12,
            center: saoBernardo,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        mapa = new google.maps.Map(document.getElementById('map'), mapOptions);
    }
    $(window).load(function () {
        let escolas = [];
        let escolasRaio = [];
        let distanciaProximas = [];
        let anos = [];
        let turnos = [];
        let modeloTurnos = [];
        let juncoes = [];
        let escolaJuncoes = [];
        let geocoder = new google.maps.Geocoder();
        let service = new google.maps.DistanceMatrixService();
        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer({
            //suppressMarkers: true
        });
        let origem = {};
        let mensagem = {};

        directionsDisplay.setMap(mapa);
        $(".alert").hide();

        //Obter dados
        //Escolas
        fetch('Escola.json')
            .then(response => {
                response.text()
                    .then(dados => {
                        escolas = JSON.parse(dados)
                    })
                    .then(() => {
                        escolas.forEach(escola => {
                            escola.selecionada = false;
                            selEscola = document.getElementById("selEscola");
                            let option = document.createElement("option");
                            option.value = escola.codigo_cie;
                            option.text = escola.nome;
                            selEscola.add(option);
                        })
                    })
            })

        //Anos
        fetch('Ano.json')
            .then(response => {
                response.text()
                    .then(dados => {
                        anos = JSON.parse(dados)
                    })
                    .then(() => {
                        //Preencher controles                
                        anos.forEach((ano) => {
                            selAno = document.getElementById("selAno");
                            let option = document.createElement("option");
                            option.value = ano.id;
                            option.text = ano.descricao;
                            selAno.add(option);
                        });
                    })
            })

        //Turnos
        fetch('Turno.json')
            .then(response => {
                response.text()
                    .then(dados => {
                        turnos = JSON.parse(dados)
                    })
                    .then(() => {
                        //Preencher controles                
                        turnos.forEach((turno) => {
                            selTurno = document.getElementById("selTurno");
                            let option = document.createElement("option");
                            option.value = turno.id;
                            option.text = turno.descricao;
                            selTurno.add(option);
                        });
                    })
            })

        //Juncao
        fetch('Juncao.json')
            .then(response => {
                response.text()
                    .then(dados => {
                        juncoes = JSON.parse(dados)
                    })
            })
        //Modelos
        fetch('Modelo.json')
            .then(response => {
                response.text()
                    .then(dados => {
                        modelos = JSON.parse(dados)
                    })
            })

        //Turno por Modelo
        fetch('ModeloTurno.json')
            .then(response => {
                response.text()
                    .then(dados => {
                        modeloTurnos = JSON.parse(dados)
                    })
            })

        //JuncaoEscola
        fetch('EscolaJuncao.json')
            .then(response => {
                response.text()
                    .then(dados => {
                        escolaJuncoes = JSON.parse(dados)
                    })
            })

        $.getJSON("Mensagem.json", function (data) {
            mensagem = data;
        });

        //Library Common
        const Sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const AsyncForEach = async (array, callback) => {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        const MostrarAlerta = (m) => {
            $("#aguarde").hide('fade');
            document.getElementById('mensagemAlert').innerHTML = m;
            $('#txtOrigem').focus();
            $('.alert').show('fade');
            setTimeout(function () {
                $("#alert").hide('fade');
            }, 5000)
        }

        //Events
        $(".btnCalcular").on("click", function () {
            Atualizar();
        });

        $("#btnAlert").click(function () {
            $("#alert").hide('fade');
        });

        $("#txtOrigem").keyup(function (e) {
            if (e.keyCode === 13)
                $(".btnCalcular").trigger("click");
        });

        let markersArray = [];

        google.maps.Map.prototype.clearMarkers = function () {
            for (var i = 0; i < markersArray.length; i++) {
                markersArray[i].setMap(null);
            }
            markersArray.length = 0;
        };

        const Atualizar = async () => {
            LimparResultado();
            distanciaProximas = [];
            let escolasFiltrado = [];
            if (!$("#txtOrigem").val()) {
                MostrarAlerta(mensagem.enderecoVazio);
                return;
            }

            $("#aguarde").show('fade');
            var endOrigem = $("#txtOrigem").val();
            if (isNaN(parseFloat(endOrigem))) {
                var cidade = $("#selCidadeOrigem").val();
                if (cidade !== "Todas") {
                    endOrigem += ', ' + $("#selCidadeOrigem").val() + ', SP';
                }
            }

            let modelos = [];
            $("input.form-check-input").each((element) => {
                if (element.checked)
                    modelos.push(element.value);
            });

            if (modelos.length == 0) {
                document.getElementById("chkModeloParcial").checked = true;
                document.getElementById("chkModeloIntegral").checked = true
                modelos = [1, 2];
            }

            let ano = document.getElementById('selAno').value;
            if (ano == 0) {
                MostrarAlerta(mensagem.selecioneAno)
                return;
            }

            let escolaSelecionada = document.getElementById('selEscola').value;
            if (escolaSelecionada > 0) {
                escolas.forEach(escola => {
                    if (escola.codigo_cie == escolaSelecionada) {
                        escola.selecionada = true;
                        escolasFiltrado.push(escola)
                        return;
                    }
                })
            }

            let turno = document.getElementById('selTurno').value;
            let turnosT = [];
            if (turno > 0)
                turnosT = turnos.filter(t => { return t.id == turno });
            else
                turnosT = turnos;

            let filtros = [];

            modelos.forEach(modelo => {
                turnosT.forEach(turno => {
                    filtros.push({ "id_modelo": modelo, "id_turno": turno.id, "id_ano": ano });
                })
            })

            filtros.forEach(filtro => {
                let juncoesFiltrado = juncoes.filter(juncao => {
                    return juncao.id_modelo == filtro.id_modelo && juncao.id_turno == filtro.id_turno && juncao.id_ano == filtro.id_ano;
                })

                juncoesFiltrado.forEach(juncao => {
                    escolaJuncoes.forEach(escolaJuncao => {
                        const i = escolaJuncao.juncao.indexOf(juncao.id);
                        if (i > -1) {
                            escolas.every(escola => {
                                if (escola.codigo_cie == escolaJuncao.codigo_cie) {
                                    let inserir = true;
                                    escolasFiltrado.every(escolaFiltrado => {
                                        if (escola.codigo_cie == escolaFiltrado.codigo_cie) {
                                            if (!escolaFiltrado.juncoesId)
                                                escolaFiltrado.juncoesId = [];
                                            escolaFiltrado.juncoesId.push(juncao.id)
                                            inserir = false;
                                            return false;
                                        }
                                        return true;
                                    });
                                    let escolaFiltrado = escola;
                                    if (inserir) {
                                        escolasFiltrado.push(escolaFiltrado);
                                        escolaFiltrado.juncoesId = [];
                                        escolaFiltrado.juncoesId.push(juncao.id)
                                    }
                                    return false;
                                }
                                return true;
                            })
                        }
                    })
                })
            })

            // Verificar se o Local de origem é válido
            VerificarLocalOrigem(geocoder, endOrigem, origem, escolasRaio, escolasFiltrado, filtrarEscolas, MostrarAlerta, mensagem, ProcessarEscolasRaio, AsyncForEach, Sleep, CalculaDistancia, FormataResultado);
        };
        const CalculaRota = (start, end) => {
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
                    //     icon: new google.maps.MarkerImage('escola.png',
                    //         new google.maps.Size(32, 32),
                    //         new google.maps.Point(0, 0),
                    //         new google.maps.Point(0, 32))   
                    // });                 
                    // markersArray=[markerAluno, markerEscola]
                    $("#aguarde").hide('fade');
                }
            });
        }

        const filtrarEscolas = (origem, escola) => {
            if (escola.lat && escola.lng) {
                let destino = new google.maps.LatLng(escola.lat, escola.lng);
                let d = google.maps.geometry.spherical.computeDistanceBetween(origem, destino);
                return d && d <= 2000;
            }
            return false;
        };

        const LimparResultado = () => {
            distanciaProximas = [];
            escolasRaio = [];
            $("#pills-tab li a").css("display", "none");
            $("#txtDestinoResultado").val("");
            $("#txtDistancia").val("");
            $("#txtDestinoEscola").val("");
            $("#txtDestinoContato").val("");
            $("#txtTempo").val("");
            $("#txtOrigemResultado").val("");
            initMap();
            directionsDisplay.setMap(mapa);
            $(".alert").hide();
            return true;
        }

        const FormataResultado = (escolasRaio) => {
            if (distanciaProximas.length === escolasRaio.length) {
                distanciaProximas.sort((a, b) => {
                    if (a.escola.selecionada < b.escola.selecionada)
                        return 1
                    else if (a.escola.selecionada > b.escola.selecionada)
                        return -1
                    else
                        return a.dist - b.dist
                });
                distanciasVisao = distanciaProximas.slice(0, 3 + distanciaProximas.filter(distancia => { return distancia.escola.selecionada == true }).length);

                $("#pills-tab li a").css("display", "");
                distanciasVisao.forEach((d, i) => {
                    let $escolaContainer = null
                    switch (i) {
                        case 0:
                            $escolaContainer = $(".containerPrimeira")
                            $("#pills-primeira-tab").text(d.escola.nome).removeAttr('hidden').click(() => { AtualizarMapa(distanciaProximas[0]) });
                            FormataSelecionada(d.escola, d.dist, distanciasVisao);
                            break;
                        case 1:
                            $escolaContainer = $(".containerSegunda")
                            $("#pills-segunda-tab").text(d.escola.nome).removeAttr('hidden').click(() => { AtualizarMapa(distanciaProximas[1]) });
                            break;
                        case 2:
                            $escolaContainer = $(".containerTerceira")
                            $("#pills-terceira-tab").text(d.escola.nome).removeAttr('hidden').click(() => { AtualizarMapa(distanciaProximas[2]) });
                            break;
                        case 3:
                            $escolaContainer = $(".containerQuarta")
                            $("#pills-quarta-tab").text(d.escola.nome).removeAttr('hidden').click(() => { AtualizarMapa(distanciaProximas[3]) })
                            break;
                        case 4:
                            $escolaContainer = $(".containerQuinta")
                            $("#pills-quinta-tab").text(d.escola.nome).removeAttr('hidden').click(() => { AtualizarMapa(distanciaProximas[4]) })
                            break;
                        default:
                            break;
                    }
                    $($escolaContainer).find("#txtDestinoResultado").val(d.escola.endereco);
                    $($escolaContainer).find("#txtDistancia").val(d.distLongo);
                    $($escolaContainer).find("#txtDestinoEscola").val(d.escola.nome);
                    $($escolaContainer).find("#txtDestinoContato").val(d.escola.contato);
                    $($escolaContainer).find("#txtTempo").val(d.tempo);
                    const informacoes = d.escola.juncoesId.map(juncaoId => {
                        const juncao = juncoes.filter(juncao => { return juncao.id == juncaoId })
                        modeloTurno = modeloTurnos.filter(modeloTurno => { return modeloTurno.id_turno == juncao.id_turno && modeloTurno.id_modelo == juncao.id_modelo });
                        turno = turnos.filter(turno => { return turno.id == juncao.turno_id });
                        modelo = modelos.filter(modelo => { return modelo.id == juncao.modelo_id });
                        if (modeloTurno.length > 0)
                            return "Modelo: " + modelo.descricao + " Período: " + turno.descricao + " de: " + modeloTurno.horario.inicio.substring(0, 5) + " até " + modeloTurno.horario.fim.substring(0, 5);
                        return;
                    });

                    informacoes.forEach(informacao => {
                        let el = $($escolaContainer).find("#txtInformacoes");
                        el.setAttribute('style', 'white-space: pre;');
                        el.textContent += informacao + " \r\n...";
                    })

                })
                //Atualizar o mapa.   
                if (distanciasVisao[0]) {
                    $("#txtOrigemResultado").val(distanciaProximas[0].enderecoOrigem);
                    distanciaProximas[0].enderecoDestino += ' escola';
                    AtualizarMapa(distanciasVisao[0])
                }
                return true;
            }
            return false;
        }

        const FormataSelecionada = (escola, distancia, distanciasVisao) => {
            if (escola.selecionada) {
                let tab = document.getElementById("pills-primeira-tab");
                const outrasDistancias = distanciasVisao.filter(distanciaVisao => { return distanciaVisao.escola.selecionada == false });
                const maior = outrasDistancias.filter((outraDistancia) => { return distancia > outraDistancia.dist }).length > 0;
                tab.textContent += "  ";
                let el = document.createElement("i");
                tab.appendChild(el);
                el.classList.add("fa-regular");
                el.classList.add("fa-shake");
                if (maior) {
                    el.style.cssText += "color:#ff0000";
                    el.classList.add("fa-thumbs-down");
                }
                else {
                    el.style.cssText += "color:#00ff3afa";
                    el.classList.add("fa-thumbs-up");
                }
            }
        }

        const AtualizarMapa = (endereco) => {
            let map = document.querySelector('#map');

            function loaded() {
                $("#aguarde").hide('fade');
            };

            CalculaRota(endereco.enderecoOrigem.toString(), endereco.enderecoDestino.toString());
            //$("#map").attr("src", "https://maps.google.com/maps?saddr=" + endereco.enderecoOrigem + "&daddr=" + endereco.enderecoDestino + "&output=embed" + "&dirflg=w");                                           

            if (map.complete) {
                loaded();
            }
            else {
                map.addEventListener('load', loaded);
            }
            $("#aguarde").hide('fade');
        }

        const CalculaDistancia = (escola, origem) => {
            // Executa o DistanceMatrixService.
            service.getDistanceMatrix({
                origins: [origem], // Origem
                destinations: [escola.enderecoLocalizacao ? escola.enderecoLocalizacao : escola.endereco], // Destino
                travelMode: google.maps.TravelMode.WALKING, // Modo (DRIVING | WALKING | BICYCLING)
                unitSystem: google.maps.UnitSystem.METRIC // Sistema de medida (METRIC | IMPERIAL)            
            }, (response, status) => {
                TratarEscolas(response, status, escola)
            });
        }

        const TratarEscolas = (response, status, escola) => {
            // Verificar o status.
            if (status != google.maps.DistanceMatrixStatus.OK) { // Se o status não for "OK".            
                MostrarAlerta(status);
            } else { // Se o status for "OK".      
                var tempo = response.rows[0].elements[0].duration.text;
                // Popula o objeto distancia.            
                distanciaProximas.push({ "escola": escola, "dist": response.rows[0].elements[0].distance.value, "enderecoDestino": response.destinationAddresses, "enderecoOrigem": response.originAddresses, "distLongo": response.rows[0].elements[0].distance.text, "tempo": tempo });
            }
        }

        const ProcessarEscolasRaio = (AsyncForEach, escolasRaio, sleep, CalculaDistancia, FormataResultado, MostrarAlerta, origem) => {
            let i = 0;
            AsyncForEach(escolasRaio, async (e) => {
                i++;
                if (i % 2 === 0)
                    await sleep(1010);
                CalculaDistancia(e, origem);
            }).then(async (e) => {
                i = 0;
                while (!FormataResultado(escolasRaio) && i < 30) {
                    await sleep(500);
                    i++;
                }
            }).catch(razao => {
                MostrarAlerta(razao);
                return;
            });
        }

        const VerificarLocalOrigem = (geocoder, endOrigem, origem, escolasRaio, escolas, filtrarEscolas, MostrarAlerta, mensagem, ProcessarEscolasRaio, asyncForEach, sleep, CalculaDistancia, FormataResultado) => {
            geocoder.geocode({ 'address': endOrigem, 'region': 'BR' }, async function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    origem = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    //Filtrar escolas fora do raio de 2 KM, incluindo a escola selecionada.
                    escolasRaio = escolas.filter(escola => escola.selecionada == true || filtrarEscolas(origem, escola));
                    if (escolasRaio.length === 0) {
                        MostrarAlerta(mensagem.escolaNaoEncontrada);
                        return;
                    }

                    ProcessarEscolasRaio(asyncForEach, escolasRaio, sleep, CalculaDistancia, FormataResultado, MostrarAlerta, origem);
                }
                else {
                    if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                        MostrarAlerta(mensagem.enderecoAlunoNaoEncontrado);
                    }
                    else {
                        MostrarAlerta(status);
                    }
                    $("#aguarde").hide('fade');
                }
            });
        }
    });
});


