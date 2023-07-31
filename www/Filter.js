export { CreateFilter }
import { selector, selectorAll } from './Library.js'
import { data } from './Data.js'

const CreateFilter = () => {
    let models = [];
    selectorAll("input[type=checkbox]").forEach((e) => {
        if (e.checked == true)
            models.push(e.value);
    });

    if (models.length == 0) {
        selector("#chkModeloParcial").checked = true;
        selector("#chkModeloIntegral").checked = true
        models = [1, 2];
    }

    var addressOrigin = selector("#txtOrigem").value;
    if (isNaN(parseFloat(addressOrigin))) {
        var cidade = selector("#selCidadeOrigem").value;
        if (cidade !== "Todas") {
            addressOrigin += ', ' + selector("#selCidadeOrigem").value + ', SP';
        }
    }

    let shift = selector('#selTurno').value;
    let shiftsT = [];
    if (shift > 0)
        shiftsT = data.shifts.filter(t => { return t.id == shift });
    else
        shiftsT = data.shifts;

    let filters = [];

    models.forEach(model => {
        shiftsT.forEach(shift => {
            filters.push({ "id_modelo": model, "id_turno": shift.id, "id_ano": year });
        })
    })
    return filters;
}