import { SchoolHeadTemplate } from './Template/schoolHead.js';
export { SchoolHead };

class SchoolHead extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameter) {
        el = SchoolHeadTemplate(el);
        let elChild = el.querySelector('a');
        elChild.id += "-" + parameter.i + "-tab";
        elChild.href += "-" + parameter.i;
        elChild.setAttribute("aria-controls", "pills-" + parameter.i);
        elChild.textContent = parameter.textContent;
        if (parameter.i == 0)
            elChild.classList.add("active");
        elChild.style.display = 'initial';
        return el;
    }
}

