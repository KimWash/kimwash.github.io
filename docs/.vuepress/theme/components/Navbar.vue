<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item href="/" style="font-weight: bold; color: black">
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
      <b-navbar-item
        v-for="item in categories"
        :href="item.type == 'link' ? item.value : `/posts/${item.id}`"
        :key="item.name"
      >
        {{ item.name }}
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            type="is-info"
            icon-right="github"
            icon-pack="fab"
            @click="openThirdLink('https://github.com/KimWash/')"
          />
          <b-button
            type="is-info"
            icon-right="instagram"
            icon-pack="fab"
            @click="openThirdLink('https://instagram.com/03_gangm/')"
          />
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import navigations from "../../navigations.json";
import categories from "../../categories.json";
export default {
  data() {
    return {
      navigations: navigations,
      categories: categories,
    };
  },
  created() {
    console.log(this.navigations);
  },
  methods: {
    openThirdLink(url) {
      location.href = url;
    },
  },
};
</script>