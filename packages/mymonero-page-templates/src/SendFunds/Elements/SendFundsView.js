import { html, css, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import SendFundsController from "../Controllers/SendFundsController";
//import monero_requestURI_utils from "@mymonero/mymonero-request-utils";
/* TODO:

- DONE: Set default currency type
- Do conversion before send when not using XMR
- Handle MAX
- Hook up camera button
- Hook up choose file to New_ParsedPayload_FromPossibleRequestURIString in mymonero-request-utils
- DONE: Show authentication only when enabled by user
- Listen for "enter" on auth check
- DONE: Hide auth on successful pass
- Show error message on unsuccessful pass
- DONE: Add cancel button to auth
- Add "detected" and display "payment id" when contact is selected
- DONE: Fix formatting on Send button
- Fix styles on ccy dropdown

*/

export default class SendFundsView extends SendFundsController (LitElement) {
    static get styles() {
        return css`
            [hidden] { display: none !important; }

            :host {
                all: initial;
                display: block;
                contain: content;
                height: inherit;

            }
            .form_field {
                padding: 0 24px 20px 24px;
            }
            #sendfunds-page {
                max-width: 100%;
            }
            .utility {
                outline: none; color: rgb(252, 251, 252); background-color: rgb(56, 54, 56); width: 122px; height: 32px; border: 0px; padding: 0px; border-radius: 3px; box-shadow: rgb(22, 20, 22) 0px 0.5px 1px 0px, rgb(73, 71, 73) 0px 0.5px 0px 0px inset; appearance: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; letter-spacing: 0.5px; font-weight: 400; text-indent: 11px;
            }
            .field_title {
                margin: 0em 1em 0em 2em;
                user-select: none; display: block; margin: 15px 0px 8px 8px; text-align: left; color: rgb(248, 247, 248); font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300;
            }
            wallet-selector {
                position: relative;
                display: block;
                top: 0px;
                left: 0px;
            }
            #wallet-options {
                background: green !important;
            }
            .currency_select {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
                -webkit-font-smoothing: subpixel-antialiased; 
                font-size: 11px; 
                font-weight: 400; 
                letter-spacing: 0.5px; 
                text-indent: 10px; 
                color: rgb(223, 222, 223); 
                background-color: rgba(80, 74, 80, 0.55); 
                position: absolute; 
                left: 117.5px; 
                width: 56px; 
                height: 29px; 
                border: 0px; 
                padding: 0px; 
                border-radius: 0px 4px 4px 0px; 
                appearance: none; 
                top: 21px;
            }
            .tooltip {
                color: rgb(17, 187, 236); cursor: pointer; user-select: none; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; width: auto; display: inline; clear: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); margin: 8px 0px 0px 7px; float: none; text-decoration: none;
            }
            .select_indicator {
                pointer-events: none; border: none; position: absolute; width: 8px; height: 13px; left: 159.5px; z-index: 9; background-image: url('../../assets/img/smallSelect_disclosureArrow@3x.png'); background-repeat: no-repeat; background-position: center center; background-size: 8px 13px; top: 33px;
            }
            .currency_value {
                display: inline-block; height: 29px; width: 80px; border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0); text-align: right; font-size: 13px; font-weight: 200; padding: 0px 63px 0px 7px; font-family: Native-Light, input, menlo, monospace; outline: none; box-shadow: rgba(56, 54, 56, 0.5) 0px 0.5px 0px 0px, rgb(22, 20, 22) 0px 0.5px 0px 0px inset; color: rgb(223, 222, 223); background-color: rgb(29, 27, 29);    
            }
            .max_button {
                color: rgb(17, 187, 236); cursor: pointer; user-select: none; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; width: auto; display: inline; clear: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); margin: 8px 0px 0px 7px; float: none;
            }
            option {
                text-align: left;
            }
            .clickableLinkButton {
                color: rgb(17, 187, 236);
                cursor: pointer;
                user-select: none;
                font-family: Native-Light, input, menlo, monospace;
                -webkit-font-smoothing: subpixel-antialiased;
                font-size: 10px;
                letter-spacing: 0.5px;
                font-weight: 300;
                width: auto;
                display: inline-block;
                clear: both;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                margin: 0px 0px 0px 12px;
                vertical-align: middle;
                text-decoration: none;
            }
            .action-button-wrapper {
                display: flex;
                justify-content: space-between;
                margin: 0px 7px 0px 16px;
            }
            .action-button-wrapper a {
                opacity: 1; 
                position: relative;
                background-position: 17px 9px; 
                background-repeat: no-repeat; 
                background-size: 14px 14px; 
                text-indent: 10px; 
                display: inline-block; 
                width: calc(50% - 4.5px); 
                height: 32px; 
                box-sizing: border-box; 
                border-radius: 3px; 
                color: rgb(252, 251, 252); 
                background-color: rgb(56, 54, 56); 
                box-shadow: rgb(73, 71, 73) 0px 0.5px 0px 0px inset; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
                font-size: 13px; 
                letter-spacing: 0px; 
                font-weight: 600; 
                line-height: 32px; 
                text-decoration: none; 
                text-align: center; 
                margin-right: 9px;
            }
            .camera-button {
                background-image: url('../../assets/img/actionButton_iconImage__useCamera@3x.png'); 
            }
            .qr-button {
                background-image: url('../../assets/img/actionButton_iconImage__chooseFile@3x.png')
            }
            input {
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
            #file-picker {
                opacity: 0;
                top: -29px;
                position: relative;
            }
            .title-label {
                color: rgb(252, 251, 252); position: absolute; top: -1px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 13px; font-weight: bold; box-sizing: border-box; left: calc(15% + 16px); width: calc((70% - 32px) - 0px); padding-left: 0px; height: 41px; text-align: center; line-height: 41px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .right-navigation-button {
                cursor: default; border-radius: 3px; height: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-align: center; border: none; text-decoration: none; line-height: 24px; box-sizing: border-box; width: auto; padding: 0px 8px; background-color: rgb(0, 198, 255); box-shadow: rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0px inset; color: rgb(22, 20, 22); font-weight: 600; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; letter-spacing: 0.5px; float: right; margin-top: 10px; app-region: no-drag; position: absolute; right: 20px;
            }

            #NavigationBarView{
                background; rgba(0,255,0,0.5);
            }
            .address-resolution-fieldset {
                border-radius: 3px;
                background-color: rgb(56, 54, 56);
                padding: 8px 11px;
                box-sizing: border-box;
                width: 100%;
                height: auto;
                color: rgb(124, 122, 124);
                font-size: 13px;
                font-weight: 100;
                font-family: Native-Light, input, menlo, monospace;
                -webkit-font-smoothing: subpixel-antialiased;
                word-break: break-all;
            }

            .iconAndMessageLayer {
                font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 11px; font-weight: 100; color: rgb(141, 139, 141);
            }
        `
    }

    // legacy function
    configure_amountInputTextGivenMaxToggledState () {
        const self = this
        const isMaxToggledOn = self.max_buttonView.isMAXToggledOn
        const toToggledOnText_orNullIfNotToggled = isMaxToggledOn
          ? self.new_displayCcyFormatted_estMaxAmount_fullInputText() // if non xmr ccy but rate nil (amount nil), will display "MAX" til it's ready
          : null
        self.amountInputLayer.Component_configureWithMAXToggled(
          isMaxToggledOn,
          toToggledOnText_orNullIfNotToggled
        )
    }
    // Legacy again
    Component_configureWithMAXToggled(isMAXToggledOn, toToggledOnText_orNullIfNotToggled) {
        if (isMAXToggledOn) {
          if (toToggledOnText_orNullIfNotToggled == null) {
            throw Error('Illegal isMAXToggledOn && !toToggledOnText_orNullIfNotToggled')
          }
          const toToggledOnText = toToggledOnText_orNullIfNotToggled
          valueLayer.classList.add('placeholderAsValue')
          valueLayer.placeholder = toToggledOnText
        } else {
          if (toToggledOnText_orNullIfNotToggled != null) {
            throw Error('Illegal !isMAXToggledOn && toToggledOnText_orNullIfNotToggled')
          }
          valueLayer.classList.remove('placeholderAsValue')
          valueLayer.placeholder = valueLayer_amountPlaceholderText
        }
    }

    togglePaymentID() {
        this.showPaymentIDInput = !this.showPaymentIDInput;
    }

    
    logInputEvent(event) {
        console.log(event);
    }
    
    /** Event listeners for handling message dialog, contact selection, etc */
    cancelAuthenticationEventListener(event) {
        console.log("SVCS");
        console.log(event);
        this.showAuthenticationDialog = false;
    }
    
    closeMessageDialogEventListener() {
        this.showMessageDialog = false;
    }

    contactPickerContactDeselectedEventListener(event) {
        this.contactIndex = null;
    }    

    // Uses resolveAddress from the super class to invoke address resolution
    async contactPickerInputUpdatedEventListener(event) {
        console.log("contactPickerInputUpdated");
        let address = event.detail.contactPickerInput;
        this.showAddressResolutionField = false;
        try {
            let addressResolutionResult = await this.resolveAddress(address);
            if (addressResolutionResult !== false) {
                this.showAddressResolutionField = true;
                this.addressResolutionFieldText = addressResolutionResult.address
            }
        } catch (error) {
            this.showMessageDialog = true;
            this.messageText = error.message;
            console.log(error);
        }
    }
    
    contactPickerContactSelectedEventListener(event) {
        this.contactIndex = event.detail.contactIndex;
        console.log("Show contact's address if not OA / Yat");
        console.log(this.context.contacts[this.contactIndex]);
    }    

    handleSuccessfulAuthenticationEventListener(event) {
        // expect event.detail
        // do send
    }
    /* End of event listeners */

    handleMaxButtonClick() {
        let selectedWallet = this.selectedWallet;
        const availableWalletBalance = this.selectedWallet.Balance_JSBigInt().subtract(this.selectedWallet.LockedBalance_JSBigInt()) // TODO: is it correct to incorporate locked balance into this?
        //const estNetworkFee_moneroAmount = self.new_xmr_estFeeAmount()
        console.log(availableWalletBalance);
        this.maximumAmountText = "MAX";
        const possibleMax_moneroAmount = availableWalletBalance.subtract(estNetworkFee_moneroAmount)
        if (possibleMax_moneroAmount > 0) { // if the Max amount is greater than 0
            return possibleMax_moneroAmount
        }
        //return new JSBigInt('0')
        this.maximumAmountText = possibleMax_moneroAmount;
        this.sendMaximumAmount = true;
        // Add event listener that clears maximumAmountText if focused
    }

    handleWalletSelectorUpdate(event) {
        console.log("Handling selection");
        this.selectedWallet = event.detail.wallet;
        console.log("Selected wallet:", this.selectedWallet);
    }

    connectedCallback() {
        super.connectedCallback();
        this.wallets = this.context.walletsListController.records;
        this.contacts = this.context.contactsListController.records;
        this.estimatedFee = BigInt(this.context.monero_utils.estimated_tx_network_fee(null, 1, '24658'));
        console.log(this.context.monero_utils.estimated_tx_network_fee(null, 1, '24658'));
        console.log(this.estimatedFee);
        this.renderStyles();
        this.addEventListener('mym-contact-picker-contact-selected', this.contactPickerContactSelectedEventListener);
        this.addEventListener('mym-contact-picker-contact-deselected', this.contactPickerContactDeselectedEventListener);
        this.addEventListener('mym-contact-picker-input-updated', this.contactPickerInputUpdatedEventListener);
        this.addEventListener('mym-message-dialog-close', this.closeMessageDialogEventListener);
        this.addEventListener('mym-authentication-cancellation', this.cancelAuthenticationEventListener);
        this.addEventListener('mym-authentication-success', this.handleSuccessfulAuthenticationEventListener);
        this.addEventListener('wallet-selector-update', this.handleWalletSelectorUpdate);
        //this.addEventListener('input', this.handleFilepickerChange);
        //this.addEventListener('change', this.handleFilepickerChange);
        // TODO: disable fiat options if fiat api status returns an error
    }
    
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mym-contact-picker-update', this.updateSelectedContact);
    }
    

    constructor() {
        super();
        this.clickHandler = this.clickHandler;
        this.context = {};
        this.showPaymentIDInput = false;
        this.showResolvingIndicator = false;
        this.showMessageDialog = false;
        this.showAuthenticationDialog = false;
        this.showAddressResolutionField = false;
        this.addressResolutionFieldText = "";
        this.messageText = "";
        this.maximumAmountText = "";
        this.sendMaximumAmount = false;
        this.paymentID = "";
        this.currencies = ["XMR","USD","AUD","BRL","CAD","CHF","CNY","EUR","GBP","HKD","INR","JPY","KRW","MXN","NOK","NZD","SEK","SGD","TRY","RUB","ZAR"];
    }

    static get properties() {
        return {
            context: Object,
            contacts: { 
                type: Array
            },
            showResolvingIndicator: { type: Boolean },
            showPaymentIDInput: { type: Boolean },
            showMessageDialog: { type: Boolean },
            showAuthenticationDialog: { type: Boolean },
            showAddressResolutionField: { type: Boolean },
            showContactPaymentID: { type: Boolean },
            addressResolutionFieldText: { type: String },
            messageText: { type: String },
            maximumAmountText: { type: String },
            sendMaximumAmount: { type: Boolean },
            estimatedFee: { type: Number },
            paymentID: { type: String },
            currencies: { type: Array },
            wallet: {type: Object }
        }
    }
    
    // openClickableLink(event, context) {
    //     // We need to determine whether we're invoking this via Electron or via a browser, and adjust accordingly
    //     let referrer_id = event.srcElement.getAttribute("referrer_id");
    //     let url = event.srcElement.getAttribute("url");
    //     let paramStr = event.srcElement.getAttribute("param_str");
    //     if (typeof(this.context.shell) !== "undefined") { // Electron passes the shell variable as part of context
    //         if (referrer_id.length > 0) {
    //             let urlToOpen = url + "?" + paramStr + "=" + referrer_id;
    //             context.shell.openExternal(urlToOpen);
    //         } else {
    //             context.shell.openExternal("https://localmonero.co");
    //         }
    //     } else { // Web (and Capacitor?) codebase
    //         if (referrer_id.length > 0) {
    //             let urlToOpen = url + "?" + paramStr + "=" + referrer_id;
    //             window.open(urlToOpen);
    //         } else {
    //             window.open("https://localmonero.co");
    //         }
    //     }
    // }

    // openExternal(url) {
    //     // Check whether we're on desktop, or web and Android
    //     if (typeof(this.context.shell) !== "undefined") { // Electron passes the shell variable as part of context            
    //         this.context.shell.openExternal(url);            
    //     } else { // Web (and Capacitor?) codebase            
    //         window.open(url, "_blank");
    //     }
    // }

    handleSendfundsInput() {
        // TODO: check address is valid -- currently handled by WASM
        // if (false) {
        //     this.messageText = "Please specify a valid address";
        //     this.showMessageDialog = true;
        //     return;
        // }
        // check valid amount entered or max set
        if (false) {
            this.messageText = "Please specify a valid amount";
            this.showMessageDialog = true;
        }
        console.log(this.context.settingsController);
        if (this.context.settingsController.authentication_requireWhenSending === true) {
            // Remember to bind a listener that handles both 'send' and 'cancel'
            this.showAuthenticationDialog = true;
        } else {
            // no auth necessary, move straight to sending
        }
        //
    }

    render() {
        let currencyOptions = [];
        let defaultCurrency = this.context.settingsController.displayCcySymbol;
        this.currencies.forEach((value) => {
            let optionHtml;
            if (value !== defaultCurrency) {
                optionHtml = html`<option value="${value}">${value}</option>`;
            } else {
                optionHtml = html`<option value="${value}" selected="selected">${value}</option>`;
            }
            currencyOptions.push(optionHtml);
        })
        let authenticationClassObject = { display: this.showAuthenticationDialog };
        // <mym-authentication-view class=${this.display}></mym-authentication-view>
        return html`
        <div id="sendfunds-page">
            <div id="sendfunds-navigation">
                <div class="NavigationBarView" id="NavigationBarView" style="position: absolute; top: 0%; z-index: 9; width: 100%; height: 41px; background-color: rgb(39, 37, 39); app-region: drag; user-select: none;">
                    <div style="position: absolute; width: 100%; height: 41px; background-color: rgb(39, 37, 39);">
                    
                    </div>
                    <span class="title-label">Send Monero</span>
                    <div id="leftBarButtonHolderView" class="nav-button-left-container">
                    
                    </div>
                    <div id="rightBarButtonHolderView" class="nav-button-right-container">
                        <div class="right-navigation-button action" @click=${this.handleSendfundsInput}>Send</div>
                    </div>
                </div>
            </div>
            <div>
                <div class="ClassNameForScrollingAncestorOfScrollToAbleElement" style="user-select: none; position: relative; box-sizing: border-box; width: 100%; height: 100%; padding: 41px 0px 0px; overflow-y: auto; background-color: rgb(39, 37, 39); color: rgb(192, 192, 192); word-break: break-all;">
                    <mym-message-dialog .message="${this.messageText}" .showMessage="${this.showMessageDialog}">
                    </mym-message-dialog>
                </div>
                <div>
                    <div class="form_field">
                        <span class="field_title" style="">FROM
                            <mym-tooltip allowHTML="true" tooltipContent="Monero makes transactions<br>with your 'available outputs',<br>so part of your balance will<br>be briefly locked and then<br>returned as change.">?</mym-tooltip>
                        </span>
                        <wallet-selector .wallets=${this.wallets}></wallet-selector>
                </div>
                <div class="form_field" style="position: relative; left: 0px; top: 0px; padding: 2px 22px 0px;">
                    <span class="field_title" style="user-select: none; display: block; margin: 0px 0px 8px 8px; text-align: left; color: rgb(248, 247, 248); font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300;">AMOUNT</span>
                    <input class="field_value currency_value" type="text" placeholder="00.00" value=${this.maximumAmountText}>
                    <select class="currency_select">
                        ${currencyOptions}
                    </select>
                    <div class="select_indicator">
                        <!-- responsible for the dropdown image indicator on the select -->
                    </div>
                    <a class="clickableLinkButton max_button" @click=${this.handleMaxButtonClick}>MAX</a>
                    <br clear="both">
                    <div>
                        <span class="field_title">+ ${this.estimatedFee} XMR EST. FEE <mym-tooltip allowHTML="true" tooltipHeader="" tooltipContent="Based on Monero network<br>fee estimate (not final).<br><br>MyMonero does not charge<br>a transfer service fee.">?</mym-tooltip></span>
                        <!-- <mym-tooltip allowHTML="true" tooltipHeader="" tooltipContent="Based on Monero network<br>fee estimate (not final).<br><br>MyMonero does not charge<br>a transfer service fee.">?</mym-tooltip> -->
                    </div>
                </div>
                </td>
                </tr>
                </table>
                <div class="form_field">
                    <span class="field_title" style="user-select: none; display: block; margin: 17px 0px 8px 8px; text-align: left; color: rgb(248, 247, 248); font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300;">TO
                        <mym-tooltip allowHTML="true" tooltipContent="Drag &amp; drop QR codes<br>to auto-fill.<br><br>Please double-check<br>your recipient info as<br>Monero transfers are<br>not yet&nbsp;reversible.">?</mym-tooltip>
                    </span>
                    <mym-contact-picker .contacts="${this.contacts}"></mym-contact-picker>    
                    <activity-indicator .loadingText="Resolving..." ?hidden=${!this.showResolvingIndicator}></activity-indicator>
                </div>
                                
                <!-- <div class="form_field" id="address-resolution-field" ?hidden=${!this.showAddressResolutionField}>
                    <span class="field_title field-title-label" style="margin-top: 12px;">MONERO ADDRESS</span>
                    <div class="address-resolution-field">${this.addressResolutionFieldText}</div>
                </div> -->

                </div>
                <div style="display: none;"><span class="field_title" style="user-select: none; display: block; margin: 6px 0px 8px 8px; text-align: left; color: rgb(248, 247, 248); font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300;">PAYMENT ID
                </span><div style="border-radius: 3px; background-color: rgb(56, 54, 56); padding: 8px 11px; box-sizing: border-box; width: 100%; height: auto; color: rgb(124, 122, 124); font-size: 13px; font-weight: 100; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; word-break: break-all;">
                </div>
                </div>
                </div>

                <div class="paymentIDWrapper form_field" @click=${this.togglePaymentID} ?hidden=${this.showPaymentIDInput}>
                    <a class="clickableLinkButton">+ ADD PAYMENT ID</a>
                </div>
                <div class="paymentIDWrapper form_field" @click=${this.togglePaymentID} ?hidden=${!this.showPaymentIDInput}>
                    <a class="clickableLinkButton">+ HIDE PAYMENT ID FIELD</a>
                </div>
                <div class="form_field">                        
                    <div class="" ?hidden=${!this.showPaymentIDInput}>
                        <div style="margin: 0px 0px 8px;">
                            <span class="field_title" style="user-select: none; display: inline; margin: 0px 0px 0px 8px; text-align: left; color: rgb(248, 247, 248); font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; width: auto; float: none;">ENTER PAYMENT ID OR </span>
                            <a class="clickableLinkButton" @click=${this.generatePaymentID} style="margin: 0px;">GENERATE ONE</a>
                        </div>
                        <input .value=${this.paymentID} class="field_value" type="text" placeholder="A specific payment ID" autocomplete="off" autocapitalize="none" spellcheck="true" style="display: block; height: 29px; width: calc((100% - 2px) - 14px); border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0); text-align: left; font-size: 13px; font-weight: 200; padding: 0px 7px; font-family: Native-Light, input, menlo, monospace; outline: none; box-shadow: rgba(56, 54, 56, 0.5) 0px 0.5px 0px 0px, rgb(22, 20, 22) 0px 0.5px 0px 0px inset; color: rgb(223, 222, 223); background-color: rgb(29, 27, 29);">
                    </div>
                </div>
                <div class="form_field">
                    <span class="field_title">PRIORITY
                        <mym-tooltip tooltipContent="You can pay the Monero<br/>network a higher fee to<br/>have your transfers<br/>confirmed faster." allowHTML="true">?</mym-tooltip>
                    </span>
                    <div style="position: relative; left: 0px; top: 0px; width: 122px; height: 32px;">
                        <select class="hoverable-cell utility">                
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                            <option value="4">Very High</option>
                        </select>
                    <div style="pointer-events: none; border: none; position: absolute; width: 10px; height: 8px; right: 13px; top: 12px; z-index: 100; background-image: url('../../assets/img/dropdown-arrow-down@3x.png'); background-repeat: no-repeat; background-position: center center; background-size: 10px 8px;">

                    </div>
                </div>
                </div>
                </div>
                <!-- Action buttons -->
                <div class="action-button-wrapper">
                    <a href="#" class="hoverable-cell disableable utility camera-button" @click=${this.useCamera}>Use Camera</a>
                    <!-- we make the file input invisible using opacity: 0, while positioning it on top of the camera button -->
                    <a href="#" class="hoverable-cell disableable utility qr-button" @click=${this.chooseFile}>Choose File
                        <input id="file-picker" type="file" @input=${this.handleFilepickerChange}>
                    </a>
                    
                </div>
                <!-- End Action buttons -->
                <div style="position: absolute; z-index: 999999; inset: 0px; background-color: rgb(39, 37, 39); display: none;"><div style="position: absolute; background-color: rgb(29, 27, 29); margin: 56px 15px 15px; width: calc(100% - 32px); border: 1px dashed rgb(73, 71, 73); border-radius: 6px; height: calc(100% - 73px);"><div style="width: 100%; height: 48px; background-size: 48px 48px; background-image: url('../../assets/img/qrDropzoneIcon@3x.png'); background-position: center center; background-repeat: no-repeat; margin-top: 108px;"></div><div style="width: 100%; height: auto; text-align: center; margin-top: 24px; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: rgb(158, 156, 158); font-weight: 300; -webkit-font-smoothing: subpixel-antialiased;">Drag and drop a<br>Monero Request Code </div></div></div></div></div>
            </div>
        </div>
        <mym-authentication-view .context=${this.context} class=${classMap(authenticationClassObject)}></mym-authentication-view>
        `;
    }
    useCamera() {
        console.log("camera");
    }
    handleFilepickerChange(event) {
        console.log(event);
        var eventPath = event.path || (event.composedPath && event.composedPath());
        if (eventPath[0].id = "file-picker") {
            // const image = document.createElement('img');
            let imageSrc = URL.createObjectURL(eventPath[0].files[0]);
            let httpsSrc = imageSrc.replace('http', 'https');
            var files = event.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            // for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            var file = files[0];
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                // Render thumbnail.
                // var span = document.createElement('span');
                // span.innerHTML = ['<img class="thumb" src="', e.target.result,
                //                     '" title="', escape(theFile.name), '"/>'].join('');
                // document.getElementById('list').insertBefore(span, null);
                console.log(e);
                console.log(e.target);
                console.log(e.target.result); // pass this to QR decoder
                };
            })(file);

            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
            //
            var requestPayload;
            try {
                // requestPayload = monero_requestURI_utils.New_ParsedPayload_FromPossibleRequestURIString(possibleUriString, self.context.nettype, self.context.monero_utils)
                requestPayload = this.context.monero_requestURI_utils.New_ParsedPayload_FromPossibleRequestURIString(possibleUriString, self.context.nettype, self.context.monero_utils)
            } catch (errStr) {
                if (errStr) {
                    self.validationMessageLayer.SetValidationError("Unable to use the result of decoding that QR code: " + errStr)
                    return
                }
            }

            // }
            // image.src = httpsSrc;
            // console.log(image);
            // const width = 256
            // const height = 256
            // //
            // const canvas = document.createElement("canvas")
            // const canvasContext = canvas.getContext("2d")
            // context.getImageData(0, 0, width, height)
            // let imageData = canvasContext.getImageData(0, 0, width, heightimage);
            // console.log(imageData);
            // console.log(image, image.width, image.height);
            // canvas.width = width
            // canvas.height = height
            
            // const img = new Image()
            // const width = 256
            // const height = 256
            // //
            // const canvas = document.createElement("canvas")
            // const context = canvas.getContext("2d")
            // canvas.width = width
            // canvas.height = height
            // //
            // const img = new Image()
            // img.addEventListener("load", function() {
            //     context.drawImage(img, 0, 0, width, height)
            //     const imageData = context.getImageData(0, 0, width, height)
            //     //
            //     const code = jsQR(imageData.data, imageData.width, imageData.height)
            //     console.log(code);
            //     // if (!code || !code.location) {
            //     //     self.validationMessageLayer.SetValidationError("MyMonero was unable to find a QR code in that image.")
            //     //     return
            //     // }
            //     // const stringData = code.data
            //     // if (!stringData) {
            //     //     self.validationMessageLayer.SetValidationError("MyMonero was unable to decode a QR code from that image.")
            //     //     return
            //     // }
            //     // if (typeof stringData !== 'string') {
            //     //     self.validationMessageLayer.SetValidationError("MyMonero was able to decode QR code but got unrecognized result.")
            //     //     return
            //     // }
            //     // const possibleURIString = stringData;
            //     // self._shared_didPickPossibleRequestURIStringForAutofill(possibleURIString)
            // })

            // img.src = httpsSrc
        }
    }
    chooseFile() {
        console.log("choosefile");

    }
    generatePaymentID(event) {
        let paymentID = this.context.monero_utils.new_payment_id();
        this.paymentID = paymentID;
    }
}

customElements.define('sendfunds-page', SendFundsView);