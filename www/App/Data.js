export { GetData };

class Data {
    constructor(cache, schools = [], years = [], shifts = [], junctions = [], models = [], modelShifts = [], schoolJunctions = [], message = {}) {
        this.cache = cache;
        this.schools = schools;
        this.years = years;
        this.shifts = shifts;
        this.junctions = junctions;
        this.models = models;
        this.modelShifts = modelShifts;
        this.schoolJunctions = schoolJunctions;
        this.message = message;
    }
    async Init() {
        if (this.cache.getItem('schools')) {
            this.schools = JSON.parse(this.cache.getItem('schools'));
        }
        else {
            //Doens't filter for city, because can there is school in São Bernardo 
            //next a student than São Caetano and vice-versa
            let response = await fetch('./Data/school.json');
            let _data = await response.text();
            this.schools = JSON.parse(_data);
            this.schools.forEach(school => {
                school.neighbor = false
            });
            response = await fetch('./Data/schoolNeighbor.json');
            _data = await response.text();
            const escolaVizinhas = JSON.parse(_data);
            escolaVizinhas.forEach(schoolNeighbor => {
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
                this.schools.push(school);
            })
            this.schools.sort((escolaA, escolaB) => {
                if (escolaA.nome < escolaB.nome)
                    return -1
                else if (escolaA.nome > escolaB.nome)
                    return 1
                else
                    return 0
            })
            this.cache.setItem('schools', JSON.stringify(this.schools));
        }

        if (this.cache.getItem('years')) {
            this.years = JSON.parse(this.cache.getItem('years'));
        }
        else {
            const response = await fetch('./Data/year.json');
            const _data = await response.text();
            this.cache.setItem('years', _data);
            this.years = JSON.parse(_data)
        }

        if (this.cache.getItem('shifts')) {
            this.shifts = JSON.parse(this.cache.getItem('shifts'));
        }
        else {
            const response = await fetch('./Data/shift.json');
            const _data = await response.text();
            this.cache.setItem('shifts', _data);
            this.shifts = JSON.parse(_data)
        }

        if (this.cache.getItem('junctions'))
            this.junctions = JSON.parse(this.cache.getItem('junctions'));
        else {
            const response = await fetch('./Data/junction.json');
            const _data = await response.text();
            this.cache.setItem('junctions', _data);
            this.junctions = JSON.parse(_data)
        }

        if (this.cache.getItem('models'))
            this.models = JSON.parse(this.cache.getItem('models'));
        else {
            const response = await fetch('./Data/model.json');
            const _data = await response.text();
            this.cache.setItem('models', _data);
            this.models = JSON.parse(_data)
        }

        if (this.cache.getItem('modelShifts'))
            this.modelShifts = JSON.parse(this.cache.getItem('modelShifts'));
        else {
            const response = await fetch('./Data/modelShift.json');
            const _data = await response.text();
            this.cache.setItem('modelShifts', _data);
            this.modelShifts = JSON.parse(_data)
        }

        if (this.cache.getItem('schoolJunctions'))
            this.schoolJunctions = JSON.parse(this.cache.getItem('schoolJunctions'));
        else {
            const response = await fetch('./Data/schoolJunction.json');
            const _data = await response.text();
            this.cache.setItem('schoolJunctions', _data);
            this.schoolJunctions = JSON.parse(_data);
        }

        if (this.cache.getItem('message'))
            this.message = JSON.parse(this.cache.getItem('message'));
        else {
            const response = await fetch("./Data/message.json");
            const _data = await response.text();
            this.cache.setItem('message', _data);
            this.message = JSON.parse(_data)
        }
        return this;
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
        let response = await fetch('./Data/dataVersion.json');
        let _data = await response.text();
        const versionServer = JSON.parse(_data);
        const versionClient = this.cache.getItem('version');
        if (versionClient) {
            if (versionClient.version != versionServer.version)
                this.cache.clear();
        } else
            this.cache.clear();
        this.cache.setItem('version', versionServer);
    }

};

const GetData = async (cache) => {
    const instance = new Data(cache);
    await instance.UpdateVersion();
    await instance.Init();
    instance.cache = null;
    return instance;
}

