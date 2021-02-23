const Web3 = require('web3')
const ETH_URL_TESTNET = 'https://mainnet.infura.io/v3/f8f39552118b4f23bf57e774021fa01b'
// const ETH_URL_MAINNET = 'https://mainnet.infura.io/v3/40e2d4f67005468a83e2bcace6427bc8'
const web3 = new Web3(ETH_URL_TESTNET)

const FixedSwapContract = require('./FixedSwapContract')
const Account = require('./Account')
const ERC20TokenContract = require('./ERC20TokenContract')

module.exports = {
  getFixedSwapContract: ({tokenAddress, decimals, contractAddress = null}, {key}) => {
    const acc = new Account(web3, web3.eth.accounts.privateKeyToAccount(key))
    const fixedContract = new FixedSwapContract({
      web3: web3,
      tokenAddress: tokenAddress,
      decimals: decimals,
      contractAddress: contractAddress,
      acc,
    })
    fixedContract.__init__()
    return fixedContract
  },

  getERC20TokenContract({tokenAddress, decimals}, acc) {
    return new ERC20TokenContract({
      web3: web3,
      contractAddress: tokenAddress,
      decimals: decimals,
      acc,
    })
  },

  getETHBalance: async (add) => {
    let wei = await web3.eth.getBalance(add)
    return web3.utils.fromWei(wei, 'ether')
  },
  web3,
}
