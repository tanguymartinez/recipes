import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import FormRecipe from '../components/FormRecipe';
import ShowRecipe from '../components/ShowRecipe';
import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/new',
    name: 'new',
    component: FormRecipe
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: ShowRecipe
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("recipes") == null) {
    localStorage.setItem("recipes", JSON.stringify([]));
  }
  if (localStorage.getItem("id") == null) {
    localStorage.setItem("id", 0);
  }
  if (store.state.recipes.length == 0) {
    store.dispatch("setRecipes", JSON.parse(localStorage.getItem("recipes")));
  }
  next();
})

export default router
