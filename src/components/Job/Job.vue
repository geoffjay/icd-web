<template lang="pug">
b-container#job
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
  b-row(v-if="items.length === 0")
    p No jobs were found
  b-row(v-else)
    b-table(striped hover :items="items")
</template>

<script>
export default {
  name: 'Job',
  data () {
    return {
      form: {
        count: null,
        interval: null
      },
      items: []
    }
  },
  methods: {
    getItems: function () {
      this.getCount()
      var path = 'http://10.0.2.2:3003/api/jobs'
      this.$http.get(path).then(response => {
        this.items = response.data
      }, response => {
        // TODO add error callback
      })
    },
    getCount: function () {
      this.$http.get('http://10.0.2.2:3003/api/count/jobs').then(response => {
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
      this.$http.post('http://10.0.2.2:3003/api/jobs', formData, {
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
    }
  },
  mounted: function () {
    this.getItems()
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/table.stylus"

#job
  h2
    padding-bottom 20px

.job-submit
  margin-bottom 32px
</style>
