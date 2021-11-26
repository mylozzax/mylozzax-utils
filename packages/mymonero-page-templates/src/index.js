/* Require reusable components */
//require("@mymonero/mymonero-web-components");
//require("./node_modules/@mymonero/mymonero-web-components");
//require("@mymonero/mymonero-web-components");

/* Require various view elements */

require("./Exchange/Elements/ChangenowBuyWithFiatView");
require("./Exchange/Elements/ChangenowFixedRateView")
require("./Exchange/Elements/ChangenowFloatingRateView");
require("./SendFunds/Elements/SendFundsView");
/* Import exchange landing page class */
let AuthenticationLandingPage = require("./Authentication/Elements/AuthenticationView");
let AuthenticationController = require("./Authentication/Controller/AuthenticationController");

let ExchangeLandingPage = require("./Exchange/Elements/ExchangeLandingPage");
let ExchangeNavigationController = require("./Exchange/Controllers/ExchangeNavigationController");

let SendFundsView = require("./Exchange/Controllers/SendFundsView");
let SendFundsNavigationController = require("./Exchange/Controllers/SendFundsNavigationController");

/* Export page templates */
module.exports = {
    AuthenticationView,
    ExchangeLandingPage,
    ExchangeNavigationController,
    SendFundsView,
    SendFundsController
}