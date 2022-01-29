
const YatLozzaxLookup = require('./index');
let yatLozzaxLookup = new YatLozzaxLookup({ debugMode: true });
console.log(yatLozzaxLookup);
console.log(yatLozzaxLookup.getBasePath());
console.log("Valid yat?");
setTimeout(() => {

    //yatLozzaxLookup.testEmojisAgainstUnicodePropertyEscape(); 

    // Expect true
    console.log(yatLozzaxLookup.isValidYatHandle("😂😂😂"))
    
    // Expect true
    console.log(yatLozzaxLookup.isValidYatHandle("🐶"))
    console.log(yatLozzaxLookup.isValidYatHandle("🐶🐶"))

    // Expect a false
    console.log(yatLozzaxLookup.isValidYatHandle("a😃😃😃"))
    
    // expect true
    // yatLozzaxLookup.isValidYatCharacter("🔫").then((response) => {
    //     console.log(response);
    // });
    // // // expect false
    // yatLozzaxLookup.isValidYatCharacter("😃").then((response) => {
    //     console.log(response);
    // })
    // // // expect false
    // yatLozzaxLookup.isValidYatCharacter("😀").then((response) => {
    //     console.log(response);
    // })
    // // // expect false
    // yatLozzaxLookup.isValidYatCharacter("😄").then((response) => {
    //     console.log(response);
    // })
    // // // expect false
    // yatLozzaxLookup.isValidYatCharacter("😁").then((response) => {
    //     console.log(response);
    // })
    // // yatLozzaxLookup.isValidYatHandle("🔫🔫🔫").then((response) => {
    // //     console.log("Is this handle valid?");
    // //     console.log(response);
    // // })
    yatLozzaxLookup.lookupLozzaxAddresses("😂😂😂").then((response) => {
        console.log(`Result of lozzax address lookup`);
        console.log(response);
    })

}, 1000);