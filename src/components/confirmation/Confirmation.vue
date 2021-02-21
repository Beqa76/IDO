<template>
  <div class="mx-auto pa-2">
    <div class="text-h4 text-center">Confirmation</div>
    <div class="text-center mt-2">
      Check the calculated data below carefully before running the BOT
    </div>
    <BotSettings class="mt-8" />
    <CalculatingTable
      class="mt-8"
      loading-text="Loading data..."
      :loading="loading"
    />
    <div class="d-flex justify-center mt-8">
      <v-btn color="primary" @click="nextStep" large>
        Run
      </v-btn>
      <v-btn class="ml-4" @click="previousStep" large>
        Back
      </v-btn>
    </div>
  </div>
</template>
<script>
import CalculatingTable from "./CalculatingTable";
import BotSettings from "@/components/setting/BotSettings";

export default {
  components: { CalculatingTable, BotSettings },
  data: () => ({
    loading: false,
  }),
  methods: {
    nextStep() {
      this.$emit("goToStep", 4);
    },
    previousStep() {
      this.$emit("goToStep", 2);
    },
  },
};
</script>
