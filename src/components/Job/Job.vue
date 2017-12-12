<template lang="pug">
#job
  b-container
    b-row
      h2 Jobs
    b-card.job-submit.text-left(title="Create a new capture job" sub-title="Actual interval depends on image resolution")
      b-form(inline @submit="submitJob")
        label.sr-only(for="inputCount") Count
        b-input.mb-2.mr-sm-2.mb-sm-0(id="inputCount" type="number" v-model="form.count" placeholder="Image Count" min="1")
        label.sr-only(for="inputInterval") Interval (s)
        b-input-group.mb-2.mr-sm-2.mb-sm-0(left="@" right="second")
          b-input(id="inputInterval" type="number" v-model="form.interval" placeholder="Interval (s)" min="1")
        b-button(type="submit" variant="primary") Submit
    b-card.job-list
      b-row
        b-table(striped hover show-empty bordered
              :items="items"
              :fields="fields")
          template(slot="running" slot-scope="row")
            p(v-if="row.item.running === true") Yes
            p(v-else) No
          template(slot="delete" slot-scope="row")
            b-button(type="submit" variant="primary" @click="deleteJob(row.item.id)") Delete
</template>

<script>
import * as c from '@/config'

export default {
  name: 'Job',
  data () {
    return {
      host: 'http://' + window.location.hostname + ':' + c.connection.port,
      form: {
        count: null,
        interval: null
      },
      items: [],
      fields: [
        { key: 'id', label: 'ID' },
        'interval',
        'count',
        'remaining',
        'running',
        { key: 'delete', label: '' }
      ]
    }
  },
  methods: {
    getItems: function () {
      this.getCount()
      var path = this.host + '/api/jobs'
      this.$http.get(path).then(response => {
        this.items = response.data
      }, response => {
        // TODO add error callback
        this.items = []
      })
    },
    getCount: function () {
      this.$http.get(this.host + '/api/count/jobs').then(response => {
        this.total = response.data.count
      }, response => {
        // TODO add error callback
      })
    },
    submitJob: function (event) {
      event.preventDefault()
      this.form.count = this.form.count * 1
      this.form.interval = this.form.interval * 1000
      var formData = JSON.stringify(this.form)
      console.log(formData)
      this.$http.post(this.host + '/api/jobs', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        // Reset values
        this.form.count = null
        this.form.interval = null
      }, response => {
        // TODO add error callback
      })
    },
    deleteJob: function (id) {
      var path = this.host + '/api/jobs/' + id
      this.$http.delete(path).then(response => {
        this.getItems()
        console.log('Job with ID ' + id + ' was deleted')
      }, response => {
        // TODO add error callback
      })
    }
  },
  mounted: function () {
    this.getItems()
    setInterval(function () {
      this.getItems()
    }.bind(this), 10000)
  }
}
</script>

<style lang="stylus">
@import "../../assets/styles/table.stylus"

#job
  h2
    padding-bottom 20px

.job-submit
  margin-bottom 32px

.job-list
  padding 0 15px
</style>
