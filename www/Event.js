import {selector, Hide} from './Library.js'

export {AssociateEvents}
const AssociateEvents = async (Update, data) => {    
    selector(".btnCalcular").addEventListener("click", async () => {
        await Update(data);
    });

    selector("#btnAlert").addEventListener("click", () => {
        Hide("#alert", true);
    });

    selector("#txtOrigem").addEventListener("keyup", (e) => {
        if (e.keyCode === 13)
            selector(".btnCalcular").dispatchEvent(new Event("click"));
    });
}