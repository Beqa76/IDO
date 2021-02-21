<template>
  <v-card class="mt-8 pa-2">
    <v-form ref="form">
      <v-card-title>
        BOT Settings
      </v-card-title>
      <v-card-text>
        <div class="d-flex">
          <v-text-field
            v-model="gasPrice"
            label="Gas Price"
            class="mr-4"
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="gasLimit"
            label="Gas Limit"
            class="ml-4"
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="delayTime"
            label="Delay Time"
            class="ml-4"
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
    gasPrice: 0,
    gasLimit: 0,
    delayTime: 0,
  }),
};
</script>
