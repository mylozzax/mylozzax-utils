const WABridge = require('./WABridge')

module.exports = async function () {
    const thisModule = await require('./MyLozzaxClient_WASM')({})
    
    return new WABridge(thisModule)
}
