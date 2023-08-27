export { Filter }

class Filter {
    constructor(data, parameters) {
        this.data = data;
        this.addressOrigin = parameters.addressOrigin;
        this.models = parameters.models;
        this.cityId = parameters.cityId;
        this.shiftId = parameters.shiftId;
        this.year = parameters.year;
        this.schoolSelectId = parameters.schoolSelectId;
        this.parameters = [];
    }

    Init() {
        if (isNaN(parseFloat(this.addressOrigin))) {
            if (this.cityId !== 0) {
                const city = this.data.citys.find(city => city.id === this.cityId);
                this.addressOrigin += ', ' + city.name + ', SP';
            }
        }

        let models = [];
        this.models.forEach((modelId) => {
            models.push(this.data.models.find(model => model.id === modelId));
        });

        let shifts = [];
        if (this.shiftId > 0)
            shifts.push(this.data.shifts.find(shift => shift.id === this.shiftId));
        else
            shifts = this.data.shifts;

        models.forEach(model => {
            shifts.forEach(shift => {
                this.parameters.push({ "model_id": model.id, "shift_id": shift.id, "year_id": this.year });
            })
        })

    }
}