<template>
  <article
    @click="onClick"
    class="tile is-child box"
    v-bind:style="`background: linear-gradient(45deg, ${bgColors[0]} 0%, ${bgColors[1]} 100%)`"
  >
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
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
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
  data: () => {
    return {
      bgColors: [
        ["#FF7495", "#FF9A74"],
        ["#FF4973", "#FE1B50"],
        ["#ec008c", "#fc6767"],
        ["#f953c6", "#b91d73"],
        ["#FF416C", "#FF4B2B"],
      ].find((_, idx, arr) => idx == getRandomInt(0, arr.length)) ?? [
        "#FF512F",
        "#DD2476",
      ],
    };
  },
  created() {
    console.log(this.bgColors);
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
}
</style>
<style scoped>
.title,
.subtitle {
  color: white;
}
</style>