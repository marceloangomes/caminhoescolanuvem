export { SchoolHeadTemplate };

const SchoolHeadTemplate = (el, i) => {
  let elChild = document.createElement('div');
  if (i == 0)
    el.innerHTML = `<div class="container container-nav"></div>`;
  elChild.innerHTML = `                      
                      <a class='nav' id='pills' data-toggle='pill' href='#pills' role='tab' aria-controls='pills'
                        aria-selected='true'></a>                                        
                `;
  el.querySelector('.container').appendChild(elChild.querySelector('a'));
  return el;
}

