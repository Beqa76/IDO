<template>
  <v-card class="mt-8 pa-2">
    <v-form ref="form">
      <v-card-title>
        Token Details
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="tokenAddress"
          label="Token Address"
          required
          outlined
        ></v-text-field>
        <div class="d-flex">
          <v-text-field
            v-model="tokenName"
            label="Token Name"
            class="mr-4"
            disabled
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="tokenETHratio"
            label="Token ETH ratio"
            class="ml-4"
            disabled
            required
            outlined
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field
            v-model="startDate"
            label="Pool StartDate"
            class="mr-4"
            disabled
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="endDate"
            label="Pool EndDate"
            class="ml-4"
            disabled
            required
            outlined
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field
            v-model="minimumAmount"
            label="Minimum Amount"
            class="mr-4"
            disabled
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="maximumAmount"
            label="Maximum Amount"
            class="ml-4"
            disabled
            required
            outlined
          ></v-text-field>
        </div>
      </v-card-text>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    tokenAddress: "",
    startDate: "",
    endDate: "",
    tokenName: "",
    tokenETHratio: "",
    minimumAmount: 0,
    maximumAmount: 0,
  }),
};
</script>
