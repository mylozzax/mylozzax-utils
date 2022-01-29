const WalletManager = require('./src/WalletManager')

async function init () {
  const walletManager = new WalletManager('STAGENET', 'https://stagenet-api.mylozzax.rtfm.net')
  await walletManager.init()
}

init()
