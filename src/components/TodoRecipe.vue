<template>
  <todo :items="items">
    <template #default="{item}">
      <p>{{ item.value }}</p>
      <p class="separator">x</p>
      <p>{{ item.quantity + item.unit }}</p>
    </template>
  </todo>
</template>

<script>
import Todo from "./Todo";
export default {
  data: function() {
    return {
      items: []
    };
  },
  mounted: function() {
    this.items =
      this.$store.getters.getRecipeById(this.$route.params.id).ingredients ||
      [];
  },
  components: {
    Todo
  }
};
</script>

<style lang="sass" scoped>
.separator
  margin: 0 1rem
</style>