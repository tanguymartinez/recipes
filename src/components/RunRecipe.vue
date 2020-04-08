<template>
  <div ref="timer">
    <p>{{ current }}</p>
    <list-wheel />
  </div>
</template>

<script>
import ListWheel from "./ListWheel";
export default {
  data: function() {
    return {
      id: null,
      start: 0,
      current: 0
    };
  },
  mounted: function() {
    this.start = Date.now();
    setInterval(this.timer, 100);
  },
  methods: {
    timer: function() {
      this.current = ~~((Date.now() - this.start) / 1000);
    }
  },
  components: {
    ListWheel
  }
};
</script>

<style lang="sass" scoped>
ul
    list-style-type: none
    padding: 0

.widget
    transition: all 250ms
</style>