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
            neighbors += "Escola: " + way.school.name + " - DE: " + way.school.de + "\n";
            neighbors += "   Distância: " + way.distanceLong + "\n";
            neighbors += "   Endereço: " + way.school.address + "\n";
            neighbors += "   Caminhando: " + way.time + "\n";
        });

        if (neighbors.length > 0) {
            el = SchoolNeighborTemplate(el, indNeighbors);
            let elChild = el.querySelector("#pills-" + indNeighbors);
            elChild.querySelector("#txtNeighbor").value = neighbors;
        }
        return el;
    }
}