export { selector, selectorAll, Show, Hide, Sleep, AsyncForEach, ShowAlert, AlternNav, RemoveAutoComplete, Collapse }

const selector = document.querySelector.bind(document);
const selectorAll = document.querySelectorAll.bind(document);

const Fade = async (element, duration, clean) => {
    let opacity = clean ? 1 : 0;
    const alvoOpacidade = clean ? 0 : 1;
    const durationFrame = 10;
    const incrementFrame = durationFrame / duration;

    async function animation() {
        if (alvoOpacidade == 0)
            if (opacity > alvoOpacidade) {
                opacity -= incrementFrame;
                element.style.opacity = opacity;
                requestAnimationFrame(animation);
            } else
                element.style.opacity = alvoOpacidade;
        else
            if (opacity < alvoOpacidade) {
                opacity += incrementFrame;
                element.style.opacity = opacity;
                requestAnimationFrame(animation);
            } else
                element.style.opacity = alvoOpacidade;
    }
    await animation();
};

const Show = async (sel, fade = false, timeWait = 0) => {
    let elements = selectorAll(sel);
    if (elements.length == 0)
        return;
    elements.forEach(element => {
        element.classList.remove('hide');
        if (fade)
            Fade(element, timeWait - 1000, true);
    });
    if (timeWait > 0)
        await Sleep(timeWait);
}

const Hide = (sel, fade = false) => {
    let elements = selectorAll(sel);
    if (elements.length == 0)
        return;
    if (fade)
        AsyncForEach(elements, (element) =>
            Fade(element, 2000, false))
            .then((element) => {
                element.classList.add('hide')
            });
    else
        elements.forEach(element => element.classList.add('hide'));
}

const Sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const AsyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const ShowAlert = (m) => {
    Hide("#wait");
    selector('#messageAlert').innerHTML = m;
    selector('#txtOrigin').focus();
    Show('#alert', true, 5000)
        .then(() => Hide('#alert'));
}

const AlternNav = (el) => {
    const elActive = Array.from(el.parentElement.children)
        .find(el => el.classList.contains("active"));
    if (elActive) {
        elActive.classList.toggle("active");
        selector(`#${elActive.getAttribute("aria-controls")}`).classList.add("hide");
    }
    el.classList.toggle("active");
    selector(`#${el.getAttribute("aria-controls")}`).classList.remove("hide");
}

const Collapse = (el) => {
    el.classList.toggle("active");
    var content = el.nextElementSibling;
    if (content.classList.contains('hide') ) {
      content.classList.remove('hide')
    } else {
      content.classList.add('hide');
    }
}

const RemoveAutoComplete = (el) => {
    el.querySelectorAll("textarea[type='text'],input[type='text']")
        .forEach(el => el.setAttribute('autocomplete', 'off'));
}