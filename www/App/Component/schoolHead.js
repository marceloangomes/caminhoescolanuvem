import { SchoolHeadTemplate } from './Template/schoolHead.js';
export { SchoolHead };

class SchoolHead extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, wayVisions, indNeighbors) {
        const Format = (el, i, textContent) => {
            el = SchoolHeadTemplate(el, i);
            let elChild = el.querySelector('#pills');
            elChild.id += "-" + i + "-tab";
            elChild.href += "-" + i;
            elChild.setAttribute("aria-controls", "pills-" + i);
            elChild.textContent = textContent;
            if (i == 0)
                elChild.classList.add("active");
            else
                elChild.classList.remove("active");
            elChild.style.display = 'initial';
        }
        wayVisions.forEach((way, i) => {
            Format(el, i, way.school.nome);
        });
        if (indNeighbors > -1)
            Format(el, indNeighbors, 'Outras Diretorias de Ensino');
        return el;
    }
}

