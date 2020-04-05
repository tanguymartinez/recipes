import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipes: [],
    id: null
  },
  mutations: {
    addRecipe: function (state, recipe) {
      state.recipes.push(recipe);
    },
    modifyRecipe: function (state, payload) {
      state.recipes[payload.idx] = payload.recipe;
    },
    setRecipes: function (state, recipes) {
      state.recipes = recipes;
    }
  },
  actions: {
    addRecipe: function (context, payload) {
      context.commit('addRecipe', payload);
      localStorage.setItem(
        "recipes",
        JSON.stringify(context.state.recipes)
      );
      localStorage.setItem("id", payload.id);
    },
    modifyRecipe: function (context, payload) {
      context.commit('modifyRecipe', payload);
      localStorage.setItem(
        "recipes",
        JSON.stringify(context.state.recipes)
      );
    },
    setRecipes: function (context, payload) {
      context.commit('setRecipes', payload);
    }
  },
  modules: {
  }
})
