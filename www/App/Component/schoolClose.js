import { SchoolCloseTemplate } from './Template/schoolClose.js';
import { GetInformation } from '../Data.js';
export { SchoolClose };

class SchoolClose extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, distancesVision, distance, i) {
        el.distance = distance;
        el.i = i;
        el.distancesVision = distancesVision;
        el.innerHTML = new SchoolCloseTemplate().content.cloneNode(true).outerHTML;
        const elChild = el.querySelector("#pills");
        elChild.id += "-" + i;
        elChild.attribute("aria-labelledby", elChild.id + "-tab");
        el.querySelector("#txtDestinoResultado").value = distance.school.endereco;
        el.querySelector("#txtDistancia").value = distance.distanceLong;
        el.querySelector("#txtDestinoEscola").value = distance.school.nome;
        el.querySelector("#txtDestinoContato").value = distance.school.contato;
        el.querySelector("#txtTempo").value = distance.time;
        const informations = GetInformation(distance.school);

        if (informations)
            informations.forEach(information => {
                if (information) {
                    el.querySelector("#txtInformacoes").value += information;
                }
            })
        if (i == 0) {
            FormatSelected();
            Show("#" + elChild.id);
        }
        else
            Hide("#" + elChild.id);
    }

    FormatSelected = () => {
        if (el.distance.school.selected) {
            let tab = el.querySelector("#pills-" + el.i + "-tab");
            const otherDistances = el.distancesVision.filter(distanceVision => { return distanceVision.school.selected == false });
            const maior = otherDistances.filter((otherDistance) => { return el.distance.distance > otherDistance.distance }).length > 0;
            tab.textContent += "  ";
            let el = document.createElement("i");
            tab.appendChild(el);
            el.classList.add("fa-regular");
            el.classList.add("fa-shake");
            if (maior) {
                el.classList.add("fa-thumbs-down");
            }
            else {
                el.classList.add("fa-thumbs-up");
            }
        }
    }
}