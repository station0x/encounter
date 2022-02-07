<template>
  <b-navbar :mobile-burger="false" spaced transparent>
    <template #brand>
      <b-navbar-item :href="$router.resolve({name: 'Home'}).href">
        <img
          :src="require('../assets/img/widelogo.png')"
          class="nav-logo"
        >
      </b-navbar-item>
    </template>

    <template #end>
        <b-navbar-item v-if="isConnected" @click="openLeaderboard">
        <a class="button nav-btn">
          Leaderboard
        </a>
      </b-navbar-item>
      <center>
        <b-button class="nav-btn" v-if="!isConnected" type="is-primary" @click="connectMetamask">Connect Wallet</b-button>
        <b-dropdown v-if="isConnected" :triggers="['hover']" position="is-bottom-left" aria-role="menu">
          <template #trigger>
            <b-button
              class="nav-btn"
              :label="fmtdWalletAddress"
              icon-right="menu-down" />
          </template>
            <b-dropdown-item custom aria-role="menuitem">
                <center> Logged as <b> {{ fmtdWalletAddress }}</b> </center>
            </b-dropdown-item>
            <hr class="dropdown-divider">
            <b-dropdown-item @click="openProfile" value="profile" aria-role="menuitem">
                <b-icon icon="account-circle-outline" custom-size="mdi-18px"></b-icon>
                Profile
            </b-dropdown-item>
            <b-dropdown-item @click="logout" value="logout" aria-role="menuitem">
                <b-icon icon="logout-variant" custom-size="mdi-18px"></b-icon>
                Logout
            </b-dropdown-item>
          </b-dropdown>
        </center>
    </template>
  </b-navbar>
</template>

<script>
import { ethers } from 'ethers'
export default {
  data () {
    return {
      playerPath: '/player/' + this.$store.state.address
    }
  },
    computed: {
      isConnected() {
        return this.$store.state.address && this.$store.state.address.length > 0? true : false
      },
      fmtdWalletAddress() {
        return this.$store.state.address === null ? '' : this.$store.state.address.substring(0, 6) + '...' + this.$store.state.address.substring(38, 42)
      }
    },
    methods: {
        async connectMetamask() {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
            const signer = provider.getSigner()
            await provider.send("eth_requestAccounts", []);
            const accounts = await provider.listAccounts()
            const signature = await signer.signMessage("Station Labs Login")
            this.$router.go(this.$router.currentRoute)
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
            if(this.$hj){
                this.$hj('identify', this.$store.state.address, {})
            }
        },
        logout() {
            this.$store.dispatch('disconnect')
            this.$router.push({name: 'Login'})
        },
        openProfile() {
          let routeData = this.$router.resolve({ name: 'Player Profile', params: { playerAddress: this.$store.state.address } })
          window.open(routeData.href, '_blank')
        },
        openLeaderboard() {
          let routeData = this.$router.resolve({ name: 'Leaderboard' })
          window.open(routeData.href, '_blank')
        }
    }
}
</script>

<style lang="scss">
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

a.navbar-item {
  margin-left: 0px !important;
  padding-left: 0px !important;
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
img.nav-logo {
    max-height: 4rem !important;
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
  transition: 200ms ease-in;
}
.nav-btn:hover {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23416BFF' stroke-width='2' stroke-dasharray='5%2c 45%2c 12' stroke-dashoffset='26' stroke-linecap='square'/%3e%3c/svg%3e") !important;
}
i.mdi.mdi-logout {
  font-size: 20px;
  margin-right: -5px;
}
$dropdown-item-hover-color: red;
</style>