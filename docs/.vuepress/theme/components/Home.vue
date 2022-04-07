<template>
  <div class="home">
    <Carousel />
    <post-view :posts="posts" />
  </div>
</template>

<script>
import Carousel from "./Carousel";
import PostCard from "./PostCard.vue";
import PostView from "./PostView.vue";
export default {
  components: {
    Carousel,
    PostCard,
    PostView,
  },
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    posts() {
      let currentPage = this.page ? this.page : this.$page.path;
      let posts = this.$site.pages
        .filter((x) => {
          return x.path.match(new RegExp(`(${currentPage})(?=.*html)`));
        })
        .sort((a, b) => {
          return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
        });
      return {
        posts: posts,
        rows: Math.ceil(posts.length / 3),
        lastColumn: posts.length % 3,
      };
    },
  },
};
</script>

<style>
.title {
  font-size: 1.7rem;
}
</style>
