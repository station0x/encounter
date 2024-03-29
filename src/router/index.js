import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import CONSTANTS from '../../constants'

const Admin = () => import('@/views/Admin.vue')
const Link = () => import('@/views/Link.vue')
const Lobby = () => import('@/views/Lobby.vue')
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login')
const PlayerProfile = () => import('@/views/PlayerProfile')
const RedeemAccessKey = () => import('@/views/RedeemAccessKey')
const Leaderboard = () => import('@/views/Leaderboard')
const NotFound = () => import('@/views/NotFound.vue')
const Dashboard = () => import('@/views/admin/Dashboard.vue')

Vue.use(VueRouter)

const TITLE = ' | Station ZeroX: Encounter'

const routes = [
  { path: '/', redirect: { name: 'Home' }},
  { path: '*', redirect: { name: 'Not Found' }},
  { path: '/home', component: Home, name: 'Home', meta: { requiresLogin: true, title: 'Home' } },
  { path: '/lobby', component: Lobby, name: 'Lobby', meta: { requiresLogin: true, title: 'Lobby' } },
  { path: '/play/:link', component: Link, name: 'Join Game with Link', meta: { title: 'Join Game' } },
  { path: '/admin', component: Admin, name: 'Admin' },
  { path: '/login/:redirect?:key?', component: Login, name: 'Login', meta: { title: 'Login' } },
  { path: '/redeem-your-access-key', component: RedeemAccessKey, name: 'Redeem Access Key', meta: { requiresLogin: true, title: 'Redeem Access Key' } },
  { path: '/player/:playerAddress', component: PlayerProfile, name: 'Player Profile', meta: { title: 'Profile' } },
  { path: '/not-found', component: NotFound, name: 'Not Found', props: true, meta: { title: 'Page Not Found' } },
  { path: '/leaderboard', component: Leaderboard, name: 'Leaderboard', meta: { title: 'Leaderboard' } },
  // Admin
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', meta: { requiresAdmin: true, title: 'Admin Dashboard' } },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let isAdmin = CONSTANTS.admins.includes(store.state.address)
  if(to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) next({ name: 'Home' })
  else if(to.matched.some(record => record.meta.requiresLogin) && !store.state.address) next({ name: 'Login' })
  else if(to.name == 'Login' && store.state.address) next({ name: 'Home' })
  // else if(to.name == 'Lobby' && (!store.state.profile || store.state.profile.banned)) next({ name: 'Home' })
  else next()
})

router.afterEach((to, from, next) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
      document.title = to.meta.title + TITLE;
  })
})

export default router