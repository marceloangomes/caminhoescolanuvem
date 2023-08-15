import { selector, Hide, Collapse } from './Library.js'

export { AssociateEvents }
const AssociateEvents = (Update, data, components) => {
    selector(".btnCalculate").addEventListener("click", async () => {
        Update(data, components);
    });

    selector("#btnAlert").addEventListener("click", () => {
        Hide("#alert", true);
    });

    selector("#txtOrigin").addEventListener("keyup", (e) => {
        if (e.keyCode === 13)
            selector(".btnCalculate").dispatchEvent(new Event("click"));
    });

    selector('.card-header.collapsible').addEventListener("click", function (e) {
        Collapse(e.target);
    })

}