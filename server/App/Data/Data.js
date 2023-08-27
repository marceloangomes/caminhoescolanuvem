export { GetData };
import { promises as fsPromises } from 'fs';
import { CalculateAngleByZero } from '../maps.js'

class Data {
    constructor(cache = undefined, source = undefined, schools = [], years = [], shifts = [], junctions = [], models = [], modelShifts = [], schoolJunctions = [], message = {}, citys = [], citysLatLng = []) {
        this.cache = cache;
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
    }
    async Init() {
        await this.UpdateVersion();
        this.schools = await this.GetSchools();
        this.years = await this.GetDataFromFile('years', 'year.json');
        this.shifts = await this.GetDataFromFile('shifts', 'shift.json');
        this.junctions = await this.GetDataFromFile('junctions', 'junction.json');
        this.models = await this.GetDataFromFile('models', 'model.json');
        this.modelShifts = await this.GetDataFromFile('modelShifts', 'modelShift.json');
        this.schoolJunctions = await this.GetDataFromFile('schoolJunctions', 'schoolJunction.json');
        this.message = await this.GetDataFromFile('message', 'message.json');
        this.citys = await this.GetDataFromFile('citys', 'city.json');
        this.citysLatLng = await this.GetCitysLatLng();
        this.cache = null;
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

    async UpdateVersion() {
        const versionDatabase = await this.GetDataFromFile('version', 'dataVersion.json', false);
        const versionCache = this.cache.getItem('version');
        const versionServer = undefined;
        if (versionCache)
            versionServer = await JSON.parse(versionCache);
        if (versionServer) {
            if (versionServer.version != versionDatabase.version)
                this.cache.clear();
        } else
            this.cache.clear();
        this.cache.setItem('version', JSON.stringify(versionDatabase));
    }

    async GetDataFromFile(name, nameFile, isCached = true) {
        try {
            if (isCached && this.cache.getItem(name)) {
                return JSON.parse(this.cache.getItem(name));
            }
            else {
                const _data = await fsPromises.readFile(this.source + nameFile, 'utf-8');
                if (isCached)
                    this.cache.setItem(name, _data);
                return JSON.parse(_data)
            }
        } catch (error) {
            throw `${error}\n ${this.source + nameFile}`;
        }
    }

    async GetNeighbors() {
        let schoolsParsed = [];
        let schoolsNeighbor = await this.GetDataFromFile('neighbors', 'schoolNeighbor.json');
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
        let schools = await this.GetDataFromFile('schools', 'school.json');
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
        let citysLatLng = await this.GetDataFromFile('citysLatLng', 'cityCoordinate.json');
        citysLatLng.map((city) => {
            city.degreeDistance = CalculateAngleByZero({ 'lat': city.lat, 'lng': city.lng });
        })
        return citysLatLng.sort((cityA, cityB) => {
            return cityA.degreeDistance - cityB.degreeDistance;
        })
    }
};

const GetData = async (cache) => {
    const instance = new Data(cache);
    await instance.Init();
    return instance;
}