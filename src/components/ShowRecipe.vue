<template>
  <div>
    <button-navigate value="Home" :to="{name: 'home'}" direction="left" />
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>
    <h2>Ingredients:</h2>
    <ul>
      <li v-for="(ingredient, idx) in recipe.ingredients" :key="ingredient + idx">
        <div>
          <p>{{ ingredient.value }}</p>
          <p>x {{ ingredient.quantity + " " + ingredient.unit }}</p>
        </div>
      </li>
    </ul>
    <h2>Steps:</h2>
    <ol>
      <li v-for="(instruction, idx) in recipe.instructions" :key="instruction + idx">
        <div>
          <p>{{ instruction.value }}</p>
        </div>
      </li>
    </ol>
    <h2>Notes:</h2>
    <p>{{ recipe.notes }}</p>
    <button-navigate
      value="Edit"
      direction="right"
      :to="{ name: 'recipe-edit', params: { id: $route.params.id, back: true} }"
    />
  </div>
</template>

<script>
import ButtonNavigate from "./ButtonNavigate";
export default {
  data: function() {
    return {
      recipe: {}
    };
  },
  mounted: function() {
    this.recipe = this.$store.state.recipes.find(
      function(recipe) {
        return recipe.id == this.$route.params.id;
      }.bind(this)
    );
  },
  components: {
    ButtonNavigate
  }
};
</script>
<style lang="sass" scoped>
*
  text-align: left
ul, ol
  text-align: left
  li
    >div
      display: flex
      justify-content: space-between
      p
        margin: 0
        margin-bottom: 1rem
        &:last-of-type
          p
            margin: 0
h1
  text-align: center
h2
  margin-top: 2rem
</style>