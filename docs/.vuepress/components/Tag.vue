<template>
  <div :class="`tag is-${type}`" :style="`${full ? 'width: 100%' : ''}`">
    {{ label }}
  </div>
</template>
<script>
export default {
  props: ["label", "type", "full"],
};
</script>
<style>
.tag {
  width: auto;
  margin-right: 5px;
}
</style>