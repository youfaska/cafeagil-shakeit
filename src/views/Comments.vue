<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="text-center">
          <ModalComment @addComment="addNewComment" :debateId="debateId" buttonName="fas fa-plus" />
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
                <v-btn :disabled="disabledComment(item)" v-bind="attrs" v-on="on" class="ml-2" icon>
                  <v-icon @click="like(item)" color="green lighten-1">far fa-thumbs-up</v-icon>
                </v-btn>
              </template>
              <span>Me gusta</span>
            </v-tooltip>
            <small>{{item.data.like}}</small>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="disabledComment(item)"
                  v-bind="attrs"
                  v-on="on"
                  class="ml-5"
                  icon
                  right
                >
                  <v-icon @click="disLike(item)" color="warning">far fa-thumbs-down</v-icon>
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
import ModalComment from "../components/ModalComment";
import { db } from "../firebase";
import moment from "moment";
export default {
  data() {
    return {
      debateTitle: "",
      debateId: "",
      comments: [],
      commentsLike: [],
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
  mounted() {
    if (localStorage.getItem("commentlike")) {
      this.commentsLike = JSON.parse(localStorage.getItem("commentlike"));
    }
  },
  methods: {
    ...mapActions(["getDebates", "increaseCommentsNumber"]),
    async like(commentObjet) {
      try {
        let myComment = db.collection("comments").doc(commentObjet.id);
        // increase like field by one
        await myComment.update({
          like: commentObjet.data.like + 1
        });
        this.getCommentsByDebate();
        this.addLikeComment(commentObjet.id);
      } catch (error) {
        console.log(error);
      }
    },
    addLikeComment(commentId) {
      this.commentsLike.push(commentId);
      this.saveCommentLik();
    },
    saveCommentLik() {
      let parsed = JSON.stringify(this.commentsLike);
      localStorage.setItem("commentlike", parsed);
    },
    async disLike(commentObjet) {
      try {
        let myComment = db.collection("comments").doc(commentObjet.id);
        // increase like field by one
        await myComment.update({
          dislike: commentObjet.data.dislike + 1
        });
        this.getCommentsByDebate();
        this.addLikeComment(commentObjet.id);
      } catch (error) {
        console.log(error);
      }
    },
    disabledComment(item) {
      let isVoted = false;
      try {
        this.commentsLike.forEach(e => {
          if (item.id === e) {
            isVoted = true;
          }
        });
        return isVoted;
      } catch (e) {
        console.log(e);
      }
    },
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
      return moment(date)
        .subtract(10, "days")
        .calendar();
    },
    addNewComment(commentText) {
      let newComment = {
        title: commentText,
        publishdate: moment(new Date()).format("MM/DD/YYYY hh:mm"),
        author: "Youyou",
        commentsnumber: 0,
        like: 0,
        dislike: 0,
        debate_id: this.debateId
      };
      this.createComment(newComment);
      this.increaseCommentsNumber(newComment);
    },
    async createComment(newComment) {
      try {
        const res = await db.collection("comments").add(newComment);
        let myNewComment = {
          id: res.id,
          data: newComment
        };
        this.comments.push(myNewComment);
      } catch (error) {
        console.log(error);
      }
    }
  },

  components: {
    ModalComment
  }
};
</script>
