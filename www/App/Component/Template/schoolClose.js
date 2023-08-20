export { SchoolCloseTemplate };
const SchoolCloseTemplate = (el, i) => {
    if (i == 0)
        el.innerHTML = `<div class="tab-content" id="pills-tabContent"></div>`;
    let elChild = document.createElement('div');
    elChild.id = 'pills-' + i;
    elChild.setAttribute('role', 'tabpanel');
    elChild.setAttribute('aria-labelledby', elChild.id + "-tab");
    elChild.classList.add('tab-pane');
    elChild.classList.add('fade');
    elChild.classList.add('hide');
    elChild.innerHTML = `              
    <div class='card'>
    <h5 class='card-title' '>Destino</h5>
    <div class='card-body'>
        <div class='container container-school-close1'>
            <div class='container-item'>
                <label for='txtDestinoEscola' >Escola</label>
                <input name='escolaDestino' readonly='readonly' type='text' id='txtDestinoEscola' value='' />
            </div>

            <div class='container-item'>
                <label for='txtDestinoContato' >Contato</label>
                <input name='contatoDestino' readonly='readonly' type='text' id='txtDestinoContato' value='' />
            </div>

            <div class='container-item'>
                <label for='txtDistancia' >Dist&acirc;ncia</label>
                <input name='distancia' readonly='readonly' type='text' id='txtDistancia' value=''
                     />
            </div>

            <div class='container-item'>
                <label for='txtTempo' '>Tempo
                    Caminhando</label>
                <input name='tempo' readonly='readonly' type='text' id='txtTempo' value=''
                     />
            </div>

            <div class="container-item center">
                <button id='btnMap' type='button'><i class="fa-sharp fa-solid fa-location-dot"></i></button>
            </div>
        </div>
        <div class='container container-school-close2'>

            <div class='container-item'>
                <label for='txtDestinoResultado' >Endere&ccedil;o</label>
                <textarea name='resultadoDestino' readonly='readonly' type='text' id='txtDestinoResultado'
                     value=''
                    rows='2'></textarea>
            </div>

            <div class='container-item'>
                <label for='txtInformacoes'>Informações</label>
                <textarea name='informacao' readonly='readonly' type='text' id='txtInformacoes' value='' rows='2'></textarea>
            </div>
        </div>
    </div>
</div>`;
    el.querySelector('#pills-tabContent').appendChild(elChild);
    return el;
}
