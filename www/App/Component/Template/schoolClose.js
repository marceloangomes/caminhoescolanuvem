export {schoolClose};
const schoolClose =
<template id='schoolClose'>
    <div class='tab-pane fade' id='pills' role='tabpanel' aria-labelledby='pills-tab'>
      <div class='card' style='margin:10px'>
        <h5 class='card-title' style='margin-left:10px'>Destino</h5>
        <div class='card-body'>
          <form class='form-inline'>
            <div class='form-group col-lg-5 col-md-5 col-sm-12'>
              <label for='txtDestinoEscola' style='margin: 0px 10px 0px 10px'>Escola</label>
              <input name='escolaDestino' readonly='readonly' type='text' id='txtDestinoEscola'
                class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' value='' />
            </div>
  
            <div class='form-group col-lg-3 col-md-3 col-sm-12'>
              <label for='txtDestinoContato' style='margin: 0px 10px 0px 10px'>Contato</label>
              <input name='contatoDestino' readonly='readonly' type='text' id='txtDestinoContato'
                class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' value='' />
            </div>
  
            <div class='form-group col-lg-2 col-md-2 col-sm-12'>
              <label for='txtDistancia' style='margin: 0px 10px 0px 10px'>Dist&acirc;ncia</label>
              <input name='distancia' readonly='readonly' type='text' id='txtDistancia' value=''
                class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' />
            </div>
  
            <div class='form-group col-lg-2 col-lg-2 col-sm-12'>
              <label for='txtTempo' style='margin: 0px 10px 0px 10px;'>Tempo
                Caminhando</label>
              <input name='tempo' readonly='readonly' type='text' id='txtTempo' value=''
                class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' />
            </div>
  
            <div class='form-group col-lg-6 col-lg-6 col-sm-12'>
              <label for='txtDestinoResultado' style='margin: 0px 10px 0px 10px'>Endere&ccedil;o</label>
              <textarea name='resultadoDestino' readonly='readonly' type='text' id='txtDestinoResultado'
                class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' value=''
                rows='2'></textarea>
            </div>
  
            <div class='form-group col-lg-6 col-lg-6 col-sm-12'>
              <label for='txtInformacoes' style='margin: 0px 10px 0px 10px;'>Informações</label>
              <textarea name='informacao' readonly='readonly' type='text' id='txtInformacoes' value=''
                class='form-control form-control-sm' style='width:98%;margin:0px 10px 5px 10px;' rows='2'></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>;
  