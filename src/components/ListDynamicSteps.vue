<template>
  <list-dynamic :items="items" :ordered="ordered">
    <template #item="{ item, idx }">
      <lockable
        v-slot:default="{ attrs, locked }"
        :attrs="{ item, idx, updateUncommitted: updateUncommitted.bind(this) }"
        @locking="itemModify(idx)"
      >
        <p
          class="editable"
          :contenteditable="!locked"
          @input.prevent="updateUncommitted($event.target.innerHTML, idx)"
          v-html="attrs.item"
        ></p>
      </lockable>
    </template>
    <template #buttonRemove="{ idx }">
      <button @click.prevent="itemRemove(idx)">X</button>
    </template>
    <template #input>
      <p class="editable" ref="inputAdd" contenteditable="true"></p>
    </template>
    <template #buttonAdd>
      <button @click.prevent="itemAdd">Add</button>
    </template>
  </list-dynamic>
</template>

<script>
import ListDynamic from "./ListDynamic";
import Lockable from "./Lockable";
export default {
  data: function() {
    return {
      uncommitted: new Map()
    };
  },

  props: {
    items: {
      required: true,
      type: Array
    },
    placeholder: {
      type: String,
      default: ""
    },
    ordered: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    itemAdd: function(e) {
      this.$emit("item-add", this.$refs.inputAdd.innerHTML);
      this.$refs.inputAdd.innerText = "";
    },
    itemRemove: function(idx) {
      this.$emit("item-remove", idx);
    },
    itemModify: function(idx) {
      if (!this.uncommitted.has(idx)) {
        return;
      }
      this.$emit("item-modify", { newValue: this.uncommitted.get(idx), idx });
    },
    updateUncommitted: function(value, idx) {
      this.uncommitted.set(idx, value);
    }
  },
  components: {
    ListDynamic,
    Lockable
  }
};
</script>

<style lang="sass" scoped>
@use "../assets/mixins"

input
  @include mixins.default-form-input

p, input
  margin: 0
button
  padding: 0

p[contenteditable="false"]
  @include mixins.input-disabled

::v-deep.lockable
  display: flex
  align-items: center
  p
    padding: .2rem
    margin: .2rem
  >*
    margin-left: .5rem
    margin-right: .5rem
    &:first-child
      margin-left: 0
    &:last-child
      margin-left: 1rem
      margin-right: 0

.editable
  max-width: 100%
  word-wrap: break-word
  min-height: 1.2rem
  @include mixins.default-form-input
</style>