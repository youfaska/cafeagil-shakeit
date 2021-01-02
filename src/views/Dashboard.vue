<template>
  <v-container>
    <v-card v-if="user!=null" max-width="300" class="mx-auto" outlined>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.photoURL"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title   class="headline text-capitalize">{{user.displayName}}</v-list-item-title>
          <v-list-item-subtitle>Business Agility Metrics</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-card class="py-5 mt-5">
      <v-row dense>
        <v-col v-for="app in apps" :key="app.title" :cols="app.flex">
          <v-card color="accent" class="my-2 ml-2 mr-2 pa-5 text-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <router-link style="text-decoration: none;" :to="app.to">
                  <v-icon v-bind="attrs" v-on="on" size="50">{{app.icon}}</v-icon>
                </router-link>
              </template>
              <span>{{app.title}}</span>
            </v-tooltip>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Dashboard",
  data() {
    return {
      apps: [
        {
          title: "Cambiar datos del perfil",
          icon: "fas fa-user-edit",
          flex: 6,
          to: "/user"
        }
        
      ]
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style >
</style>