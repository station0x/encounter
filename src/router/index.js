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
import Leaderboard from '@/views/Leaderboard'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const TITLE = ' | Station ZeroX: Encounter'

const routes = [
  { path: '/', redirect: { name: 'Home' }},
  { path: '*', redirect: { name: 'Not Found' }},
  { path: '/home', component: Lobby, name: 'Home', meta: { requiresLogin: true, title: 'Home' } },
  { path: '/play/:link', component: Link, name: 'Join Game with Link', meta: { title: 'Join Game' } },
  { path: '/admin', component: Admin, name: 'Admin' },
  { path: '/login/:redirect?:key?', component: Login, name: 'Login', meta: { title: 'Login' } },
  { path: '/redeem-your-access-key', component: RedeemAccessKey, name: 'Redeem Access Key', meta: { requiresLogin: true, title: 'Redeem Access Key' } },
  { path: '/player/:playerAddress', component: PlayerProfile, name: 'Player Profile', meta: { title: 'Profile' } },
  { path: '/not-found', component: NotFound, name: 'Not Found', props: true, meta: { title: 'Page Not Found' } },
  { path: '/leaderboard', component: Leaderboard, name: 'Leaderboard', meta: { title: 'Leaderboard' } }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log
  if(to.matched.some(record => record.meta.requiresLogin) && !store.state.address) next({ name: 'Login' })
  else if(to.name == 'Login' && store.state.address) next({ name: 'Home' })
  else next()
})

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
      document.title = to.meta.title + TITLE;
  })
})

  export default router