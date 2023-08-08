import { SchoolNeighborTemplate } from './Template/schoolNeighbor.js';
export { SchoolNeighbor };

class SchoolNeighbor extends HTMLElement {
    constructor() {
        super();

    }

    static Init(el, distances, i) {
        let neighbors = ""
        distances.forEach(distance => {
            neighbors += "Escola: " + distance.school.nome + " - DE: " + distance.school.de + "\n";
            neighbors += "   Distância: " + distance.distanceLong + "\n";
            neighbors += "   Endereço: " + distance.school.endereco + "\n";
            neighbors += "   Caminhando: " + distance.time + "\n";
        });

        if (neighbors.length > 0) {
            el.innerHTML = new SchoolNeighborTemplate.content.cloneNode(true).querySelector("#pills").outerHTML;
            el.id += "-" + i;
            el.setAttribute("aria-labelledby", el.id + "-tab")
            el.querySelector("#txtNeighbor").value = neighbors;
            el.style.display = '';
        }
    }
}

