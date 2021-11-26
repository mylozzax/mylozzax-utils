import ("@mymonero/mymonero-web-components");

 /* Require various view elements */
require("./src/Exchange/Elements/ChangenowBuyWithFiatView");
require("./src/Exchange/Elements/ChangenowFixedRateView")
require("./src/Exchange/Elements/ChangenowFloatingRateView");
require("./src/SendFunds/Elements/SendFundsView");

import AuthenticationLandingPage from "./src/Authentication/Elements/AuthenticationView");
import AuthenticationController from "./src/Authentication/Controller/AuthenticationController");

 /* Import exchange landing page class */
import ExchangeLandingPage from "./src/Exchange/Elements/ExchangeLandingPage";
import ExchangeNavigationController from "./src/Exchange/Controllers/ExchangeNavigationController";
import SendFundsView from "./src/SendFunds/Elements/SendFundsView";
import SendFundsController from "./src/SendFunds/Controllers/SendFundsController";

 /* Export page templates */
 export default {
    AuthenticationView,
    AuthenticationLandingPage,
    ExchangeLandingPage,
    ExchangeNavigationController,
    SendFundsView,
    SendFundsController
 }