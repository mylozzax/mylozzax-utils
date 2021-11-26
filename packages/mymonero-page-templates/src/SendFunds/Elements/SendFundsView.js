import { html, css, LitElement } from 'lit';
import SendFundsController from "../Controllers/SendFundsController";

export default class SendFundsView extends SendFundsController (LitElement) {
    static get styles() {
        return css`
            :host {
                all: initial;
                display: block;
                contain: content;
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
            mym-message-dialog {
                margin: 25px;
                padding: 0px;
                display: inline-block;
                width: 100%;
            }
        `
    }



    togglePaymentID() {
        this.displayPaymentIDInput = !this.displayPaymentIDInput;
    }

    updateSelectedContact(event) {
        console.log(this);
        console.log(event);
        //this.contactIndex = 
    }

    logInputEvent(event) {
        console.log(event);
    }

    closeMessageDialog() {
        console.log("Hi from CMD");
        this.showMessageDialog = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.wallets = this.context.walletsListController.records;
        this.contacts = this.context.contactsListController.records;
        this.renderStyles();
        this.addEventListener('mym-contact-picker-update', this.updateSelectedContact);
        this.addEventListener('mym-message-dialog-close', this.closeMessageDialog);
        
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
        this.showMessageDialog = true;
        this.messageText = "Woot";
        this.paymentID = "";
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
            messageText: { type: String },
            paymentID: { type: String }
        }
    }
    
    openClickableLink(event, context) {
        // We need to determine whether we're invoking this via Electron or via a browser, and adjust accordingly
        let referrer_id = event.srcElement.getAttribute("referrer_id");
        let url = event.srcElement.getAttribute("url");
        let paramStr = event.srcElement.getAttribute("param_str");
        if (typeof(this.context.shell) !== "undefined") { // Electron passes the shell variable as part of context
            if (referrer_id.length > 0) {
                let urlToOpen = url + "?" + paramStr + "=" + referrer_id;
                context.shell.openExternal(urlToOpen);
            } else {
                context.shell.openExternal("https://localmonero.co");
            }
        } else { // Web (and Capacitor?) codebase
            if (referrer_id.length > 0) {
                let urlToOpen = url + "?" + paramStr + "=" + referrer_id;
                window.open(urlToOpen);
            } else {
                window.open("https://localmonero.co");
            }
        }
    }

    openExternal(url) {
        // Check whether we're on desktop, or web and Android
        if (typeof(this.context.shell) !== "undefined") { // Electron passes the shell variable as part of context            
            this.context.shell.openExternal(url);            
        } else { // Web (and Capacitor?) codebase            
            window.open(url, "_blank");
        }
    }

    render() {
        return html`
        <div id="sendfunds-page">
            <div>
                <div class="ClassNameForScrollingAncestorOfScrollToAbleElement" style="user-select: none; position: relative; box-sizing: border-box; width: 100%; height: 100%; padding: 41px 0px 0px; overflow-y: auto; background-color: rgb(39, 37, 39); color: rgb(192, 192, 192); word-break: break-all;">
                    <mym-message-dialog .message="${this.messageText}" .showMessage="${this.showMessageDialog}"></mym-message-dialog>
                </div>
                <div>
                    <div class="form_field">
                
                    </div>
                    <div class="form_field">
                        <span class="field_title" style="">FROM
                            <mym-tooltip allowHTML="true" tooltipContent="Monero makes transactions<br>with your 'available outputs',<br>so part of your balance will<br>be briefly locked and then<br>returned as change.">?</mym-tooltip>
                        </span>
                        <wallet-selector .wallets=${this.wallets}></wallet-selector>
                </div>
                <div class="form_field" style="position: relative; left: 0px; top: 0px; padding: 2px 22px 0px;">
                    <span class="field_title" style="user-select: none; display: block; margin: 0px 0px 8px 8px; text-align: left; color: rgb(248, 247, 248); font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300;">AMOUNT</span>
                    <input class="field_value currency_value" type="text" placeholder="00.00">
                    <select class="currency_select">
                        <option value="XMR" style="text-align: center;">XMR</option>
                        <option value="USD" style="text-align: center;">USD</option>
                        <option value="AUD" style="text-align: center;">AUD</option>
                        <option value="BRL" style="text-align: center;">BRL</option>
                        <option value="CAD" style="text-align: center;">CAD</option>
                        <option value="CHF" style="text-align: center;">CHF</option>
                        <option value="CNY" style="text-align: center;">CNY</option>
                        <option value="EUR" style="text-align: center;">EUR</option>
                        <option value="GBP" style="text-align: center;">GBP</option>
                        <option value="HKD" style="text-align: center;">HKD</option>
                        <option value="INR" style="text-align: center;">INR</option>
                        <option value="JPY" style="text-align: center;">JPY</option>
                        <option value="KRW" style="text-align: center;">KRW</option>
                        <option value="MXN" style="text-align: center;">MXN</option>
                        <option value="NOK" style="text-align: center;">NOK</option>
                        <option value="NZD" style="text-align: center;">NZD</option>
                        <option value="SEK" style="text-align: center;">SEK</option>
                        <option value="SGD" style="text-align: center;">SGD</option>
                        <option value="TRY" style="text-align: center;">TRY</option>
                        <option value="RUB" style="text-align: center;">RUB</option>
                        <option value="ZAR" style="text-align: center;">ZAR</option>
                    </select>
                    <div class="select_indicator">
                        <!-- responsible for the dropdown image indicator on the select -->
                    </div>
                    <a class="clickableLinkButton max_button">MAX</a>
                    <br clear="both">
                    <div>
                        <span class="field_title">+ 0.000066009466 XMR EST. FEE <mym-tooltip allowHTML="true" tooltipHeader="" tooltipContent="Based on Monero network<br>fee estimate (not final).<br><br>MyMonero does not charge<br>a transfer service fee.">?</mym-tooltip></span>
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
                </div>
                <div style="display: none;"><span class="field_title" style="user-select: none; display: block; margin: 12px 0px 8px 8px; text-align: left; color: rgb(248, 247, 248); font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300;">MONERO ADDRESS
                </span><div style="border-radius: 3px; background-color: rgb(56, 54, 56); padding: 8px 11px; box-sizing: border-box; width: 100%; height: auto; color: rgb(124, 122, 124); font-size: 13px; font-weight: 100; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; word-break: break-all;">
                </div>
                </div><div style="display: none;"><span class="field_title" style="user-select: none; display: block; margin: 6px 0px 8px 8px; text-align: left; color: rgb(248, 247, 248); font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300;">PAYMENT ID
                </span><div style="border-radius: 3px; background-color: rgb(56, 54, 56); padding: 8px 11px; box-sizing: border-box; width: 100%; height: auto; color: rgb(124, 122, 124); font-size: 13px; font-weight: 100; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; word-break: break-all;">
                </div><div class="iconAndMessageLayer" style="font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 11px; font-weight: 100; color: rgb(141, 139, 141);"><img src="../../assets/img/detectedCheckmark@3x.png" width="9px" height="7px">&nbsp;<span>Detected
                </span>
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
                            <option value="1" style="text-align: center;">Low</option>
                            <option value="2" style="text-align: center;">Medium</option>
                            <option value="3" style="text-align: center;">High</option>
                            <option value="4" style="text-align: center;">Very High</option>
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
        `;
    }
    useCamera() {
        console.log("camera");
    }
    handleFilepickerChange(event) {
        console.log(event);
        var eventPath = event.path || (event.composedPath && event.composedPath());
        if (eventPath[0].id = "file-picker") {
            console.log(eventPath[0].value);
            console.log(eventPath[0].files);
            const image = document.createElement('img');
            let imageSrc = URL.createObjectURL(eventPath[0].files[0]);
            let httpsSrc = imageSrc.replace('http', 'https');
            image.src = httpsSrc;
            let imageData = getImageData(image);
            console.log(imageData);
            console.log(image, image.width, image.height);

            const width = 256
            const height = 256
            //
            const canvas = document.createElement("canvas")
            const context = canvas.getContext("2d")
            canvas.width = width
            canvas.height = height
            
            const img = new Image()
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