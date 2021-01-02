<template>
  <v-container>
    <v-text-field v-if="uploading" color="success" loading disabled></v-text-field>
    <v-card>
      <v-row justify="center">
        <v-col class="mx-auto" cols="12" md="4">
          <v-card v-if="user!=null" max-width="300" class="mx-auto" outlined>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="user.photoURL"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline text-capitalize">{{user.displayName}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mx-auto text-center" cols="12" md="4">
          <input type="file" ref="buttonFile" class="d-none" @change="buscarFichero($event)" />
          <v-btn class="secondary mr-2" @click="$refs.buttonFile.click()">Buscar imagen</v-btn>
        </v-col>
        <v-col class="mx-auto text-center" cols="12" md="4">
          <v-btn
            color="primary"
            class="mr-2"
            :disabled="file===null"
            @click="uploadImage()"
          >Subir imagen</v-btn>
        </v-col>
        <v-col class="mx-auto text-center" cols="12" md="4">
          <ModalUser @saveUser="saveNewUser" buttonName="Cambiar nombre" :user="user"  />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { storage, auth } from "../firebase";
import Swal from "sweetalert2";
import ModalUser from "@/components/ModalUser";

export default {
  name: "User",

  data() {
    return { file: null, urlTemp: "", uploading: false };
  },

  methods: {
    ...mapActions(["setUser", "updateUser"]),
    saveNewUser(newUser) {
      console.log("El nuevo usuario es : ");
      console.log(newUser);
      this.uploadUserInfo(newUser)
    },
    buscarFichero(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = e => {
        console.log(e.target.result);
        this.urlTemp = e.target.result;
      };
    },
    async uploadUserInfo(newInfoUser) {
      console.log("uploadUserInfo");
      await auth.currentUser
        .updateProfile({
          photoURL: newInfoUser.photoURL,
          displayName: newInfoUser.displayName,
          uid: newInfoUser.uid,
          email: newInfoUser.email
        })
        .then(() => {
          console.log("user updated....");
          console.log(auth.currentUser);
          const userUpdated = {
            email: newInfoUser.email,
            uid: newInfoUser.uid,
            displayName: newInfoUser.displayName,
            photoURL: auth.currentUser.photoURL
          };
          this.updateUser(userUpdated);
          Swal.fire("¡Usuario actualizado correctamente!");
        })
        .catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Vaya...",
            text: error
          });
        });
    },

    async uploadImage() {
      try {
        this.uploading = true;

        const refFile = storage
          .ref()
          .child(this.user.email)
          .child("foto perfil");
        console.log("refFile es : " + refFile);
        await refFile.put(this.file);
        const urlImagenNueva = await refFile.getDownloadURL();
        console.log(urlImagenNueva);
        const newInfoUser = {
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          photoURL: urlImagenNueva
        };
        this.uploadUserInfo(newInfoUser);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Vaya...",
          text: error
        });
      } finally {
        this.uploading = false;
        this.file = null;
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    console.log("URL de usuario es:");
    console.log(this.user.photoURL);
  },
  components: {
    ModalUser
  }
};
</script>