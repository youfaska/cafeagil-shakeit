<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">{{buttonName}}</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Antiguo nombre: {{user.displayName}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
               <v-form v-model="valid">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="firstName"
                  :rules="[nameRules.required, nameRules.min]"
                  label="Nombre del usuario*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
               </v-form>
          </v-container>
          <small class="red--text">* campo obligatorio</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveUser" :disabled="!valid">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ModalUser",
  data: () => ({
    dialog: false,
    valid:false,
    firstName: "",
    nameRules: {
      required: value => !!value || "El nombre es obligatoria",
      min: v => v.length >= 5 || "Minimo 5 caracteres"
    }
  }),
  props: {
    user: {
      type: Object,
      default: () => {},
      required: true
    },
    buttonName: {
      type: String,
      default: "Haz click",
      required: true
    }
  },
  methods: {
    saveUser() {
      console.log("My updated user:");
      this.user.displayName = this.firstName;
      this.$emit("saveUser", this.user);
      this.dialog = false;
    }
  }
};
</script>