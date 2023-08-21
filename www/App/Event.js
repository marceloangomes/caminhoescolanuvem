import { selector, Hide, Collapse } from './Library.js'

export { AssociateEvents }
const AssociateEvents = (Update, data, components) => {
    selector(".btn-calculate").addEventListener("click", async () => {
        Update(data, components);
    });

    selector("#btnAlert").addEventListener("click", () => {
        Hide("#alert", true);
    });

    selector("#txtOrigin").addEventListener("keyup", (e) => {
        if (e.keyCode === 13)
            selector(".btn-calculate").dispatchEvent(new Event("click"));
    });

    selector(".collapsible").addEventListener("click", (e) => {
        Collapse(e.target);
    })


}