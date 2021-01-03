import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import {auth} from "./firebase"


Vue.config.productionTip = false


auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    const detectedUser = {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    store.dispatch("detecteUser", detectedUser);
  } else {
    console.log(user);
    store.dispatch("detecteUser", user);
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
