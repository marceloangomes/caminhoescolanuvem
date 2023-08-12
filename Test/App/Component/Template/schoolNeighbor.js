export { SchoolNeighborTemplate }

const SchoolNeighborTemplate = (el, indNeighbors) => {
  let elChild = document.createElement('div');
  elChild.id = 'pills-' + indNeighbors;
  elChild.setAttribute('role', 'tabpanel');
  elChild.setAttribute('aria-labelledby', elChild.id + "-tab");
  elChild.classList.add('tab-pane');
  elChild.classList.add('fade');
  elChild.innerHTML = `                   
                  <div class="card" style="margin:5px;width:100%">
                    <h5 class="card-title" style="margin-left:10px">Outras Escolas</h5>
                    <div class="card-body" style="margin:5px;padding:10px;">
                      <form class="form-inline">
                        <div class="form-group col-12">
                          <textarea name="Neighbor" readonly="readonly" type="text" id="txtNeighbor" value=""
                            class="form-control form-control-sm" style="width:100%;" rows="8"></textarea>
                        </div>
                      </form>
                    </div>
                  </div>`;
  if (indNeighbors == 0) {
    elChild.classList.add('show');
    elChild.classList.add('active');
    el.innerHTML = `<div class="tab-content" id="pills-tabContent" style="width:100%"></div>`;
    el.querySelector('#pills-tabContent').appendChild(elChild);
  } else
    el.appendChild(elChild);
  return el;
}

