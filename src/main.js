import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueResource from 'vue-resource'
import BoSearch from './BoSearch.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(BoSearch)
})
