export { MapTemplate };

const MapTemplate = (el) => {
    el.innerHTML = `    
                        <div id="mapModal" class="modal">                            
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <div id="map"></div>
                            </div>
                        </div>`
    return el;
}