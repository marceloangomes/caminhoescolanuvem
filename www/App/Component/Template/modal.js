export { ModalTemplate };

const ModalTemplate = (el) => {
    el.innerHTML = `    
                        <!-- The Modal -->
                        <div id="GenModal" class="modal">

                            <!-- Modal content -->
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <p>Some text in the Modal..</p>
                            </div>
                        </div>`
    return el;
}