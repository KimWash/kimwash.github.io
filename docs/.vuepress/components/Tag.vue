<template>
  <div :class="`tag is-${type}`">{{label}}</div>
</template>
<script>
export default {
  props:['label', 'type']
}
</script>
<style>
.tag {
  width:60px;
  margin-right:5px
}
</style>