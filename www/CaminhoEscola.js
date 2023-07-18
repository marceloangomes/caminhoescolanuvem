let mapa
$(() => {
    initMap = function() {     
        var saoBernardo = new google.maps.LatLng(-23.69389, -46.565);
        var mapOptions = {
            zoom:12,
            center: saoBernardo,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }         
        mapa = new google.maps.Map(document.getElementById('map'), mapOptions);
    }
    $(window).load(function(){                 
        let escolas = [];                
        let escolasRaio =[];     
        let escolasProximas = [];  
        let escolasFiltrado = [];
        let anos = [];
        let turnos = []; 
        let anoturno = [];
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
        fetch('escolas.json')
        .then(response => {
            response.text()
            .then(dados => {
                escolas = JSON.parse(dados)
            })
        })

        //Anos
        fetch('ano.json')
        .then(response => {
            response.text()
            .then(dados => {
                anos = JSON.parse(dados)
            })
            .then(()=>{
                //Preencher controles                
                anos.forEach((ano)=>{
                    selAno = document.getElementById("selAno");
                    let option = document.createElement("option");
                    option.value = ano.id;
                    option.text = ano.descricao;
                    selAno.add(option);
                });        
            })
        })

        //Turnos
        fetch('turno.json')
        .then(response => {
            response.text()
            .then(dados => {
                turnos = JSON.parse(dados)
            })
            .then(()=>{
                //Preencher controles                
                turnos.forEach((turno)=>{
                    selTurno = document.getElementById("selTurno");
                    let option = document.createElement("option");
                    option.value = turno.id;
                    option.text = turno.descricao;
                    selTurno.add(option);
                });        
            })
        })
        
        //AnoTurno
        fetch('AnoTurno.json')
        .then(response => {
            response.text()
            .then(dados => {
                anoturno = JSON.parse(dados)
            })                              
        })

        $.getJSON( "mensagem.json", function( data ) {        
            mensagem = data;
        });
                         
        //Library Common
        const Sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }        

        const AsyncForEach = async (array, callback)=> {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }        

        const MostrarAlerta = (m)=>{
            $("#aguarde").hide('fade');             
            document.getElementById('mensagemAlert').innerHTML=m;
            $('#txtOrigem').focus();
            $('.alert').show('fade');
            setTimeout(function(){
                $("#alert").hide('fade');
            },5000)      
        }
        
        //Events
        $(".btnCalcular").on("click",function(){
            Atualizar();
        }); 

        $("#btnAlert").click(function(){
            $("#alert").hide('fade');
        });

        $("#txtOrigem").keyup(function(e){
            if(e.keyCode === 13)
            $(".btnCalcular").trigger("click");
        });

        let markersArray = [];

        google.maps.Map.prototype.clearMarkers = function() {
            for (var i = 0; i < markersArray.length; i++ ) {
                markersArray[i].setMap(null);
              }
              markersArray.length = 0;
        };

        const CalculaRota = (start, end) => {                             
            var request = {
                origin: start,
                destination: end,                
                provideRouteAlternatives: true,
                travelMode: google.maps.TravelMode.WALKING, // Modo (DRIVING | WALKING | BICYCLING)
                unitSystem: google.maps.UnitSystem.METRIC // Sistema de medida (METRIC | IMPERIAL)                                     
            };
            directionsService.route(request, function(result, status) {
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
      
        const filtrarEscolas = (origem) => {
            return (element)=>{
                if (element.lat && element.lng) {
                    var destino = new google.maps.LatLng(element.lat, element.lng);
                    var d = google.maps.geometry.spherical.computeDistanceBetween(origem, destino);
                    return d && d <= 2000;
                }
            }
        };

        const filtrarPorAno = (ano) => {           
            return (element)=>{
                return element.id_ano == ano;
            }
        };
        
        const filtrarPorTurno = (turno) => {           
            return (element)=>{
                return element.id_turno == turno;
            }
        };

        const filtrarPorEscola =  (codigoCie) => {
            return (element)=>{
                return parseInt(element.codigo_cie) == parseInt(codigoCie);
            }                            
        }

        function filtrarEscolaPorAnoTurno(anoTurnoFiltrado) {
            return (element) => {
                let codigoCie = element.codigo_cie;
                let retorno = anoTurnoFiltrado.findIndex(filtrarPorEscola(codigoCie));
                return retorno > -1;
            };
        }

        const Atualizar = async () => {
            LimparResultado();
            escolasProximas = [];            
            if(!$("#txtOrigem").val())
            {
                MostrarAlerta(mensagem.enderecoVazio);
                return;    
            }

            $("#aguarde").show('fade');
            var endOrigem = $("#txtOrigem").val();          
            if(isNaN(parseFloat(endOrigem))){
                var cidade = $("#selCidadeOrigem").val();
                if(cidade !== "Todas")
                {
                    endOrigem += ', ' + $("#selCidadeOrigem").val() + ', SP';
                }            
            }

            let anoTurnoFiltrado = null;
            let ano = document.getElementById('selAno').value;
            if(ano != null && ano > 0){
                anoTurnoFiltrado = anoturno.filter(filtrarPorAno(parseInt(ano)));
            }
            
            let turno = document.getElementById('selTurno').value;
            if(turno != null && turno > 0){
                anoTurnoFiltrado = anoTurnoFiltrado ? anoTurnoFiltrado.filter(filtrarPorTurno(parseInt(turno))) : anoturno.filter(filtrarPorTurno(parseInt(turno)));
            }

            escolasFiltrado = escolas;

            if(anoTurnoFiltrado){                
                escolasFiltrado = escolasFiltrado.filter(filtrarEscolaPorAnoTurno(anoTurnoFiltrado));                                    
            }
                        
            // Verificar se o Local de origem é válido
            VerificarLocalOrigem(geocoder, endOrigem, origem, escolasRaio, escolasFiltrado, filtrarEscolas, MostrarAlerta, mensagem, escolasProximas, ProcessarEscolasRaio, AsyncForEach, Sleep, CalculaDistancia, FormataResultado);                                
        };

        const LimparResultado = () => {        
            escolasProximas=[];
            escolasRaio=[];           
            $("#pills-tab li a").css("display","none");  
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
            if(escolasProximas.length === escolasRaio.length)
            {                
                escolasProximas.sort((a, b) => {
                    return a.dist - b.dist
                });

                escolasProximas = escolasProximas.slice(0,3)
                $("#pills-tab li a").css("display","");  
                escolasProximas.forEach((d, i)=>{
                    let $escolaContainer = null
                    switch (i) {
                        case 0:
                            $escolaContainer = $(".containerPrimeira") 
                            $("#pills-primeira-tab").text(d.escola.nome).removeAttr('hidden').click(()=>{ AtualizarMapa(escolasProximas[0]) })                                            
                            break;                    
                        case 1:
                            $escolaContainer = $(".containerSegunda") 
                            $("#pills-segunda-tab").text(d.escola.nome).removeAttr('hidden').click(()=>{ AtualizarMapa(escolasProximas[1]) })
                            break; 
                        case 2:
                            $escolaContainer = $(".containerTerceira") 
                            $("#pills-terceira-tab").text(d.escola.nome).removeAttr('hidden').click(()=>{ AtualizarMapa(escolasProximas[2]) })
                            break;
                        default:
                            break;
                    }                     
                    $($escolaContainer).find("#txtDestinoResultado").val(d.escola.endereco);   
                    $($escolaContainer).find("#txtDistancia").val(d.distLongo); 
                    $($escolaContainer).find("#txtDestinoEscola").val(d.escola.nome);
                    const escola = escolasRaio.find(obj => obj.nome === d.escola.nome);
                    const contato = escola.contato
                    $($escolaContainer).find("#txtDestinoContato").val(contato);            
                    $($escolaContainer).find("#txtTempo").val(d.tempo);                                       
                })  
                //Atualizar o mapa.   
                if(escolasProximas[0]){          
                    $("#txtOrigemResultado").val(escolasProximas[0].enderecoOrigem);      
                    escolasProximas[0].enderecoDestino += ' escola';                                
                    AtualizarMapa(escolasProximas[0])
                }                                                              
                return true;
            }
            return false;
        }

        const AtualizarMapa =(endereco) => {
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

        const CalculaDistancia =(escola, origem) => {        
            // Executa o DistanceMatrixService.
            service.getDistanceMatrix({
                origins: [origem], // Origem
                destinations: [escola.enderecoLocalizacao ? escola.enderecoLocalizacao: escola.endereco], // Destino
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
                escolasProximas.push({"escola":escola,"dist":response.rows[0].elements[0].distance.value,"enderecoDestino":response.destinationAddresses,"enderecoOrigem":response.originAddresses, "distLongo":response.rows[0].elements[0].distance.text,"tempo":tempo});
            }          
        }

        const ProcessarEscolasRaio=(AsyncForEach, escolasRaio, sleep, CalculaDistancia, FormataResultado, MostrarAlerta, origem) =>{
            let i = 0;
            AsyncForEach(escolasRaio, async (e) => {
                i++;
                if (i % 5 === 0)
                    await sleep(1010);
                CalculaDistancia(e, origem);
            }).then(async () => {
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
        
        const VerificarLocalOrigem =(geocoder, endOrigem, origem, escolasRaio, escolas, filtrarEscolas, MostrarAlerta, mensagem, escolasProximas, ProcessarEscolasRaio, asyncForEach, sleep, CalculaDistancia, FormataResultado) =>{            
            geocoder.geocode({ 'address': endOrigem, 'region': 'BR' }, async function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    origem = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    //Filtrar escolas fora do raio de 2 KM.
                    escolasRaio = escolas.filter(filtrarEscolas(origem));
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


