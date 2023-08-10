import { SchoolCloseTemplate } from './Template/schoolClose.js';
import { GetInformation } from '../Data.js';
export { SchoolClose };

class SchoolClose extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameters) {
        const wayVisions = parameters.wayVisions;
        const data = parameters.data;
        wayVisions.forEach((way, i) => {
            el = SchoolCloseTemplate(el, i);
            el.querySelector("#pills-" + i + " #txtDestinoResultado").value = way.school.endereco;
            el.querySelector("#pills-" + i + " #txtDistancia").value = way.distanceLong;
            el.querySelector("#pills-" + i + " #txtDestinoEscola").value = way.school.nome;
            el.querySelector("#pills-" + i + " #txtDestinoContato").value = way.school.contato;
            el.querySelector("#pills-" + i + " #txtTempo").value = way.time;
            el.querySelector("#pills-" + i + " #btnMap").addEventListener("click", (event) => {
                document.querySelector("#GenModal").style.display = "block";                
            })
            const informations = GetInformation(way.school, data);

            if (informations)
                informations.forEach(information => {
                    if (information) {
                        el.querySelector("#pills-" + i + " #txtInformacoes").value += information;
                    }
                })
            if (i == 0) {
                SchoolClose.FormatSelected(way, i);
                el.querySelector("#pills-" + i).classList.add("active");
                el.querySelector("#pills-" + i).classList.add("show");
            }
        })
        return el;
    }

    static FormatSelected = (way, i) => {
        if (way.school.selected) {
            let tab = el.querySelector("#pills-" + i + "-tab");
            const otherWays = waysVision.filter(wayVision => { return wayVision.school.selected == false });
            const longer = otherWays.filter((otherWay) => { return way.distance > otherWay.distance }).length > 0;
            tab.textContent += "  ";
            let el = document.createElement("i");
            tab.appendChild(el);
            el.classList.add("fa-regular");
            el.classList.add("fa-shake");
            if (longer) {
                el.classList.add("fa-thumbs-down");
            }
            else {
                el.classList.add("fa-thumbs-up");
            }
        }
    }
}