<template>
  <ul v-if="!ordered">
    <transition-group name="list">
      <li v-for="(item, idx) in items" :key="item + idx">
        <slot :item="item" :idx="idx"></slot>
      </li>
    </transition-group>
  </ul>
  <ol v-else>
    <transition-group name="list">
      <li v-for="(item, idx) in items" :key="item + idx">
        <slot :item="item" :idx="idx"></slot>
      </li>
    </transition-group>
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 250ms;
}
.list-enter {
  opacity: 0;
  transform: translateY(3rem) scale(0);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(6rem);
}
</style>