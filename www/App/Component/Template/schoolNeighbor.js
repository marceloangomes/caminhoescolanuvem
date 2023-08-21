export { SchoolNeighborTemplate }

const SchoolNeighborTemplate = (el, indNeighbors) => {
  let elChild = document.createElement('div');
  elChild.id = 'pills-' + indNeighbors;
  elChild.setAttribute('role', 'tabpanel');
  elChild.setAttribute('aria-labelledby', elChild.id + "-tab");
  elChild.classList.add('tab-pane');
  elChild.classList.add('fade');
  elChild.innerHTML = `                   
                  <div class="card">
                    <h5 class="card-title">Outras Escolas</h5>
                    <div class="card-body">
                      <form class="form-inline">
                        <div >
                          <textarea name="Neighbor" readonly="readonly" type="text" id="txtNeighbor" value=""
                             rows="8"></textarea>
                        </div>
                      </form>
                    </div>
                  </div>`;
  if (indNeighbors == 0) {    
    elChild.classList.add('active');
    el.innerHTML = `<div class="tab-content" id="pills-tabContent" style="width:100%"></div>`;
    el.querySelector('#pills-tabContent').appendChild(elChild);
  } else{
    el.appendChild(elChild)
    elChild.classList.add('hide');
  }
  return el;
}

