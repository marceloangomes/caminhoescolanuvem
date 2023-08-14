import { SchoolCloseTemplate } from './Template/schoolClose.js';
export { SchoolClose };

class SchoolClose extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameters) {
        const wayVisions = parameters.wayVisions;
        const data = parameters.data;
        const componentMap = parameters.componentMap;
        wayVisions.forEach((way, i) => {
            el = SchoolCloseTemplate(el, i);
            el.querySelector("#pills-" + i + " #txtDestinoResultado").value = way.school.address;
            el.querySelector("#pills-" + i + " #txtDistancia").value = way.distanceLong;
            el.querySelector("#pills-" + i + " #txtDestinoEscola").value = way.school.name;
            el.querySelector("#pills-" + i + " #txtDestinoContato").value = way.school.contact;
            el.querySelector("#pills-" + i + " #txtTempo").value = way.time;
            el.querySelector("#pills-" + i + " #btnMap").addEventListener("click", (ev) => {
                const frm = ev.target.parentElement.parentElement.parentElement;
                frm.appendChild(componentMap.Init({ 'locationOrigin': way.locationOrigin, 'locationDestiny': way.locationDestiny }));
                frm.querySelector('#mapModal').style.display = "block";
            })
            const informations = data.GetInformation(way.school);

            if (informations)
                informations.forEach(information => {
                    if (information) {
                        el.querySelector("#pills-" + i + " #txtInformacoes").value += information;
                    }
                })
            if (i == 0) {                
                el.querySelector("#pills-" + i).classList.add("active");
                el.querySelector("#pills-" + i).classList.add("show");
            }
        })
        return el;
    }

   
}