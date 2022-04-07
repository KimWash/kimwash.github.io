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
      <infinite-loading
        v-if="hasMore"
        :identifier="infiniteId"
        @infinite="onScroll"
      ></infinite-loading>
    </div>
    <div class="nopost" v-if="Math.ceil(posts.length / 3) == 0">
      아무런 글도 없는 것 같네요.
    </div>
  </div>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";
import PostCard from "./PostCard.vue";
export default {
  created() {
    console.log(this.posts);
  },
  components: { PostCard, InfiniteLoading },
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
    };
  },
  created() {
    if (this.$route.query.page == undefined) {
      this.$router.push({ query: { page: 1 } });
      this.page = 1;
    }
    console.log(10 * (this.page - 1), 10 * this.page);
    this.data = this.posts.posts.slice(10 * (this.page - 1), 10 * this.page);

    console.log(`data: ${this.data}`);
  },
  methods: {
    onScroll($state) {
      if (this.hasMore) {
        this.page++;
        const newDatas = this.posts.posts.slice(
          10 * (this.page - 1),
          10 * this.page
        );

        console.log(newDatas);
        this.data = [...this.data, ...newDatas];
        console.log(10 * this.page, 10 * (this.page - 1));
        console.log(10 * this.page, this.posts.posts.length);
        if (10 * this.page > this.posts.posts.length) {
          this.hasMore = false;
        }

        console.log(`data: `, this.data);
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