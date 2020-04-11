<template>
  <div class="home">
    <h1>My recipes</h1>
    <input class="input-search" type="text" placeholder="Search..." @input="search" />
    <button-navigate :to="{name: 'new'}" v-if="recipes.length == 0" value="new" direction="right"></button-navigate>
    <div id="container-recipes">
      <div class="thumbnail-recipe" v-for="(recipe, idx) in filtered" :key="idx">
        <p>{{ recipe.name }}</p>
        <div class="div-fill">
          <img class="arrow-next" src="../assets/img/arrow-next.svg" alt="right arrow" />
        </div>
        <router-link
          class="link-recipe"
          :to="{ name: 'recipe', params: { id: recipe.id, back: true }}"
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import ButtonNavigate from "../components/ButtonNavigate";

export default {
  name: "Home",
  data: function() {
    return {
      filtered: []
    };
  },
  mounted: function() {
    this.filtered = this.recipes;
  },
  components: {
    ButtonNavigate
  },
  computed: {
    ...mapState(["recipes"])
  },
  methods: {
    search: function(e) {
      if (!e.target.value) {
        this.filtered = this.recipes;
      }
      this.filtered = this.recipes.filter(function(recipe, idx, arr) {
        return new RegExp(`${e.target.value}`, "gi").test(recipe.name);
      });
    }
  }
};
</script>

<style lang="sass" scoped>
@use "../assets/mixins"
@include mixins.fonts

.home
  display: flex
  flex-direction: column
  justify-content: space-evenly
  text-align: left
  >h1
    font-family: "Photoshoot"
    text-align: center
    font-size: 3rem
.thumbnail-recipe
  overflow: hidden
  position: relative
  margin: 1rem
  background-color: #fcf451
  border-radius: 10px
  min-height: 6rem
  min-width: 6rem
  padding: 1rem
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: flex-start
  transition: box-shadow 250ms, transform 250ms
  &:hover
    box-shadow: 0 0 40px 5px #2ec2c9
    cursor: pointer
    transform: scale(1.05)
    .div-fill
      transform: translateX(2.5rem)
      opacity: 1
  *:last-child
    align-self: flex-end
  .link-recipe
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
  .div-fill
    width: 100%
    transition: all 200ms ease-in
    position: absolute
    left: calc( 100% - 4.5rem )
    height: 1.5rem
    opacity: 0
    transform: translateX(0)
    top: calc( 100% - 2.5rem )
  .arrow-next
    width: 1.5rem
#container-recipes
  color: #2ec2c9
  display: grid
  grid-template-columns: repeat(4, 25%)
  div:first-child
    grid-column: 1 / span 2
    grid-row: 1 / span 2
  div:nth-child(2)
    grid-column: 3 / span 2
  div:nth-child(3)
    grid-column: 3 / span 2
  div:nth-child(4)
    grid-column: 1 / span 2
  div:nth-child(5)
    grid-column: 3 / span 2
    grid-row: 4 / span 1

input[type="text"]
    font-size: 1rem
    width: 50%
    margin: auto
    margin-bottom: 2rem
    min-width: 4rem
    border: 2px solid #36c95e
    outline: none
    border-radius: 20px
    padding: .3rem
    font-family: Avenir, Helvetica, Arial, sans-serif
    background-image: url('../assets/img/magnifying-glass.svg')
    background-position: 100%
    background-repeat: no-repeat
    background-size: 1.5rem
    padding-right: 2rem
</style>