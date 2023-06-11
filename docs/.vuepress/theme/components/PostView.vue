<template>
  <div>
    <div class="tiles">
      <div
        class="tile is-ancestor is-10"
        style="margin: 0 auto; width: 100%"
        v-for="i in Math.ceil(data.length / 3)"
        :key="i"
      >
        <div class="tile is-parent" v-for="j in 3" :key="j">
          <post-card
            @onClick="$router.push(data[j + 3 * (i - 1) - 1].path)"
            v-if="j + 3 * (i - 1) - 1 < data.length"
            :title="data[j + 3 * (i - 1) - 1].frontmatter.title"
            :category="data[j + 3 * (i - 1) - 1].frontmatter.category"
            :date="data[j + 3 * (i - 1) - 1].frontmatter.date"
          >
          </post-card>
        </div>
      </div>
      <ClientOnly>
        <component
          v-if="infinityLoadingComponent && hasMore"
          :is="infinityLoadingComponent"
          :identifier="infiniteId"
          @infinite="onScroll"
        ></component>
      </ClientOnly>
    </div>
    <div class="nopost" v-if="Math.ceil(posts.length / 3) == 0">
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
  data() {
    return {
      data: [],
      hasMore: this.posts.posts.length > 0 ? true : false,
      infiniteId: +new Date(),
      page: this.$route.query.page,
      infinityLoadingComponent: null,
    };
  },
  mounted() {
    import("vue-infinite-loading").then((module) => {
      this.infinityLoadingComponent = module.default;
    });
    if (this.$route.query.page == undefined) {
      this.$router.push({ query: { page: 1 } });
      this.page = 1;
    }
    this.data = this.posts.posts.slice(0, 10 * this.page);
  },
  methods: {
    onScroll($state) {
      if (this.hasMore) {
        this.page++;
        history.pushState({}, null, this.$route.path + "?page=" + this.page);
        const newDatas = this.posts.posts.slice(
          10 * (this.page - 1),
          10 * this.page
        );

        this.data = [...this.data, ...newDatas];
        if (10 * this.page > this.posts.posts.length) {
          $state.complete();
          this.hasMore = false;
        }
        $state.loaded();
      }
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