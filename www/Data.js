export {GetData, data}
class Data{
    constructor(schools,years,shifts,junctions,models,modelShifts,schoolJunctions,message){
    this.schools=schools;
    this.years=years;
    this.shifts=shifts;
    this.junctions=junctions;
    this.models=models;
    this.modelShifts=modelShifts;
    this.schoolJunctions=schoolJunctions;
    this.message=message;
}}
let data = new Data();
const GetData = async ()=>{    
    if (localStorage.getItem('schools')) {
        data.schools = JSON.parse(localStorage.getItem('schools'));
    }
    else {
        //Doens't filter for city, because can there is school in São Bernardo 
        //next a student than São Caetano and vice-versa
        fetch('Escola.json')
            .then(response => {
                response.text()
                .then(_data => {
                    data.schools = JSON.parse(_data);
                    data.schools.forEach(school => {
                        school.vizinha = false;
                    });                        
                })
                .then(() => {
                    fetch('EscolaVizinha.json')
                        .then(response => {
                            response.text()
                            .then(_data => {
                                const escolaVizinhas = JSON.parse(_data);
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
                                    data.schools.push(school);
                                })
                            })
                            .then(() => {
                                data.schools.sort((escolaA, escolaB) => {
                                    if (escolaA.nome < escolaB.nome)
                                        return -1
                                    else if (escolaA.nome > escolaB.nome)
                                        return 1
                                    else
                                        return 0
                                });    
                                localStorage.setItem('data.schools', JSON.stringify(data.schools));                                        
                            })
                        })
                })
        })
    }
    
    if (localStorage.getItem('years')) {
        data.years = JSON.parse(localStorage.getItem('years'));    
    }
    else
        fetch('Ano.json')
            .then(response => {
                response.text()
                    .then(_data => {
                        localStorage.setItem('years', _data);
                        data.years = JSON.parse(_data)
                    })          
            })

    if (localStorage.getItem('shifts')) {
        data.shifts = JSON.parse(localStorage.getItem('shifts'));   
    }
    else
        fetch('Turno.json')
            .then(response => {
                response.text()
                    .then(_data => {
                        localStorage.setItem('shifts', _data);
                        data.shifts = JSON.parse(_data)
                    })       
            })

    if (localStorage.getItem('junctions'))
        data.junctions = JSON.parse(localStorage.getItem('junctions'));
    else
        fetch('Juncao.json')
            .then(response => {
                response.text()
                    .then(_data => {
                        localStorage.setItem('junctions', _data);
                        data.junctions = JSON.parse(_data)
                    })
            })

    if (localStorage.getItem('models'))
        data.models = JSON.parse(localStorage.getItem('models'));
    else
        fetch('Modelo.json')
            .then(response => {
                response.text()
                    .then(_data => {
                        localStorage.setItem('models', _data);
                        data.models = JSON.parse(_data)
                    })
            })

    if (localStorage.getItem('modelShifts'))
        data.modelShifts = JSON.parse(localStorage.getItem('modelShifts'));
    else
        fetch('ModeloTurno.json')
            .then(response => {
                response.text()
                    .then(_data => {
                        localStorage.setItem('modelShifts', _data);
                        data.modelShifts = JSON.parse(_data)
                    })
            })
;
    if (localStorage.getItem('schoolJunctions'))
        data.schoolJunctions = JSON.parse(localStorage.getItem('schoolJunctions'));
    else
        fetch('EscolaJuncao.json')
            .then(response => {
                response.text()
                    .then(_data => {
                        localStorage.setItem('schoolJunctions', _data);
                        schoolJunctions = JSON.parse(_data)
                    })
            })

    if (localStorage.getItem('message'))
        data.message = JSON.parse(localStorage.getItem('message'));
    else
        fetch("Mensagem.json")
            .then(response => {
                response.text()
                    .then(_data => {
                        localStorage.setItem('message', _data);
                        data.message = JSON.parse(_data)
                    })
            });
}