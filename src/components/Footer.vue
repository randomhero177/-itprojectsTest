<template>
  <div class="footer row justify-content-center">
    <div class="div-col text-center">
      <div style="margin-bottom: 5px">
        &copy; Copyright {{ new Date().getFullYear() }}
      </div>
      <div>
        test ToDo application
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',

    data: () => ({

    }),
    computed: {

    },
  }
</script>

<style scoped lang="stylus">
  .footer
    background #1f1717
    color #a7a7a7
    padding 45px 0
    font-size .75rem
    text-align center
</style>
