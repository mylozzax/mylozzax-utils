import ("@mymonero/mymonero-web-components");

 /* Require various view elements */
require("./src/Exchange/Elements/ChangenowBuyWithFiatView");
require("./src/Exchange/Elements/ChangenowFixedRateView")
require("./src/Exchange/Elements/ChangenowFloatingRateView");
require("./src/SendFunds/Elements/SendFundsView");

 /* Import exchange landing page class */
import ExchangeLandingPage from "./src/Exchange/Elements/ExchangeLandingPage";
import ExchangeNavigationController from "./src/Exchange/Controllers/ExchangeNavigationController";
import SendFundsView from "./src/SendFunds/Elements/SendFundsView";
import SendFundsController from "./src/SendFunds/Controllers/SendFundsController";

 /* Export page templates */
 export default {
    ExchangeLandingPage,
    ExchangeNavigationController,
    SendFundsView,
    SendFundsController
 }