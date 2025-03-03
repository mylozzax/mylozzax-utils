

import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "../Controllers/ExchangeNavigationController";

// Legacy imports for fixed rate exchange
const Utils = require("../Utils/ExchangeUtilityFunctions")
const ExchangeUtils = require("../Utils/ExchangeUtilityFunctions")
// const ValidationLibrary = require('wallet-address-validator')
//const View = require('../../Views/View.web')
// const commonComponents_navigationBarButtons = require('../../MMAppUICommonComponents/navigationBarButtons.web')
// const commonComponents_activityIndicators = require('../../MMAppUICommonComponents/activityIndicators.web')
const JSBigInt = require('@mylozzax/mylozzax-bigint').BigInteger // important: grab defined export
const lozzax_amount_format_utils = require('@mylozzax/mylozzax-money-format')
const ExchangeHelper = require("@mylozzax/mylozzax-exchange-helper")
let exchangeHelper = new ExchangeHelper();

// NB: because of legacy reasons, we don't want this to render inside a shadow dom. We override createRenderRoot to address this
export class ChangenowFixedRateView extends ExchangeNavigationController(LitElement) {

    static get styles() {
        return css`    
        .submit-button-wrapper {
            position: fixed;
            top: -45px;
            right: 16px;
            width: 15%;
            min-width: 41px;
            height: 41px;
            z-index: 12;
        }
        .submit-button {
            z-index: 13;
            position: fixed;
            right: 16px;
            font-weight: bold;
            top: -40px;
            z-index: 10000;
        }
        .submit-button, .confirmation-button {
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
            background-color: rgb(0, 198, 255);
            box-shadow: rgb(22 20 22) 0px 0.5px 1px 0px, rgb(255 255 255 / 20%) 0px 0.5px 0px 0px inset;
            color: rgb(22, 20, 22);
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 0.5px;
            float: right;
            margin-top: 5px;
            -webkit-app-region: no-drag;
        }
        `
    }

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
          context: Object,
        }
      }

    connectedCallback() {
        super.connectedCallback();
        exchangeHelper.doInit(this.context);
    }
    
    sendFunds() {
        const in_amount = document.getElementById('in_amount_remaining').innerHTML
        const send_address = document.getElementById('receiving_subaddress').innerHTML
        const in_amount_str = '' + in_amount

        const selectedWallet = document.getElementById('selected-wallet')
        const selectorOffset = selectedWallet.dataset.walletoffset
        const sweep_wallet = false // TODO: Add sweeping functionality
        try {
            if (this.context.walletsListController.hasOwnProperty('orderSent')) {
                console.log('Order already sent previously')
            } else {
                this.context.walletsListController.orderSent = false
            }

            ExchangeUtils.default.sendFunds(this.context.walletsListController.records[0], in_amount, send_address, sweep_wallet, exchangeHelper.sendFundsValidationStatusCallback, exchangeHelper.handleSendFundsResponseCallback, this.context)
        } catch (error) {
            console.log(error)
        } 
    }

    constructor() {
        super();
        this.clickHandler = this.clickHandler;
    }
    
    clickHandler(event) {
        console.log(event);
    }
    
    render() {
        let exchangeFormTemplate = exchangeHelper.htmlFormTemplate();
        let exchangeFormHtml = exchangeFormTemplate.content.firstElementChild.cloneNode(true);

        return html`
        <div id="exchange-landing-page">
            <div id="explanatory-message" style="color: #ffffff;">&nbsp;</div>
            ${exchangeFormHtml}
            </div>
        </div>
        <div class="submit-button-wrapper">
            <button id="order-button" class="button submit-button">Create Order</button>
        </div>
        <button id="exchange-lozz" class="button" @click=${this.sendFunds}>Exchange</button>
        <style>
            #explanatory-message {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
                color: #ffffff;
                margin: 20px;
                font-size: 13px;
            }
            .exchangeScreen {
                border: none !important;
            }
            .exchange-page-panel {
                margin: 42px 0px 42px 0px !important;
            }
            #order-button {
                display: none;
            }
            #order-button, #exchange-lozz {
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
                background-color: rgb(0, 198, 255);
                box-shadow: rgb(22 20 22) 0px 0.5px 1px 0px, rgb(255 255 255 / 20%) 0px 0.5px 0px 0px inset;
                color: rgb(22, 20, 22);
                -webkit-font-smoothing: subpixel-antialiased;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 0.5px;
                float: right;
                margin-top: 5px;
                -webkit-app-region: no-drag;
                right: 16px;
                position: absolute;
                bottom: 10px;
            }
            #exchangePage {
                padding: 0px 0px 50px 0px;
            }
            #orderStatusPage {
                min-height: 390px;
            }
            /** TODO: Remove this style once we tweak the exchange module, since LocalLozzax has its own provider card */
            #locallozzax {
                display: none;
            }
        </style>
        `;
    }

}

try {
    customElements.define('changenow-fixed-rate-view', ChangenowFixedRateView);
} catch (error) {
    // already defined
}