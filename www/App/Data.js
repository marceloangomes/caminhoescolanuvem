export { GetData };

class Data {
    constructor(source, schools = [], years = [], shifts = [], junctions = [], models = [], modelShifts = [], schoolJunctions = [], message = {}, citys=[]) {       
        this.schools = schools;
        this.years = years;
        this.shifts = shifts;
        this.junctions = junctions;
        this.models = models;
        this.modelShifts = modelShifts;
        this.schoolJunctions = schoolJunctions;
        this.message = message;
        this.citys = citys;
        this.source = 'http://10.181.25.51:3000/';        
    }
    async Init() {
        try {
            const response = await fetch(this.source);
            const _data = await response.text();
            this.schools = _data.schools;
            this.years = _data.years;
            this.shifts = _data.shifts;
            this.junctions = _data.junctions;
            this.models = _data.models;
            this.modelShifts = _data.modelShifts;
            this.schoolJunctions = _data.schoolJunctions;
            this.message = _data.message;
            this.citys = _data.citys;           
        } catch (error) {
            throw Error("Fala na comunicação com a base de dados.");
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
};

const GetData = async () => {
    const instance = new Data();    
    await instance.Init();    
    return instance;
}

