<template>
  <div>
    <h1>New recipe</h1>
    <button-back v-if="$route.params.back" />
    <form action>
      <label for="name">Name</label>
      <input autocomplete="off" type="text" name="name" id="name" v-model="recipe.name" />
      <label for="description">Description</label>
      <input-text :value="recipe.description" @input="recipe.description = $event" />
      <label for="ingredients">Ingredients</label>
      <list-dynamic-ingredients
        :items="recipe.ingredients"
        placeholder="Additional ingredient..."
        @item-add="recipe.ingredients.push($event)"
        @item-remove="recipe.ingredients.splice($event, 1)"
        @item-modify="recipe.ingredients.splice($event.idx, 1, $event.newValue)"
      ></list-dynamic-ingredients>
      <label for="instructions">Instructions</label>
      <list-dynamic-steps
        :items="recipe.instructions"
        :ordered="true"
        @item-add="recipe.instructions.push($event)"
        @item-remove="recipe.instructions.splice($event, 1)"
        @item-modify="recipe.instructions.splice($event.idx, 1, $event.newValue)"
      ></list-dynamic-steps>
      <div class="row">
        <div class="duration">
          <label for="duration">Duration</label>
          <div>
            <input
              type="number"
              id="duration"
              name="duration"
              v-model="recipe.duration.value"
              min="0"
            />
            <select name="unit" id="unit" v-model="recipe.duration.unit">
              <option
                v-for="(item, idx) in timeUnits"
                :key="item + idx"
                :value="item"
                selected
              >{{ item }}</option>
            </select>
          </div>
        </div>
        <div class="serves">
          <label for="serves">Serves</label>
          <div>
            <input type="number" name="serves" id="serves" min="0" v-model="recipe.serves" />
          </div>
        </div>
      </div>
      <label for="notes">Notes</label>
      <input-text :value="recipe.notes" @input="recipe.notes = $event" />
      <input type="submit" value="Save" @click.prevent="save" />
    </form>
    <a class="button-destroy" @click.prevent="destroy" v-if="!isNew">Delete</a>
  </div>
</template>

<script>
import ListDynamicSteps from "./ListDynamicSteps";
import ListDynamicIngredients from "./ListDynamicIngredients";
import InputText from "./InputText";
import ButtonBack from "./ButtonBack";

export default {
  data: function() {
    return {
      recipe: {
        id: null,
        name: "",
        description: "",
        ingredients: [],
        instructions: [],
        notes: "",
        duration: {
          value: "",
          unit: ""
        },
        serves: ""
      },
      timeUnits: ["min", "h"],
      isNew: false
    };
  },
  components: {
    ListDynamicSteps,
    ListDynamicIngredients,
    InputText,
    ButtonBack
  },
  mounted: function() {
    if (!this.$route.params.id) {
      this.isNew = true;
      return;
    }
    var recipe = this.$store.state.recipes.find(
      function(recipe) {
        return recipe.id == this.$route.params.id;
      }.bind(this)
    );
    Object.keys(recipe).forEach((key, idx, arr) => {
      if (this.recipe.hasOwnProperty(key)) {
        this.recipe[key] = recipe[key];
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
      if (this.recipe.id == null) {
        this.recipe.id = parseInt(localStorage.getItem("id")) + 1;
        this.$store.dispatch("addRecipe", this.recipe);
      } else {
        var idx = this.$store.state.recipes.findIndex(
          function(recipe) {
            return recipe.id == this.$route.params.id;
          }.bind(this)
        );
        this.$store.dispatch("modifyRecipe", {
          idx,
          recipe: this.recipe
        });
      }
      this.$router.push({ name: "home" });
    },
    destroy: function(idx) {
      if (!confirm("Delete?")) {
        return;
      }
      this.$store.dispatch("deleteRecipe", {
        idx
      });
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="sass" scoped>
@use "../assets/mixins"
@include mixins.default-form
h1
  font-family: Photoshoot, Avenir, Helvetica, Arial, sans-serif
.editable
  text-align: left

.button-destroy
  font-family: Avenir, Helvetica, Arial, sans-serif
  background-color: #e04d2f
  display: inline-block
  line-height: 3rem
  margin-top: 2rem
  border: 0
  border-radius: 10px
  transition: all 200ms
  width: 5rem
  height: 3rem
  align-self: center
  &:hover
    cursor: pointer
    box-shadow: 0 0 10px #cc2f3c
    transform: scale(1.05)

.row
  display: flex
  justify-content: space-between
  align-items: center
  label
    margin: 0
    margin-top: 3rem
    margin-bottom: 1rem
  >div
    display: flex
    flex-direction: column
    align-items: flex-start
</style>
