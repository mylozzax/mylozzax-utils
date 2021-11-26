import { html, css, LitElement } from 'lit';
//import ExchangeNavigationController from "../../../mymonero-page-templates";
//console.log(ExchangeNavigationController);

export class MessageDialog extends LitElement {
  static get styles() {
    return css`
        .message-dialog {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            width: calc(100% - 48px);
            margin-left: 24px;
            background: rgba(245, 230, 125, 0.05);
            border: 0.5px solid rgba(245, 230, 125, 0.30);
            border-radius: 3px;
            min-height: 29px;
            box-sizing: border-box;
            margin-left: 0;
            margin-right: 0;
            padding: 6px 8px 8px 8px;
            margin-top: 15px;
            margin-bottom: 10px;
            height: auto;
            width: 100%;
            color: #F5E67E;
            font-size: 11px;
            font-weight: 400;
            letter-spacing: 0.5px;
            -webkit-font-smoothing: subpixel-antialiased;
            word-break: break-word;
            position: relative;
            top: 0;
            left: 0;
        }

        .close-button {
            background-image: url(../../../assets/img/inlineMessageDialog_closeBtn@3x.png);
            background-size: 8px 8px;
            background-repeat: no-repeat;
            background-position: center;
            width: 27px;
            height: 27px;
            position: absolute;
            right: 0px;
            top: 0px;
            display: block;
            opacity: 0.8;
            transition: opacity 0.05s ease-out;
        }
        `;
      }

    static get properties() {
        return {
            message: { type: String },
            showMessage: { type: Boolean }
            // context: { type: Object } // we'll probably never need this
        }
    }

  constructor() {
    super();
  }

  hideMessage() {

    let options = {
        detail: { 
            showMessage: false
        },
        bubbles: true,
        composed: true
    };
    let messageDialogUpdated = new CustomEvent("mym-message-dialog-close", options)
    this.dispatchEvent(messageDialogUpdated, options);
  }

  render() {
    return html`
        <div class="message-dialog" ?hidden=${!this.showMessage}>
            <span>${this.message}</span>
            <a href="#" class="close-button" style="display: block;" @click=${this.hideMessage}></a>
        </div>
    `
  }

}

/*

*/

customElements.define('mym-message-dialog', MessageDialog);


