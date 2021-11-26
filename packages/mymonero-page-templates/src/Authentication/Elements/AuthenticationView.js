import { html, css, LitElement } from 'lit';
import AuthenticationController from "../Controllers/AuthenticationController";


export default class AuthenticationView extends AuthenticationController(LitElement) {
    static get styles() {
        return css`
            .slidein {
                transition: 0.5s;
                transform: translateY(100%);
            }
            
            .authentication-wrapper {
                transition: 0.5s;
                transform: translateY(-100%);
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
                background-color: rgb(29, 27, 29);
                app-region: no-drag;
            }
        `;
    }
    
    constructor() {
        super();
    }
    
    render() {
        // We're going to use conditionals and classes to determine which elements to hide
        return html`
            <div class="authentication-wrapper">
                <div class="authentication-navigation-bar">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="authentication-input-wrapper">
                    <div class="authentication-title">
                    PIN
                    </div>
                    <div class="authentication-input">
                        <input type="password" placeholder="To continue" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    </div>
                </div>
            </div>
            <!-- <div style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; background-color: rgb(39, 37, 39); z-index: 10;" class=""><div class="NavigationBarView" id="NavigationBarView" style="position: absolute; top: 0%; z-index: 9; width: 100%; height: 41px; background-color: rgb(39, 37, 39); app-region: drag; user-select: none;"><div style="position: absolute; width: 100%; height: 41px; background-color: rgb(39, 37, 39);">
            </div>
            <span class="title-label" style="color: rgb(252, 251, 252); position: absolute; top: -1px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; font-weight: bold; box-sizing: border-box; left: calc(15% + 16px); width: calc((70% - 32px) - 0px); padding-left: 0px; height: 41px; text-align: center; line-height: 41px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Authenticate
            </span>
            <div id="leftBarButtonHolderView" class="nav-button-left-container"><div class="hoverable-cell utility disableable" style="cursor: default; border-radius: 3px; height: 24px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; text-align: center; border: none; text-decoration: none; line-height: 24px; box-sizing: border-box; width: auto; padding: 0px 8px; box-shadow: rgb(73, 71, 73) 0px 0.5px 0px 0px inset; background-color: rgb(56, 54, 56); color: rgb(252, 251, 252); font-size: 13px; font-weight: 600; display: block; float: left; margin-top: 10px; app-region: no-drag; position: absolute; left: 0px;">Cancel
            </div>
            </div>
            <div id="rightBarButtonHolderView" class="nav-button-right-container" style="right: 16px;"><div class="hoverable-cell action disabled" style="cursor: default; border-radius: 3px; height: 24px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; text-align: center; border: none; text-decoration: none; line-height: 24px; box-sizing: border-box; width: auto; padding: 0px 8px; background-color: rgb(56, 54, 56); box-shadow: none; color: rgb(107, 105, 107); font-weight: 600; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; letter-spacing: 0.5px; float: right; margin-top: 10px; app-region: no-drag; position: absolute; right: 0px;">Next
            </div>
            </div>
            </div>
            <div id="stack-view-stage-view" style="z-index: 1; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;"><div style="background-color: rgb(39, 37, 39); padding-top: 41px; width: 100%; height: calc(100% - 41px);"><table style="height: 100%; width: 100%; margin-top: -26px;"><tr style="width: 100%; height: 100%;"><td align="center" style="width: 100%; height: 100%;"><div style="width: 272px; text-align: left;"><span class="field_title" style="">PIN
            </span><input class="field_value" type="password" placeholder="To continue" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="display: block; height: 32px; width: 256px; border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0); text-align: left; font-size: 13px; font-weight: 200; padding: 0px 7px; font-family: Native-Light, input, menlo, monospace; outline: none; box-shadow: rgb(22, 20, 22) 0px 0.5px 0px 0px inset; color: rgb(223, 222, 223); background-color: rgb(29, 27, 29); app-region: no-drag;"><p style="font-size: 11px; font-family: Native-Regular, input, menlo, monospace; font-weight: lighter; line-height: 15px; margin: 7px 7px 0px; color: rgb(249, 119, 119); word-break: break-word; user-select: none; height: 24px;">
            </p>
            </div>
            </td>
            </tr>
            </table>
            </div>
            </div>
            </div> -->
        `;
    }

}

customElements.define('mym-authentication-view', AuthenticationView);