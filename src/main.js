import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import store from './store'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Link from './views/Link.vue'
import RedeemAccessKey from './views/RedeemAccessKey'
import 'buefy/dist/buefy.css'
import VueClipboard from 'vue-clipboard2'
import Gravatar from 'vue-gravatar'
import VueGtag from 'vue-gtag'

Vue.component('v-gravatar', Gravatar)
Vue.use(VueClipboard)
Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/play/:link', component: Link, name: 'Join Game with Link' },
  { path: '/admin', component: Admin, name: 'Admin' },
  { path: '/redeem-your-access-key', component: RedeemAccessKey, name: 'Redeem Access Key' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
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
