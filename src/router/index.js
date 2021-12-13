import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '@/views/Home.vue'
import Admin from '@/views/Admin.vue'
import Link from '@/views/Link.vue'
import Lobby from '@/views/Lobby'
import Login from '@/views/Login'
import PlayerProfile from '@/views/PlayerProfile'
import RedeemAccessKey from '@/views/RedeemAccessKey'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home, name: 'Home', meta: { requiresLogin: true }  },
  { path: '*', redirect: { path: '/' }},
  { path: '/lobby', component: Lobby, name: 'Lobby', meta: { requiresLogin: true } },
  { path: '/play/:link', component: Link, name: 'Join Game with Link', meta: { requiresLogin: true } },
  { path: '/admin', component: Admin, name: 'Admin' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/redeem-your-access-key', component: RedeemAccessKey, name: 'Redeem Access Key', meta: { requiresLogin: true } },
  { path: '/player/:playerAddress', component: PlayerProfile, name: 'Player Profile' },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.address) next({ name: 'Login' })
  else if(to.name == 'Login' && store.state.address) next({ name: 'Home' })
  else next()
})

  export default router