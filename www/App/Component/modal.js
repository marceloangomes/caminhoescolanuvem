import { ModalTemplate } from './Template/modal.js';
export { Modal };

class Modal extends HTMLElement {
    constructor() {
        super();
    }

    static Init(el, parameters) {
        el = ModalTemplate(el);        

        // Get the modal
        var modal = el.querySelector("#GenModal");

        // Get the <span> element that closes the modal
        var span = el.querySelector(".close");

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return el;
    }
}