<template>
  <div class="modal">
    <div class="modal__container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    data: () => ({

    }),
    methods: {
      closeModal() {
        this.$emit('onCancel')
      },
    },
  }
</script>

<style scoped lang="stylus">
  .modal
    position fixed
    width 100%
    height 100%
    left 0
    top 0
    background rgba(0, 0, 0, .5)
    display flex
    justify-content center
    align-items center
    z-index 9
    &__container
      max-width 50%
      text-align center
      background #fff
      padding 45px
      border-radius 5px
      position relative
    &__icon
      position absolute
      top 5px
      right 5px
    &__btn
      border 0
      padding 15px 30px
      color #fff
      cursor pointer
      &-remove
        border 1px solid #927c7c
        color #927c7c
      &-add
        border 1px solid #366d5b
        background #366d5b
    &__btn + &__btn
      margin-left 30px
    &__buttons
      margin-top 45px
</style>