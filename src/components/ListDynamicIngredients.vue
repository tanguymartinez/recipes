<template>
  <list-dynamic :items="items">
    <template #item="{ item, idx }">
      <lockable v-slot:default="{ attrs, locked }" :attrs="{ item, idx }">
        <input
          type="text"
          class="input-value"
          :value="attrs.item.value"
          @input.prevent="itemModify({ value: $event.target.value }, idx)"
          @keydown.enter.prevent
          :disabled="locked"
        />
        x
        <input
          type="number"
          class="input-quantity"
          :value="attrs.item.quantity"
          @input.prevent="itemModify({ quantity: $event.target.value }, idx)"
          @keydown.enter.prevent
          :disabled="locked"
        />
        <select
          class="input-unit"
          :value="attrs.item.unit"
          @input.prevent="itemModify({ unit: $event.target.value }, idx)"
          @keydown.enter.prevent
          :disabled="locked"
        >
          <option v-for="(item, idx) in units" :key="item + idx" :value="item">{{ item }}</option>
        </select>
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
      <input
        ref="inputAddIngredient"
        type="text"
        placeholder="Ingredient"
        @keydown.enter.prevent="itemAdd"
      />
      x
      <input
        class="input-add-quantity"
        ref="inputAddQuantity"
        type="number"
        placeholder="Quantity"
        @keydown.enter.prevent="itemAdd"
        min="0"
      />
      <select ref="inputAddUnit" @keydown.enter.prevent="itemAdd">
        <option v-for="(item, idx) in units" :key="item + idx" :value="item">{{ item }}</option>
      </select>
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
      units: [
        "",
        "mL",
        "L",
        "g",
        "kg",
        "ts",
        "tbs",
        "pinch",
        "quarter",
        "half",
        "whole"
      ]
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
    }
  },
  methods: {
    itemAdd: function(e) {
      var payload = {
        value: this.$refs.inputAddIngredient.value,
        quantity: this.$refs.inputAddQuantity.value,
        unit: this.$refs.inputAddUnit.value
      };
      this.$emit("item-add", payload);
      this.$refs.inputAddIngredient.value = "";
      this.$refs.inputAddQuantity.value = "";
      this.$refs.inputAddUnit.value = "";
    },
    itemRemove: function(idx) {
      this.$emit("item-remove", idx);
    },
    itemModify: function(change, idx) {
      var result = { ...this.items[idx], ...change };
      this.$emit("item-modify", { newValue: result, idx });
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
  @include mixins.input-disabled

::v-deep.lockable
  >*
    margin-left: .5rem
    margin-right: .5rem
    &:first-child
      margin-left: 0
    &:last-child
      margin-left: 1rem
      margin-right: 0
.input-quantity, .input-add-quantity
  width: 4.5rem

[class^="button"]
  @include mixins.button

[class*="button-add"], [class*="button-remove"]
  margin: 0
  @include mixins.hover-rotate-half
</style>