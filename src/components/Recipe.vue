<template>
  <div>
    <div class="recipe-nav">
      <button @click="change(0)" :class="{ selected: idx == 0 }">Recipe</button>
      <button @click="change(1)" :class="{ selected: idx == 1 }">Shop</button>
      <button @click="change(2)" :class="{ selected: idx == 2 }">Cook</button>
    </div>
    <transition name="recipe-tab" mode="out-in">
      <keep-alive :include="['RunRecipe', 'TodoRecipe']">
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
    change: function(id) {
      this.componentName = this.componentNames[id];
      this.idx = id;
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
  transform: translateY(2rem)

.recipe-tab-leave-to
  transform: translateY(2rem)

.recipe-nav
  display: flex
  justify-content: center
  margin-bottom: 2rem
  >button
    background-color: transparent
    border: 1px solid transparent
    margin: 0 1rem
    padding: .5rem
    outline: none
    font-size: 1.05rem
    &:hover
      cursor: pointer

.selected
  transition: all 200ms
  color: #9534eb
</style>