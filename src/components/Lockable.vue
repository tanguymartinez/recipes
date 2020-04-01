<template>
  <div class="lockable">
    <slot :attrs="attrs" :locked="locked"></slot>
    <!-- <input ref="input" type="text" :value="item" v-if="lock" /> -->
    <button @click.prevent="toggle" v-if="locked">L</button>
    <button @click.prevent="toggle" v-if="!locked">Ok</button>
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