<template>
  <div class="container-list" ref="list" @touchstart="touchInit" @touchend="swipe">
    <transition-group :name="fadeDirection" tag="div" class="list">
      >
      <div
        v-for="(widget, idx) in activeWidgets"
        :key="widget.id"
        :class="[{ active: isActive(widget.id, idx) }, 'widget']"
        ref="widgets"
      >
        <div class="scale">
          <slot :item="widget[widgetKey]" :idx="widget.id"></slot>
        </div>
      </div>
    </transition-group>
    <div class="list-control">
      <img class="button-previous" src="../assets/img/arrow-up.svg" @click="moveUp" alt="arrow up" />
      <img
        class="button-next"
        src="../assets/img/arrow-down.svg"
        @click="moveDown"
        alt="arrow down"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      gesture: {
        start: {}
      },
      widgetKey: Symbol("widget key"),
      widgets: [],
      displayed: [],
      activeWidgets: [],
      fadeDirection: "bottom"
    };
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    maxLength: {
      type: Number,
      default: 3
    },
    minLength: {
      type: Number,
      default: 2
    },
    startLength: {
      type: Number,
      default: 2
    }
  },
  mounted: function() {
    this.$nextTick(
      function() {
        this.widgets = this.items.map((value, idx) => ({
          id: idx,
          [this.widgetKey]: value
        }));
        this.activeWidgets = this.widgets.slice(0, this.startLength);
      }.bind(this)
    );
  },
  methods: {
    unify: function(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    },
    touchInit: function(e) {
      this.gesture.start = (({ clientX, clientY }) => ({ clientX, clientY }))(
        this.unify(e)
      );
    },
    swipe: function(e) {
      if (!Object.keys(this.gesture.start).length > 0) {
        return;
      }
      var dy = this.unify(e).clientY - this.gesture.start.clientY;
      if (dy > 0) {
        console.log("swipe down");
        this.moveUp();
      } else {
        console.log("swipe up");
        this.moveDown();
      }
    },
    moveDown: function() {
      this.fadeDirection = "fade-bottom";
      var leftBound = this.activeWidgets[0].id;
      if (
        !(leftBound == 0 && this.activeWidgets.length < this.maxLength) && // 3 is the length of the displayed list
        leftBound < this.widgets.length - this.minLength // -1 for 1 minimum item, -2 for 2 etc...
      ) {
        leftBound += 1;
      }
      var rightBound = this.activeWidgets[this.activeWidgets.length - 1].id;
      if (
        this.activeWidgets[this.activeWidgets.length - 1].id <
        this.widgets.length
      ) {
        rightBound += 1;
      }
      this.activeWidgets = this.widgets.slice(leftBound, rightBound + 1);
    },
    moveUp: function() {
      this.fadeDirection = "fade-top";
      var rightBound = this.activeWidgets[this.activeWidgets.length - 1].id;
      if (
        !(
          (
            rightBound == this.widgets.length - 1 &&
            this.activeWidgets.length < this.maxLength
          ) // 3 is the length of the displayed list
        ) &&
        rightBound > this.minLength - 1 // 0 for 1 minimum item, 1 for 2 etc...
      ) {
        rightBound -= 1;
      }
      var leftBound = this.activeWidgets[0].id;
      if (this.activeWidgets[0].id > 0) {
        leftBound -= 1;
      }
      this.activeWidgets = this.widgets.slice(leftBound, rightBound + 1);
    },
    isActive: function(id, idx) {
      if (this.activeWidgets.length == 3) {
        // if everything shown set the middle active
        return idx == 1;
      } else if (id == 0 || id == this.widgets.length - 1) {
        // else if we're on either end of the widgets array
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="sass" scoped>
//bottom
.container-list
  position: relative
  display: flex
  justify-content: center
.list
  padding-top: 3rem
  display: flex
  align-items: center
  flex-direction: column
  width: 70%
  min-width: 18rem
  position: relative
.widget
  color: #29990c
  border-radius: 5px
  transition: all .4s
  display: flex
  width: 100%

.fade-bottom-leave-active
  position: absolute
  transition: all .4s

.fade-bottom-enter, .fade-bottom-leave-to
  opacity: 0

.fade-bottom-enter // enter bottom
  transform: translate(3rem, 3rem)

.fade-bottom-leave-to // leave top
  transform: translate(6rem, -6rem)

.fade-top-enter, .fade-top-leave-to
  opacity: 0

.fade-top-enter // enter top
  transform: translate(6rem, -6rem)

.fade-top-leave-to // leave bottom
  transform: translate(6rem, 3rem)

.active .scale
  box-shadow: 0 0 40px 5px #9fff85
  transition: all .4s
  transform: scale(1.05)

.scale
  background-color: #d4ff52
  color: #29990c
  border-radius: 5px
  transition: all .4s
  padding: .7rem
  display: flex
  margin: .7rem 0
  width: 100%
  align-items: center

[class^="button"]
  width: 2rem
  transition: all 100ms
  &:hover
    cursor: pointer
    transform: scale(.8)
  &:first-of-type
    margin-bottom: .5rem
  &:last-of-type
    margin-top: .5rem

.list-control
  position: absolute
  right: 0
  top: 3.5rem
  display: flex
  flex-direction: column
</style>