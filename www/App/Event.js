import { selector, Hide } from './Library.js'

export { AssociateEvents }
const AssociateEvents = (Update, data, components) => {
    selector(".btnCalcular").addEventListener("click", async () => {
        Update(data, components);
    });

    selector("#btnAlert").addEventListener("click", () => {
        Hide("#alert", true);
    });

    selector("#txtOrigem").addEventListener("keyup", (e) => {
        if (e.keyCode === 13)
            selector(".btnCalcular").dispatchEvent(new Event("click"));
    });
}