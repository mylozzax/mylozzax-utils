import { html, css, LitElement } from 'lit';
import { ClassMap } from 'lit/directives/class-map.js';
import AuthenticationController from "../Controllers/AuthenticationController";


export default class AuthenticationView extends AuthenticationController(LitElement) {
    static get styles() {
        return css`
            :host {
                position: fixed;
                background-color: rgb(39, 37, 39);
                top: 0px;
                left: 0px;
                height: 100%;
                width: 100%;
                display: block;
                overflow: hidden;
                transition: all 1s ease 0s;
                transform: translateY(110%); // we want this to slide in when an event fires
            }
            :host(.display) {
                position: fixed;
                background-color: rgb(39, 37, 39);
                top: 0px;
                left: 0px;
                height: 100%;
                width: 100%;
                display: block;
                transition: all 1s ease 0s;
                z-index: 100 !important;
                transform: translateY(0%); // we want this to slide in when an event fires
            }
            .displayPasswordScreen {
                transition: 0.5s;
                transform: translateY(0%) !important;
                z-index: 50
            }
            
            .authentication-wrapper {
                transition: all 0.5s ease 0s;
                color: white;
                text-align: center;
                height: auto;
                z-index: 2147483647;
                align-items: center;
                flex-direction: column;
                align-content: center;
                z-index: 100;
                align-content: center;
                justify-content: center;
            }

            .authentication-title {
                user-select: none;
                display: inline-block;
                margin: 0px 0px 8px 8px;
                text-align: left;
                color: rgb(248, 247, 248);
                font-family: Native-Regular, input, menlo, monospace;
                font-size: 11px;
                font-weight: lighter;
                width: auto;
                float: left;                
                width: 100%;

            }
            .authentication-input {
                display: block;
                height: 32px;
                width: 256px;
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
                background-color: rgb(39, 37, 39);
                app-region: no-drag;
                align-self: center;
            }
            .authentication-input-wrapper {
                height: 90%;
                justify-content: center;
                align-content: center;
                display: flex;
                flex-direction: column;
            }
            .authentication-navigation-bar {
                display: flex;
                justify-content: space-between;
                color: #ffffff;
                text-align: center;
            }
            .authentication-navigation-bar span:nth-of-type(1) {
                flex-grow: 1;
            }
            .authentication-navigation-bar span:nth-of-type(2) {
                flex-grow: 3;
                color: rgb(252, 251, 252);
                position: absolute;
                top: -1px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
                font-size: 13px;
                font-weight: bold;
                box-sizing: border-box;
                left: calc(15% + 16px);
                width: calc((70% - 32px) - 0px);
                padding-left: 0px;
                height: 41px;
                text-align: center;
                line-height: 41px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .authentication-navigation-bar span:nth-of-type(3) {
                flex-grow: 1;
            }
            input {
                display: block;
                height: 32px;
                width: 256px;
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
                app-region: no-drag;
            }
            .left-menu-button, .right-menu-button {
                cursor: default;
                border-radius: 3px;
                height: 24px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
                text-align: center;
                border: none;
                text-decoration: none;
                line-height: 24px;
                box-sizing: border-box;
                width: auto;
                padding: 0px 8px;
                box-shadow: rgb(73 71 73) 0px 0.5px 0px 0px inset;
                background-color: rgb(56, 54, 56);
                color: rgb(252, 251, 252);
                font-size: 13px;
                font-weight: 600;
                display: block;
                float: left;
                margin-top: 10px;
                app-region: no-drag;
                position: absolute;
                left: 0px;
            }
            .utility {
                cursor: default; border-radius: 3px; height: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-align: center; border: none; text-decoration: none; line-height: 24px; box-sizing: border-box; width: auto; padding: 0px 8px; box-shadow: rgb(73, 71, 73) 0px 0.5px 0px 0px inset; background-color: rgb(56, 54, 56); color: rgb(252, 251, 252); font-size: 13px; font-weight: 600; display: block; float: left; margin-top: 10px; app-region: no-drag; position: absolute; left: 0px;
            }
        `;
    }

    handleSendfunds_pressed(e) {
        console.log(e);
        console.log("Success");
        console.log(this);
        this.displayPasswordScreen = true;
        let root = this.shadowRoot.getRootNode();
        root.host.classList.add("display");
        // do checking of preferences, and invoke authentication if necessary
    }

    connectedCallback() {
        super.connectedCallback();
        console.log("connecting auth");
        this.addEventListener("mym-display-password-screen", this.handleDisplayPasswordScreenEvent);
        this.displayPasswordScreen = false;
        // console.log(root);
        // let root = this.shadowRoot.getRootNode();
        // console.log(typeof(root));
        // for (const prop in root) {
        //     console.log(`${prop}: ${root[prop]}`);
        // }
        // console.log(root.host.classList);
        //
        // root.forEach((obj, key) => {
        //     console.log(obj);
        //     console.log(key);
        //         
        //document.addEventListener("sendfunds_pressed", ()=> { this.handleSendfunds_pressed() });
        let eventTarget = document.getElementById("rightBarButtonHolderView");
        eventTarget.addEventListener("sendfunds_pressed", this.handleSendfunds_pressed.bind(this));
        let myEvent = new CustomEvent('my-event', {
            detail: { message: 'my-event happened.' },
            bubbles: true,
            composed: true 
        });
        //this.shadowRoot.classList.add("display");
    }

    disconnectedCallback() {
        console.log("Disconnecting");
        super.disconnectedCallback();
        this.removeEventListener("mym-display-password-screen", this.handleDisplayPasswordScreenEvent);
        eventTarget.removeEventListener("sendfunds_pressed", this.handleSendfunds_pressed.bind(this));
    }

    handleDisplayPasswordScreenEvent() {
        this.displayPasswordScreen = false;
    }

    constructor() {
        super();
        this.displayPasswordScreen = false;
    }
    
    static properties = {
        context: Object,
        displayPasswordScreen: { type: Boolean }
    } 

    render() {
        // We're going to use conditionals and classes to determine which elements to hide        
        return html`
            <div class="authentication-wrapper">
                <div class="authentication-navigation-bar">
                    <span>
                        <div class="hoverable-cell utility disableable">Cancel</div></span>
                    <span>Enter PIN</span>
                    <span>Submit</span>
                </div>
            </div>
            <div class="authentication-input-wrapper">
                <div class="authentication-input">
                    <div class="authentication-title">
                    PIN
                    </div>
                    <input type="password" placeholder="To continue" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                </div>
            </div>
        `;
    }

}

customElements.define('mym-authentication-view', AuthenticationView);