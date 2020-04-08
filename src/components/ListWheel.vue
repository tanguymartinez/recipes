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
        this.activeWidgets = this.widgets.slice(0, 2);
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
        !(leftBound == 0 && this.activeWidgets.length < 3) && // 3 is the length of the displayed list
        leftBound < this.widgets.length - 2 // -1 for 1 minimum item, -2 for 2 etc...
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
          (
            rightBound == this.widgets.length - 1 &&
            this.activeWidgets.length < 3
          ) // 3 is the length of the displayed list
        ) &&
        rightBound > 1 // 0 for 1 minimum item, 1 for 2 etc...
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
  background-color: #2ec2c9
  border-radius: 5px
  transition: all 250ms
  padding: .7rem
  display: flex
  margin: 1rem 0
  width: 100%

.fade-bottom-move
  left: 0
.fade-bottom-leave-active
  position: absolute
  transform: translateY(-6rem)
.fade-top-enter, .fade-top-leave-to
  opacity: 0
.fade-bottom-enter, .fade-bottom-leave-to
  opacity: 0

.active
  background-color: red
</style>