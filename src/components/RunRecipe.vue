<template>
  <div>
    <chronometer duration="5"></chronometer>
    <list-wheel :items="items">
      <template v-slot:default="{item, idx}">
        <p class="number">{{ idx + 1 }}</p>
        <p>{{item.value}}</p>
      </template>
    </list-wheel>
  </div>
</template>

<script>
import ListWheel from "./ListWheel";
import Chronometer from "./Chronometer";
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
    ListWheel,
    Chronometer
  }
};
</script>

<style lang="sass" scoped>
ul
  list-style-type: none
  padding: 0
  text-align: left
p
  margin: 0
  word-break: break-word
  text-align: left
.number
  height: 2rem
  margin-right: .6rem
  font-size: 1.5rem
  align-self: flex-start
</style>