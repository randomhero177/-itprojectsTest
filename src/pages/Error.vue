<template>
  <div class="Error">
    <Header />

    <h1>Something really got wrong! I don't think this page ever existed</h1>
    <Footer />
  </div>
</template>

<script>
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';

  export default {
    name: "Error",
    data() {
      return {
        data: () => ({

        }),
      };
    },
    components: {
      Header,
      Footer,
    },
    methods: {

    },
  }
</script>
<style scoped lang="stylus">
  .template
    &__descr
      margin-bottom 15px
    &__item
      position relative
    &__link
      color #fff
      display block
      padding 15px 0
    &__choose
      position absolute
      width 100%
      left 0
      bottom 0
      text-align center
      background #0c5460
</style>