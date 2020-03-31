<template>
  <div>
    <list :items="items">
      <template v-slot:default="{ item }">
        <slot name="item" :item="item"></slot>
      </template>
    </list>
    <slot name="input"></slot>
    <slot name="button"></slot>
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
  components: {
    List
  }
};
</script>

<style>
</style>