<template>
  <ul v-if="!ordered">
    <li v-for="(item, idx) in items" :key="item + idx">
      <slot :item="item" :idx="idx"></slot>
    </li>
  </ul>
  <ol v-else>
    <li v-for="(item, idx) in items" :key="item + idx">
      <slot :item="item" :idx="idx"></slot>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    ordered: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
</style>