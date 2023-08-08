import { SchoolCloseTemplate } from './Template/schoolClose.js';
import { GetInformation } from '../Data.js';
export { SchoolClose };

class SchoolClose extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, ways) {        
        ways.forEach((way, i) => {
            el = SchoolCloseTemplate(el);
            el.querySelector("#pills");
            el.id += "-" + i;
            el.setAttribute("aria-labelledby", el.id + "-tab");
            el.querySelector("#txtDestinoResultado").value = parameter.way.school.endereco;
            el.querySelector("#txtDistancia").value = parameter.way.distanceLong;
            el.querySelector("#txtDestinoEscola").value = parameter.way.school.nome;
            el.querySelector("#txtDestinoContato").value = parameter.way.school.contato;
            el.querySelector("#txtTempo").value = parameter.way.time;
            const informations = GetInformation(parameter.way.school);

            if (informations)
                informations.forEach(information => {
                    if (information) {
                        el.querySelector("#txtInformacoes").value += information;
                    }
                })
            if (i == 0) {
                SchoolClose.FormatSelected(way, i);
                el.style.display = 'initial';
            }
            else
                el.style.display = 'none';
            return el;
        })
    }

    static FormatSelected = (way, i) => {
        if (way.school.selected) {
            let tab = el.querySelector("#pills-" + i + "-tab");
            const otherWays = parameter.waysVision.filter(wayVision => { return wayVision.school.selected == false });
            const longer = otherWays.filter((otherWay) => { return parameter.way.distance > otherWay.distance }).length > 0;
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