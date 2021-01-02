<template>
  <v-container>
    <v-card class="my-5">
      <v-card-text>
        <h1 class="text-center">Registro de usuarios</h1>
      </v-card-text>
    </v-card>

    <v-form
      v-model="valid"
      @submit.prevent="createUser({email:email, password:password, nombre:firstname})"
    >
      <v-card class="my-5">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                :counter="20"
                label="Introduzca tu nombre"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Introduzca tu e-mail "
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6"></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Introduzca tu contraseña"
                hint="Minimo 8 caracteres"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="password2"
                :append-icon="show2 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :rules="[rules.required, rules.min, passwordConfirmationRule]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-2"
                label="Repita la contraseña"
                hint="Minimo 8 caracteres"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="terms"
                :rules="[v => !!v || 'Debe aceptar los terminos  y las condiciones']"
                color="green"
              >
                <template v-slot:label>
                  <div @click.stop>
                    ¿Aceptas nuestros
                    <router-link :to="{path:'legal'}">terminos</router-link> y 
                    <router-link :to="{path:'dataProtection'}">condiciones?</router-link>
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6"></v-col>

            <v-col cols="12" md="6" class="text-right">
              <v-btn color="primary" type="submit" :disabled="!valid">
                <v-icon>fas fa-paper-plane</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Register",
  data: () => ({
    valid: false,
    firstname: "",
    password: "",
    password2: "",
    email: "",
    terms: false,
    show1: false,
    show2: false,
    nameRules: [
      v => !!v || "Nombre obligatorio",
      v => v.length <= 20 || "No debe de ser mayor a 20 caracteres"
    ],
    rules: {
      required: value => !!value || "La contraseña es obligatoria",
      min: v => v.length >= 8 || "Minimo 8 caracteres"
    },

    emailRules: [
      v => !!v || "El email es obligatorio",
      v => /.+@.+/.test(v) || "El email debe de ser valido"
    ]
  }),
  methods: {
    ...mapActions(["createUser"])
  },
  computed: {
    ...mapState(["user", "error"]),
    passwordConfirmationRule() {
      return () =>
        this.password === this.password2 || "La contraseña no coincide";
    }
  }
};
</script>