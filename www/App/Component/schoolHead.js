import { SchoolHeadTemplate } from './Template/schoolHead.js';
export { SchoolHead };

class SchoolHead extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameters) {
        const wayVisions=parameters.wayVisions;
        const indNeighbors = parameters.indNeighbors;
        const Fill = (el, i, textContent) => {
            el = SchoolHeadTemplate(el, i);
            let elChild = el.querySelector('#pills');
            elChild.id += "-" + i + "-tab";
            elChild.href += "-" + i;
            elChild.setAttribute("aria-controls", "pills-" + i);
            elChild.textContent = textContent;
            if (i == 0){
                elChild.classList.add("active")
                elChild.classList.add("show");       
            }     
            elChild.style.display = 'initial';
        }
        wayVisions.forEach((way, i) => {
            Fill(el, i, way.school.nome);
        });
        if (indNeighbors > -1)
            Fill(el, indNeighbors, 'Outras Diretorias de Ensino');
        return el;
    }
}

