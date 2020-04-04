<template>
  <div class="home">
    <h1>My recipes</h1>
    <div id="container-recipes">
      <div class="thumbnail-recipe" v-for="(recipe,idx) in recipes" :key="recipes + idx">
        <p>{{ recipe.name }}</p>
        <div class="div-fill">
          <img class="arrow-next" src="../assets/img/arrow-next.svg" alt="right arrow" />
        </div>
        <router-link class="link-recipe" :to="{ name: 'recipe', params: { id: recipe.id }}"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState(["recipes"])
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
  .thumbnail-recipe
    overflow: hidden
    position: relative
    margin: 1rem
    background-color: #fcf451
    // background-color: #6dd6e8
    border-radius: 10px
    min-height: 6rem
    min-width: 6rem
    padding: 1rem
    box-shadow: 0 0 0px #17a1bd
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: flex-start
    transition: all 250ms
    &:hover
      box-shadow: 0 0 40px 5px #2ec2c9
      cursor: pointer
      transform: scale(1.05)
      .div-fill
        transform: translateX(calc( 2rem ))
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
      height: 2rem
      opacity: 0
      transform: translateX(0)
      top: calc( 100% - 2.5rem )
    .arrow-next
      width: 2rem
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
</style>