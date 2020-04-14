<template>
  <div>
    <button-navigate value="Home" :to="{name: 'home'}" direction="left" />
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>
    <div class="container-ingredients">
      <h2>Ingredients</h2>
      <ul>
        <li v-for="(ingredient, idx) in recipe.ingredients" :key="ingredient + idx">
          <span class="ingredient">{{ ingredient.value }}</span>
          <span>x {{ ingredient.quantity + " " + ingredient.unit }}</span>
        </li>
      </ul>
    </div>
    <h2>Steps</h2>
    <ol>
      <div class="vr"></div>
      <li v-for="(instruction, idx) in recipe.instructions" :key="instruction + idx">
        <span>{{ idx + 1 }}</span>
        <span>{{ instruction.value }}</span>
      </li>
    </ol>
    <h2 v-if="recipe.notes">Notes</h2>
    <p class="notes" v-if="recipe.notes">{{ recipe.notes }}</p>
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
h1
  font-family: Photoshoot, Avenir, Helvetica, Arial, sans-serif
*
  text-align: left
ul, ol
  text-align: left
  li
    display: flex
    justify-content: space-between
    p
      margin: 0
      &:last-of-type
        p
          margin: 0
h1
  text-align: center
h2
  margin-top: 2rem
  text-align: center
.link.right
  margin-left: auto

.container-ingredients
  border: 5px solid #fcf451
  border-radius: 10px
  background-color: #2c3e50
  box-shadow: 0 0 20px #30bfa3
  color: white
  h2
    margin: 1rem 0
    text-align: center
  ul
    list-style-type: none
    padding: 0
    margin: 0
    display: grid
    position: relative
    grid-template: 1fr / 1fr 1fr
    border-top: 2px solid white
    li
      padding: .5rem
      border-bottom: 2px solid white
      &:nth-child(2n+1)
        border-right: 2px solid white
      &:nth-last-child(1):nth-child(2n) // last child when it is even (right)
        border-bottom: 0
      &:nth-last-child(1):nth-child(2n+1), &:nth-last-child(2):nth-child(2n+1) // last child when it is odd and before last when it is odd (left)
        border-bottom: 0
ol
  padding: 0
  position: relative
  list-style-type: none
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  white-space: pre-line
  flex-direction: column
  align-items: center
  padding-left: 1rem
  // border-left: 2px solid #4287f5
  .vr
    height: 100%
    position: absolute
    top: 0
    width: .2rem
    background-color: #457fd9
  li
    position: relative
    margin: .7rem 0
    background-color: #fcf451
    padding: .5rem
    border-radius: 4px
    &:first-of-type
      margin-top: 0
    &:last-of-type
      margin-bottom: 0
    >span
      &:first-child
        position: absolute
        right: 0
        top: 0
        transform: translate(50%, -50%)
        background-color: #30bfa3
        color: white
        border-radius: 7px
        text-align: center
        max-width: 1.5rem
        min-width: 1rem
        padding: .1rem
.notes
  background-color: #30bfa3
  border-radius: 7px
  padding: .5rem
</style>