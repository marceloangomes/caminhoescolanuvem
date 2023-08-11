export { MapTemplate};

const MapTemplate = (el) => {
    el.innerHTML = `    
                        <div id="mapModal" class="modal">                            
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <div id="map" style="width:98%;height:98%;position:absolute;margin:10px 10px auto"></div>
                            </div>
                        </div>`                       
    return el;
}