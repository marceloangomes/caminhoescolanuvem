export { SchoolHeadTemplate };

const SchoolHeadTemplate = (el)=>{
    el.innerHTML = `    
                      <li class='nav-item'>
                        <a class='nav-link active' id='pills' data-toggle='pill' href='#pills' role='tab' aria-controls='pills'
                          aria-selected='true' style='display:none;'></a>
                      </li>                     
                    `;
    return el.cloneNode(true).querySelector("li");    
  } 

