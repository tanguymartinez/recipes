<template>
  <div class="list-dynamic">
    <list :items="items" :ordered="ordered">
      <template v-slot:default="{ item, idx }">
        <div class="list-dynamic-item">
          <slot name="item" :item="item" :idx="idx"></slot>
          <slot name="buttonLock" :idx="idx"></slot>
          <slot name="buttonRemove" :idx="idx"></slot>
        </div>
      </template>
    </list>
    <div class="list-dynamic-control">
      <slot name="input"></slot>
      <slot name="buttonAdd"></slot>
    </div>
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
    },
    ordered: {
      type: Boolean,
      default: false
    }
  },
  components: {
    List
  }
};
</script>

<style lang="sass" scoped>
@use "../assets/mixins"
.list-dynamic-control
  display: flex
  justify-content: space-between
  align-items: center
  flex-wrap: wrap
  >*
    margin-left: .5rem
    margin-right: .5rem
    &:first-child
      margin-left: 0
      &:last-child
        margin-left: 1rem
        margin-right: 0
  input
    margin-bottom: 0

.list-dynamic-item
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  &:last-child
    margin-bottom: 1rem
</style>