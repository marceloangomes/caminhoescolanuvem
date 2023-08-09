export { SchoolHeadTemplate };

const SchoolHeadTemplate = (el,i) => {
  let elChild = document.createElement('div');
  if(i==0)
    el.innerHTML = `<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist"></ul>`;
  elChild.innerHTML = `    
                  <li class='nav-item'>
                    <a class='nav-link' id='pills' data-toggle='pill' href='#pills' role='tab' aria-controls='pills'
                      aria-selected='true' style='display:none;'></a>
                  </li>                     
                `;
  el.querySelector('ul').appendChild(elChild.querySelector('li'));
  return el;
}

