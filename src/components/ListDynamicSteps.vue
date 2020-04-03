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
          @input.prevent="updateUncommitted({ value: $event.target.innerHTML}, idx)"
          v-html="attrs.item.value"
        ></p>
      </lockable>
    </template>
    <template #buttonRemove="{ idx }">
      <img
        class="button-remove"
        src="../assets/img/remove.svg"
        alt="remove icon"
        @click.prevent="itemRemove(idx)"
      />
    </template>
    <template #input>
      <p class="editable" ref="inputAdd" contenteditable="true"></p>
    </template>
    <template #buttonAdd>
      <img class="button-add" src="../assets/img/add.svg" alt="add icon" @click.prevent="itemAdd" />
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
      var payload = {
        value: this.$refs.inputAdd.innerHTML
      };
      this.$emit("item-add", payload);
      this.$refs.inputAdd.innerHTML = "";
    },
    itemRemove: function(idx) {
      this.$emit("item-remove", idx);
    },
    itemModify: function(idx) {
      if (!this.uncommitted.has(idx)) {
        return;
      }
      this.$emit("item-modify", { newValue: this.uncommitted.get(idx), idx });
      this.uncommitted.delete(idx);
    },
    updateUncommitted: function(change, idx) {
      var result;
      if (this.uncommitted.has(idx)) {
        result = {
          ...this.items[idx],
          ...this.uncommitted.get(idx),
          ...change
        };
      } else {
        result = { ...this.items[idx], ...change };
      }
      this.uncommitted.set(idx, result);
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
  width: calc(100% - .4rem)
  p
    padding: .2rem
    margin: .2rem
    width: 100%
  >*
    margin-left: .5rem
    margin-right: .5rem
    &:first-child
      margin-left: 0
    &:last-child
      margin-left: .2rem
      margin-right: .4rem

.editable
  max-width: 100%
  word-wrap: break-word
  min-height: 1.2rem
  @include mixins.default-form-input

.list-dynamic-control
  p
    width: 90%
    margin: 0

[class^="button"]
  @include mixins.button

[class*="button-add"], [class*="button-remove"]
  @include mixins.hover-rotate-half
</style>