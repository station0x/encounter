<template>
    <div class="player-card">
        <center>
            <div class="hexagon" :style="cssProps">
                <div class="hexTop"></div>
                <div class="hexBottom"></div>
            </div>
            <h1 class="you">You</h1>
            <h1 class="your-address">{{ formattedAddress }}</h1>
            <img class="energy-icon" src="/energy.png" width="23px"/>
            <span class="energy">20</span>
        </center>
        <v-gravatar style="display: none" ref="gravatar" :email="playerAddress" alt="Nobody" :size="530"/>
    </div>
</template>

<script>
export default {
    props:['playerAddress'],
    data () {
        return {
            gravatar: null
        }
    },
    computed: {
        cssProps() {
            return {
                '--bg-img': 'url(' + this.gravatar + ')'
            }
        },
        formattedAddress() {
            return this.playerAddress.slice(0, 5) + '...' + this.playerAddress.slice(-5)
        }
    },
    mounted: function() {
        this.gravatar = this.$refs.gravatar.url
    },
}
</script>


<style scoped>
.player-card {
    height: 500px;
    width: 100%;
    top: 0;
    position: absolute;
    border-bottom: 1px solid #797979;
}
.energy {
    font-family: 'Roboto';
    font-size: 38px;
    color: #F98F09;
}
.energy-icon {
    margin-bottom: -9px;
    margin-right: 5px;
}
.surrender {
    display: flex;
align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 0px;
    background: transparent;
    color: #FF4949;
    text-transform: capitalize;
    font-size: 19px;
    height: 80px;
    line-height: 80px;
    transition: 400ms ease-in-out;
}
.surrender:hover {
    background: #FF4949;
    color: white;
}
.you {
    font-size: 27px;
    color: #C72929;
    padding-top: 20px;
}
.your-address {
    color: white;
    margin-bottom: 20px;
}
.hexagon {
  position: relative;
  width: 130px; 
  height: 75.06px;
  margin: 37.53px 0;
  background-image: var(--bg-img);
  background-size: auto 138.5641px;
  background-position: center;
  border-left: solid 5px #C72929;
  border-right: solid 5px #C72929;
  margin-top: 70px;
}

.hexTop,
.hexBottom {
  position: absolute;
  z-index: 1;
  width: 91.92px;
  height: 91.92px;
  overflow: hidden;
  -webkit-transform: scaleY(0.5774) rotate(-45deg);
  -ms-transform: scaleY(0.5774) rotate(-45deg);
  transform: scaleY(0.5774) rotate(-45deg);
  background: inherit;
  left: 14.04px;
}

/*counter transform the bg image on the caps*/
.hexTop:after,
.hexBottom:after {
  content: "";
  position: absolute;
  width: 120.0000px;
  height: 69.2820323027551px;
  -webkit-transform:  rotate(45deg) scaleY(1.7321) translateY(-34.6410px);
  -ms-transform:      rotate(45deg) scaleY(1.7321) translateY(-34.6410px);
  transform:          rotate(45deg) scaleY(1.7321) translateY(-34.6410px);
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
  background: inherit;
}

.hexTop {
  top: -45.9619px;
  border-top: solid 7.0711px #C72929;
  border-right: solid 7.0711px #C72929;
}

.hexTop:after {
  background-position: center top;
}

.hexBottom {
  bottom: -45.9619px;
  border-bottom: solid 7.0711px #C72929;
  border-left: solid 7.0711px #C72929;
}

.hexBottom:after {
  background-position: center bottom;
}

.hexagon:after {
  content: "";
  position: absolute;
  top: 2.8868px;
  left: 0;
  width: 120.0000px;
  height: 69.2820px;
  z-index: 2;
  background: inherit;
}
</style>