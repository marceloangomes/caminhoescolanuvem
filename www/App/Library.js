export { selector, selectorAll, Show, Hide, Sleep, AsyncForEach, ShowAlert, Collapse }

const selector = document.querySelector.bind(document);
const selectorAll = document.querySelectorAll.bind(document);

const Fade = (element, duration, clean) => {
    let opacity = clean ? 1 : 0;
    const alvoOpacidade = clean ? 0 : 1;
    const durationFrame = 10;
    const incrementFrame = durationFrame / duration;

    function animation() {
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
    animation();
};

const Show = async (sel, fade = false) => {
    let elements = selectorAll(sel);
    if (elements.length == 0)
        return;
    elements.forEach(element => {
        element.setAttribute('style', "display:flex;")
        if (fade)
            Fade(element, 5000, true);
    });
}

const Hide = (sel, fade = false) => {
    let elements = selectorAll(sel);
    if (elements.length == 0)
        return;
    if (fade)
        elements.forEach(element => Fade(element, 2000, false));
    elements.forEach(element => element.setAttribute('style', "display:none;"));
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
    Show('#alert', true);
    // setTimeout(function () {
    //     $("#alert").hide('fade');
    // }, 5000)
}

const Collapse = (el) => {
    el.classList.toggle("active");
    var content = el.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}
