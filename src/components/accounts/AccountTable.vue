<template>
  <v-data-table v-bind="$attrs" :items="accounts" :headers="headers" :items-per-page="10" disable-sort>
    <template v-slot:item.isWhitelisted="{item}">
      <v-icon v-if="item.isWhitelisted === 'whitelisted'" color="success">
        mdi-checkbox-marked-circle
      </v-icon>
    </template>
    <template v-slot:item.action="{item}">
      <v-icon v-if="!item.status && item.isWhitelisted === 'whitelisted'" @click="$emit('onItemRetry', item)">mdi-reload</v-icon>
    </template>
    <template v-slot:item.transaction="{item}">
      {{ item.transaction ? item.transaction.transactionHash : '' }}
    </template>
    <template v-slot:item.address="{item}">
      <a :href="`https://ropsten.etherscan.io/address/${item.address}`" target="blank">
        <div style="overflow: ellipsis">{{ item.address }}</div>
      </a>
    </template>
    <template v-slot:item.transaction="{item}">
      <a v-if="item.transaction" :href="`https://ropsten.etherscan.io/tx/${item.transaction.transactionHash}`">
        <div style="overflow: ellipsis; max-width: 150px! important">{{ item.transaction ? item.transaction.transactionHash : '' }}</div>
      </a>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    accounts: Array,
  },

  data: () => ({
    items: [],
    headers: [
      {
        text: 'Address',
        value: 'address',
        align: 'center',
        width: '100px',
      },
      {text: 'Balance (Ether)', value: 'balance', width: '100'},
      {text: 'Cost (Ether)', value: 'cost', align: 'center', width: '100'},
      {text: 'Whitelisted', value: 'isWhitelisted', align: 'center', width: '100'},
      {text: 'Status', value: 'status', align: 'center', width: '100'},
      {text: 'Transaction', value: 'transaction', align: 'center', width: '100px'},
      {text: 'Actions', value: 'action', align: 'center', width: '100px'},
    ],
  }),
}
</script>
