<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class color="warning" dark v-bind="attrs" v-on="on" bottom right fab>
          <v-icon>{{buttonName}}</v-icon>
        </v-btn>
      </template>
      <span>Añadir un nuevo comentario</span>

      <v-card>
        <v-card-title>
          <span class="headline">Añadir nuevo comentario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="commentText"
                    :rules="[nameRules.required, nameRules.min, nameRules.max]"
                    label="Titulo del debate*"
                    required
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small class="red--text">* campo obligatorio</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="addComment" :disabled="!valid">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ModalComment",
  data: () => ({
    dialog: false,
    valid: false,
    commentText: "",
    nameRules: {
      required: value => !!value || "El comentario es obligatoria",
      min: v => v.length >= 30 || "Minimo 30 caracteres",
      max: v => v.length <= 150 || "Maximo 150 caracteres"
    }
  }),
  props: {
    debateId: {
      type: String,
      required: true
    },
    buttonName: {
      type: String,
      default: "Haz click",
      required: true
    }
  },
  methods: {
    addComment() {
      console.log("My new comment:");
      this.$emit("addComment", this.commentText);
      this.dialog = false;
    }
  }
};
</script>