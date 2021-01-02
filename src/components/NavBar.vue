<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link class="white--text" :to="{path:'/'}">
          <img
            alt="Mis Tools para SEO"
            src="@/assets/logo_am.png"
            width="15%"
            height="20%"
            min="100"
            max="200"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip v-if="user!=null" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="logOut()">
            <v-icon v-bind="attrs" v-on="on">fas fa-sign-out-alt</v-icon>
          </v-btn>
        </template>
        <span>Cerrar sesión</span>
      </v-tooltip>
      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :to="{path:'/login'}">
            <v-icon v-bind="attrs" v-on="on">fas fa-sign-in-alt</v-icon>
          </v-btn>
        </template>
        <span>Autenticarse</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer color="primary" v-model="drawer" app>
      <v-list v-if="user!=null" class="text-center">
        <v-list-item class="px-2">
          <v-list-item-avatar class="mx-auto">
            <v-img :src="user.photoURL"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title text-capitalize white--text">{{user.displayName}}</v-list-item-title>
            <v-list-item-subtitle class="white--text">{{user.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item :to="{path:'/'}">
          <v-list-item-icon>
            <v-icon class="white--text">as fa-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{path:'Register'}" v-if="user===null">
          <v-list-item-icon>
            <v-icon class="white--text">fas fa-user-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Registrate</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{path:'dashboard'}" v-if="isUserExist">
          <v-list-item-icon>
            <v-icon class="white--text">fas fa-columns</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    ...mapActions(["logOut"])
  },
  computed: {
    ...mapState(["user", "menuList"]),
    ...mapGetters(["isUserExist"])
  }
};
</script>
