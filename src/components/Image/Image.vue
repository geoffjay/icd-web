<template lang="pug">
#image
  b-container(v-if="$route.params.id")
    h2 Image {{ $route.params.id }}
    b-img(ref="img" fluid :onload="loadImage($route.params.id, true)")
  b-container(v-else)
    b-row
      h2 Images
    b-card.image-list
      b-row
        b-col(cols="4" offset-md="6")
          b-form-group.float-right(horizontal label="Filter" :label-cols="3")
            b-form-input(v-model="filter" placeholder="Type to search")
        b-col(cols="2")
          b-button-group.float-right
            b-button(variant="primary" @click="downloadImages")
              icon(name="download")
            b-button(variant="danger" @click="deleteImages")
              icon(name="trash")
          b-form-checkbox-group(buttons)
            b-form-checkbox(v-model="allSelected"
                            :indeterminate="indeterminate"
                            aria-describedby="itemIds"
                            aria-controls="itemIds"
                            @change="toggleAll")
              icon(name="check")
      b-row
        b-table(striped hover show-empty bordered
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                @filtered="onFiltered")
          template(slot="detail" slot-scope="row")
            b-form-checkbox(v-model="row.item._showDetails" @change="loadImage(row.item.id, $event)" plain)
          template(slot="select" slot-scope="row")
            b-form-checkbox(v-model="selected" :value="row.item.id" plain)
          template(slot="name" slot-scope="row")
            a(:href="`/image/${row.item.id}`") {{ row.item.name }}
          template(slot="row-details" slot-scope="row")
            b-card
              b-img(ref="img" fluid)
      b-row
        b-col(cols="4")
          b-form-group(horizontal label="Rows per page" :label-cols="6")
            b-form-select(:options="pageOptions" v-model="perPage")
        b-col(cols="8")
          b-pagination.float-right(:total-rows="totalRows" :per-page="perPage" v-model="currentPage")
</template>

<script>
import * as c from '@/config'

export default {
  name: 'Image',
  data () {
    return {
      host: 'http://' + window.location.hostname + ':' + c.connection.port,
      items: [],
      itemIds: [],
      selected: [],
      allSelected: false,
      indeterminate: false,
      fields: [
        { key: 'detail', label: 'View', tdClass: 'col-detail' },
        { key: 'select', label: ' ', tdClass: 'col-select' },
        {
          key: 'id',
          label: 'ID',
          sortable: false   // Doing it this way in case want to sort later
        },
        'name',
        {
          key: 'timestamp',
          formatter: (value) => {
            var t = new Date(value * 1000)
            return t.toLocaleString()
          }
        },
        'width',
        'height'
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      pageOptions: [
        { text: 10, value: 10 },
        { text: 25, value: 25 },
        { text: 50, value: 50 },
        { text: 100, value: 100 }
      ],
      filter: null
    }
  },
  methods: {
    getItems: function () {
      this.getCount()
      var path = this.host + '/api/images/'
      this.$http.get(path).then(response => {
        this.items = response.data
        for (var i = 0; i < this.items.length; i++) {
          this.itemIds[i] = this.items[i].id
        }
      }, response => {
        // TODO add error callback
      })
    },
    getCount: function () {
      this.$http.get(this.host + '/api/count/images').then(response => {
        this.totalRows = response.data.count
      }, response => {
        // TODO add error callback
      })
    },
    onFiltered: function (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    loadImage: function (id, event) {
      if (event) {
        var path = this.host + '/api/images/' + id + '/all'
        this.$http.get(path).then(response => {
          var src = 'data:image/png;base64,' + response.data.data
          this.$refs.img.src = src
        }, response => {
          // TODO add error callback
        })
      }
    },
    downloadImages: function () {
      var that = this
      var base = this.host + '/api/images/'

      this.selected.forEach(function (id) {
        var path = base + id + '/all'
        that.$http.get(path).then(response => {
          // decode the base64 data
          var data = atob(response.data.data)
          var buff = new ArrayBuffer(data.length)
          var view = new Uint8Array(buff)
          for (var i = 0; i < data.length; i++) {
            view[i] = data.charCodeAt(i) & 0xff
          }

          var blob = new Blob([buff], {type: 'application/octet-stream'})
          var url = URL.createObjectURL(blob)

          // XXX This seems lame, but couldn't find another way
          var a = document.createElement('a')
          a.href = url
          var t = new Date(response.data.timestamp * 1000)
          var date = t.getFullYear() + '-' + t.getMonth() + '-' + t.getDay()
          var time = t.getHours() + '-' + t.getMinutes() + '-' + t.getSeconds()
          a.download = 'image-' + date + '_' + time + '.jpg'
          a.click()
        }, response => {
          // TODO add error callback
        })
      })

      this.selected = []
    },
    deleteImage: function (id) {
      var path = this.host + '/api/images/' + id
      this.$http.delete(path).then(response => {
        var idx = this.itemIds.indexOf(id)
        delete this.items[idx]    // XXX is this necessary?
        this.getItems()
        console.log('Image with the ID ' + id + ' was deleted')
      }, response => {
        // TODO add error callback
      })
    },
    deleteImages: function () {
      // Using this complains, possibly because it's invoked from the template
      var that = this

      this.selected.forEach(function (id) {
        console.log('Delete image with ID of ' + id)
        that.deleteImage(id)
      })

      this.selected = []
    },
    toggleAll: function (checked) {
      var start = (this.currentPage - 1) * this.perPage
      var end = start + this.perPage
      end = (end > this.itemIds.length) ? this.itemIds.length : end
      console.log(this.perPage)
      console.log('from ' + start + ' to ' + end)
      this.selected = checked ? this.itemIds.slice(start, end) : []
      console.log(this.selected)
    }
  },
  mounted: function () {
    this.getItems()
    setInterval(function () {
      this.getItems()
    }.bind(this), 30000)
  },
  watch: {
    selected (newVal, oldVal) {
      if (newVal.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newVal.length === this.items.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/styles/table.stylus"

#image
  h2
    padding-bottom 20px

.col-select,
.col-detail
  width 60px
  text-align center
  vertical-align middle

.form-check
  display block
  margin 0 auto
  width 100%

  label,
  label span
    margin 0 auto
    position relative
    display block

  label input[type="checkbox"]
    float left

.image-list
  padding 0 15px
</style>
