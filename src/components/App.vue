<template lang="pug">
div#app.main
  app-nav
  b-container.app-content
    router-view
  app-footer
</template>

<script>
import AppNav from '@/components/AppNav'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'app',
  components: { AppNav, AppFooter }
}
</script>

<style lang="stylus" scoped>
html
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  position relative
  min-height 100%

body
  margin-bottom 60px

#app
  text-align center
  color #2c3e50
  margin-top 60px

.app-content
  padding 20px 15px
</style>
