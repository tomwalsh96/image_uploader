<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Router from 'vue-router'

export default {
  name: 'App',
  components: {
    Router
  },
  data: () => ({
    //
  })
}
</script>
