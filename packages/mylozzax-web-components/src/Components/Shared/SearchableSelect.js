import { html, css, LitElement } from 'lit';
export class SearchableSelect extends LitElement {
  static get styles() {
    return css`
    /* Dropdown Button */
    .dropbtn {
      background-color: #04AA6D;
      color: white;
      padding: 16px;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
    
    /* The search field */
    input {
        display: block;
        width: calc(100% - 20px);
        box-sizing: border-box;      
        background-position: 14px 12px;
        background-repeat: no-repeat;
        font-size: 16px;
        margin: 12px 10px;
        padding: 6px 0px 6px 12px;
        min-width: 200px;
        border: 1px solid rgba(255,255,255, 0.5);
        background-color: rgb(29, 27, 29);
        border-radius: 3px;
        color: #ffffff;
    }
    
    /* The search field when it gets focus/clicked on */
    #myInput:focus {outline: 3px solid #ddd;}
    
    /* The container <div> - needed to position the dropdown content */
    .dropdown {
        background-color: rgb(29, 27, 29);
        position: relative;
        display: inline-block;
        color: #000000;
    }
    
    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        //display: none;
        position: absolute;
        background: rgb(56, 54, 56);
        //min-width: 230px;
        border: 1px solid #ddd;
        z-index: 1;
        height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .dropdown-content::-webkit-scrollbar {
        width: 10px;
    }

    .dropdown-content::-webkit-scrollbar-track {
        background: rgb(56, 54, 56);
    }
    .dropdown-content::-webkit-scrollbar-thumb {
        background: #f6f6f6;
    }

    /* Options inside the dropdown */
    .dropdown-content option {
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      background: rgb(56, 54, 56);
      color: white;
    }
    
    /* Change color of dropdown links on hover */
    

    /*  Consider the styles above generic styles. The following styles are custom to currency select. 
        TODO: consider refactoring these into a different file */
    .currencySelect {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: subpixel-antialiased;
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.5px;
        text-indent: 10px;
        color: rgb(223, 222, 223);
        background-color: rgba(80, 74, 80, 0.55);
        position: relative;
        left: 117.5px;
        width: 56px;
        height: 29.5px;
        border: 0px;
        padding: 0px;
        border-radius: 0px 4px 4px 0px;
        -webkit-appearance: none;
        top: 0px;
        right: 5px;
        left: auto;
        float: left;
        position: absolute;
        top: 0px;
        right: 0px;
        float: right;
    }
    .dropdown-content {
        top: 30px;
        float: right;
        right: 0px;
    }
    .dropdown {
        float: right;
        top: 0px;
        right: 5px;
    }
    `;
  }

    connectedCallback() {
        super.connectedCallback();
    }

    toggleElement() {
        this.showDropdown = !this.showDropdown;
    }

    filterSelect() {        
        let searchString = this.searchString.toUpperCase();
        let allValues = this.values;
        let filteredValues = [];
        for (let i = 0; i < allValues.length; i++) {
            let objValue = allValues[i].name;
            let tickerCode = allValues[i].ticker;
            if (objValue.toUpperCase().indexOf(searchString) > -1) {
                filteredValues.push(allValues[i])
            } else if (tickerCode.toUpperCase().indexOf(searchString) > -1) {
                filteredValues.push(allValues[i])
            }
        }
        this.filteredValues = filteredValues;
    }

    static get properties() {
        return {
            showDropdown: { type: Boolean },
            providerServices: { type: Array },
            service: { type: Object },
            searchString: { type: String, reflects: true },
            filteredValues: { type: Array },
            values: { type: Array },
            buttonText: { type: String }
        }
    }

//   clickHandler(event) {
//     console.log("Hi from clickhandler");  
//     console.log(event);
//     console.log(this);

//   }

    willUpdate(changedProperties) {
        if (changedProperties.get("values")?.length > 0) {
            //this.showDropdown = false;
            this.filteredValues = this.values;

        }
        this.filteredvalues = this.values;
    }

    connectedCallback() {
        super.connectedCallback();
        //this.allValues = [];
        this.filteredValues = this.values;
        console.log(this);
        this.addEventListener("input", this.handleInputEvent);
    }

    handleInputEvent(event) {
        this.filterSelect(event.value);
    }

    constructor() {
        super();
        this.showDropdown = false;
        this.searchString = "";
        this.buttonText = "---";
    }

  handleSelectionEvent(event) {
        let selectObject = this.selectedElement;
        // Chrome uses event.path while Firefox uses composedPath
        var eventPath = event.path || (event.composedPath && event.composedPath());
        let options = {
            detail: { 
                selectValue: eventPath[0].value,
                selectText: eventPath[0].innerText
            },
            bubbles: true,
            composed: true
        };
        let selectOptionUpdated = new CustomEvent("searchable-select-update", options)
        this.buttonText = eventPath[0].value;
        this.dispatchEvent(selectOptionUpdated, options)
        this.toggleElement();
    }

    updateSearchTextValue(event) {
        var eventPath = event.path || (event.composedPath && event.composedPath());
        this.searchString = eventPath[0].value;
        this.filterSelect();
    }

    render() {
        if (this.filteredValues.length > 0 && this.filteredValues[0].name !== "") {
            return html` 
            <div class="dropdown">
                <button @click=${this.toggleElement} class="dropbtn currencySelect">${this.buttonText}</button>
                <div id="dropdown" class="dropdown-content" ?hidden=${!this.showDropdown}>
                    <input type="text" placeholder="Search.." id="searchText" @input=${this.updateSearchTextValue} .value=${this.searchString}>
                    ${this.filteredValues.map((object) => {
                        return html`<option value="${object.ticker}" @click=${this.handleSelectionEvent}>${object.name} - ${object.ticker}</option>`
                    })}           
                </div>
            </div>`
        } else {
            return html` 
            <div class="dropdown">
                <button @click=${this.toggleElement} class="dropbtn currencySelect">${this.buttonText}</button>
                <div id="dropdown" class="dropdown-content" ?hidden=${!this.showDropdown}>
                    <input type="text" placeholder="Search.." id="searchText" @input=${this.updateSearchTextValue} .value=${this.searchString}>
                        <option>Loading</option>
                </div>
            </div>`
        }
    }
}

try {
    customElements.define('searchable-select', SearchableSelect);
} catch (error) {
    // already defined
}


