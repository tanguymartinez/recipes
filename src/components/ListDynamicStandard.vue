<template>
  <list-dynamic :items="items" :ordered="ordered">
    <template #item="{ item, idx }">
      <lockable
        v-slot:default="{ attrs, locked }"
        :attrs="{ item, idx, updateUncommitted: updateUncommitted.bind(this) }"
        @locking="itemModify(idx)"
      >
        <input
          type="text"
          :value="attrs.item"
          @input.prevent="updateUncommitted($event.target.value, idx)"
          @keydown.enter.prevent
          :disabled="locked"
        />
      </lockable>
    </template>
    <template #buttonRemove="{ idx }">
      <button @click.prevent="itemRemove(idx)">X</button>
    </template>
    <template #input>
      <input ref="inputAdd" type="text" :placeholder="placeholder" @keydown.enter.prevent="itemAdd" />
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
      this.$emit("item-add", this.$refs.inputAdd.value);
      this.$refs.inputAdd.value = "";
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

input:disabled
  background-color: #1ed6ab70
  border: 1.5px solid transparent
</style>