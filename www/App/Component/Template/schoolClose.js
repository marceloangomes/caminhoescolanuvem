export { SchoolCloseTemplate };
const SchoolCloseTemplate = (el, i) => {
  if (i == 0)
    el.innerHTML = `<div class="tab-content" id="pills-tabContent" style="width:100%"></div>`;
  let elChild = document.createElement('div');
  elChild.id = 'pills-' + i;
  elChild.setAttribute('role', 'tabpanel');
  elChild.setAttribute('aria-labelledby', elChild.id + "-tab");
  elChild.classList.add('tab-pane');
  elChild.classList.add('fade');
  elChild.innerHTML = `              
  <div class='card' style='margin:10px'>
  <h5 class='card-title' style='margin-left:10px'>Destino</h5>
  <div class='card-body'>
      <div class='container container-address-response'>
          <div class='container-item'>
              <label for='txtDestinoEscola' style='margin: 0px 10px 0px 10px'>Escola</label>
              <input name='escolaDestino' readonly='readonly' type='text' id='txtDestinoEscola'
                  class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' value='' />
          </div>

          <div class='container-item'>
              <label for='txtDestinoContato' style='margin: 0px 10px 0px 10px'>Contato</label>
              <input name='contatoDestino' readonly='readonly' type='text' id='txtDestinoContato'
                  class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' value='' />
          </div>

          <div class='container-item'>
              <label for='txtDistancia' style='margin: 0px 10px 0px 10px'>Dist&acirc;ncia</label>
              <input name='distancia' readonly='readonly' type='text' id='txtDistancia' value=''
                  class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' />
          </div>

          <div class='container-item'>
              <label for='txtTempo' style='margin: 0px 10px 0px 10px;'>Tempo
                  Caminhando</label>
              <input name='tempo' readonly='readonly' type='text' id='txtTempo' value=''
                  class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' />
          </div>

          <div class="container-item">
              <button id='btnMap' type='button'><i class="fa-sharp fa-solid fa-location-dot"
                      style="font-size: xx-large;"></i></button>
          </div>

          <div class='container-item'>
              <label for='txtDestinoResultado' style='margin: 0px 10px 0px 10px'>Endere&ccedil;o</label>
              <textarea name='resultadoDestino' readonly='readonly' type='text' id='txtDestinoResultado'
                  class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' value=''
                  rows='2'></textarea>
          </div>

          <div class='container-item'>
              <label for='txtInformacoes' style='margin: 0px 10px 0px 10px;'>Informações</label>
              <textarea name='informacao' readonly='readonly' type='text' id='txtInformacoes' value=''
                  class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;'
                  rows='2'></textarea>
          </div>
      </div>
  </div>
</div>`;
  el.querySelector('#pills-tabContent').appendChild(elChild);
  return el;
}
