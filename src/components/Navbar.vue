<template>
  <b-navbar spaced>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          :src="require('../assets/img/widelogo.png')"
          class="nav-logo"
        >
      </b-navbar-item>
    </template>
    <!-- <template #start>
        <b-navbar-item @click="$router.push({ path: '/' })">
          Home
        </b-navbar-item>
        <b-navbar-item @click="$router.push({ path: '/about' })">
          About
        </b-navbar-item>
        <b-navbar-item @click="$router.push({ path: '/team' })">
          Team
        </b-navbar-item>
    </template> -->

    <template #end>
      <b-navbar-item @click="$router.push({ name: 'Player Profile', params: { playerAddress: $store.state.address } })" target="_blank">
        <a class="button nav-btn">
          Profile
        </a>
      </b-navbar-item>
      <center>
        <b-button v-if="!isConnected" type="is-primary" @click="connectWallet">Connect Wallet</b-button>
      </center>
      <center v-if="isConnected">
        <a class="button nav-btn">
          {{ fmtdWalletAddress }}
        </a>
      </center>
        <b-navbar-item @click="$router.push({ path: '/claim-eth-skins' })" target="_blank">
        <div class="logout-btn" @click="logout">Logout</div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      playerPath: '/player/' + this.$store.state.address
    }
  },
    computed: {
      isConnected() {
        return this.$store.state.address === undefined ? false : true
      },
      fmtdWalletAddress() {
        let address = this.$store.state.address;
        return address.substring(0, 6) + '...' + address.substring(38, 42)
      }
    },
    methods: {
        connectWallet() {
            this.$store.dispatch('connect')
        },
        logout() {
            this.$store.dispatch('disconnect')
            this.$router.push({name: 'Login'})
        }
    }
}
</script>

<style>
.logout-btn {
  font-family: 'ClashDisplay-Variable';
  font-size: 19px;
  color: white;
  cursor: pointer;
  text-transform: uppercase;
}
.nav-logo {
    height: 500px !important;
}
.navbar {
    background: black !important;
}
.level {
  align-items: center !important;
  height: 75px;
}

button.button.button.is-primary.is-medium.nav-cta.cta-btn {
  opacity: 0.5;  
}

.navbar.is-spaced .navbar-link, .navbar.is-spaced a.navbar-item {
  border-radius: 0px !important;
} 

.navbar-link.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, a.navbar-item.is-active, a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover {
  background-color: rgba(255,255,255,0);
}

a.navbar-item:hover {
  color: rgba(255,255,255,0.7);
  background-color: transparent !important;
}

.button {
  margin: 0px !important;
}

a.navbar-burger.burger.is-active {
  color: white;
}

a.navbar-burger.burger {
  color: white;
}

.reserve-btn {
  justify-content: center !important;
  margin-top: -10px;
}
.navbar-item {
  margin: 0 0.5rem;
  text-align: center;
}
.nav-btn {
  height: 50px !important;
  width: 170px !important;
  font-size: 15px !important;
  background: #0E1739 !important;
  color: white !important;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23416BFF' stroke-width='2' stroke-dasharray='3%2c 56%2c 16' stroke-dashoffset='22' stroke-linecap='square'/%3e%3c/svg%3e") !important;
  border: none !important;
  border-radius: 0px !important;
  font-family: 'ClashDisplay-Variable';
  color: white;
}
</style>