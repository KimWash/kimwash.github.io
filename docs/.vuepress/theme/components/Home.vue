<template>
  <div class="home">
    <Carousel />
    <div class="tiles">
      <div
        class="tile is-ancestor is-10"
        style="margin: 0 auto; width: 100%"
        v-for="i in posts.rows"
        :key="i"
      >
        <div class="tile is-parent" v-for="j in 3" :key="j">
          <article
            @click="$router.push(posts.posts[j + 3 * (i - 1) - 1].path)"
            class="tile is-child box"
            v-if="j + 3 * (i - 1) - 1 < posts.posts.length"
          >
            <p class="title">
              {{ posts.posts[j + 3 * (i - 1) - 1].frontmatter.title }}
            </p>
            <p class="subtitle">
              {{ posts.posts[j + 3 * (i - 1) - 1].frontmatter.category }} |
              {{ posts.posts[j + 3 * (i - 1) - 1].frontmatter.date }}
            </p>
            <p class="content"><br /></p>
          </article>
        </div>
      </div>
    </div>
    <div class="nopost" v-if="posts.rows.length == 0">
      아무런 글도 없는 것 같네요.
    </div>
  </div>
</template>

<script>
import Carousel from "./Carousel";
export default {
  components: {
    Carousel,
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
.is-child {
  border-radius: 18px;
  color: white;
  background: linear-gradient(45deg, #327ae7 0%, #6bd0ff 100%);
}

.title {
  font-size: 1.7rem;
}
@media screen and (min-width: 1024px) {
  .tiles {
    margin: 2vw 0;
    padding: 0 10vw;
  }
}
.nopost {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  font-size: 2rem;
  font-weight: bold;
}
</style>
<style scoped>
.title,
.subtitle {
  color: white;
}
</style>