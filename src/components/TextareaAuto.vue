<template>
  <textarea @input.prevent="input" :value="value"></textarea>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    input: function(e) {
      var element = e.target;
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style lang="sass" scoped>
@use "../assets/mixins"
textarea
    font-family: inherit
    height: 1rem
    resize: none
    overflow: hidden
    @include mixins.default-form-input
</style>