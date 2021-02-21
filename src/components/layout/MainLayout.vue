<template>
  <v-card class="mx-auto">
    <SettingAccount />
  </v-card>
</template>

<script>
import SettingAccount from '@/components/accounts/SettingAccount'
export default {
  name: 'App',

  components: {
    SettingAccount,
  },

  data: () => ({
    step: 1,
  }),
  methods: {
    goToStep(e) {
      this.step = e
    },
  },
}
</script>
