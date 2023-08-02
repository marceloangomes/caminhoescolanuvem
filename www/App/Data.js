export {GetData, data}
class Data{
    constructor(schools=[],years=[],shifts=[],junctions=[],models=[],modelShifts=[],schoolJunctions=[],message={}){
    this.schools=schools;
    this.years=years;
    this.shifts=shifts;
    this.junctions=junctions;
    this.models=models;
    this.modelShifts=modelShifts;
    this.schoolJunctions=schoolJunctions;
    this.message=message;
}};
let data = new Data();
const GetData = async ()=>{    
    if (localStorage.getItem('schools')) {
        data.schools = JSON.parse(localStorage.getItem('schools'));
    }
    else {
        //Doens't filter for city, because can there is school in São Bernardo 
        //next a student than São Caetano and vice-versa
        let response = await fetch('Escola.json');
        let  _data = await response.text();
        data.schools = JSON.parse(_data);
        data.schools.forEach(school => {
            school.vizinha = false
         });                        
        response = await fetch('EscolaVizinha.json');
        _data = await response.text();
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
        data.schools.sort((escolaA, escolaB) => {
            if (escolaA.nome < escolaB.nome)
                return -1
            else if (escolaA.nome > escolaB.nome)
                return 1
            else
                return 0
        })    
        localStorage.setItem('schools', JSON.stringify(data.schools));                                        
    }

    if (localStorage.getItem('years')) {
        data.years = JSON.parse(localStorage.getItem('years'));    
    }
    else{
        const response = await fetch('Ano.json');
        const _data =  await response.text();
        localStorage.setItem('years', _data);
        data.years = JSON.parse(_data)
    }

    if (localStorage.getItem('shifts')) {
        data.shifts = JSON.parse(localStorage.getItem('shifts'));   
    }
    else {
        const response = await fetch('Turno.json');
        const _data = await response.text();
        localStorage.setItem('shifts', _data);
        data.shifts = JSON.parse(_data)
    }

    if (localStorage.getItem('junctions'))
        data.junctions = JSON.parse(localStorage.getItem('junctions'));
    else{
        const response = await fetch('Juncao.json');
        const _data= await  response.text();
        localStorage.setItem('junctions', _data);
        data.junctions = JSON.parse(_data)
    }

    if (localStorage.getItem('models'))
        data.models = JSON.parse(localStorage.getItem('models'));
    else{
        const response = await fetch('Modelo.json');
        const _data =  await response.text();
        localStorage.setItem('models', _data);
        data.models = JSON.parse(_data)
    }

    if (localStorage.getItem('modelShifts'))
        data.modelShifts = JSON.parse(localStorage.getItem('modelShifts'));
    else{
        const response = await fetch('ModeloTurno.json');
        const _data = await response.text();
        localStorage.setItem('modelShifts', _data);
        data.modelShifts = JSON.parse(_data)
    }

    if (localStorage.getItem('schoolJunctions'))
        data.schoolJunctions = JSON.parse(localStorage.getItem('schoolJunctions'));
    else{
        const response = await fetch('EscolaJuncao.json');
        const _data = await response.text();
        localStorage.setItem('schoolJunctions', _data);
        data.schoolJunctions = JSON.parse(_data);
    }

    if (localStorage.getItem('message'))
        data.message = JSON.parse(localStorage.getItem('message'));
    else{
        const response = await fetch("Mensagem.json");
        const _data = await response.text();
        localStorage.setItem('message', _data);
        data.message = JSON.parse(_data)
    }
    return data;
}