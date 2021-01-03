<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="text-center">
          <ModalDebate v-if="false" @addDebate="addNewDebate" buttonName="fas fa-plus" />
          <v-card-text>
            <h1>Debates con Café Ágil</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item , index) in debates" :key="index" cols="12" md="6" class="mt-10">
        <v-card class="text-center mx-auto" max-width="600">
          <v-img height="150" src="https://source.unsplash.com/featured/?scrum"></v-img>
          <v-card-title>{{item.data.title}}</v-card-title>
          <v-card-subtitle
            class="text-right caption"
          >Fecha de publicacion :{{getDate(item.data.publishdate)}}</v-card-subtitle>
          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  icon
                  @click="visualizeComments(item.id)"
                >
                  <v-icon color="warning">fas fa-comment-dots</v-icon>
                </v-btn>
              </template>
              <span>Ver comentarios...</span>
            </v-tooltip>

            <small>{{item.data.commentsnumber}} comentarios</small>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="warning"
      @click="toTop"
    >
      <v-icon>fas fa-chevron-up</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
import moment from "moment";
import ModalDebate from "@/components/ModalDebate";

export default {
  data() {
    return {
      moment: moment,
      fab: false
    };
  },
  name: "Home",
  created() {
    this.getDebates();
  },

  methods: {
    ...mapActions(["getDebates","createDebate"]),
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    addNewDebate(debateTitle) {
      let newDebate = {
        title: debateTitle,
        publishdate : moment(new Date()).format('MM/DD/YYYY hh:mm'),
        author: "Youyou",
        commentsnumber: 0
      }
      this.createDebate(newDebate);
    },
    getDate: function(date) {
       return  moment(String(date)).format('DD/MM/YYYY hh:mm')
    },
    visualizeComments(debateId) {
      console.log("el id del debate es - visualizeComments : " + debateId);
      this.$router.push({
        name: "Comments",
        params: {
          debateId: debateId
        }
      });
    }
  },
  computed: {
    ...mapState(["debates"])
  },
  components: {
    ModalDebate
  }
};
</script>
