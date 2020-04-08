<template>
  <div>
    <button @click="change">Change</button>
    <transition name="recipe-tab" mode="out-in">
      <keep-alive include="RunRecipe">
        <component :is="componentName"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import ShowRecipe from "./ShowRecipe";
import RunRecipe from "./RunRecipe";
export default {
  data: function() {
    return {
      idx: 0,
      componentName: "ShowRecipe",
      componentNames: ["RunRecipe", "ShowRecipe"]
    };
  },
  methods: {
    change: function() {
      var idx = Math.abs(this.componentNames.indexOf(this.componentName) - 1);
      this.componentName = this.componentNames[idx];
    }
  },
  components: {
    ShowRecipe,
    RunRecipe
  }
};
</script>

<style lang="sass" scoped>
.recipe-tab-enter-active,
.recipe-tab-leave-active
  transition: all 200ms

.recipe-tab-enter,.recipe-tab-leave-to
  opacity: 0

.recipe-tab-enter
  transform: translateX(-2rem)

.recipe-tab-leave-to
  transform: translateX(-2rem)
</style>