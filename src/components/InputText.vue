<template>
  <p
    class="editable"
    ref="inputAdd"
    :contenteditable="unlocked"
    @input="$emit('input', $event.target.innerText)"
    @focus="lock"
    @focusout="unlock"
    v-html="actual"
  ></p>
</template>

<script>
export default {
  data: function() {
    return {
      locked: false,
      pending: null,
      actual: this.value
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    unlocked: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: function(newValue, oldValue) {
      if (this.locked) {
        this.pending = newValue;
      } else {
        this.actual = newValue;
      }
    }
  },
  methods: {
    lock: function(e) {
      this.locked = true;
    },
    unlock: function(e) {
      this.locked = false;
      if (this.pending) {
        this.actual = this.pending;
        this.pending = null;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@use "../assets/mixins"
.editable
  @include mixins.default-form-input
  @include mixins.editable
</style>