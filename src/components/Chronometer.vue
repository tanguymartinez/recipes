<template>
  <div class="chronometer">
    <p>{{ this.displayTime }}</p>
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
    displayTime() {
      var diff = this.elapsedTime;
      let millis = 60 * 60 * 1000;
      const HOURS = ~~(diff / millis);
      diff -= HOURS * millis;
      const MINUTES = ~~(diff / (millis /= 60));
      diff -= MINUTES * millis;
      const SECONDS = ~~(diff / (millis /= 60));

      var pad = s => (("" + s).length < 2 ? "0" + s : s);
      return `${pad(HOURS)}:${pad(MINUTES)}:${pad(SECONDS)}`;
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
  width: 4rem
  height: 4rem
  padding: .5rem
  border-radius: 50%
  background-color: #2e2e2e
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  border: 5px solid #ff8526
  p
    background-color: #fff1c4
    border-radius: 2px
    width: 100%
    margin: 0
    margin-top: 28%
    text-align: center
    font-family: "Space Mono", monospace
    font-size: .8rem
  .chronometer-controls
    display: flex
    width: 100%
    position: relative
    margin-bottom: .2rem
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
