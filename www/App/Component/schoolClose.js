import { schoolClose } from './Template/schoolClose.js';

class SchoolClose extends HTMLElement {
    constructor() {
        super();
        this = schoolClose.content.cloneNode(true);
         container.querySelector("#pills");
        d += "-" + i;
            tribute("aria-labelledby", el.id + "-tab")
        ainer.querySelector("#txtDestinoResultado").value = d.school.endereco;
    container.querySelector("#txtDistancia").value = d.distanceLong;
        container.querySelector("#txtDestinoEscola").value = d.school.nome;
    cotainer.querySelector("#txtDestinoContato").value = d.school.contato;
        container.querySelector("#txtTempo").value = d.time;
        formations = d.school.junctionsId.map(juncaoId => {
            nction = data.junctions.filter(junction => { return junction.id == juncaoId })[0];
        t modelShift = data.modelShifts.filter(modelShift => { return modelShift.id_turno == junction.id_turno && modelShift.id_modelo == junction.id_modelo })[0];
            const shift = data.shifts.filter(shift => { return shift.id == junction.id_turno })[0];
    const model = data.models.filter(model => { return model.id == junction.id_modelo })[0];
    if (modelShift)
        return "Modelo: " + model.descricao + " Período: " + shift.descricao + " de: " + modelShift.horario.inicio.substring(0, 5) + " até " + modelShift.horario.fim.substring(0, 5) + "\n";
    return;
    
    
    informations)
    informations.forEach(information => {
        if (information) {
            container.querySelector("#txtInformacoes").value += information;
        }
    })
el.addEventListener('click', () => { UpdateMap(distanceCloses[i]) });
selector("#pills-tabContent").appendChild(el);
if (i == 0) {
      sel ector("#txtOrigemResultado").value = d.addressOrigin;
    d.addressDestiny += ' escola';
    FormatSelected(d, i);
    Show("#" + el.id);
}
else
    Hide("#" + el.id);




ements.define('schoolClose', SchoolClose);