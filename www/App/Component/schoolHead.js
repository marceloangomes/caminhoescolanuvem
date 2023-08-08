import { SchoolHeadTemplate } from './Template/schoolHead.js';
export { SchoolHead };

class SchoolHead extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, textContent, i) {
        const schoolHeadTemplate = new SchoolHeadTemplate();
        el.innerHTML = schoolHeadTemplate.content.cloneNode(true).querySelector("#pills");
        el.id += "-" + i + "-tab";
        el.href += "-" + i;
        el.setAttribute("aria-controls", "pills-" + i);
        el.textContent = textContent;
        if (i == 0)
            el.classList.add("active");
        el.style.display = 'initial';
    }
}

