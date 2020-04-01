<template>
  <div>
    <form action>
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" v-model="name" />
      <label for="description">Description:</label>
      <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
      <label for="ingredients">Ingredients:</label>
      <list-dynamic-ingredients
        :items="ingredients"
        placeholder="Additional ingredient..."
        @item-add="ingredients.push($event)"
        @item-remove="ingredients.splice($event, 1)"
        @item-modify="ingredients.splice($event.idx, 1, $event.newValue)"
      ></list-dynamic-ingredients>
      <!-- <list-dynamic-standard
        :items="ingredients"
        placeholder="Additional ingredient..."
        @item-add="ingredients.push($event)"
        @item-remove="ingredients.splice($event, 1)"
        @item-modify="ingredients.splice($event.idx, 1, $event.newValue)"
      ></list-dynamic-standard>-->
      <label for="instructions">Instructions:</label>
      <list-dynamic-standard
        :items="instructions"
        placeholder="Additional step..."
        @item-add="instructions.push($event)"
        @item-remove="instructions.splice($event, 1)"
        @item-modify="instructions.splice($event.idx, 1, $event.newValue)"
      ></list-dynamic-standard>
      <label for="notes">Notes:</label>
      <textarea name="notes" id="notes" cols="30" rows="10" v-model="notes"></textarea>
    </form>
  </div>
</template>

<script>
import ListDynamicStandard from "./ListDynamicStandard";
import ListDynamicIngredients from "./ListDynamicIngredients";
export default {
  data: function() {
    return {
      name: "",
      description: "",
      ingredients: [],
      instructions: [],
      notes: ""
    };
  },
  components: {
    ListDynamicStandard,
    ListDynamicIngredients
  },
  methods: {
    log: console.log,
    addItem: function(name, collection) {
      if (!this.$refs.hasOwnProperty(name)) {
        console.error(`"${name}" ref does not exist`);
        return;
      }
      if (!this.hasOwnProperty(collection)) {
        console.error(`"${collection}" property does not exist`);
        return;
      }
      if (this.$refs[name].value == "") {
        console.error("empty value");
        return;
      }
      this[collection].push(this.$refs[name].value);
      this.$refs[name].value = "";
    },
    removeItem: function(idx, collection) {
      if (!this.hasOwnProperty(collection)) {
        console.error(`"${collection}" property does not exist`);
        return;
      }
      this[collection].splice(idx, 1);
    }
  }
};
</script>

<style lang="sass" scoped>
@use "../assets/mixins"
@include mixins.default-form
</style>
