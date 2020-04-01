<template>
  <list-dynamic :items="items">
    <template #item="{ item }">
      <p>{{ item }}</p>
    </template>
    <template #input>
      <input ref="input" type="text" :placeholder="placeholder" @keydown.enter.prevent="itemAdd" />
    </template>
    <template #buttonRemove="{ idx }">
      <button @click.prevent="itemRemove(idx)">X</button>
    </template>
    <template #buttonAdd>
      <button @click.prevent="itemAdd">Add</button>
    </template>
  </list-dynamic>
</template>

<script>
import ListDynamic from "./ListDynamic";
export default {
  props: {
    items: {
      required: true,
      type: Array
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  methods: {
    itemAdd: function(e) {
      this.$emit("item-add", this.$refs.input.value);
      this.$refs.input.value = "";
    },
    itemRemove: function(idx) {
      this.$emit("item-remove", idx);
    }
  },
  components: {
    ListDynamic
  }
};
</script>

<style lang="sass" scoped>
p
  margin: 0
button
  padding: 0
</style>