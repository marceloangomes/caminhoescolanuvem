export { CreateFilter }
import { selector, selectorAll } from './App/Library.js'

class Filter{
    constructor(adressOrigin="", parameters=[]){
        this.adressOrigin=adressOrigin;
        this.parameters=parameters;
    }
};
let filter = new Filter();
const CreateFilter = (data, year) => {
    let models = [];
    selectorAll("input[type=checkbox]").forEach((e) => {
        if (e.checked == true)
            models.push(data.models.find(model=>model.id==e.value));
    });

    if (models.length == 0) {
        selector("#chkModeloParcial").checked = true;
        selector("#chkModeloIntegral").checked = true
        models = data.models.filter(model=>{return model.id in [1,2]})
    }

    let addressOrigin = selector("#txtOrigem").value;    
    if (isNaN(parseFloat(addressOrigin))) {
        var cidade = selector("#selCidadeOrigem").value;
        if (cidade !== "Todas") {
            addressOrigin += ', ' + selector("#selCidadeOrigem").value + ', SP';
        }
    }
    filter.addressOrigin = addressOrigin;

    let shift = selector('#selTurno').value;
    let shifts = [];
    if (shift > 0)
        shifts = data.shifts.filter(t => { return t.id == shift });
    else
        shifts = data.shifts;

    models.forEach(model => {
        shifts.forEach(shift => {
            filter.parameters.push({ "model_id": model.id, "shift_id": shift.id, "year_id": year });
        })
    })
    return filter;
}