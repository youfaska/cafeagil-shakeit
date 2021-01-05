<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="accent">
        <strong class="subheading">¡Siguenos!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="item in rrss"
          :key="item"
          class="mx-4"
          dark
          icon
          :href="item.url"
          target="_blank"
        >
          <v-icon size="24px">{{ item.icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} —
        <strong>Metricas Agile ©</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({
    rrss: [
      { icon: "fas fa-home", url: "https://cafe-agil.com" },
      { icon: "fab fa-linkedin", url: "https://www.linkedin.com/company/caf%C3%A9-%C3%A1gil/" },
      { icon: "fab fa-facebook", url: "https://www.facebook.com/viajaramarruecos.org" },
      { icon: "fab fa-twitter", url: "https://twitter.com/Cafe_Agil" }
    ]
  })
};
</script>