<template>
  <div ref="timer">
    <p>{{ current }}</p>
    <list-wheel :items="items">
      <template v-slot:default="{item}">
        <p>{{item.value}}</p>
      </template>
    </list-wheel>
  </div>
</template>

<script>
import ListWheel from "./ListWheel";
export default {
  data: function() {
    return {
      id: null,
      start: 0,
      current: 0,
      recipe: {},
      items: []
    };
  },
  mounted: function() {
    this.start = Date.now();
    setInterval(this.timer, 100);
    this.recipe = this.$store.getters.getRecipeById(this.$route.params.id);
    this.items = this.recipe.instructions;
  },
  methods: {
    timer: function() {
      this.current = ~~((Date.now() - this.start) / 1000);
    }
  },
  components: {
    ListWheel
  }
};
</script>

<style lang="sass" scoped>
ul
  list-style-type: none
  padding: 0

.widget
  transition: all 250ms
</style>