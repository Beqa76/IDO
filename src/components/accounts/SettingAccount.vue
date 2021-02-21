<template>
  <div class="pa-4">
    <div style="width: 500px">
      <v-text-field label="Address" v-model="contractAddress" placeholder="nhập contract address" dense filled />
      <v-text-field type="number" label="Số lượng token" v-model="tokenAmount" placeholder="nhập số lượng  tokne" dense filled />
      <v-file-input
        v-model="files"
        type="file"
        accept=".csv"
        prepend-inner-icon="mdi-file"
        prepend-icon=""
        label="csv"
        placeholder="Check here to upload your CSV file"
        @change="loadCSV"
        multiple
        show-size
        dense
        filled
      />
    </div>
    <AccountTable v-if="contractAddress" loading-text="Loading data..." :accounts="items" :loading="loading" @onItemRetry="swap" />
    <div class="d-flex justify-center mt-8">
      <v-btn color="primary" :disabled="accounts.length <= 0" @click="swapAll">
        Swap All
      </v-btn>
    </div>
  </div>
</template>
<script>
import csv2json from 'csvjson-csv2json'
import AccountTable from './AccountTable'
const {getFixedSwapContract, getETHBalance} = require('@/models/index.js')
const getJsonFromCSV = (files) => {
  return new Promise((rel, rej) => {
    if (window.FileReader) {
      var reader = new FileReader()
      reader.readAsText(files[0])
      reader.onload = (event) => {
        var csv = event.target.result
        rel(csv2json(csv, {parseNumbers: true}).filter((a) => a))
      }
      reader.onerror = (evt) => {
        rej(evt)
      }
    } else {
      alert('FileReader are not supported in this browser.')
    }
  })
}

export default {
  components: {AccountTable},
  data() {
    return {
      files: [],
      accounts: [],
      providerUrl: 'https://ropsten.infura.io/v3/ec900cd712e548d890c6798e4a691b80',
      loading: false,
      contractAddress: '0x185a764d208c064547a3336c37e7f1efbf68e18f',
      balances: [],
      tokenAmount: 0,
      whiteList: [],
      transactions: {},
      costs: [],
    }
  },
  watch: {
    tokenAmount() {
      this.estimateCost()
    },
  },
  computed: {
    items() {
      return this.accounts.map((a, i) => ({
        ...a,
        balance: this.balances[i],
        contract: getFixedSwapContract({contractAddress: this.contractAddress}, {key: a.privateKey}),
        isWhitelisted: this.whiteList[i] ? 'whitelisted' : 'blacklist',
        transaction: this.transactions[a.address],
        status: this.transactions[a.address] ? this.transactions[a.address].status : '',
        cost: this.costs[i],
      }))
    },
  },
  methods: {
    async loadCSV() {
      this.loading = true
      const accs = await getJsonFromCSV(this.files)
      this.accounts = accs.map((a) => ({
        ...a,
        isWhitelisted: 'loading',
        contract: getFixedSwapContract({contractAddress: this.contractAddress}, {key: a.privateKey}),
      }))
      await this.getBalances()
      await this.getWhitelisted()
      await this.estimateCost()
      this.loading = false
    },

    async getBalances() {
      const promises = this.accounts.map((a) => {
        return getETHBalance(a.address)
      })

      this.balances = await Promise.all(promises)
      console.log(this.balances)
    },
    async getWhitelisted() {
      const promises = this.accounts.map((a) => {
        if (a.contract) return a.contract.isWhitelisted(a)
      })
      this.whiteList = await Promise.all(promises.filter((a) => a))
    },
    async estimateFee() {
      const promises = this.accounts.map((a) => {
        if (a.contract) return a.contract.isWhitelisted(a)
      })
      this.whiteList = await Promise.all(promises.filter((a) => a))
    },
    async estimateCost() {
      const promises = this.accounts.map((a) => {
        if (a.contract) return a.contract.getETHCostFromTokens({tokenAmount: this.tokenAmount})
      })
      this.costs = await Promise.all(promises.filter((a) => a))
    },
    async swapAll() {
      const promises = this.items.map((a) => {
        return this.swap(a)
      })
      await Promise.all(promises.filter((a) => a))
    },
    async swap(account) {
      if (account.isWhitelisted === 'whitelisted') {
        try {
          await account.contract.swap({
            tokenAmount: 100,
            handler: {
              onConfirmation: (data) => {
                this.transactions = {
                  ...this.transactions,
                  [account.address]: {...data, status: 'pending'},
                }
              },
              onComplete: ({receipt}) => {
                this.transactions = {
                  ...this.transactions,
                  [account.address]: {...receipt, status: 'success'},
                }
              },
              onError: ({receipt}) => {
                this.transactions = {
                  ...this.transactions,
                  [account.address]: {...receipt, status: 'error'},
                }
              },
            },
          })
          // this.transactions = {
          //   ...this.transactions,
          //   [account.address]: transaction,
          // }
          // console.log(transaction.transactionHash)
        } catch (e) {
          console.log(e.message)
          // this.transactions = {
          //   ...this.transactions,
          //   [account.address]: JSON.parse(e.message),
          // }
        }
      }
    },
    nextStep() {
      this.$emit('goToStep', 2)
    },
  },
}
</script>
