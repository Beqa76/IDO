module.exports = class Contract {
  constructor(web3, contract_json, address) {
    this.web3 = web3
    this.json = contract_json
    this.abi = contract_json.abi
    this.address = address
    this.contract = new web3.eth.Contract(contract_json.abi, address)
  }

  async deploy(account, abi, byteCode, args = []) {
    var res
    this.contract = new this.web3.eth.Contract(abi)
    res = await this.web3.eth.sendSignedTransaction(
      (
        await account.getAccount().signTransaction({
          data: this.contract
            .deploy({
              data: byteCode,
              arguments: args,
            })
            .encodeABI(),
          from: account.getAddress(),
          gas: 5913388,
        })
      ).rawTransaction
    )
    this.address = res.contractAddress
    return res
  }

  async use(contract_json, address) {
    this.json = contract_json
    this.abi = contract_json.abi
    this.address = address ? address : this.address
    this.contract = new this.web3.eth.Contract(contract_json.abi, this.address)
  }

  async send(account, byteCode, value = '0x0', handler = {}) {
    // eslint-disable-next-line

    let tx = {
      data: byteCode,
      from: account.address,
      to: this.address,
      gas: 300000,
      gasPrice: web3.utils.toWei('400', 'gwei'),
      value: value ? value : '0x0',
    }

    let result = await account.signTransaction(tx)
    if (handler && handler.onConfirmation) handler.onConfirmation(result)

    return await this.web3.eth
      .sendSignedTransaction(result.rawTransaction)
      .on('confirmation', (confirmationNumber, receipt) => {
        if (handler.onConfirmation) handler.onConfirmation(confirmationNumber)
        if (confirmationNumber > 0 && handler.onComplete) {
          handler.onComplete(receipt)
        }
      })
      .on('error', (err) => {
        if (handler.onError) handler.onError(err)
      })
  }

  getContract() {
    return this.contract
  }

  getABI() {
    return this.abi
  }

  getJSON() {
    return this.json
  }

  getAddress() {
    return this.address
  }
}
