<template>
  <div>
    <form action>
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" v-model="name" />
      <label for="description">Description:</label>
      <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
      <label for="ingredients">Ingredients:</label>
      <input type="text" name="ingredients" id="ingredients" />
      <label for="instructions">Instructions:</label>
      <input type="text" name="instructions" id="instructions" />
      <label for="notes">Notes:</label>
      <textarea name="notes" id="notes" cols="30" rows="10" v-model="notes"></textarea>
    </form>
    <list-dynamic :items="items">
      <template #item="{ item }">{{ item }}</template>
      <template #button>
        <button value="Add" />
      </template>
    </list-dynamic>
  </div>
</template>

<script>
import ListDynamic from "./ListDynamic";
export default {
  data: function() {
    return {
      name: "",
      description: "",
      ingredients: [],
      instructions: [],
      notes: "",
      items: ["ok", "fie", "t"]
    };
  },
  components: {
    ListDynamic
  }
};
</script>

<style lang="sass" scoped>
form
  display: flex
  flex-direction: column
  justify-content: space-around
  max-width: 50rem
  width: 50%
  min-width: 35rem
  margin: auto
  label
    margin-bottom: 1rem
    text-align: left
  input, textarea
    margin-bottom: 2rem
    border-radius: 7px
    border: 1.5px solid rgb(32, 148, 201)
  textarea
    resize: none
</style>
