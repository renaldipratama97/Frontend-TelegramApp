import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'

Vue.config.productionTip = false

Vue.use(VueGeolocation)

Vue.use(Notifications)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBQqCcpA2oybEfWfQLbpZbDj3ufZQhG7ds',
    libraries: 'places'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
