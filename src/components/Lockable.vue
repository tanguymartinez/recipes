<template>
  <div class="lockable">
    <slot :attrs="attrs" :locked="locked"></slot>
    <!-- <input ref="input" type="text" :value="item" v-if="lock" /> -->
    <img
      src="../assets/img/locked.svg"
      class="button-locked"
      alt="lock locked icon"
      @click.prevent="toggle"
      v-if="locked"
    />
    <img
      src="../assets/img/unlocked.svg"
      class="button-unlocked"
      alt="lock unlocked icon"
      @click.prevent="toggle"
      v-if="!locked"
    />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      locked: true //re render issue
    };
  },
  props: {
    attrs: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggle: function() {
      if (!this.locked) {
        this.$emit("locking");
      } else {
        this.$emit("unlocking");
      }
      this.locked = !this.locked;
    }
  }
};
</script>
<style lang="sass" scoped>
@use "../assets/mixins"
.lockable
  display: flex
  align-items: center
  >*
    margin-left: .5rem
    margin-right: .5rem
    &:first-child
      margin-left: 0
    &:last-child
      margin-left: 1rem
      margin-right: 0
[class^="button"]
  @include mixins.button
</style>