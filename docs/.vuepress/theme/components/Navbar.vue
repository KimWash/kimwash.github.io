<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/' }"
        style="font-weight: bold; color: black"
      >
        Wh@t !s Development?
      </b-navbar-item>
    </template>


    <template #end>
            <b-navbar-item
        v-for="item in navigations"
        :href="item.route"
        :key="item.text"
      >
        {{ item.text }}
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button type="is-info" icon-right="github" icon-pack="fab" @click="openThirdLink('https://github.com/KimWash/')"/>
          <b-button type="is-info" icon-right="instagram" icon-pack="fab" @click="openThirdLink('https://instagram.com/kimwash.jem/')"/>
        
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import navigations from "../../navigations.json";
export default {
  data() {
    return {
      navigations: navigations,
    };
  },
  created() {
    console.log(this.navigations);
  },
  methods: {
    openThirdLink(url) {
      location.href = url
    }
  }
};
</script>