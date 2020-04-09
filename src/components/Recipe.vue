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
import TodoRecipe from "./TodoRecipe";
import ShowRecipe from "./ShowRecipe";
import RunRecipe from "./RunRecipe";
export default {
  data: function() {
    return {
      idx: 0,
      count: 0,
      componentName: "ShowRecipe",
      componentNames: ["ShowRecipe", "TodoRecipe", "RunRecipe"]
    };
  },
  methods: {
    change: function() {
      this.count += 1;
      var idx = this.count % 3;
      this.componentName = this.componentNames[idx];
    }
  },
  components: {
    TodoRecipe,
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