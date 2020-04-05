<template>
  <div class="back" @click="$router.go(-1)">
    <img src="../assets/img/arrow-back.svg" alt="arrow left" />
    <p>Back</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
img
    transition: all 250ms
    width: 1.3rem
    margin-right: .2rem

.back
    padding-left: .5rem
    display: flex
    justify-content: flex-start
    &:hover
        cursor: pointer
        img
            transform: translateX(-.5rem) scale(.8)
</style>