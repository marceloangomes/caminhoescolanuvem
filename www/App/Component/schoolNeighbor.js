import { SchoolNeighborTemplate } from './Template/schoolNeighbor.js';
export { SchoolNeighbor };

class SchoolNeighbor extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameters) {
        const wayNeighbors = parameters.wayNeighbors;
        const indNeighbors = parameters.indNeighbors; 
        let neighbors = ""
        wayNeighbors.forEach(way => {
            neighbors += "Escola: " + way.school.nome + " - DE: " + way.school.de + "\n";
            neighbors += "   Distância: " + way.distanceLong + "\n";
            neighbors += "   Endereço: " + way.school.endereco + "\n";
            neighbors += "   Caminhando: " + way.time + "\n";
        });

        if (neighbors.length > 0) {
            el = SchoolNeighborTemplate(el);
            let elChild = el.querySelector("#pills");
            elChild.id += "-" + indNeighbors;
            elChild.setAttribute("aria-labelledby", el.id + "-tab");
            elChild.querySelector("#txtNeighbor").value = neighbors;
            elChild.style.display = 'initial';
        }
        return el;
    }
}