<template>
  <div>
    <p class="title is-4">{{ name }}</p>
    <p class="subtitle is-6">{{ period }}</p>
    <p v-html="content" />
  </div>
</template>
<script>
export default {
  props: ["name", "period", "content"],
};
</script>