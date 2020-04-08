<template>
  <div class="container-list" ref="list" @touchstart="touchInit" @touchend="swipe">
    <transition-group :name="fadeDirection" tag="div" class="list">
      >
      <div v-for="widget in activeWidgets" :key="widget.id" class="widget" ref="widgets">
        <slot :item="widget[widgetKey]"></slot>
      </div>
    </transition-group>
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
    }
  },
  mounted: function() {
    this.$nextTick(
      function() {
        this.widgets = this.items.map((value, idx) => ({
          id: idx,
          [this.widgetKey]: value
        }));
        this.activeWidgets = this.widgets.slice(0, 3);
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
        this.fadeDirection = "fade-top";
        this.moveUp();
      } else {
        this.fadeDirection = "fade-bottom";
        console.log("swipe up");
        this.moveDown();
      }
    },
    moveDown: function() {
      var leftBound = this.activeWidgets[0].id;
      if (
        !(leftBound == 0 && this.activeWidgets.length < 3) &&
        leftBound < this.widgets.length - 1
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
      var rightBound = this.activeWidgets[this.activeWidgets.length - 1].id;
      if (
        !(
          rightBound == this.widgets.length - 1 && this.activeWidgets.length < 3
        ) &&
        rightBound > 0
      ) {
        rightBound -= 1;
      }
      var leftBound = this.activeWidgets[0].id;
      if (this.activeWidgets[0].id > 0) {
        leftBound -= 1;
      }
      this.activeWidgets = this.widgets.slice(leftBound, rightBound + 1);
    }
  }
};
</script>

<style lang="sass" scoped>
//bottom

.list
  display: flex
  align-items: center
  flex-direction: column
  div
    transition: all 250ms
    padding: 2rem
    display: flex
.fade-bottom-leave-active
  position: absolute
.fade-top-enter, .fade-top-leave-to
  opacity: 0
.fade-bottom-enter, .fade-bottom-leave-to
  opacity: 0
.fade-bottom-leave-active
  transition: transform 1000ms
  transform: translateY(-50px) scale(0)
</style>