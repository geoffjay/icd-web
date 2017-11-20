<template lang="pug">
#connect
  b-card(title="Connect")
    b-form(@submit="onSubmit")
      b-form-group.form-row#inputGroupAddress(label="Address"
                                    label-for="inputAddress"
                                    description="The IP address to connect to")
        b-form-input#inputAddress(type="text"
                                  v-model="form.address"
                                  required
                                  placeholder="127.0.0.1")
      b-form-group#inputGroupPort(label="Port"
                                  label-for="inputPort")
        b-form-input#inputAddress(type="number"
                                  v-model="form.port"
                                  required
                                  placeholder="10000")
      b-button(type="submit" variant="primary") Connect&nbsp;
        icon(name="thumbs-up")
      b-button(type="reset" variant="secondary") Reset
</template>

<script>
import * as c from '@/config'

export default {
  data () {
    return {
      form: {
        address: '',
        port: 10000
      }
    }
  },
  methods: {
    onSubmit: function (evt) {
      evt.preventDefault()
      c.config.address = this.form.address
      c.config.port = this.form.port
      this.$router.go('/configure')
      // alert(JSON.stringify(c.config))
    }
  }
}
</script>

<style lang="stylus" scoped>
#connect
  margin-top 40px
  padding 24px

  .card
    max-width 400px
    margin 0 auto
    float none
    margin-bottom 10px
    text-align left

    .card-title
      text-align center

    form
      .btn-primary
        margin-right 10px
</style>
