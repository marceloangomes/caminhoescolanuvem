import { SchoolCloseTemplate } from './Template/schoolClose.js';
import { GetInformation } from '../Data.js';
export { SchoolClose };

class SchoolClose extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, ways) {
        ways.forEach((way, i) => {
            el = SchoolCloseTemplate(el, i);
            el.querySelector("#pills-" + i + " #txtDestinoResultado").value = way.school.endereco;
            el.querySelector("#pills-" + i + " #txtDistancia").value = way.distanceLong;
            el.querySelector("#pills-" + i + " #txtDestinoEscola").value = way.school.nome;
            el.querySelector("#pills-" + i + " #txtDestinoContato").value = way.school.contato;
            el.querySelector("#pills-" + i + " #txtTempo").value = way.time;
            const informations = GetInformation(way.school);

            if (informations)
                informations.forEach(information => {
                    if (information) {
                        el.querySelector("#pills-" + i + " #txtInformacoes").value += information;
                    }
                })
            if (i == 0) {
                SchoolClose.FormatSelected(way, i);
                el.querySelector("#pills-" + i).style.display = 'initial';
            }
            else
                el.querySelector("#pills-" + i).style.display = 'none';            
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