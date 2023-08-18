import { SchoolHeadTemplate } from './Template/schoolHead.js';
export { SchoolHead };

class SchoolHead extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameters) {
        const wayVisions = parameters.wayVisions;
        const indNeighbors = parameters.indNeighbors;
        wayVisions.forEach((way, i) => {
            this.Fill(el, i, way.school.name);
            if (way.school.selected) {
                const otherWays = wayVisions.filter(wayVision => { return wayVision.school.selected == false });
                const longer = otherWays.find(otherWay => way.distance > otherWay.distance) ? true : false;
                this.FormatSelected(el, i, longer);
            }
        });
        if (indNeighbors > -1)
            this.Fill(el, indNeighbors, 'Outras Diretorias de Ensino');
        return el;
    }

    static Fill = (el, i, textContent) => {
        el = SchoolHeadTemplate(el, i);
        let elChild = el.querySelector('#pills');
        elChild.id += "-" + i + "-tab";
        elChild.href = "#pills-" + i;
        elChild.setAttribute("aria-controls", "pills-" + i);
        elChild.textContent = textContent;
        if (i == 0) {
            elChild.classList.add("active")
            elChild.classList.add("show");
        }
        elChild.style.display = 'initial';
        elChild.addEventListener("click",(ev)=>{  
            const el = document.querySelector(".nav-pills.active.show");
            el.classList.toggle("active");            
            el.classList.toggle("show");      
            ev.target.classList.toggle("active");
            ev.target.classList.toggle("show");
        });
    }

    static FormatSelected = (el, i, longer) => {
        let tab = el.querySelector("#pills-" + i + "-tab");
        tab.textContent += "  ";
        let elAnimation = document.createElement("i");
        tab.appendChild(elAnimation);
        elAnimation.classList.add("fa-regular");
        elAnimation.classList.add("fa-shake");
        if (longer)
            elAnimation.classList.add("fa-thumbs-down");
        else
            elAnimation.classList.add("fa-thumbs-up");
    }
}

