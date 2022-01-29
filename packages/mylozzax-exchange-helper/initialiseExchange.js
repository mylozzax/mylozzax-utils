"use strict"

const { handleOfferError } = require("./ErrorHelper");
const { updateCurrencyLabels } = require("./EventListeners");
const ExchangeHelper = require("./index")
const Utils = require("./UtilityFunctions");

function checkDecimals (value, decimals) {
  const str = value.toString()
  const strArr = str.split('.')
  if (strArr.length > 1) {
    if (strArr[1].length >= decimals) {
      return false
    }
  }
  return true
}

// Tests whether the keypress is valid, checks currency precision, aborts if either fail
function outCurrencyValueKeydownListener(event, exchangeHelper) {
  // We need to handle two different use cases here: Android app, or desktop / web apps
  // Android sends an InputEvent where event.which is undefined
  // Traditional platforms send a Key
  
  // We need to check in this fashion because isNaN will return true for a string containing commas
  let allowableCharacters = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", ","
  ]

  var eventPath = event.path || (event.composedPath && event.composedPath());
  if (event.inputType == "insertText") {
    if (allowableCharacters.includes(event.data)) {
      return true;
    } else {
      return false;
    }
  }

  if ((event.inputType == "deleteContentForward" || 
      event.inputType == "deleteContentBackward" ||
      event.inputType == "insertFromPaste") && 
      eventPath[0].value.length > 0) {
    let valueToTest = eventPath[0].value;
    if (!isNaN(valueToTest)) {
      return true;
    } else {
      return false;
    }
  }


  //event.preventDefault()
}

// Tests whether the keypress is valid, checks currency precision, aborts if either fail
function currencyValueKeydownListener(event, exchangeHelper) {
  // insertText
  //let inCurrencyValue = document.getElementById('inCurrencyValue');

  // It might not be necessary, but we check values in this manner because certain locales may use commas as decimal separators 
  // isNaN will return true for a string containing commas
  // let allowableCharacters = [
  //   "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."
  // ]
  // if (event.inputType == "insertText") {
  //   if (allowableCharacters.includes(event.data)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  
  if ((event.inputType == "deleteContentForward" || 
      event.inputType == "deleteContentBackward" ||
      event.inputType == "insertFromPaste" ||
      event.inputType == "insertText" ) && 
      event.path[0].value.length > 0) {
    let valueToTest = event.path[0].value;
    if (!isNaN(valueToTest)) {
      return true;
    } else {
      return false;
    }
  }
  //if (event.inputType = "de")
  // Test whether the key is allowed or not, and abort execution if not allowed
  // let allowableKeyArray = [37, 39, 46, 8]; // arrow keys, delete, backspace
  // if (exchangeHelper.isValidKey(event, allowableKeyArray)) {
  //   // These are valid keypresses, but we don't need to request an offer from the API
  //   return false
  // }

  // let currencyTickerCode = document.getElementById("inCurrencySelectList").value;
  // // We need to limit the number of decimals based on the selected currency
  // // checkDecimals returns false if we exceed the second parameter in decimal places
  // if (!checkDecimals(inCurrencyValue.value, exchangeHelper.currencyMetadata[currencyTickerCode].precision)) {
  //   event.preventDefault()
  //   return false
  // }

  // allowableKeyArray = [110, 46, 190] // decimal point, delete, period
  // if (exchangeHelper.isValidKey(event, allowableKeyArray)) {
  //   // These are valid keypresses, but we don't need to request an offer from the API
  //   return false
  // }
  
  // // numpad 0-9, numeric 0-9
  // if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105)) {
  //   // These are valid keypresses. Return true 
  //   return true
  // }

  //event.preventDefault()
}

function initialiseExchangeHelper(context, exchangeHelper) {
    // This isn't great for migrating to an external library, but presently, we bind `this` when we invoke this function in ECV.web.js
    const order = {}
    let orderStarted = false
    let orderCreated = false
    // let backBtn = document.getElementsByClassName('nav-button-left-container')[0];
    // backBtn.style.display = "none";
    let exchangePage = document.getElementById('exchangePage')
    let outAddressInput = document.getElementById('outAddress')
    let walletSelector = document.getElementById('wallet-selector')
    let walletOptions = document.getElementById('wallet-options')
    let exchangePageDiv = document.getElementById('exchangePage')
    let orderStatusPage = document.getElementById('orderStatusPage')
    let addressValidation = document.getElementById('address-messages')
    let serverValidation = document.getElementById('server-messages')
    let explanatoryMessage = document.getElementById('explanatory-message')
    let selectedWallet = document.getElementById('selected-wallet')
    let serverRatesValidation = document.getElementById('server-rates-messages')
    let inCurrencyValue = document.getElementById('inCurrencyValue')
    let outCurrencyValue = document.getElementById('outCurrencyValue')
    let validationMessages = document.getElementById('validation-messages')
    let orderBtn = document.getElementById('order-button')
    let orderStatusDiv = document.getElementById('exchangePage')
    let orderTimer = {}
    let currencyInputTimer
    
    // Coordinates the retrieval of a quote given an out currency and a in amount. Returns a value for outCurrencyValue
    // Coordinates the retrieval of a quote given an out currency and a out amount. Returns a value for inCurrencyValue
    let outCurrencyGetOffer = function(inCurrency, outCurrency, outAmount) {
      exchangeHelper.exchangeFunctions.getOfferWithOutAmount(inCurrency, outCurrency, outAmount)
        .then((response) => {
          const LOZZtoReceive = parseFloat(response.in_amount)
          const selectedWallet = document.getElementById('selected-wallet')
          const tx_feeElem = document.getElementById('tx-fee')
          const tx_fee = tx_feeElem.dataset.txFee
          const tx_fee_double = parseFloat(tx_fee)
          const walletMaxSpendDouble = parseFloat(selectedWallet.dataset.walletbalance)
          const walletMaxSpend = walletMaxSpendDouble - tx_fee
          // let BTCToReceive = inCurrencyValue.value * exchangeHelper.exchangeFunctions.currentRates.price;
          // let LOZZbalance = parseFloat(inCurrencyValue.value);
          const BTCCurrencyValue = parseFloat(outCurrencyValue.value)

          if ((walletMaxSpend - LOZZtoReceive) < 0) {
            const error = document.createElement('div')
            error.classList.add('message-label')
            error.id = 'lozzexceeded'
            error.innerHTML = `You cannot exchange more than ${walletMaxSpend} LOZZ`
            validationMessages.appendChild(error)
          }

          if (BTCCurrencyValue.toFixed(12) > exchangeHelper.exchangeFunctions.currentRates.upper_limit) {
            const error = document.createElement('div')
            error.id = 'lozzexceeded'
            error.classList.add('message-label')
            const btc_amount = parseFloat(exchangeHelper.exchangeFunctions.currentRates.upper_limit)
            error.innerHTML = `You cannot exchange more than ${btc_amount} BTC.`
            validationMessages.appendChild(error)
          }
          if (BTCCurrencyValue.toFixed(8) < exchangeHelper.exchangeFunctions.currentRates.lower_limit) {
            const error = document.createElement('div')
            error.id = 'lozztoolow'
            error.classList.add('message-label')
            const btc_amount = parseFloat(exchangeHelper.exchangeFunctions.currentRates.lower_limit)
            error.innerHTML = `You cannot exchange less than ${btc_amount} BTC.`
            validationMessages.appendChild(error)
          }
          inCurrencyValue.value = LOZZtoReceive.toFixed(12)
        }).catch((error) => {
          exchangeHelper.errorHelper.handleOfferError;
        })
    }

    const outputBalanceChecks = exchangeHelper.eventListeners.outBalanceChecks;
    const inBalanceChecks = exchangeHelper.eventListeners.inBalanceChecks;

    function getRates() {
      // it's safe to refresh the sending fee here, because we know the HTML exists in the DOM
      //self._refresh_sending_fee();
      let currencyInputTimer, addressInputTimer;
      const exchangePage = document.getElementById('orderStatusPage')
      const loaderPage = document.getElementById('loader')
      const outAddressInput = document.getElementById('outAddress')
      const inCurrencyValue = document.getElementById('inCurrencyValue')
      const outCurrencyValue = document.getElementById('outCurrencyValue')
      const inCurrencyTickerCodeDiv = document.getElementById('inCurrencySelectList')
      const outCurrencyTickerCodeDiv = document.getElementById('outCurrencySelectList')
      const orderBtn = document.getElementById('order-button')
      const explanatoryMessage = document.getElementById('explanatory-message')
      const serverRatesValidation = document.getElementById('server-rates-messages')
      const validationMessages = document.getElementById('validation-messages')
      const walletSelector = document.getElementById('wallet-selector')
      const walletOptions = document.getElementById('wallet-options')
      const exchangePageDiv = document.getElementById('exchangePage')
      const orderStatusPage = document.getElementById('orderStatusPage')
      const addressValidation = document.getElementById('address-messages')
      const serverValidation = document.getElementById('server-messages')
      const selectedWallet = document.getElementById('selected-wallet')
      const orderStatusDiv = document.getElementById('exchangePage')
      const getOfferLoader = document.getElementById('getOfferLoader')
      const getAddressValidationLoader = document.getElementById('addressValidationLoader')
      const getOfferLoaderText = document.getElementById('activityLoaderText');
      const getAddressValidationLoaderText = document.getElementById('addressValidationLoaderText');
      const getAddressValidationLoaderContainer = document.getElementById('addressValidationLoaderContainer');
      const sendFundsBtn = document.getElementById('exchange-lozz');
      const minimumFeeText = document.getElementById('minimum-fee-text');
      const txFee = document.getElementById('tx-fee');
      const orderCreationLoader = exchangeHelper.htmlHelper.getOrderCreationLoader();
      console.log(orderCreationLoader);
      console.log(typeof(orderCreationLoader));
      let offerRetrievalIsSlowTimer, offerType
      
      console.log(exchangeHelper);


      // Check to see if we've created an order. If so, we exit here so that we don't fetch server config and render from scratch for a second time
      if (exchangePageDiv.classList.contains("active")) {
        return;
      }

      let exchangeElements = {
        exchangePage: exchangePage,
        loaderPage: loaderPage,
        outAddressInput: outAddressInput,
        inCurrencyValue: inCurrencyValue,
        outCurrencyValue: outCurrencyValue,
        orderBtn: orderBtn,
        explanatoryMessage: explanatoryMessage,
        serverRatesValidation: serverRatesValidation,
        validationMessages: validationMessages,
        walletSelector: walletSelector,
        walletOptions: walletOptions,
        exchangePageDiv: exchangePageDiv,
        orderStatusPage: orderStatusPage,
        addressValidation: addressValidation,
        serverValidation: serverValidation,
        selectedWallet: selectedWallet,
        orderStatusDiv: orderStatusDiv,
        orderStarted: orderStarted,
        orderTimer: orderTimer,
        inCurrencyTickerCodeDiv,
        outCurrencyTickerCodeDiv,
        currencyInputTimer,
        addressInputTimer,
        getOfferLoader,
        offerRetrievalIsSlowTimer,
        getOfferLoaderText,
        sendFundsBtn,
        getAddressValidationLoader,
        getAddressValidationLoaderText,
        getAddressValidationLoaderContainer,
        minimumFeeText,
        txFee,
        offerType,
        orderCreationLoader
      }

      console.log(exchangeElements);

      // Gets the initial minimum value
      Utils.getMinimalExchangeAmount("LOZZ", "BTC").then(response => {
        // let minimumAmount = parseFloat(response.minAmount);
        let minimumAmount = parseFloat(response.data.in_min);
        exchangeElements.minimumFeeText.innerText = `${minimumAmount} LOZZ minimum (excluding tx fee)`;
        exchangeElements.minimumFeeText.dataset.minimumAmount = minimumAmount;
      }).catch(error => {
        exchangeElements.minimumFeeText.innerText = "An error was encountered when fetching the minimum: " + error.message;
      })
      
      outCurrencyTickerCodeDiv.addEventListener('change', function(event) {
        exchangeHelper.eventListeners.outCurrencySelectListChangeListener(event, exchangeElements);
        clearSlowCurrencyRetrievalTimer(exchangeElements);
        updateCurrencyLabels(event, exchangeElements);
      })

      inCurrencyValue.addEventListener('input', exchangeHelper.eventListeners.inCurrencyValueKeydownListener)
      outCurrencyValue.addEventListener('input', exchangeHelper.eventListeners.outCurrencyValueKeydownListener)
      
      // Event listener for validating destination address
      outAddressInput.addEventListener('input', function(event) {
        clearTimeout(exchangeElements.retrievalTimer);
        clearSlowAddressRetrievalTimer(exchangeElements);
        exchangeElements.getAddressValidationLoaderContainer.style.display = "block";
        exchangeElements.getAddressValidationLoaderText.innerHTML = `<span id="addressValidationLoaderText">&nbsp;Validating Address</span>`;
        exchangeElements.getAddressValidationLoader.style.display = "block";
        exchangeElements.retrievalTimer = setTimeout(() => {
          try {
            initialiseSlowAddressRetrievalTimer(exchangeElements);
            exchangeHelper.eventListeners.outAddressInputListener(exchangeElements, outCurrencyTickerCodeDiv.value, outAddressInput.value).then(response => {
              clearSlowAddressRetrievalTimer(exchangeElements);
            }).catch((error) => {
              clearSlowAddressRetrievalTimer(exchangeElements);
            });
          } catch (error) {
            clearSlowAddressRetrievalTimer(exchangeElements);
            console.log(error.message);
          }
        }, 2500)
      })
      
      walletSelector.addEventListener('click', function(event) {
        exchangeHelper.eventListeners.walletSelectorClickListener(event, exchangeElements) 
      });

      function initialiseSlowAddressRetrievalTimer(exchangeElements) {
        exchangeElements.addressRetrievalTimer = setTimeout(() => {
          exchangeElements.getAddressValidationLoaderText.innerText = "Verifying the destination address is taking longer than expected. Please be patient"
        }, 3000)
      }

      function clearSlowAddressRetrievalTimer(exchangeElements) {
        clearTimeout(exchangeElements.addressRetrievalTimer)
      }

      // Binds to "Create order"
      orderBtn.addEventListener('click', function (event) {
        orderBtnClicked(exchangeElements, exchangeHelper.exchangeFunctions)
      })

      function initialiseSlowCurrencyRetrievalTimer(exchangeElements) {
        exchangeElements.offerRetrieval = setTimeout(() => {
          exchangeElements.getOfferLoaderText.innerText = "Retrieving an offer is taking longer than expected. Please be patient"
        }, 3000)
      }

      function clearSlowCurrencyRetrievalTimer(exchangeElements) {
        clearInterval(exchangeElements.offerRetrieval)
      }

      outCurrencyValue.addEventListener('input', function(event) { 
        validationMessages.innerHTML = ''
        clearSlowCurrencyRetrievalTimer(exchangeElements);
        if (outCurrencyValue.value.length > -1) {
          if (outCurrencyValueKeydownListener(event, exchangeHelper) ) {
            exchangeElements.getOfferLoader.style.display = "block";
            try {
              initialiseSlowCurrencyRetrievalTimer(exchangeElements)
              exchangeHelper.eventListeners.outBalanceChecks(exchangeElements, exchangeHelper.exchangeFunctions).then((response) => {
                clearSlowCurrencyRetrievalTimer(exchangeElements)
                exchangeElements.getOfferLoader.style.display = "none";
              }).catch((error) => {
                  clearSlowCurrencyRetrievalTimer(exchangeElements)
                  exchangeElements.getOfferLoader.style.display = "none";
                  let errorDiv = exchangeHelper.errorHelper.handleOfferError(error);
                  serverValidation.appendChild(errorDiv);
              }).finally(() => {
                exchangeElements.getOfferLoaderText.innerText = "Fetching offer"
              })
            } catch (error) {
              //handleOfferError(error);
              console.log(error.message);
            }
          } else {
            validationMessages.innerHTML = 'Please specify an amount using only numbers and a period'
          }
        }
      })

      // Add inBalanceChecks listener
      inCurrencyValue.addEventListener('input', function (event) {
        exchangeElements.getOfferLoaderText.innerText = "Fetching offer"
        exchangeElements.offerType = "in";
        validationMessages.innerHTML = ''
        clearSlowCurrencyRetrievalTimer(exchangeElements);
        if (inCurrencyValue.value.length > 0) {
          if (currencyValueKeydownListener(event, exchangeHelper) ) {
            exchangeElements.getOfferLoader.style.display = "block";
            try {
              initialiseSlowCurrencyRetrievalTimer(exchangeElements)
              exchangeHelper.eventListeners.inBalanceChecks(exchangeElements, exchangeHelper.exchangeFunctions).then((response) => {
                clearSlowCurrencyRetrievalTimer(exchangeElements)
                exchangeElements.getOfferLoader.style.display = "none";
            }).catch((error) => {
                clearSlowCurrencyRetrievalTimer(exchangeElements)
                exchangeElements.getOfferLoader.style.display = "none";
                let errorDiv = exchangeHelper.errorHelper.handleOfferError(error);
                serverValidation.appendChild(errorDiv);
              }).finally(() => {
                exchangeElements.getOfferLoaderText.innerText = "Fetching offer"
              })
            } catch (error) {
              //handleOfferError(error);
              exchangeElements.getOfferLoader.style.display = "none";
              clearSlowCurrencyRetrievalTimer(exchangeElements);
              console.log(error.message);
            }
          } else {
            validationMessages.innerHTML = 'Please specify an amount using only numbers and a period'
          }
        }
      })

      outCurrencyValue.addEventListener('input', function (event) {
        validationMessages.innerHTML = ''
        clearSlowCurrencyRetrievalTimer(exchangeElements)
        exchangeElements.getOfferLoaderText.innerText = "Fetching offer"
        exchangeElements.offerType = "out";
        if (outCurrencyValue.value.length > 0) {
          if (currencyValueKeydownListener(event, exchangeHelper) ) {
            exchangeElements.getOfferLoader.style.display = "block";
            try {
              initialiseSlowCurrencyRetrievalTimer(exchangeElements)
              exchangeHelper.eventListeners.outBalanceChecks(exchangeElements, exchangeHelper.exchangeFunctions).then((response) => {                    
                clearSlowCurrencyRetrievalTimer(exchangeElements)
                exchangeElements.getOfferLoader.style.display = "none";
              }).catch((error) => {
                clearSlowCurrencyRetrievalTimer(exchangeElements)
                  exchangeElements.getOfferLoader.style.display = "none";
                  let errorDiv = exchangeHelper.errorHelper.handleOfferError(error);
                  serverValidation.appendChild(errorDiv);
              }).finally(() => {
                exchangeElements.getOfferLoaderText.innerText = "Fetching offer"
              })
            } catch (error) {
              clearSlowCurrencyRetrievalTimer(exchangeElements)
              exchangeElements.getOfferLoader.style.display = "none";
              console.log(error.message);
            }
          } 
        }
      })
      
      serverRatesValidation.innerHTML = ''
      const retry = document.getElementById('retry-rates')
      const errorDiv = document.getElementById('retry-error')
      if (retry !== null) {
        retry.classList.add('hidden')
        errorDiv.classList.add('hidden')
      }
      
      // We attempt to retrieve enabled currency pairs from the server
      exchangeHelper.exchangeFunctions.getCurrencyPairs().then((response) => {
        
        response = {"out_currencies":[
          {"name":"Bitcoin","symbol":"BTC"},
          {"name":"Ether","symbol":"ETH"},
          {"name":"Litecoin","symbol":"LTC"},
          {"name":"Bitcoin Cash","symbol":"BCH"},
          {"name":"Polkadot","symbol":"DOT"}
        ]}
        let outCurrencySelectList = document.getElementById('outCurrencySelectList')
        let length = outCurrencySelectList.length;
        for (let i = length - 1; i >= 0; i--) {
          outCurrencySelectList.options[i].remove();
        }

        let newMetadata = {}
        response.out_currencies.forEach((value => {
          // populate replacement currencyMetadata object with each currency's data
          newMetadata[value.symbol] = {
            name: value.name,
            precision: 8
          }          
          // push onto the options list
          let option = document.createElement("option");
          option.value = value.symbol;
          option.text = value.symbol;
          outCurrencySelectList.options.add(option);
        }))

        // Once the get_pairs endpoint is updated to return precision, we can uncomment the line below to make the coin list fully server-controlled
        // exchangeHelper.currencyMetadata = newMetadata;
        loaderPage.classList.remove('active')
        exchangePage.classList.add('active')
      }).catch((error) => {
        // Error occurred retrieving currency pair data from MYM server -- continue with defaults
        loaderPage.classList.remove('active')
        exchangePage.classList.add('active')
      }).finally(() => {
        let orderBtn = document.getElementById('order-button');
        orderBtn.style.display = "block";
        let message = document.getElementById('explanatory-message');
        message.innerText = "";
        exchangeHelper.exchangeFunctions.initialiseExchangeConfiguration().then((response) => {
          // Data returned by resolve
          // If we get an error, we assume locallozzax should be enabled 
          const locallozzaxDiv = document.getElementById('locallozzax')
          const locallozzaxAnchor = document.getElementById('locallozzax-anchor')
          locallozzaxAnchor.setAttribute('referrer_id', response.data.referrer_info.locallozzax.referrer_id)
          locallozzaxAnchor.setAttribute('url', 'https://locallozzax.co')
          locallozzaxAnchor.setAttribute('param_str', 'rc')

          if (response.data.referrer_info.locallozzax.enabled === true) {
            locallozzaxDiv.style.display = 'block'
            locallozzaxAnchor.addEventListener('click', (event) => {
              exchangeHelper.openClickableLink(event, context);
            })
          }
        }).catch(error => {
          const locallozzaxDiv = document.getElementById('locallozzax')
          const locallozzaxAnchor = document.getElementById('locallozzax-anchor')

          locallozzaxAnchor.setAttribute('referrer_id', 'h2t1')
          locallozzaxAnchor.setAttribute('url', 'https://locallozzax.co')
          locallozzaxAnchor.setAttribute('param_str', 'rc')
          // No data received from promise resolve(). Display link for LocalLozzax
          locallozzaxDiv.style.display = 'block'
          locallozzaxAnchor.addEventListener('click', (event) => {
            exchangeHelper.openClickableLink(event, context);
          })
        })
      })
    }

    

        
  
        
  
        function isValidBase10Decimal (number) {
          const str = number.toString()
          const strArr = str.split('.')
          if (strArr.size > 1 && typeof (strArr) === Array) {
            return false
          }
          for (let i = 0; i < 2; i++) {
            if (isNaN(parseInt(strArr[i]))) {
              return false
            }
          }
          if (strArr.size > 1) {
            if (strArr[1].length == 0) {
              return false
            }
          }
          return true
        }
        
        function orderBtnClicked(exchangeElements, exchangeFunctions) {
          
          let validationError = false
          exchangeElements.serverValidation.innerHTML = ''
          if (exchangeElements.orderStarted == true) {
            return
          }
          if (exchangeElements.outAddressInput.value == "") {
            let error = document.createElement("div");
            error.classList.add("message-label");
            error.innerText = "Please ensure you enter a valid destination address";
            exchangeElements.validationMessages.appendChild(error);
            
            return
          }
          if (exchangeElements.validationMessages.firstChild !== null) {
            exchangeElements.validationMessages.firstChild.style.color = '#ff0000'
            validationError = true
            return
          }
          if (exchangeElements.addressValidation.firstChild !== null) {
            exchangeElements.addressValidation.firstChild.style.color = '#ff0000'
            validationError = true
            return
          }
          const outAddress = document.getElementById('outAddress').value
          let firstTick = true
          exchangeElements.orderBtn.style.display = 'none'
          exchangeElements.orderStarted = true
          // backBtn.style.display = "block";
          exchangeElements.loaderPage.classList.add('active')
          let orderStatusResponse = { orderTick: 0 }
          const out_amount = document.getElementById('outCurrencyValue').value
          let in_currency = exchangeElements.inCurrencyTickerCodeDiv.value
          let out_currency = exchangeElements.outCurrencyTickerCodeDiv.value
          try {
            // We've been through the validation by this stage. We can now hide the order button and swap in a loader
            exchangeElements.loaderPage.classList.remove('active')
            exchangeElements.serverValidation.innerHTML = exchangeElements.orderCreationLoader;
            // We check whether the user received a quote on an in_amount or an out_amount, and invoke the appropriate getOffer type accordingly
            let amount;
            if(exchangeElements.offerType == "in") {
              amount = exchangeElements.inCurrencyValue.value
            } else {
              amount = exchangeElements.outCurrencyValue.value
            }
            //getOffer.bind(exchangeHelper.exchangeFunctions);
            const offer = exchangeHelper.exchangeFunctions.getOffer(in_currency, out_currency, amount, exchangeElements.offerType).then((response) => {
              
            }).then((error, response) => {
              const selectedWallet = document.getElementById('selected-wallet')
              exchangeElements.exchangePageDiv.classList.remove('active')
  
              exchangeHelper.exchangeFunctions.createOrder(outAddress, selectedWallet.dataset.walletpublicaddress, in_currency, out_currency).then((response) => {
                document.getElementById('orderStatusPage').classList.remove('active')
                document.getElementById('orderForm').classList.add('hidden');
                let e = document.getElementById('orderStatusPage');
                e = document.getElementById('orderStatusPage');
                // backBtn.innerHTML = `<div class="base-button hoverable-cell utility grey-menu-button disableable left-back-button" style="cursor: default; -webkit-app-region: no-drag; position: absolute; opacity: 1; left: 0px;"></div>`;
                exchangeElements.orderTimer = setInterval(() => {
                  //exchangeElements.orderStatusPage.classList.add('active')
                  exchangeElements.exchangePageDiv.classList.add('active')
                  exchangeElements.sendFundsBtn.classList.add('active');
                  if (orderStatusResponse.hasOwnProperty('expires_at')) {
                    orderStatusResponse.orderTick++
                    exchangeHelper.renderOrderStatus(orderStatusResponse)
                    const expiryTime = orderStatusResponse.expires_at
                    const secondsElement = document.getElementById('secondsRemaining')
                    const minutesElement = document.getElementById('minutesRemaining')
                    if (secondsElement !== null) {
                      const minutesElement = document.getElementById('minutesRemaining')
                      const timeRemaining = exchangeHelper.timerHelper.getTimeRemaining(expiryTime)
                      minutesElement.innerHTML = timeRemaining.minutes
                      if (timeRemaining.seconds <= 9) {
                        timeRemaining.seconds = '0' + timeRemaining.seconds
                      }
                      secondsElement.innerHTML = timeRemaining.seconds
                      const lozz_dest_address_elem = document.getElementById('in_address')
                      lozz_dest_address_elem.value = response.receiving_subaddress
                    }
                    
                    if (orderStatusResponse.status == 'PAID' 
                    || orderStatusResponse.status == 'TIMED_OUT' 
                    || orderStatusResponse.status == 'DONE' 
                    || orderStatusResponse.status == 'FLAGGED_DESTINATION_ADDRESS' 
                    || orderStatusResponse.status == 'PAYMENT_FAILED' 
                    || orderStatusResponse.status == 'REJECTED' 
                    || orderStatusResponse.status == 'EXPIRED') {
                      clearInterval(exchangeElements.orderTimer)
                      document.getElementById("exchange-lozz").classList.remove("active");
                    }
                    // Check expiry time
                    let now = new Date();
                    let expiryTimeObj = Date.parse(expiryTime);
                    if (now > expiryTimeObj) {
                      clearInterval(exchangeElements.orderTimer)
                      document.getElementById("exchange-lozz").classList.remove("active");
                    }
                  }
                  if ((orderStatusResponse.orderTick % 10) == 0) {
                    exchangeHelper.exchangeFunctions.getOrderStatus().then(function (response) {
                      let elemArr = document.getElementsByClassName('provider-name')
                      if (firstTick == true || elemArr.length > 0) {
                        exchangeHelper.renderOrderStatus(response)
                        elemArr[0].innerHTML = response.provider_name
                        elemArr[1].innerHTML = response.provider_name
                        elemArr[2].innerHTML = response.provider_name
  
                        elemArr = document.getElementsByClassName('outCurrencyTickerCode');
                        elemArr[0].innerHTML = out_currency;
                        elemArr[1].innerHTML = out_currency;
                        firstTick = false
                      }
                      let orderTick = orderStatusResponse.orderTick
                      orderTick++
                      response.orderTick = orderTick
                      orderStatusResponse = response
                    })
                  }
                }, 1000)
                document.getElementById('orderStatusPage').classList.remove('active')
              }).catch((error) => {
                //exchangeHelper.ErrorHelper.handleOfferError(error, exchangeElements);
                let errorDiv = exchangeHelper.errorHelper.handleOfferError(error);
                exchangeElements.serverValidation.innerHTML = "";
                exchangeElements.serverValidation.appendChild(errorDiv);
                exchangeElements.orderBtn.style.display = 'block'
                exchangeElements.orderStarted = false
              })
            }).catch((error) => {
              let errorDiv = exchangeHelper.errorHelper.handleOfferError(error);
              exchangeElements.serverValidation.innerHTML = "";
              exchangeElements.serverValidation.appendChild(errorDiv);
              exchangeElements.orderBtn.style.display = 'block'
              exchangeElements.orderStarted = false
            })
          } catch (error) {
            console.log(error)
          }
        }
        
        setTimeout(() => {
          const exchangeRendered = document.getElementById('orderStatusPage')
          if (exchangeRendered == null) {
            // do nothing -- this loop will run when order page is locked
          } else {
            // In edge cases where wallet hasn't initialised yet but the user has input a valid PIN/pass and clicked exchange tab, prevent an undefined error from being thrown
            if (context.walletsListController.records == "undefined" || context.walletsListController.records.length == "undefined") {
              setTimeout(() => {
                getRates()

              }, 500);
            }
            function clearValidationMessages(callbackFunction = null) {
              if (typeof(callbackFunction) === "function") {
                callbackFunction('test');
              }
            }
            getRates()            
            // Safe to set fee because the DOM will have rendered
            let estimatedTotalFee_JSBigInt = context.lozzax_utils.estimated_tx_network_fee(null, 1, '24658');
            let estimatedFeeStr = exchangeHelper.htmlHelper.newEstimatedNetworkFeeString(estimatedTotalFee_JSBigInt);
            let feeElement = document.getElementById('tx-fee')
            // Safe to set up wallet selector since it'll have been rendered
            let walletSelector = document.getElementById('wallet-selector');
            
            exchangeHelper.renderWalletSelector(context.walletsListController.records, walletSelector);
            exchangeHelper.setSendingFee(estimatedFeeStr, feeElement)
          }
        }, 100)
      }



module.exports = initialiseExchangeHelper