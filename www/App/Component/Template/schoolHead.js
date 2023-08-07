export { SchoolHeadTemplate };

class SchoolHeadTemplate extends HTMLElement {
  constructor() {
    this.innerHTML = `
                      <template>
                        <li class='nav-item'>
                          <a class='nav-link active' id='pills' data-toggle='pill' href='#pills' role='tab' aria-controls='pills'
                            aria-selected='true' style='display:none;'></a>
                        </li>
                      </template>
                    `;
  }
}