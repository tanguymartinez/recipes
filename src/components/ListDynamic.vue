<template>
  <div>
    <list :items="items">
      <template v-slot:default="{ item }">
        <slot name="item" :item="item"></slot>
      </template>
    </list>
    <slot name="button">
      <button @click="add" value="Add" />
    </slot>
  </div>
</template>

<script>
import List from "./List";
export default {
  data: function() {
    return {};
  },
  props: {
    items: {
      required: true
    }
  },
  methods: {
    add: function(e) {
      this.$emit("add", e.target.value);
    }
  },
  components: {
    List
  }
};
</script>

<style>
</style>