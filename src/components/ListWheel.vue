<template>
  <div class="container-list" ref="list" @touchstart="touchInit" @touchend="swipe">
    <transition-group :name="fadeDirection" tag="div" class="list">
      >
      <div
        v-for="widget in activeWidgets"
        :key="widget.id"
        class="widget"
        ref="widgets"
      >{{ widget.value }}</div>
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
      values: ["Pomme", "Poire", "Cassis", "Framboise", "Pêche"],
      widgets: [],
      displayed: [],
      activeWidgets: [],
      fadeDirection: "bottom"
    };
  },
  mounted: function() {
    this.widgets = this.values.map((value, idx) => ({
      id: idx,
      value
    }));
    this.activeWidgets = this.widgets.slice(0, 3);
    this.show(this.activeWidgets);
  },
  methods: {
    show: function(widgets) {
      widgets.forEach(
        function(widget) {
          widget.show = true;
        }.bind(this)
      );
    },
    hide: function(widgets) {
      widgets.forEach(
        function(widget) {
          widget.show = false;
        }.bind(this)
      );
    },
    widget: function(n) {
      return this.$refs.widgets[n];
    },
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
      if (this.activeWidgets[0].id == this.widgets.length - 2) {
        return;
      }
      var leftBound =
        this.activeWidgets[0].id + (this.activeWidgets.length < 3 ? 0 : 1);
      this.activeWidgets = this.widgets.slice(
        leftBound,
        this.activeWidgets[this.activeWidgets.length - 1].id + 2
      );
    },
    moveUp: function() {
      function positive(nb) {
        return nb >= 0 ? nb : 0;
      }
      if (this.activeWidgets[this.activeWidgets.length - 1].id == 1) {
        return;
      }
      var rightBound =
        this.activeWidgets[this.activeWidgets.length - 1].id -
        (this.activeWidgets.length < 3 ? 0 : 1) +
        1;
      this.activeWidgets = this.widgets.slice(
        positive(this.activeWidgets[0].id - 1),
        rightBound
      );
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