export { SchoolNeighborTemplate }

const SchoolNeighborTemplate = (el)=> {
  el.innerHTML =`
        <div class="tab-pane fade" id="pills" role="tabpanel" aria-labelledby="pills" style="width:100%">
          <div class="container">
            <div class="card" style="margin:10px;width:100%">
              <h5 class="card-title" style="margin-left:10px">Outras Escolas</h5>
              <div class="card-body">
                <form class="form-inline">
                  <div class="form-group col-12">
                    <textarea name="Neighbor" readonly="readonly" type="text" id="txtNeighbor" value=""
                      class="form-control form-control-sm" style="width:100%;margin:0px 10px 5px 10px;" rows="20"></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>`;
  }

