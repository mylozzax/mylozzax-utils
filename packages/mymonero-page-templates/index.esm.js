/* Require reusable components */
require("@mylozzax/mylozzax-web-components");

/* Require various view elements */
require("./src/Exchange/Elements/ChangenowBuyWithFiatView");
require("./src/Exchange/Elements/ChangenowFixedRateView")
require("./src/Exchange/Elements/ChangenowFloatingRateView");
require("./src/Yat/Elements/YatSettingsView");

/* Import exchange landing page class */
import ExchangeLandingPage from "./src/Exchange/Elements/ExchangeLandingPage";
import ExchangeNavigationController from "./src/Exchange/Controllers/ExchangeNavigationController";

/* Export page templates */
export default { 
    ExchangeLandingPage,
    ExchangeNavigationController
}
