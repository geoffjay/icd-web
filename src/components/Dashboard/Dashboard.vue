<template lang="pug">
b-jumbotron.layout(v-if="isConnected === false" header="ICD" lead="Web Frontend to ICD")
  img.logo(src="../../assets/logo.png")
  p {{ msg }}:&nbsp;
    a(href="https://icd.github.io" target="_blank") https://icd.github.io
  // ul
    li(v-for="item in items") {{ item.name }}
b-container(v-else)
  b-row
    h2 Dashboard
  b-row
    b-col(v-for="card in cards.perf" :key="card.title" cols="4")
      b-card.dashboard-card(:title="card.title")
        b-card-body
          // loading-progress(:progress="card.value"
                           size="200"
                           rotate
                           fillDuration="2"
                           rotationDuration="1"
                           shape="circle")
        progress-bar(type="line" ref="line" :options="card.options")
          strong {{ card.value }}
            i %
  b-row
    b-col(cols="4")
      b-card.dashboard-card(title="Job Status")
    b-col(cols="8")
      b-card.dashboard-card(title="Job Queue")
</template>

<script>
export default {
  name: 'Main',
  // XXX This is just to try using data in a template
  data () {
    return {
      progress: 0,
      cards: {
        perf: [
          {
            title: 'Storage',
            value: 25,
            options: {
              color: '#007AFF',
              strokeWidth: 0.5
            }
          },
          {
            title: 'Memory',
            value: 50,
            options: {
              color: '#007AFF',
              strokeWidth: 0.5
            }
          },
          {
            title: 'CPU',
            value: 75,
            options: {
              color: '#007AFF',
              strokeWidth: 0.5
            }
          }
        ]
      },
      items: [],
      msg: 'For more information visit'
    }
  },
  props: {
    // FIXME This is just during testing, should use Vuex here
    isConnected: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    progressModel: {
      get () {
        return this.progress * 100
      },
      set (value) {
        this.progress = value / 100
      }
    },
    progressDisplay () {
      return `${Math.round(this.progress * 100)}%`
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout
  margin 40px 0px

.logo
  padding-bottom 20px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

.dashboard-card
  margin 10px 0

.vue-progress-path path
  stroke-width 12

.vue-progress-path .progress
  stroke red

.vue-progress-path .background
  stroke #edd
</style>
