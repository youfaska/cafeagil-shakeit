<template>
  <v-container>
    <v-text-field v-if="loadingdData" color="success" loading disabled></v-text-field>
    <v-card class="my-5">
      <v-card-text>
        <h1 class="text-center">Acceso</h1>
      </v-card-text>
    </v-card>
    <v-form v-model="valid" @submit.prevent="userAutentication({email:email, password:password})">
      <v-card class="mx-auto pl-2 pr-2">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Introduzca tu e-mail "
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Introduzca tu contraseña"
              hint="Minimo 8 caracteres"
              counter
              @click:append="show = !show"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6"> ¿No tienes cuenta? <router-link :to="{path:'/register'}">Registrate</router-link></v-col>

          <v-col cols="12" md="6" class="text-right">
            <v-btn color="primary" type="submit" :disabled="!valid">
              <v-icon>fas fa-paper-plane</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      show: false,
      emailRules: [
        v => !!v || "El email es obligatorio",
        v => /.+@.+/.test(v) || "El email debe de ser valido"
      ],
      rules: {
        required: value => !!value || "La contraseña es obligatoria",
        min: v => v.length >= 8 || "Minimo 8 caracteres"
      }
    };
  },
  methods: {
    ...mapActions(["userAutentication"])
  },
  computed: {
    ...mapState(["loadingdData"])
  }
};
</script>