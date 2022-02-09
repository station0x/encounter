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
import VueAnime from 'vue-animejs'

require('../src/scss/main.scss')

Vue.component('v-gravatar', Gravatar)
Vue.use(VueClipboard)
Vue.use(Buefy)
Vue.use(VueAnime)


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
  created: function() {
    // add event listener to handle tab/browser closing
    // and do logout
    window.addEventListener(
      "beforeunload",
      this.leaving
    )
  },

  methods: {
    leaving(e) {
        if(store.state.matchId === undefined) {
          if(store.state.address !== undefined) {
            if(this.playerEnqueuedInMatchmaking()) {
              this.leaveMatchMaking()
            }
          }
        } else {
          this.nativeBrowserHandler(e, 'Sure to leave your spaceships there to be destroyed? Going AFK while in game is punished. Do not do it')
        }
    },
    async playerEnqueuedInMatchmaking() {
      const res = await axios.get('/api/matchmaker/checkMatchmaking', {
          params:{
            signature:this.$store.state.signature
          }
      })
      if(res.data.enqueued) return true
      else return true
    },
    async leaveMatchMaking() {
      const res = await axios.get('/api/matchmaker/leaveMatchmaking', {
        params:{
          signature:this.$store.state.signature
        }
      })
    },
    nativeBrowserHandler(e, msg) {
      e.preventDefault()    
      e.returnValue = msg
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
