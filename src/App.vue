<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <MainLayout />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout'

export default {
  name: 'App',

  components: {
    MainLayout,
  },

  data: () => ({
    //
  }),
}
</script>
<style scoped></style>
