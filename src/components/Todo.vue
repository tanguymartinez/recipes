<template>
  <transition-group name="order" tag="ul">
    <li v-for="checked in checkedOrdered" :key="checked.id" class="checked">
      <div class="checkbox-custom">
        <input :id="'checked' + checked.id" type="checkbox" @click="change($event, checked.id)" />
        <label :for="'checked' + checked.id"></label>
      </div>
      <slot :item="checked[valueKey]"></slot>
    </li>
    <li v-for="unchecked in uncheckedOrdered" :key="unchecked.id">
      <div class="checkbox-custom">
        <input
          :id="'unchecked' + unchecked.id"
          type="checkbox"
          @click="change($event, unchecked.id)"
        />
        <label :for="'unchecked' + unchecked.id"></label>
      </div>
      <slot :item="unchecked[valueKey]"></slot>
    </li>
  </transition-group>
</template>

<script>
export default {
  data: function() {
    return {
      todos: [],
      checked: new Set(),
      valueKey: Symbol("value key")
    };
  },
  computed: {
    checkedOrdered: function() {
      return this.todos
        .filter(
          function(value, idx) {
            return this.checked.has(value.id);
          }.bind(this)
        )
        .sort(this.sort);
    },
    uncheckedOrdered: function() {
      return this.todos
        .filter(
          function(value, idx, arr) {
            return !this.checked.has(value.id);
          }.bind(this)
        )
        .sort(this.sort);
    }
  },
  mounted: function() {
    this.$nextTick(
      function() {
        this.todos = this.items.map((value, idx, arr) => ({
          [this.valueKey]: value,
          id: idx
        }));
      }.bind(this)
    );
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    change: function(e, id) {
      if (!this.checked.has(id)) {
        this.checked = new Set(this.checked.add(id));
      } else {
        this.checked.delete(id);
        this.checked = new Set(this.checked);
      }
    },
    sort: function(a, b) {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
li
  display: flex
  justify-content: flex-start
  align-items: center
  >*
    margin: 0 1rem

.checked
  text-decoration: line-through

.order-move
  transition: transform 200ms

input[type=checkbox]
  visibility: hidden

.checkbox-custom
  height: 1.78rem
  width: 2rem
  position: relative
  margin: 0
  margin-right: 1rem
  border-radius: 4px
  border: 3px solid #9534eb
  label
    display: block
    width: 100%
    height: 100%
    transition: all .2s
    cursor: pointer
    position: absolute
    z-index: 1
    top: 0
  input[type=checkbox]:checked + label
    background-image: url('../assets/img/check.svg')
    background-size: 100%
</style>