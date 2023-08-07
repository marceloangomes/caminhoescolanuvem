import { SchoolHeadTemplate } from './Template/schoolHead.js';
export { SchoolHead }; 

class SchoolHead extends HTMLElement {
    constructor(textContent, i) {
        super();
        this.innerHTML = new SchoolHeadTemplate().content.cloneNode(true).querySelector("#pills");
        this.id += "-" + i + "-tab";
        this.href += "-" + i;
        this.setAttribute("aria-controls", "pills-" + i);
        this.textContent = textContent;
        if (i == 0)
            this.classList.add("active");
        this.style.display = '';
    }
}

