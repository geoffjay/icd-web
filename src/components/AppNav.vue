<template lang="pug">
header#nav
  b-navbar(toggleable="md" type="dark" variant="dark")
    b-container
      b-nav-toggle(target="nav_collapse")
      b-navbar-brand(to="/")
        icon(name="camera-retro")
      b-collapse#nav_collapse(is-nav)
        b-navbar-nav
          b-nav-item(to="/image") Images
          b-nav-item(to="/camera") Cameras
          b-nav-item(to="/job") Jobs
        b-navbar-nav.ml-auto(v-if="isConnected === false")
          b-nav-item-dropdown(right)
            template(slot="button-content")
              em System
            b-dropdown-item(to="/connect") Connect
        b-navbar-nav.ml-auto(v-else)
          // TODO Replace with link to host connection info (?)
          b-nav-item-dropdown(right)
            template(slot="button-content")
              em System
            b-dropdown-item(to="/configure") Configure
</template>

<script>
export default {
  props: {
    isConnected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
#nav
  margin-top -60px
</style>
