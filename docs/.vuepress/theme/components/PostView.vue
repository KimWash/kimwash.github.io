<template>
  <div>
    <div class="tiles">
      <div
        class="tile is-ancestor is-10"
        style="margin: 0 auto; width: 100%"
        v-for="i in posts.rows"
        :key="i"
      >
        <div class="tile is-parent" v-for="j in 3" :key="j">
          <post-card
            @onClick="$router.push(posts.posts[j + 3 * (i - 1) - 1].path)"
            v-if="j + 3 * (i - 1) - 1 < posts.posts.length"
            :title="posts.posts[j + 3 * (i - 1) - 1].frontmatter.title"
            :category="posts.posts[j + 3 * (i - 1) - 1].frontmatter.category"
            :date="posts.posts[j + 3 * (i - 1) - 1].frontmatter.date"
          >
          </post-card>
        </div>
      </div>
    </div>
    <div class="nopost" v-if="posts.rows.length == 0">
      아무런 글도 없는 것 같네요.
    </div>
  </div>
</template>
<script>
import PostCard from "./PostCard.vue";
export default {
  components: { PostCard },
  props: {
    posts: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
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