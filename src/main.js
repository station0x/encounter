import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import store from './store'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Link from './views/Link.vue'
import 'buefy/dist/buefy.css'

Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/play/:link', component: Link }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
