export { SchoolHeadTemplate };

const SchoolHeadTemplate = (el, i) => {
  let elChild = document.createElement('div');
  if (i == 0)
    el.innerHTML = `<div class="nav-pills-container"></div>`;
  elChild.innerHTML = `                      
                      <a class='nav-pills' id='pills' data-toggle='pill' href='#pills' role='tab' aria-controls='pills'
                        aria-selected='true' style='display:none;'></a>                                        
                `;
  el.querySelector('.nav-pills-container').appendChild(elChild.querySelector('a'));
  return el;
}

