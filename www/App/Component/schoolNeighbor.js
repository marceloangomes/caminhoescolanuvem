import { schoolNeighbor } from './Template/schoolNeighbor.js';

class SchoolNeighbor extends HTMLElement {
    constructor(distances, i) {
        super();
        let neighbors = ""
        distances.forEach(distance => {
            neighbors += "Escola: " + distance.school.nome + " - DE: " + distance.school.de + "\n";
            neighbors += "   Distância: " + distance.distanceLong + "\n";
            neighbors += "   Endereço: " + distance.school.endereco + "\n";
            neighbors += "   Caminhando: " + distance.time + "\n";
        });

        if (neighbors.length > 0) {
            this = schoolNeighbor.content.cloneNode(true).querySelector("#pills");
            this.id += "-" + i;
            this.setAttribute("aria-labelledby", this.id + "-tab")
            this.querySelector("#txtNeighbor").value = neighbors;
            this.style.display = '';
        }
    }
}

