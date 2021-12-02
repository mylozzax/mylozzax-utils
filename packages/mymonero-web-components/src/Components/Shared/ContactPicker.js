import { html, css, LitElement } from 'lit';
import {classMap} from 'lit/directives/class-map.js';

export class MyMoneroContactPicker extends LitElement {
  static get styles() {
    return css`
    * {
        margin: 0px;
        padding: 0px;
    }

    [hidden] { display: none !important; }

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
        margin: 1px;
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
        position: relative;
        display: inline-block;
        color: #000000;
        border-radius: 4px;
    }
    
    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        //display: none;
        width: 100%;
        background: rgb(56, 54, 56);
        top: 30px;
        width: 100%;
        max-height: 155px;
        background-color: rgb(252, 251, 252);
        border-radius: 3px;
        box-shadow: rgb(0 0 0 / 22%) 0px 15px 12px 0px, rgb(0 0 0 / 30%) 0px 19px 38px 0px;
        overflow-y: auto;
        z-index: 10000;
        //min-width: 230px;
        z-index: 1;
        height: auto;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .dropdown-content::-webkit-scrollbar {
        width: 10px;
    }

    .dropdown-content::-webkit-scrollbar-track {
        background: rgb(252, 251, 252);
    }
    .dropdown-content::-webkit-scrollbar-thumb {
        background: #f6f6f6;
    }

    /* Options inside the dropdown */
    .dropdown-content .row{
    //   padding: 12px 16px;
    //   text-decoration: none;
    //   display: block;
    //   background: rgb(56, 54, 56);
    //   color: white;
      position: relative; left: 0px; box-sizing: border-box; padding: 0px 15px; width: 100%; height: 31px; color: rgb(29, 27, 29); font-size: 13px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 31px; user-select: none; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
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
    .dropdown {
        position: relative;
        width: 100%;
        user-select: none;
    }
    .contact-wrapper {
        box-sizing: border-box; position: relative; max-width: 274px; padding: 3px 38px 5px 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background-color: rgb(56, 54, 56); box-shadow: rgb(73, 71, 73) 0px 0.5px 0px 0px inset; border-radius: 3px; display: inline-block; cursor: default; font-size: 13px; font-weight: 300; font-family: Native-Regular, input, menlo, monospace; color: rgb(252, 251, 252);
    }

    #searchText {
        display: block;
        height: 29px;
        width: calc((100% - 2px) - 14px);
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0);
        text-align: left;
        font-size: 13px;
        font-weight: 200;
        padding: 0px 7px;
        font-family: Native-Light, input, menlo, monospace;
        outline: none;
        box-shadow: rgb(22 20 22) 0px 0.5px 0px 0px inset;
        color: rgb(223, 222, 223);
        background-color: rgb(29, 27, 29);
    }
    .close-button {
        display: block; position: absolute; right: 0px; top: 0px; width: 34px; height: 100%; background-image: url('../../assets/img/contactPicker_xBtnIcn@3x.png'); background-size: 11px 10px; background-position: center center; background-repeat: no-repeat; cursor: pointer;
    }
    #dropdown-results {
        top: 30px; 
        width: 100%; 
        height: 100%;
        max-height: 200px; 
        min-height: 30px; 
        background-color: rgb(252, 251, 252); 
        border-radius: 3px; 
        box-shadow: rgba(0, 0, 0, 0.22) 0px 15px 12px 0px, rgba(0, 0, 0, 0.3) 0px 19px 38px 0px; 
        overflow-y: auto; 
        z-index: 10000;
    }
    `;
  }

    connectedCallback() {
        super.connectedCallback();
        console.log(this.context);
    }


    toggleElement() {
        this.showDropdown = !this.showDropdown;
    }

    showElement() {
        this.showDropdown = true;
    }

    hideElement() {
        this.showDropdown = false;
    }

    showPickedContact() {
        this.hasPickedContact = true;
    }

    hidePickedContact() {
        this.hasPickedContact = false;
    }

    async filterSelect() {        
        let searchString = this.searchString.toUpperCase();
        let contacts = this.contacts;
        let filteredContacts = [];
        let hasResults = false;
        for (let i = 0; i < contacts.length; i++) {
            let objValue = contacts[i].fullname;
            if (objValue.toUpperCase().indexOf(searchString) > -1) {
                let test = objValue.toUpperCase();
                filteredContacts.push(contacts[i])
            }
        }
        if (filteredContacts.length > 0) {
            hasResults = true;
        }
        this.filteredContacts = filteredContacts;
        this.render();
        return hasResults;
    }

    static get properties() {
        return {
            showDropdown: { type: Boolean },
            hasPickedContact: { type: Boolean },
            pickedContactIndex: { type: Number },
            searchString: { type: String, reflects: true },
            filteredContacts: { type: Array },
            contacts: { 
                type: Array
            },
            buttonText: { type: String }
        }
    }

    willUpdate(changedProperties) {
        // if (changedProperties.get("values")?.length > 0) {
        //     this.filteredContacts = this.contacts;
        // }
        // this.filteredContacts = this.contacts;
    }

    connectedCallback() {
        super.connectedCallback();
        console.log(this);
        console.log(this.contacts);
        this.filteredContacts = this.contacts;
        //this.addEventListener("input", this.handleInputEvent);
    }

    handleInputEvent(event) {
        //this.filterSelect(event.value);
    }

    constructor() {
        super();
        this.showDropdown = false;
        this.searchString = "";
        this.hasPickedContact = false;
    }

    handleSelectionEvent(event) {
        console.log(event);
        // Chrome uses event.path while Firefox uses composedPath
        var eventPath = event.path || (event.composedPath && event.composedPath());
        let element = eventPath[0];
        console.log(element);
        let contactIndex = element.dataset.index;
        console.log(this.contacts[contactIndex]);
        // The way the system is written, contacts have a property "persistencePassword". 
        // For security reasons, we don't want to pass that property around as part of an event
        let options = {
            detail: { 
                contactIndex
            },
            bubbles: true,
            composed: true
        };
        let selectOptionUpdated = new CustomEvent("mym-contact-picker-update", options)
        this.buttonText = eventPath[0].value;
        this.pickedContactIndex = contactIndex;
        this.hasPickedContact = true;
        this.dispatchEvent(selectOptionUpdated, options)
        this.hideElement();
    }

    async updateSearchTextValue(event) {
        //console.log("UpdateSTV");
        var eventPath = event.path || (event.composedPath && event.composedPath());
        this.searchString = eventPath[0].value;
        let hasResults = await this.filterSelect();
        if (hasResults === true) {
            this.showElement();
        }
        let options = {
            detail: { 
                contactPickerInput: this.searchString
            },
            bubbles: true,
            composed: true
        };
        let addressFieldUpdated = new CustomEvent("mym-contact-picker-input-updated", options)
        this.dispatchEvent(addressFieldUpdated, options);
    }

    render() {
        
        // Render the contacts dropdown based on search text
        // if (this.filteredContacts.length > 0 && this.filteredContacts[0].name !== "") {
            const contactTemplates = [];
            let contactIndex = 0;
            let showDropdownResults = false;
            for (const contactObj of this.filteredContacts) {                        
                let template = html`
                        <div class="row" @click=${this.handleSelectionEvent} data-index="${contactIndex}">
                            <span class="emojione emojione-32-people _1f600">${contactObj.emoji}</span>&nbsp;
                            <span class="title withNonNativeEmoji">${contactObj.fullname}</span>
                            <div style="position: absolute; left: 50px; right: 0px; height: 1px; top: 30px; background-color: rgb(223, 222, 223);">

                            </div>
                        </div>`
                contactTemplates.push(template)
                contactIndex++;
                showDropdownResults = true;
            }

            return html` 
                <div class="dropdown">
                    <input 
                        type="text" 
                        placeholder="Contact name, address/domain, or Yat address" 
                        id="searchText" 
                        @input=${this.updateSearchTextValue} 
                        .value=${this.searchString}
                        ?hidden=${this.hasPickedContact}
                        >
                    <div id="dropdown" class="dropdown-content" ?hidden=${!this.showDropdown}>
                        <div id="dropdown-results" ?hidden=${!showDropdownResults}>
                            ${contactTemplates}
                        </div>
                    </div>
                    ${
                        this.hasPickedContact 
                        ? html`

                            <div class="picked-contact" ?hidden=${!this.hasPickedContact}>
                                <div class="contact-wrapper">
                                    <span class="contact-emoji">${this.contacts[this.pickedContactIndex].emoji}</span>
                                    &nbsp;
                                    <span class="contact-title">${this.contacts[this.pickedContactIndex].fullname}</span>
                                    <a class="close-button" @click=${this.deselectContact}></a>
                                </div>
                            </div>`
                            : ''
                    }
                </div>`
        // } else {
        //     return html` 
        //     <div class="dropdown">
        //         <input type="text" placeholder="Contact name, address/domain, or Yat address" id="searchText" @input=${this.updateSearchTextValue} .value=${this.searchString}>
        //         <div id="dropdown" class="dropdown-content" ?hidden=${!this.showDropdown}>
                
        //         </div>
        //     </div>`
        // }
    }
    deselectContact() {
        console.log("Deselect");
        this.contactIndex = null;
        this.hasPickedContact = false;
    }
}

customElements.define('mym-contact-picker', MyMoneroContactPicker);


