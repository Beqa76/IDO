<template>
  <div class="mx-auto pa-2">
    <div class="text-h4 text-center">Result</div>
    <div class="text-center mt-2">
      Please check BOT's result below
    </div>
    <v-alert
      class="mt-6 pl-8"
      border="left"
      colored-border
      color="red"
      elevation="2"
    >
      Please DO NOT close this window while BOT is running, there will be
      unexpected result if BOT is interrupted while running!
    </v-alert>
    <v-textarea
      name="input-7-1"
      v-model="result"
      value="Bot is running..."
      height="530px"
      disabled
      filled
      auto-grow
      outlined
    ></v-textarea>
    <div class="d-flex justify-center mt-8">
      <v-btn color="primary" @click="nextStep" large>
        Finish
      </v-btn>
      <v-btn class="ml-4" @click="previousStep" large>
        Back
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    result: "",
  }),
  methods: {
    nextStep() {
      this.$emit("goToStep", 1);
    },
    previousStep() {
      this.$emit("goToStep", 3);
    },
  },
};
</script>
