<template>
  <ul>
    <li v-for="(item, idx) in items" :key="item + idx">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
</style>