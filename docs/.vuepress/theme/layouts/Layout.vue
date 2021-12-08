<template>
  <div class="layout">
    <div class="navbar">
      <Navbar />
    </div>
    <div class="content">
      <component :is="$page.frontmatter.layout" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faAngleLeft, faAngleRight, faGithub, faInstagram, faFacebook);
Vue.component("vue-fontawesome", FontAwesomeIcon);
Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

import Navbar from "../components/Navbar.vue";
import Home from "../components/Home.vue";
import Post from "../components/Post.vue";
import About from "../components/About.vue";

export default {
  components: {
    Navbar,
    Home,
    Post,
    About
  },
};
</script>

<style>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
* {
  font-family: "Spoqa Han Sans Neo", "sans-serif";
}
</style>