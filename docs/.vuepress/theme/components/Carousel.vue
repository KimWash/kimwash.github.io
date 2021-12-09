<template>
  <b-carousel class="carousel">
    <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
      <section
        :class="`hero is-medium is-${carousel.color}`"
        :style="`backgroundImage: url(${carousel.image}); background-size:cover`"
      >
        <div class="hero-body has-text-centered">
          <h1 class="title">{{ carousel.text }}</h1>
        </div>
      </section>
    </b-carousel-item>
  </b-carousel>
</template>
<script>
import carousels from '../../carousels.json'
export default {
  data() {
    return {
      carousels: carousels,
    };
  },
};
</script>
<style>
@media screen and (min-width:1024px) {
  .carousel {
    width:100vw;
  }
}
</style>