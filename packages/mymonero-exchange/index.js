const axios = require("axios");
//const fetch = require("fetch");
class ExchangeFunctions {

    constructor() {
        this.apiUrl = "https://api.lozzax.xyz:443/cx";
        // this.apiVersion = "v3";
        // this.currencyToExchange = "xmr2btc";
        this.offer = {};
        this.offer_type = "";
        this.order = {};
        this.orderRefreshTimer = {};
        this.currentRates = {};
        this.orderStatus = {};
        this.exchangeConfiguration = {};
        //this.fetch = fetch;
    }

    initialiseExchangeConfiguration() {
        let self = this;
        // When the new endpoint goes live, we'll uncomment the flow below
        return new Promise((resolve, reject) => {
             let endpoint = `${self.apiUrl}/get_exchange_configuration`;
             axios.get(endpoint)
                .then((response) => {
                    self.exchangeConfiguration = response;
                    resolve(response);
                }).catch((error) => {
                    console.log("Unable to retrieve exchange configuration -- assume defaults");
                    let data = {
                        "referrer_info": {
                            "indacoin": {
                                "referrer_id": "MYM12314",
                                "enabled": false
                            }, 
                            "localmonero": {
                                "referrer_id": "h2t1",
                                "enabled": true
                            }
                        },
                        "btc": {
                            "changenow": {
                                "exchange_workflow": "prepopulates_limits"
                            },
                            "xmrto": {
                                "exchange_workflow": "prepopulate_limits",
                            },
                            "coinswitch": {
                                "exchange_workflow": "returns_limits_on_offer"
                            }
                        },
                        "eth": {
                            "changenow": {
                                "exchange_workflow": "prepopulates_limits",
                            },
                            "coinswitch": {
                                "exchange_workflow": "returns_limits_on_offer"
                            }
                        },
                }
                resolve(data);
                    reject(error);
                })
        

            // For now, here's our dummy data
            
        });
    }

    getOfferWithOutAmount(in_currency, out_currency, out_amount) {
        let data = {
            in_currency,
            out_currency,
            out_amount
        }
            
        const self = this;
        self.offer_type = "out_amount";
        let endpoint = `${self.apiUrl}/get_offer`;
        return new Promise((resolve, reject) => {
            axios.post(endpoint, data)
                .then(function (response) {
                    console.log('outAmount', response);
                    self.offer = response.data;
                    self.offer.out_amount = out_amount;
                    resolve(self.offer);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    getOfferWithInAmount(in_currency, out_currency, in_amount) {
        let data = {
            in_amount,
            in_currency,
            out_currency
        }

        const self = this;
        self.offer_type = "in_amount";
        let endpoint = `${self.apiUrl}/get_offer`;
        return new Promise((resolve, reject) => {
            axios.post(endpoint, data)
                .then(function (response) {
                    console.log('resp from getOfferwithtinamount', response);
                    self.offer = response.data;
                    resolve(self.offer);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }
    
    getOffer(in_currency, out_currency, amount, offerType) {
        return new Promise((resolve, reject) => {
            if (offerType == "in") {
                this.getOfferWithInAmount(in_currency, out_currency, amount).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            } else if (offerType == "out") {
                this.getOfferWithOutAmount(in_currency, out_currency, amount).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            } else {
                // TODO: Handle error a bit more elegantly
                let error = new Error("Please ensure you have specified an amount to exchange");
                console.log(error);
                reject(error);
            }
        })
        // let data = {
        //     in_amount,
        //     in_currency,
        //     out_currency
        // }

        // const self = this;
        // self.offer_type = "in_amount";
        // let endpoint = `${self.apiUrl}/get_offer`;
        //     axios.post(endpoint, data)
        //         .then(function (response) {
        //             console.log('resp from getOfferwithtinamount', response);
        //             self.offer = response.data;
        //             resolve(self.offer);
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //             reject(error);
        //         });
        // });
    }
    

    
    getOrderStatus() {
        const self = this;

        let endpoint = `${self.apiUrl}/order_status`;
        return new Promise((resolve, reject) => {
            let data = {
                "order_id": self.order.data.order_id
            }
            axios.post(endpoint, data)
                .then(function (response) {
                    self.orderStatus = response.data;
                    resolve(self.orderStatus);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    getOrderExpiry() {
        return this.orderStatus.expires_at;
    }

    getTimeRemaining() {
        return this.orderStatus.seconds_till_timeout;
    }

    createOrder(out_address, refund_address, in_currency = "XMR", out_currency = "BTC") {

        let self = this;
        let endpoint = `${self.apiUrl}/create_order`;
        let data = {
            out_address,
            refund_address,
            in_currency,
            out_currency,
            ...self.offer
        }

        delete data.expires_at;
        if (self.offer_type == "out_amount") {
            delete data.in_amount;
        } else if (self.offer_type == "in_amount") {
            delete data.out_amount;
        }
        return new Promise((resolve, reject) => {
            try {
                axios.post(endpoint, data)
                    .then(function (response) {
                        self.order = response;
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }


    getRatesAndLimits(in_currency, out_currency) {
        let self = this;
        return new Promise((resolve, reject) => {
            let data = {
                "in_currency": "XMR",
                "out_currency": "BTC"
            }
            let endpoint = `${self.apiUrl}/get_info`;
            axios.post(endpoint, data)
                .then((response) => {
                    self.currentRates = response.data;
                    self.in_currency = "XMR";
                    self.out_currency = "BTC";
                    self.currentRates.minimum_xmr = self.currentRates.in_min;
                    self.currentRates.maximum_xmr = self.currentRates.in_max;
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        });
    }

    getCurrencyPairs(in_currency = "XMR") {
        let self = this;
        return new Promise((resolve, reject) => {
            let data = {
                "in_currency": in_currency
            }
            let endpoint = `${self.apiUrl}/get_pairs`;
            axios.post(endpoint, data)
                .then((response) => {
                    self.enabledCurrencies = response.data.out_currencies;
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
        });
    }

}

module.exports = ExchangeFunctions;
