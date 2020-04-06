<template>
  <list-dynamic :items="items" :ordered="ordered">
    <template #item="{ item, idx }">
      <lockable
        v-slot:default="{ attrs, locked }"
        :attrs="{ item, idx, updateUncommitted: updateUncommitted.bind(this) }"
      >
        <input-text
          :unlocked="!locked"
          :value="attrs.item.value"
          @input="itemModify({value: $event}, idx)"
        />
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
      <input-text :value="textAdd" @input="textAdd = $event" />
    </template>
    <template #buttonAdd>
      <img class="button-add" src="../assets/img/add.svg" alt="add icon" @click.prevent="itemAdd" />
    </template>
  </list-dynamic>
</template>

<script>
import ListDynamic from "./ListDynamic";
import Lockable from "./Lockable";
import InputText from "./InputText";
export default {
  data: function() {
    return {
      uncommitted: new Map(),
      textAdd: ""
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
        value: this.textAdd
      };
      this.$emit("item-add", payload);
      this.textAdd = "";
    },
    itemRemove: function(idx) {
      this.$emit("item-remove", idx);
    },
    itemModify: function(change, idx) {
      var result = { ...this.items[idx], ...change };
      this.$emit("item-modify", { newValue: result, idx });
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
    Lockable,
    InputText
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
  @include mixins.default-form-input
  @include mixins.editable

.list-dynamic-control
  p
    width: 90%
    margin: 0

[class^="button"]
  @include mixins.button

[class*="button-add"], [class*="button-remove"]
  margin: 0
  @include mixins.hover-rotate-half
</style>