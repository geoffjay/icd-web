<template lang="pug">
b-container#camera
  b-row
    h2 Cameras
  b-row(v-if="items.length === 0")
    p No cameras were found
  b-row(v-else)
    b-table(striped hover :items="items")
</template>

<script>
export default {
  name: 'Camera',
  data () {
    return {
      items: []
    }
  },
  methods: {
    getItems: function () {
      this.getCount()
      var path = 'http://10.0.2.2:3003/api/cameras'
      this.$http.get(path).then(response => {
        this.items = response.data
      }, response => {
        // error callback
      })
    },
    getCount: function () {
      this.$http.get('http://10.0.2.2:3003/api/count/cameras').then(response => {
        this.total = response.data.count
      }, response => {
        // error callback
      })
    }
  },
  mounted: function () {
    this.getItems()
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/table.stylus"

#camera
  h2
    padding-bottom 20px
</style>
