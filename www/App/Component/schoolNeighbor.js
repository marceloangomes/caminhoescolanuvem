import { SchoolNeighborTemplate } from './Template/schoolNeighbor.js';
export { SchoolNeighbor };

class SchoolNeighbor extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameter) {
        let neighbors = ""
        parameter.ways.forEach(way => {
            neighbors += "Escola: " + way.school.nome + " - DE: " + way.school.de + "\n";
            neighbors += "   Distância: " + way.distanceLong + "\n";
            neighbors += "   Endereço: " + way.school.endereco + "\n";
            neighbors += "   Caminhando: " + way.time + "\n";
        });

        if (neighbors.length > 0) {
            el.innerHTML = SchoolNeighborTemplate(el).querySelector("#pills")
            el.id += "-" + parameter.i;
            el.setAttribute("aria-labelledby", el.id + "-tab")
            el.querySelector("#txtNeighbor").value = neighbors;
            el.style.display = '';
        }
    }
}

