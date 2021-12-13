import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import store from './store'
import router from './router'
import 'buefy/dist/buefy.css'
import VueClipboard from 'vue-clipboard2'
import Gravatar from 'vue-gravatar'
import VueGtag from 'vue-gtag'
import Hotjar from 'vue-hotjar'

Vue.component('v-gravatar', Gravatar)
Vue.use(VueClipboard)
Vue.use(Buefy)

Vue.config.productionTip = false

Vue.use (Hotjar, {
  id: '2744722',
  isProduction: true,
  snippetVersion: 6
})

Vue.use(VueGtag, {
  config: { id: "G-HL5M6DTYYF" },
  appName: 'SZX Encounter',
  pageTrackerScreenviewEnabled: true
}, router)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
