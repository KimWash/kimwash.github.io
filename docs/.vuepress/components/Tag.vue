<template>
  <div :class="`tag is-${type}`">{{ label }}</div>
</template>
<script>
export default {
  props: ["label", "type"],
};
</script>
<style>
.tag {
  width: auto;
  margin-right: 5px;
}
</style>