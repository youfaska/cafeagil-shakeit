import Vue from "vue";
import Vuex from "vuex";
import { auth, db } from "../firebase";
import Swal from "sweetalert2";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    loadingdData: false,
    debates: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loadingdData = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setDebates(state, payload) {
      console.log(payload);
      state.debates = payload;
    },

    refreshDebates(state, payload) {
      state.debates.push(payload);
    },
  },
  actions: {
    async createDebate({ commit }, debate) {
      try {
        console.log("el nuevo debate es: ", debate);
        const res = await db.collection("debates").add(debate);
        console.log("el debate que hemos registrado en la BD es 1 : ", res.id);
        console.log("el debate que hemos registrado en la BD es 2 : ", debate);
        let myNewDebate = {
          id: res.id,
          data: debate,
        };
        commit("refreshDebates", myNewDebate);
      } catch (error) {
        console.log(error);
      }
    },
    async increaseCommentsNumber({ commit }, newComment) {
      try {
        console.log("My all debates are: " ,this.state.debates)
        console.log("My comment that i have just received : " ,newComment)

        let debateToUpdate = this.state.debates.find(
          (e) => e.id === newComment.debate_id
        );
        console.log("my debate to update is: ", debateToUpdate);
        let debateRef = db.collection("debates").doc(debateToUpdate.id);
        // increase like field by one
        const res = await debateRef.update({
          commentsnumber: debateToUpdate.data.commentsnumber + 1,
        });
        res.then( r => {
          console.log("The value of R is: ", r)
        })
        .catch (err => {
          console.log(err)
        })
        console.log("The debate that we just updated is : ", res);

        commit("refreshDebates", debateToUpdate);
      } catch (error) {
        console.log(error);
      }
    },

    getDebates({ commit }) {
      console.log("getDebates...");
      let detabes = [];
      db.collection("debates")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
            let debate = {
              id: doc.id,
              data: doc.data(),
            };
            detabes.push(debate);
          });
          commit("setDebates", detabes);
        });
    },
    updateUser({ commit }, payload) {
      commit("setUser", payload);
    },
    createUser({ commit }, user) {
      console.log(user);
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);

          const myCurrentUser = auth.currentUser;
          myCurrentUser
            .updateProfile({
              displayName: user.nombre,
            })
            .then(
              (res2) => {
                console.log(res2);
              },
              (error) => {
                console.log(error);
              }
            );
          const userCreated = {
            email: res.user.email,
            uid: res.user.uid,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
          };

          commit("setUser", userCreated);
          commit("setError", null);
          Swal.fire("Usuario creado correctamente!");
          router.push("/dashboard");
        })
        .catch((error) => {
          commit("setError", error);
          Swal.fire({
            icon: "error",
            title: "Vaya...",
            text: error,
          });
        });
    },
    userAutentication({ commit }, user) {
      commit("setLoading", true);
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const AutenticatedUser = {
            email: res.user.email,
            uid: res.user.uid,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
          };
          console.log(res);
          commit("setUser", AutenticatedUser);

          router.push("/dashboard");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Vaya...",
            text: error,
          });
        });
      commit("setLoading", false);
    },
    logOut({ commit }) {
      console.log("ENTAMOS en logOut...");
      auth
        .signOut()
        .then(() => {
          commit("setUser", null);
          console.log(
            "Al cerrar la sesion le hemos metido null al user" + this.state.user
          );
          router.push("/login");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Vaya...",
            text: error,
          });
        });
    },
    detecteUser({ commit }, user) {
      commit("setUser", user);
    },
  },
  getters: {
    isUserExist(state) {
      if (state.user != null) {
        return true;
      } else {
        false;
      }
    },
  },
  created() {
    /* console.log("hola mudno...");
    this.menuListUpdated = this.menuList;
    console.log(this.menuListUpdated);*/
  },

  modules: {},
});
