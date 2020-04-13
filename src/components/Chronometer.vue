<template>
  <div class="chronometer">
    <p>{{ this.elapsedTimeSeconds }}</p>
    <div class="chronometer-controls">
      <div class="chronometer-controls-left">
        <transition
          :name="firstTransition ? 'start-first' : 'start-then'"
          @before-enter="startEnter"
          @after-leave="startLeft"
        >
          <img
            ref="start"
            v-if="!startTime || paused"
            class="button-start"
            @click="start"
            src="../assets/img/play.svg"
            alt="start logo"
          />
        </transition>
        <transition :name="firstTransition || firstPause ? 'pause-first' : 'pause-then'">
          <img
            v-if="startTime && !paused"
            class="button-pause"
            @click="pause"
            src="../assets/img/pause.svg"
            alt="pause logo"
          />
        </transition>
      </div>
      <div class="chronometer-controls-right">
        <transition name="stop">
          <img
            v-if="startTime"
            class="button-stop"
            @click="stop"
            src="../assets/img/stop.svg"
            alt="stop logo"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      startTime: null,
      elapsedTime: 0,
      id: null,
      paused: null,
      elapsedPaused: null,
      firstTransition: true,
      startDefaultTransform: "",
      firstPause: true
    };
  },
  mounted: function() {},
  computed: {
    elapsedTimeSeconds() {
      return ~~(this.elapsedTime / 1000);
    }
  },
  methods: {
    start: function() {
      if (this.startTime != null) {
        this.resume();
        return;
      }
      this.startTime = Date.now();
      this.id = setInterval(this.timer, 100);
      this.startDefaultTransform = this.$refs.start.style.transform;
    },
    stop: function() {
      if (this.$refs.start) {
        this.$refs.start.style.transform = this.startDefaultTransform;
      } else {
        this.firstPause = true;
      }
      this.startDefaultTransform = "";
      this.$nextTick(
        function() {
          this.startTime = null;
          this.elapsedTime = 0;
          clearInterval(this.id);
          this.id = null;
          this.firstTransition = true;
          this.paused = false;
          this.elapsedPaused = null;
        }.bind(this)
      );
    },
    resume: function() {
      this.startTime += this.elapsedPaused;
      this.elapsedPaused = null;
      this.paused = false;
    },
    pause: function() {
      this.elapsedPaused = 0;
      this.paused = true;
    },
    timer: function() {
      if (this.paused) {
        this.elapsedPaused = Date.now() - (this.startTime + this.elapsedTime);
      } else {
        this.elapsedTime = Date.now() - this.startTime;
      }
    },
    startEnter: function(el) {
      if (this.startTime != null) {
        el.style.transform = "translateX(0)";
      }
    },
    startLeft: function(el) {
      this.firstTransition = false;
      this.firstPause = false;
    }
  }
};
</script>

<style lang="sass" scoped>
.chronometer
  width: 6rem
  height: 4rem
  padding: .5rem
  border-radius: 3px
  background-color: #2e2e2e
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  p
    background-color: #fff1c4
    border-radius: 2px
    width: 100%
    margin: 0
    text-align: right
  .chronometer-controls
    display: flex
    width: 100%
    position: relative
  [class^="chronometer-controls-"]
    position: relative
    width: 50%
  [class*="button"]
    width: 1rem
    max-height: 1rem
    position: absolute
    bottom: 0
    &:hover
      cursor: pointer
  .button-start
    transition: all 250ms linear
    transform: translateX(50%)
  .button-start, .button-pause
    right: 0
  .button-stop
    left: 0
.start-first-enter
  transition: all 250ms
  opacity: 0
  transform: translate(50%, -100%) !important
.start-first-leave-to
  transition: transform 250ms
  opacity: 0
  transform: translate(50%, -100%) !important

.start-then-enter-active
  transition: all 250ms linear
.start-then-leave-active
  transition: all 250ms linear
.start-then-enter, .start-then-leave-to
  opacity: 0

.pause-first-enter-active
  transition: all 250ms linear
.pause-first-leave-active
  transition: all 250ms linear
.pause-first-enter, .pause-first-leave-to
  opacity: 0
  transform: translateX(-100%)

.pause-then-enter-active
  transition: all 250ms linear
.pause-then-leave-active
  transition: all 250ms linear
.pause-then-enter, .pause-then-leave-to
  opacity: 0

.stop-enter-active, .stop-leave-active
  transition: all 250ms linear
.stop-enter, .stop-leave-to
  opacity: 0
  transform: translateX(100%)
</style>
