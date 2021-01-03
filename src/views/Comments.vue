<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="text-center">
          <v-card-text class="text-truncate">
            <h1>Reacciones sobre: {{myDebate}}</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item , index) in comments" :key="index" cols="12" md="6" class="mt-5">
        <v-card class="text-center mx-auto" max-width="600">
          <v-img height="150" src="https://source.unsplash.com/featured/?scrum"></v-img>
          <v-card-title>{{item.data.comment}}</v-card-title>
          <v-card-subtitle
            class="text-right caption"
          >Fecha de publicacion :{{getDate(item.data.publishdate)}}</v-card-subtitle>
          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="ml-2" icon>
                  <v-icon color="green lighten-1">far fa-thumbs-up</v-icon>
                </v-btn>
              </template>
              <span>Me gusta</span>
            </v-tooltip>
            <small>{{item.data.like}}</small>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="ml-5" icon right>
                  <v-icon color="warning">far fa-thumbs-down</v-icon>
                </v-btn>
              </template>
              <span>No gusta</span>
            </v-tooltip>
             <small>{{item.data.dislike}}</small>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
import { db } from "../firebase";
import moment from "moment";
export default {
  data() {
    return {
      debateTitle: "",
      debateId: "",
      comments: []
    };
  },
  name: "Home",
  created() {
    this.debateId = this.$route.params.debateId;
    this.getCommentsByDebate();
  },
  computed: {
    ...mapState(["debates"]),
    myDebate: function() {
      // `this` points to the vm instance
      console.log("Los debates en el state son: ", this.debates);
      console.log("el id con el cual estoy buscando es: " + this.debateId);
      const debateX = this.debates.find(e => e.id === this.debateId);
      console.log("El debate encontrado es: ", debateX);
      return debateX.data.title;
    }
  },
  methods: {
    ...mapActions(["getDebates"]),
    getCommentsByDebate() {
      console.log(
        "el id del debate llegado como parametro es:  " +
          this.$route.params.debateId
      );
      let comments = [];
      let commentsRef = db.collection("comments");
      commentsRef
        .where("debate_id", "==", this.$route.params.debateId)
        .get()
        .then(res => {
          res.forEach(doc => {
            console.log(doc.id);
            console.log(doc.data());
            let comment = {
              id: doc.id,
              data: doc.data()
            };
            comments.push(comment);
          });
          this.comments = comments;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDate: function(date) {
      console.log("fecha de publicacion es: " + date);
      return moment(date)
        .subtract(10, "days")
        .calendar();
    }
  },

  components: {}
};
</script>
