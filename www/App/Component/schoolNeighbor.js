import { schoolNeighbor } from './Template/schoolNeighbor.js';

class SchoolNeighbor extends HTMLElement {
    constructor(neighbors, i) {
        super();
        
        this = schoolNeighbor.content.cloneNode(true).querySelector("#pills");        
        this.id += "-" + i;
        this.setAttribute("aria-labelledby", this.id + "-tab")
        this.querySelector("#txtNeighbor").value = neighbors;
        this.style.display='';
    }
}

