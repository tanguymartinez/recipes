<template>
  <div>
    <button @click="change">Change</button>
    <keep-alive include="RunRecipe">
      <component :is="componentName"></component>
    </keep-alive>
  </div>
</template>

<script>
import ShowRecipe from "./ShowRecipe";
import RunRecipe from "./RunRecipe";
export default {
  data: function() {
    return {
      idx: 0,
      componentName: "RunRecipe",
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

<style>
</style>