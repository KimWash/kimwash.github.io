<template>
  <div class="stack">
    <Tag :label="name" :type="levelToType" /> {{ levelString }}
  </div>
</template>
<script>
import Tag from "./Tag.vue";
export default {
  props: ["name", "level", "levelString"],
  components: {
    Tag,
  },
  computed: {
    levelToType() {
      return this.level == "1"
        ? "danger"
        : this.level == "2"
        ? "warning"
        : this.level == "3"
        ? "success"
        : "primary";
    },
  },
};
</script>

<style>
.stack {
  margin-bottom: 5px;
  display: inline;
}
</style>