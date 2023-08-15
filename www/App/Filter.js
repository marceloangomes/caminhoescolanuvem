export { Filter }
import { selector, selectorAll } from './Library.js'

class Filter {
    constructor(addressOrigin = "", parameters = []) {
        this.addressOrigin = addressOrigin;
        this.parameters = parameters;
    }

    Init(data, year) {
        let models = [];
        selectorAll("input[type=checkbox]").forEach((e) => {
            if (e.checked == true)
                models.push(data.models.find(model => model.id == e.value));
        });

        if (models.length == 0) {
            selector("#chkParcialModel").checked = true;
            selector("#chkIntegralModel").checked = true
            models = data.models.filter(model => { return model.id === 1 || model.id === 2 })
        }

        let addressOrigin = selector("#txtOrigin").value;
        if (isNaN(parseFloat(addressOrigin))) {
            var cidade = selector("#selOriginCity").value;
            if (cidade !== "0") {
                const city = data.citys.find(city=> city.id == selector("#selOriginCity").value);
                addressOrigin += ', ' +  city.name + ', SP';
            }
        }
        this.addressOrigin = addressOrigin;

        let shift = selector('#selShift').value;
        let shifts = [];
        if (shift > 0)
            shifts = data.shifts.filter(t => { return t.id == shift });
        else
            shifts = data.shifts;

        models.forEach(model => {
            shifts.forEach(shift => {
                this.parameters.push({ "model_id": model.id, "shift_id": shift.id, "year_id": year });
            })
        })

    }
}