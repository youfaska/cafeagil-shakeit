<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer"

export default {
  name: "App",

  components: {
    NavBar,
    Footer
  },

  data: () => ({
    //
  })
};
</script>
