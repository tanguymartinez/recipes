<template>
  <div class="link" :class="[ direction == 'left' ? 'left' : 'right' ]" @click="$router.push(to)">
    <p v-if="direction == 'right'">{{ value }}</p>
    <img src="../assets/img/arrow-back.svg" alt="arrow left" />
    <p v-if="direction == 'left'">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    to: {
      type: Object,
      required: true
    },
    direction: {
      type: String,
      default: "left"
    }
  }
};
</script>

<style lang="sass" scoped>
.link
  display: flex
  justify-content: flex-end
  align-items: center
  padding: .4rem
  width: min-content
  img
    transition: all 250ms
    width: 1.3rem
.right
  padding-left: .1rem
  padding-right: .5rem
  p
    margin: 0
  img
    margin-left: .2rem
    transform: rotate(180deg)
  &:hover
    cursor: pointer
    img
      transform: translateX(.5rem) scale(.8) rotate(180deg)
.left
  padding-right: .1rem
  padding-left: .5rem
  p
    margin: 0
  img
    margin-right: .2rem
  &:hover
    cursor: pointer
    img
      transform: translateX(-.5rem) scale(.8)
</style>