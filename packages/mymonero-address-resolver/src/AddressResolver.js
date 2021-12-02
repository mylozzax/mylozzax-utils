"use strict"
import jsQR from 'jsqr';
import YatMoneroLookup from "@mymonero/mymonero-yat-lookup/index.esm"
import OpenAlias from "../../mymonero-openalias";
console.log(OpenAlias);
class AddressResolver {
    constructor(options = {}) {
        this.currency = options.currency || "XMR"
        this.yatMoneroLookup = new YatMoneroLookup.YatMoneroLookup();
        this.openAlias = new OpenAlias();
    }

    _hasEmojiCharacters(string) {
        return /\p{Extended_Pictographic}/u.test(enteredPossibleAddress)
    }

    _isValidYatHandle(string) {
        return this.yatMoneroLookup.isValidYatHandle(string)
    }

    async lookupYatAddress() {
        const lookup = yatMoneroLookup.lookupMoneroAddresses(enteredPossibleAddress).then((responseMap) => {
            // Our library returns a map with between 0 and 2 keys
            if (responseMap.size == 0) {
                // no monero address
                let errorString = `There is no Monero address associated with "${enteredPossibleAddress}"`
                return false;
            } else if (responseMap.size == 1) {
                // Either a Monero address or a Monero subaddress was found.
                let iterator = responseMap.values();
                let record = iterator.next();
                //self._displayResolvedAddress(record.value);
                return record.value;
            } else if (responseMap.size == 2) {
                let moneroAddress = responseMap.get('0x1001');
                return moneroAddress
                //self._displayResolvedAddress(moneroAddress);
            }
        }).catch((error) => {
            // Handling Axios errors: 
            // If the error status is defined, handle this error according to the HTTP error status code
            if (typeof(error.response) !== "undefined" && typeof(error.response.status) !== "undefined") {
                if (error.response.status == 404) {
                    // Yat not found
                    let errorString = `The Yat "${enteredPossibleAddress}" does not exist`
                    //throw new Error(errorString);
                    return false;
                } else if (error.response.status >= 500) {
                    // Yat server / remote network device error encountered
                    let errorString = `The Yat server is responding with an error. Please try again later. Error: ${error.message}`
                    throw new Error(errorString);
                    //self.validationMessageLayer.SetValidationError(errorString);
                    return;
                } else {
                    // Response code that isn't 404 or a server error (>= 500) on their side  
                    let errorString = `An unexpected error occurred when looking up the Yat Handle: ${error.message}`
                    //self.validationMessageLayer.SetValidationError(errorString);
                    throw new Error(errorString);
                    return;
                }
            } else {
                // Network connectivity issues -- could be offline / Yat server not responding
                let errorString = `Unable to communicate with the Yat server. It may be down, or you may be experiencing internet connectivity issues. Error: ${error.message}`
                //self.validationMessageLayer.SetValidationError(errorString);
                throw new Error(errorString);
                // If we don't have an error.response, our request failed because of a network error
            }
        });
    }

    async resolveAddressFromString(string) {
        // yat
        console.log("Resolving: ", string)

        if (this._hasEmojiCharacters) {
            if (this._isValidYatHandle(string)) {
                try {
                    let moneroAddress = await this.lookupYatAddress(string);
                    return moneroAddress;
                } catch (e) {
                    e.errorType = "yat-lookup";
                    console.log("Error encountered when looking up Yat address");
                    throw e;
                }
            }
        }
        // openAlias -- this would be a URL of some manner, so a brief check for a period would suffice
        if (string.indexOf('.') != -1) {
            // Address has a period, attempt to look up data
            var currencyToFind = this.currency;
            try {
                let lookupResult = await this.openAlias.lookup(string);
                let objToReturn = null;
                
                if (lookupResult instanceof Array && lookupResult.length > 0) {
                    for (let obj of lookupResult) {
                        if (obj.currency.toUpperCase() == currencyToFind.toUpperCase()) {
                            objToReturn = obj;
                            return obj;
                        }
                    }
                }
                
                if (objToReturn !== null) {
                    return objToReturn;
                }

                return "no records found";
            } catch (error) {
                switch (error.message) {
                    case "no response":
                        throw error;
                        break;
                    case "no records found":
                        return false;
                        break;
                    default:
                        throw error;
                        break;
                }
            }
        }
        // email...?
    }

    check

    resolveAddressFromQRImageBlob() {

    }

    getAddressAndPaymentDataFromBase64QRCode(qrSrc) {
        
    }
}

export default AddressResolver