<template>
  <div class="chronometer">
    <p>{{ this.elapsedTimeSeconds }}</p>
    <div class="chronometer-controls">
      <div class="chronometer-controls-left">
        <transition
          :name="startTime == null ? 'start-first' : 'start-then'"
          @after-leave="startLeft"
        >
          <img
            v-if="startTime == null || paused"
            key="start"
            class="button-start"
            @click="start"
            src="../assets/img/play.svg"
            alt="start logo"
          />
        </transition>
        <transition name="pause">
          <img
            v-if="startTime != null && !paused"
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
      startTransition: "start-first"
    };
  },
  mounted: function() {},
  computed: {
    elapsedTimeSeconds() {
      return this.elapsedTime / 1000;
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
    },
    stop: function() {
      this.startTime = null;
      this.elapsedTime = 0;
      clearInterval(this.id);
      this.id = null;
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
    startLeft: function(el) {
      if (this.startTime != null) {
        console.log("reset");
        el.style.transform = "unset";
      }
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
    transform: translateX(50%)
  .button-start, .button-pause
    right: 0
  .button-stop
    left: 0
.start-first-enter-active
  transition: all 250ms linear
.start-first-leave-active
  transition: all 250ms linear
.start-first-enter, .start-first-leave-to
  opacity: 0
  transform: translate(50%, -100%) !important

.start-then-enter-active
  transition: all 250ms linear
.start-then-leave-active
  transition: all 250ms linear
.start-then-enter, .start-then-leave-to
  opacity: 0
  transform: translateX(-100%)

.pause-enter-active
  transition: all 250ms linear
.pause-leave-active
  transition: all 250ms linear
.pause-enter, .pause-leave-to
  opacity: 0
  transform: translateX(-100%)

.stop-enter-active, .stop-leave-active
  transition: all 250ms linear
.stop-enter, .stop-leave-to
  transform: translateX(100%)
</style>
