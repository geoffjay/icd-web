<template lang="pug">
b-container#camera
  b-row
    h2 Cameras
  b-card.camera-list
    b-row
      b-table(striped hover show-empty bordered :items="items")
</template>

<script>
import * as c from '@/config'

export default {
  name: 'Camera',
  data () {
    return {
      host: 'http://' + window.location.hostname + ':' + c.connection.port,
      items: []
    }
  },
  methods: {
    getItems: function () {
      this.getCount()
      var path = this.host + '/api/cameras'
      this.$http.get(path).then(response => {
        this.items = response.data
      }, response => {
        // error callback
      })
    },
    getCount: function () {
      this.$http.get(this.host + '/api/count/cameras').then(response => {
        this.total = response.data.count
      }, response => {
        // error callback
      })
    }
  },
  mounted: function () {
    this.getItems()
    /*
    setInterval(function () {
      this.getItems()
    }.bind(this), 10000)
    */
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/table.stylus"

#camera
  h2
    padding-bottom 20px

.camera-list
  padding 0 15px
</style>
