<template>
  <v-data-table
    v-bind="this.$attrs"
    :headers="headers"
    :items-per-page="10"
    class="elevation-2 mt-4"
  ></v-data-table>
</template>
<script>
export default {
  data: () => ({
    headers: [
      {
        text: "Address",
        value: "address",
      },
      { text: "ETH Balance", value: "balance" },
      { text: "Estimated Gas", value: "estimatedGas" },
      { text: "Affortable Amount", value: "maxAmount" },
      { text: "Status", value: "status" },
    ],
  }),
};
</script>
