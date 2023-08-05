<template>
  <b-carousel class="carousel">
    <b-carousel-item
      v-for="(carousel, i) in carousels"
      :key="i"
      :interval="5000"
    >
      <a :href="carousel.link">
        <section
          :class="`hero is-medium is-${carousel.color}`"
          :style="`
        background-image: url('${carousel.image}');
         background-size: cover;
          background-position: bottom;
          `"
        >
          <div class="hero-body has-text-centered">
            <h1 class="title">{{ carousel.text }}</h1>
          </div>
        </section>
      </a>
    </b-carousel-item>
  </b-carousel>
</template>
<script>
import carousels from "../../carousels.json";
export default {
  data() {
    return {
      carousels: carousels,
    };
  },
};
</script>
<style>
@media screen and (min-width: 1024px) {
  .carousel {
    width: 100vw;
  }
}
</style>