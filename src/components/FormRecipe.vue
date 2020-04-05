<template>
  <div>
    <form action>
      <label for="name">Name</label>
      <input type="text" name="name" id="name" v-model="name" />
      <label for="description">Description</label>
      <input-text :value="description" @input="description = $event" />
      <label for="ingredients">Ingredients</label>
      <list-dynamic-ingredients
        :items="ingredients"
        placeholder="Additional ingredient..."
        @item-add="ingredients.push($event)"
        @item-remove="ingredients.splice($event, 1)"
        @item-modify="ingredients.splice($event.idx, 1, $event.newValue)"
      ></list-dynamic-ingredients>
      <label for="instructions">Instructions</label>
      <list-dynamic-steps
        :items="instructions"
        :ordered="true"
        @item-add="instructions.push($event)"
        @item-remove="instructions.splice($event, 1)"
        @item-modify="instructions.splice($event.idx, 1, $event.newValue)"
      ></list-dynamic-steps>
      <label for="notes">Notes</label>
      <input-text :value="notes" @input="notes = $event" />
      <input type="submit" value="Save" @click.prevent="save" />
    </form>
  </div>
</template>

<script>
import ListDynamicSteps from "./ListDynamicSteps";
import ListDynamicIngredients from "./ListDynamicIngredients";
import InputText from "./InputText";

export default {
  data: function() {
    return {
      id: null,
      name: "",
      description: "",
      ingredients: [],
      instructions: [],
      notes: ""
    };
  },
  components: {
    ListDynamicSteps,
    ListDynamicIngredients,
    InputText
  },
  mounted: function() {
    if (!this.$route.params.id) {
      return;
    }
    var recipe = this.$store.state.recipes.find(
      function(recipe) {
        return recipe.id == this.$route.params.id;
      }.bind(this)
    );
    Object.keys(recipe).forEach((key, idx, arr) => {
      if (this.$data.hasOwnProperty(key)) {
        this[key] = recipe[key];
      }
    });
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
    },
    save: function() {
      if (this.id == null) {
        this.id = parseInt(localStorage.getItem("id")) + 1;
        this.$store.dispatch("addRecipe", { ...this.$data });
      } else {
        var idx = this.$store.state.recipes.findIndex(
          function(recipe) {
            return recipe.id == this.$route.params.id;
          }.bind(this)
        );
        this.$store.dispatch("modifyRecipe", {
          idx,
          recipe: { ...this.$data }
        });
      }
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="sass" scoped>
@use "../assets/mixins"
@include mixins.default-form
.editable
  text-align: left
  @include mixins.default-form-input
  @include mixins.editable
</style>
