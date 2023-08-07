import { SchoolCloseTemplate } from './Template/schoolClose.js';
import { GetInformation } from '../Data.js';
export {SchoolClose};

class SchoolClose extends HTMLElement {
    constructor(distancesVision, distance, i) {
        super();
        this.distance=distance;
        this.i=i;
        this.distancesVision=distancesVision;
        this.innerHTML = new SchoolCloseTemplate().content.cloneNode(true);
        const el = this.querySelector("#pills");
        el.id += "-" + i;
        el.attribute("aria-labelledby", el.id + "-tab");
        this.querySelector("#txtDestinoResultado").value = distance.school.endereco;
        this.querySelector("#txtDistancia").value = distance.distanceLong;
        this.querySelector("#txtDestinoEscola").value = distance.school.nome;
        this.querySelector("#txtDestinoContato").value = distance.school.contato;
        this.querySelector("#txtTempo").value = distance.time;
        const informations = GetInformation(distance.school);

        if (informations)
            informations.forEach(information => {
                if (information) {
                    this.querySelector("#txtInformacoes").value += information;
                }
            })                
        if (i == 0) {            
            FormatSelected();
            Show("#" + el.id);
        }
        else
            Hide("#" + el.id);
    }

    FormatSelected = () => {
        if (this.distance.school.selected) {
            let tab = this.querySelector("#pills-" + this.i + "-tab");
            const otherDistances = this.distancesVision.filter(distanceVision => { return distanceVision.school.selected == false });
            const maior = otherDistances.filter((otherDistance) => { return this.distance.distance > otherDistance.distance }).length > 0;
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