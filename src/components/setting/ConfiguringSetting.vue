<template>
  <div class="mx-auto pa-2">
    <div class="text-h4 text-center">Configuring Settings</div>
    <div class="text-center mt-2">
      Fill the token details and configure settings for Bot
    </div>
    <TokenDetails />
    <BotSettings />
    <div class="d-flex justify-center mt-8">
      <v-btn color="primary" @click="nextStep" large>
        Continue
      </v-btn>
      <v-btn class="ml-4" @click="previousStep" large>
        Back
      </v-btn>
    </div>
  </div>
</template>

<script>
import TokenDetails from "./TokenDetails";
import BotSettings from "./BotSettings";

export default {
  components: {
    TokenDetails,
    BotSettings,
  },
  data: () => ({}),
  methods: {
    nextStep() {
      this.$emit("goToStep", 3);
    },
    previousStep() {
      this.$emit("goToStep", 1);
    },
  },
};
</script>
