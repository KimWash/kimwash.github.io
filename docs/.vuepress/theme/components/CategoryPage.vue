<template>
  <div class="categorypage">
    <p class="title">{{ $frontmatter.title }} 게시글</p>
    <post-view :posts="posts" />
  </div>
</template>

<script>
import PostView from "./PostView.vue";
export default {
  components: { PostView },
  created() {
    console.log(this.$frontmatter);
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
      console.log(posts);
      return {
        posts: posts,
        rows: Math.ceil(posts.length / 3),
        lastColumn: posts.length % 3,
      };
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 1024px) {
  .title {
    padding: 0 10vw !important;
  }
}
.title {
  padding: 0 10px;
}
</style>