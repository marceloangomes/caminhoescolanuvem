export { GetData };
import { promises as fsPromises } from 'fs';
import { CalculateAngleByZero } from '../maps.js'

class Data {
    constructor(source = undefined, schools = [], years = [], shifts = [], junctions = [], models = [], modelShifts = [], schoolJunctions = [], message = {}, citys = [], citysLatLng = []) {
        if (!Data.instance) {            
            this.schools = schools;
            this.years = years;
            this.shifts = shifts;
            this.junctions = junctions;
            this.models = models;
            this.modelShifts = modelShifts;
            this.schoolJunctions = schoolJunctions;
            this.message = message;
            this.citys = citys;
            this.citysLatLng = citysLatLng;
            if (source)
                this.source = source;
            else
                this.source = '../Data/';
            this.charge = true;
            Data.instance = this;
        }           
        return Data.instance;        
    }

    async Init() {        
        if (this.charge){
            this.schools = await this.GetSchools();
            this.years = await this.GetDataFromFile('year.json');
            this.shifts = await this.GetDataFromFile('shift.json');
            this.junctions = await this.GetDataFromFile('junction.json');
            this.models = await this.GetDataFromFile('model.json');
            this.modelShifts = await this.GetDataFromFile('modelShift.json');
            this.schoolJunctions = await this.GetDataFromFile('schoolJunction.json');
            this.message = await this.GetDataFromFile('message.json');
            this.citys = await this.GetDataFromFile('city.json');
            this.citysLatLng = await this.GetCitysLatLng();      
            this.charge = false;
        }
    }

    GetInformation(school) {
        const informations = school.junctionsId.map(juncaoId => {
            const junction = this.junctions.filter(junction => { return junction.id == juncaoId })[0];
            const modelShift = this.modelShifts.filter(modelShift => { return modelShift.shift_id == junction.shift_id && modelShift.model_id == junction.model_id })[0];
            if (!modelShift)
                return '';
            const shift = this.shifts.filter(shift => { return shift.id == junction.shift_id })[0];
            const model = this.models.filter(model => { return model.id == junction.model_id })[0];
            return `   Modelo: ${model.description}   período: ${shift.description}   horário de: ${modelShift.classSchedule.begin.substring(0, 5)}  até: ${modelShift.classSchedule.end.substring(0, 5)}\n`;
        });
        return informations;
    }

    async GetDataFromFile(nameFile) {
        try {            
            const _data = await fsPromises.readFile(this.source + nameFile, 'utf-8');
            return JSON.parse(_data);            
        } catch (error) {
            throw (new Error(`${error}\n ${this.source + nameFile}`));
        }
    }

    async GetNeighbors() {
        let schoolsParsed = [];
        let schoolsNeighbor = await this.GetDataFromFile('schoolNeighbor.json');
        schoolsNeighbor.forEach(schoolNeighbor => {
            const school = {
                "de": schoolNeighbor.DE,
                "school_id": schoolNeighbor.codigo_cie,
                "name": schoolNeighbor.nome,
                "address": schoolNeighbor.COMPLEND + " " + schoolNeighbor.ENDESC + ", " + schoolNeighbor.NUMESC + " - " + schoolNeighbor.BAIESC,
                "contact": "",
                "lat": parseFloat(schoolNeighbor.lat.replace(",", ".")),
                "lng": parseFloat(schoolNeighbor.lng.replace(",", ".")),
                "selected": false,
                "neighbor": true
            };
            schoolsParsed.push(school);
        });
        return schoolsParsed;
    }

    async GetSchools() {
        let schools = await this.GetDataFromFile('school.json');
        schools = schools.concat(await this.GetNeighbors());
        schools = await this.SortSchools(schools);
        return schools;
    }

    async SortSchools(schools) {
        schools.sort((escolaA, escolaB) => {
            if (escolaA.nome < escolaB.nome)
                return -1
            else if (escolaA.nome > escolaB.nome)
                return 1
            else
                return 0
        });
        return schools;
    }

    async GetCitysLatLng() {
        let citysLatLng = await this.GetDataFromFile('cityCoordinate.json');
        citysLatLng.map((city) => {
            city.degreeDistance = CalculateAngleByZero({ 'lat': city.lat, 'lng': city.lng });
        })
        return citysLatLng.sort((cityA, cityB) => {
            return cityA.degreeDistance - cityB.degreeDistance;
        })
    }
};

const GetData = async () => {
    const instance = new Data();
    await instance.Init();
    return instance;
}