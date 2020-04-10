<template>
  <todo :items="items">
    <template #default="{item}">
      <div class="item-container">
        <p>{{ item.value }}</p>
        <div>
          <p class="separator">x</p>
          <p>{{ item.quantity + " " + item.unit }}</p>
        </div>
      </div>
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
p
  margin: 0

ul
  padding: 0
  display: flex
  flex-direction: column
  align-items: center
  ::v-deep li
    margin: 1rem 0 0 0
    min-width: 5rem
    width: 50%
    border-radius: 5px
    padding: .7rem

.item-container
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  >div
    display: flex
</style>