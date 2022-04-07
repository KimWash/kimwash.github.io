<template>
  <article @click="onClick" class="tile is-child box">
    <p class="title">
      {{ title }}
    </p>
    <p class="subtitle">
      {{ category }} |
      {{ date }}
    </p>
    <p class="content"><br /></p>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "제목을 불러올 수 없습니다.",
    },
    category: {
      type: String,
      default: "카테고리를 불러올 수 없습니다.",
    },
    date: {
      type: String,
      default: "게시일을 불러올 수 없습니다.",
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
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
</style>
<style scoped>
.title,
.subtitle {
  color: white;
}
</style>