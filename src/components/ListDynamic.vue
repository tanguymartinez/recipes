<template>
  <div class="list-dynamic">
    <list :items="items">
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
    }
  },
  components: {
    List
  }
};
</script>

<style lang="sass" scoped>
.list-dynamic-control
  display: flex
  flex-direction: row
  justify-content: space-around
  input
    margin-bottom: 0

.list-dynamic-item
  display: flex
  flex-direction: row
  justify-content: space-between
</style>