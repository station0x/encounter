<template>
    <div class="section onboarding">
        <div class="home-wrapper">
            <svg viewBox="0 0 864 548" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="assets">
                <rect class="float-on-hover" @click="goToLobby" id="deployment" x="272" width="312" height="313" fill="url(#pattern-d)"/>
                <rect id="refinery" style="cursor: not-allowed" y="165" width="257.804" height="258" fill="url(#pattern-r)"/>
                <rect id="market" style="cursor: not-allowed" x="603" y="86" width="260.521" height="261" fill="url(#pattern-m)"/>
                <rect id="factory" style="cursor: not-allowed" x="430" y="326" width="222" height="222" fill="url(#pattern-f)"/>
                <rect class="float-on-hover" @click="$router.push({name: 'Leaderboard'})" id="leaderboard" x="237" y="372" width="170" height="170" fill="url(#pattern-l)"/>
                </g>
                <defs>
                    <pattern id="pattern-d" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_315_27460" transform="translate(-0.00160256) scale(0.00076058)"/>
                    </pattern>
                    <pattern id="pattern-r" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1_315_27460" transform="scale(0.000758725)"/>
                    </pattern>
                    <pattern id="pattern-m" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image2_315_27460" transform="translate(-0.000539371) scale(0.000759544)"/>
                    </pattern>
                    <pattern id="pattern-f" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image3_315_27460" transform="scale(0.000758725)"/>
                    </pattern>
                    <pattern id="pattern-l" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image4_315_27460" transform="translate(0 -0.000379363) scale(0.000758725)"/>
                    </pattern>
                    <image id="image0_315_27460" data-name="assets_04.png" width="1319" height="1319" href="https://res.cloudinary.com/station0x/image/upload/v1644891419/encouter/home/deployment_pwk68g.webp"/>
                    <image id="image1_315_27460" data-name="Dim-assets-_02(edit).png" width="1318" height="1319" href="https://res.cloudinary.com/station0x/image/upload/v1644891419/encouter/home/refinery_m3k6l6.webp"/>
                    <image id="image2_315_27460" data-name="Dim-assets-_08(edit).png" width="1318" height="1319" href="https://res.cloudinary.com/station0x/image/upload/v1644891419/encouter/home/market_sswma8.webp"/>
                    <image id="image3_315_27460" data-name="Dim-assets-_11(edit).png" width="1318" height="1318" href="https://res.cloudinary.com/station0x/image/upload/v1644891418/encouter/home/factory_yfhogo.webp"/>
                    <image id="image4_315_27460" data-name="assets_06.png" width="1318" height="1319" href="https://res.cloudinary.com/station0x/image/upload/v1644891419/encouter/home/leaderboard_smxlah.webp"/>
                </defs>
            </svg>
        </div>
        <div class="game-guide">
          <svg viewBox="0 0 259 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g @click="openGameGuideModal" id="GAME GUIDE" style="cursor: pointer">
          <g id="frame">
          <path id="Vector" d="M252.767 1.09133e-05H78.8015L69.6226 9.17892V51.6501L75.7786 57.8077H99.9615L102.984 60.8306H136.387L139.41 57.8077H252.767L252.823 57.7518L255.897 54.6775V36.5404L258.92 33.5175V15.2292L258.864 15.1733L255.897 12.2018V3.1332L255.841 3.07726L252.767 1.09133e-05ZM78.9526 0.377868H252.616L255.528 3.28892V12.3575L255.583 12.4134L258.551 15.3804V33.3664L255.528 36.3892V54.5264L252.616 57.4389H139.259L136.236 60.4618H103.135L100.113 57.4389H75.9298L69.9959 51.5035V9.33464L78.9526 0.377868Z" fill="white"/>
          <path id="Vector_2" d="M246.721 3.23803H213.319L213.263 3.29242L210.296 6.26088H186.264L183.241 3.23803H84.8472L72.6454 15.4398V48.8424L78.8014 55H246.721L246.777 54.9441L252.874 48.847V9.39865L252.818 9.34271L246.721 3.23803ZM213.47 3.61588H246.57L252.506 9.54979V48.6958L246.57 54.6312H78.9526L73.0187 48.6958V15.5955L84.9983 3.61588H183.09L186.113 6.63874H210.447L210.503 6.5828L213.47 3.61588Z" fill="white"/>
          <path id="Vector_3" d="M246.721 3.23803H213.319L213.263 3.29242L210.296 6.26088H186.264L183.241 3.23803H84.8472L72.6454 15.4398V48.8424L78.8014 55H246.721L246.777 54.9441L252.874 48.847V9.39865L252.818 9.34271L246.721 3.23803Z" fill="white" fill-opacity="0.01"/>
          <path id="Vector_4" d="M71.3168 12.2803V10.7688L80.3853 1.70026V3.21169L71.3168 12.2803Z" fill="white"/>
          <path id="Vector_5" d="M252.688 6.23466L249.666 3.2118V1.70037L254.2 6.23466V7.74609L252.688 6.23466Z" fill="white"/>
          <path id="Vector_6" d="M249.666 54.6006L254.2 50.0663V51.5777L251.177 54.6006H249.666Z" fill="white"/>
          <path id="Vector_7" d="M104.568 59.1348L103.057 57.6233H104.568L106.08 59.1348H104.568Z" fill="white"/>
          <path id="Vector_8" d="M107.591 59.1348L106.08 57.6233H107.591L109.103 59.1348H107.591Z" fill="white"/>
          <path id="Vector_9" d="M110.614 59.1348L109.103 57.6233H110.614L112.125 59.1348H110.614Z" fill="white"/>
          <path id="Vector_10" d="M113.637 59.1348L112.125 57.6233H113.637L115.148 59.1348H113.637Z" fill="white"/>
          <path id="Vector_11" d="M116.66 59.1348L115.148 57.6233H116.66L118.171 59.1348H116.66Z" fill="white"/>
          <path id="Vector_12" d="M119.683 59.1348L118.171 57.6233H119.683L121.194 59.1348H119.683Z" fill="white"/>
          <path id="Vector_13" d="M122.705 59.1348L121.194 57.6233H122.705L124.217 59.1348H122.705Z" fill="white"/>
          <path id="Vector_14" d="M124.351 57.4904L124.084 57.7564L125.651 59.3237H134.797V58.9459H125.807L124.351 57.4904Z" fill="white"/>
          <path id="Vector_15" d="M186.186 3.21171L187.697 4.72314H189.208L187.697 3.21171H186.186Z" fill="white"/>
          <path id="Vector_16" d="M189.208 3.21171L190.72 4.72314H192.231L190.72 3.21171H189.208Z" fill="white"/>
          <path id="Vector_17" d="M192.231 3.21171L193.743 4.72314H195.254L193.743 3.21171H192.231Z" fill="white"/>
          <path id="Vector_18" d="M195.254 3.21171L196.765 4.72314H198.277L196.765 3.21171H195.254Z" fill="white"/>
          <path id="Vector_19" d="M198.277 3.21171L199.788 4.72314H201.3L199.788 3.21171H198.277Z" fill="white"/>
          <path id="Vector_20" d="M202.946 3.07874L202.677 3.34476L204.246 4.91211H208.857V4.53425H204.401L202.946 3.07874Z" fill="white"/>
          <path id="Vector_21" d="M0.377857 25.5162H24.2932L27.3161 28.5391H69.7147V28.1612H27.4733L24.4504 25.1383H0" fill="white"/>
          <path id="Vector_22" d="M36.4632 25.5161H30.4175V25.1383H36.4632V25.5161Z" fill="white"/>
          <path id="Vector_23" d="M36.4632 31.5615H30.4175V31.1837H36.4632V31.5615Z" fill="white"/>
          <path id="Vector_24" d="M45.5318 25.5161H39.4861V25.1383H45.5318V25.5161Z" fill="white"/>
          <path id="Vector_25" d="M45.5318 31.5615H39.4861V31.1837H45.5318V31.5615Z" fill="white"/>
          <path id="Vector_26" d="M54.6004 25.5161H48.5547V25.1383H54.6004V25.5161Z" fill="white"/>
          <path id="Vector_27" d="M54.6004 31.5615H48.5547V31.1837H54.6004V31.5615Z" fill="white"/>
          </g>
          <g id="text">
          <text id="GAME GUIDE_2" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="15" letter-spacing="0em"><tspan x="113.403" y="26.78">GAME GUIDE</tspan></text>
          <text id="Learn more about Encounter" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="9.4" font-weight="600" letter-spacing="0em"><tspan x="113" y="39.6035">Learn More About Encounter</tspan></text>
          </g>
          <g id="icon">
          <path id="Vector_28" d="M96.9615 37.038C96.952 37.041 96.0831 37.317 95.3289 37.317C94.9124 37.317 94.7443 37.2345 94.6909 37.1985C94.4269 37.023 93.9366 36.6945 94.7757 35.0985L96.3471 32.1075C97.2789 30.3315 97.4172 28.614 96.7321 27.27C96.1727 26.1705 95.0994 25.416 93.7151 25.146C93.2197 25.0492 92.7154 25.0005 92.2097 25.0005C89.3043 25.0005 87.348 26.6205 87.2663 26.6895C87.1299 26.8043 87.0394 26.9607 87.0103 27.132C86.9811 27.3033 87.0152 27.479 87.1066 27.6291C87.198 27.7792 87.3411 27.8943 87.5115 27.9549C87.6819 28.0156 87.869 28.0179 88.041 27.9615C88.0488 27.9585 88.9194 27.681 89.6736 27.681C90.0869 27.681 90.2534 27.7635 90.3053 27.798C90.5708 27.975 91.0627 28.308 90.2251 29.901L88.6538 32.8935C87.7204 34.671 87.5837 36.3885 88.2688 37.731C88.8282 38.8305 89.8999 39.585 91.2874 39.855C91.7808 39.9495 92.2867 40.0005 92.7864 40.0005C95.6934 40.0005 97.6513 38.3805 97.733 38.3115C97.8695 38.197 97.9603 38.0408 97.9897 37.8696C98.0192 37.6984 97.9856 37.5228 97.8946 37.3726C97.8036 37.2224 97.6609 37.1069 97.4907 37.0459C97.3206 36.9849 97.1335 36.9821 96.9615 37.038V37.038Z" fill="#FBC115"/>
          <path id="Vector_29" d="M95.5001 24.0005C97.4331 24.0005 99.0001 22.2096 99.0001 20.0005C99.0001 17.7913 97.4331 16.0005 95.5001 16.0005C93.5671 16.0005 92.0001 17.7913 92.0001 20.0005C92.0001 22.2096 93.5671 24.0005 95.5001 24.0005Z" fill="#FBC115"/>
          </g>
          </g>
          </svg>
        </div>
    </div>
</template>

<script>
import GameGuide from '@/components/GameGuide.vue'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    openGameGuideModal() {
        this.$buefy.modal.open({
          component: GameGuide,
          canCancel: ['escape', 'outside', 'x']
        })
    },
    goToLobby () {
      // if(!this.$store.state.profile || this.$store.state.profile.banned) return;
      this.$router.push({name: 'Lobby'})
    }
  },
  watch: {
    "$store.state.matchId" (newMatchId) {
      if(newMatchId !== undefined) {
        this.$router.push('/lobby')
      }
    }
  }
}
</script>



<style scoped>
.home-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    margin-top: 130px;
    /* -webkit-animation: float 6s ease-in-out infinite;
    animation: float 6s ease-in-out infinite; */
}
.float-on-hover {
  cursor: pointer;
  transition: all .5s ease-in-out;
}
.float-on-hover:hover {
    transform: translatey(-10px);
}
.game-guide {
  position: absolute;
  left: 0;
  bottom: 10vh;
  width: 300px;
}
.disabled {
  filter: grayscale(1);
  cursor:not-allowed;
  user-select: none;
}
@media screen and (max-width: 1500px) {
    .home-wrapper {
      max-width: 900px;
      margin: 0 auto;
      margin-top: 100px;
    }
}
@-webkit-keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}

@keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}
</style>