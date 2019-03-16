import Vue from 'vue'
import App from './App.vue'
// import google from '../dist/google-vue-map.js'
import google from './index.js'

Vue.use(google, {
  key: 'AIzaSyDJW4jsPlNKgv6jFm3B5Edp5ywgdqLWdmc'
});

new Vue({
  el: '#app',
  render: h => h(App)
})
