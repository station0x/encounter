<template>
    <div>
        <div class="deployment-wrapper">
            <div v-if="!invitationLink && !matchmakingLoader" class="main-view">
                <svg viewBox="0 0 398 435" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Deployment center">
                    <text id="Deployment center_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="22" letter-spacing="0em"><tspan x="115.214" y="35">DEPLOYMENT CENTER</tspan></text>
                    <g id="casual-group">
                    <g id="img-custom">
                    <path id="Vector" d="M188.156 408.215V65H25.842L7 81.2819V426.074H167.219L188.156 408.215Z" fill="url(#pattern-custom)"/>
                    <path id="Vector_2" d="M188.156 408.215V65H25.842L7 81.2819V426.074H167.219L188.156 408.215Z" fill="url(#paint0_radial_407_1287)"/>
                    <g id="Vector_3">
                    <path d="M188.156 408.215V65H25.842L7 81.2819V426.074H167.219L188.156 408.215Z" fill="#0A1325" style="mix-blend-mode:color"/>
                    </g>
                    </g>
                    <path id="custom-vector" d="M194.286 413.418V58H23.2257L11.6129 67.3921L0 76.7842V434.02H168.84L194.286 413.418Z" stroke="#525252" stroke-miterlimit="10"/>
                    <text id="custom" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="24" letter-spacing="0em"><tspan x="23" y="258.148">CUSTOM</tspan></text>
                    <text id="Challenge your friend in a private unranked match. Custom matches are good for practicing before joining ranked matchmaking." fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="11" letter-spacing="0em"><tspan x="23" y="283.26">Challenge your friend in a </tspan><tspan x="23" y="296.26">private unranked match. </tspan><tspan x="23" y="309.26">Custom matches are good for </tspan><tspan x="23" y="322.26">practicing before joining </tspan><tspan x="23" y="335.26">ranked matchmaking.</tspan></text>
                    <g id="create-btn-group">
                    <g id="create-btn" @click="createMatch()" :class="{'disabled-cta': checkMatchLoader || createMatchLoader}">
                        <path id="create-rect" d="M66.25 375.25L172.75 375.25L172.75 405.566L167.768 410.75L73.1035 410.75L66.25 403.896L66.25 375.25Z" fill="url(#paint1_linear_407_1287)" stroke="#FBC115" stroke-width="0.5"/>
                        <text id="create" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan :x="createMatchLoader ? 101 : 97.0342" y="395.736">{{createMatchLoader ? 'CREATING': 'CREATE'}}</tspan></text>
                        <foreignObject x="68" y="371.5" height="50px" width="50px">
                        <b-button class="loader-fake-btn" :loading="createMatchLoader" v-if="!invitationLink"></b-button>
                        </foreignObject>
                    </g>
                    </g>
                    </g>
                    <g id="Ranked-group">
                    <path id="Vector_4" d="M397.286 78.6013V434.02H226.226L203 415.236V58H371.84L397.286 78.6013Z" stroke="#525252" stroke-miterlimit="10"/>
                    <g id="img-ranked">
                    <path id="Vector_5" d="M209 409.145V66H371.174L390 82.2785V427H229.919L209 409.145Z" fill="url(#pattern-ranked)"/>
                    <path id="Vector_6" d="M209 409.145V66H371.174L390 82.2785V427H229.919L209 409.145Z" fill="url(#paint2_radial_407_1287)"/>
                    <g id="Vector_7">
                    <path d="M209 409.145V66H371.174L390 82.2785V427H229.919L209 409.145Z" fill="#210907" style="mix-blend-mode:color"/>
                    </g>
                    </g>
                    <text id="Ranked / p2e" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="24" letter-spacing="0em"><tspan x="224.634" y="258.148">RANKED / P2E</tspan></text>
                    <text id="Assert your global dominance on the ranked leaderboard. Destroy enemy fleets and earn loot. You will be matched with enemy fleet captains based on your Elo." fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="11" letter-spacing="0em"><tspan x="225" y="283.26">Assert your global dominance </tspan><tspan x="225" y="296.26">on the ranked leaderboard. </tspan><tspan x="225" y="309.26">Destroy enemy fleets and earn </tspan><tspan x="225" y="322.26">loot. You will be matched with </tspan><tspan x="225" y="335.26">enemy fleet captains based on </tspan><tspan x="225" y="348.26">your Elo. </tspan></text>
                    <g id="find-match" @click="joinMatchMaking()" :class="{'disabled-cta': checkMatchLoader || createMatchLoader}">
                        <path id="Rectangle 5" d="M271.25 375.25L376.75 375.25L376.75 405.566L371.768 410.75L278.104 410.75L271.25 403.896L271.25 375.25Z" fill="url(#paint3_linear_407_1287)" stroke="#FBC115" stroke-width="0.5"/>
                        <text id="FIND match" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan :x="checkMatchLoader ? 307 : 287.5" y="395.736">{{ checkMatchLoader ? 'CHECKING' : 'FIND MATCH' }}</tspan></text>
                        <foreignObject x="273" y="371" height="50px" width="50px">
                            <b-button class="loader-fake-btn" :loading="checkMatchLoader" v-if="!invitationLink"></b-button>
                            </foreignObject>
                    </g>
                    </g>
                    </g>
                    <defs>
                    <pattern id="pattern-custom" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_407_1287" transform="translate(-0.830994) scale(0.00332749 0.00166945)"/>
                    </pattern>
                    <pattern id="pattern-ranked" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1_407_1287" transform="translate(-1.08836) scale(0.00332967 0.00166945)"/>
                    </pattern>
                    <radialGradient id="paint0_radial_407_1287" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(97.578 245.537) rotate(90) scale(180.537 186.312)">
                    <stop stop-opacity="0.2"/>
                    <stop offset="1"/>
                    </radialGradient>
                    <linearGradient id="paint1_linear_407_1287" x1="119.5" y1="411" x2="119.5" y2="375" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115" stop-opacity="0"/>
                    <stop offset="1" stop-color="#FBC115" stop-opacity="0.12"/>
                    </linearGradient>
                    <radialGradient id="paint2_radial_407_1287" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(299.5 246.5) rotate(90) scale(180.5 186.152)">
                    <stop stop-opacity="0.2"/>
                    <stop offset="1"/>
                    </radialGradient>
                    <linearGradient id="paint3_linear_407_1287" x1="323.5" y1="411" x2="323.5" y2="375" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115" stop-opacity="0"/>
                    <stop offset="1" stop-color="#FBC115" stop-opacity="0.12"/>
                    </linearGradient>
                    <image id="image0_407_1287" data-name="custome-game.png" width="800" height="599" href="https://res.cloudinary.com/station0x/image/upload/v1644941304/encouter/home/custome-game_rectgq_1_ianw9u.webp"/>
                    <image id="image1_407_1287" data-name="ranked.png" width="800" height="599" href="https://res.cloudinary.com/station0x/image/upload/v1644941306/encouter/home/ranked_m1lhd5_1_hyhgad.webp"/>
                    </defs>
                </svg>
            </div>
            <div v-else-if="invitationLink" class="custom-view">
                <b-button @click="clearInvitationLink()" class="back-btn">
                    <b-icon
                        icon="chevron-left"
                        custom-size="50px"
                        custom-class="back-btn-icon">
                    </b-icon>
                </b-button>
                <svg viewBox="0 0 399 435" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <text id="Deployment center" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="22" letter-spacing="0em"><tspan x="115.214" y="35">DEPLOYMENT CENTER</tspan></text>
                <g id="casual game">
                <g id="img-custom">
                <path id="Vector" d="M390.5 409.145V66H25.8258L7 82.2785V427H369.581L390.5 409.145Z" fill="url(#pattern-custom-cover)"/>
                <path id="Vector_2" d="M391 409.145V66H25.8258L7 82.2785V427H370.081L391 409.145Z" fill="url(#paint0_radial_454_1285)"/>
                </g>
                <path id="Vector_3" d="M398.286 413.418V58H24.2257L1 76.7842V434.02H372.84L398.286 413.418Z" stroke="#525252" stroke-miterlimit="10"/>
                <text id="custom" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="24" letter-spacing="0em"><tspan x="33" y="258.148">CUSTOM</tspan></text>
                <text id="Challenge your friend in a private unranked match. Custom matches are good for practicing before joining ranked matchmaking." fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="11" letter-spacing="0em"><tspan x="33" y="283.26">Challenge your friend in a </tspan><tspan x="33" y="296.26">private unranked match. </tspan><tspan x="33" y="309.26">Custom matches are good for </tspan><tspan x="33" y="322.26">practicing before joining </tspan><tspan x="33" y="335.26">ranked matchmaking.</tspan></text>
                <g id="link-field" @click="copyLink()" style="cursor: pointer">
                <path id="Rectangle 6" d="M378 375L35 375L35 404L42 411L372.874 411L378 405.667L378 375Z" fill="#010101" fill-opacity="0.01"/>
                <path id="Rectangle 5" d="M35.25 375.25L377.75 375.25L377.75 405.566L372.768 410.75L42.1036 410.75L35.25 403.896L35.25 375.25Z" stroke="#6B6B6B" stroke-width="0.5"/>
                <text id="d" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="46" y="395.491">{{formatInvitationLink(invitationLink)}}</tspan></text>
                <text id="copy link" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan x="291" y="395.736">COPY LINK</tspan></text>
                </g>
                </g>
                <defs>
                <pattern id="pattern-custom-cover" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_454_1285" transform="translate(-0.167174) scale(0.00157047)"/>
                </pattern>
                <radialGradient id="paint0_radial_454_1285" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(206 232.5) rotate(58.2113) scale(238.236 245.696)">
                <stop stop-opacity="0.2"/>
                <stop offset="1"/>
                </radialGradient>
                    <image id="image0_454_1285" data-name="custome-game.png" width="800" height="599" href="https://res.cloudinary.com/station0x/image/upload/v1644941304/encouter/home/custome-game_rectgq_1_ianw9u.webp"/>
                    </defs>
                </svg>
                <div v-if="linkCopied" class="loading-box">
                    <b-button class="loader-fake-btn" :loading="true" ></b-button>
                    <h1 class="loading-text">Waiting for opponent!</h1>
                </div>
            </div>
            <div v-else-if="matchmakingLoader">
                <svg viewBox="0 0 399 435" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Group 363">
                    <g id="img-ranked">
                    <path id="Vector" d="M7 409.145V66H373.674L392.5 82.2785V427H27.9189L7 409.145Z" fill="url(#pattern-ranked-cover)"/>
                    <path id="Vector_2" d="M7.00003 409.145V66H373.674L392.5 82.2785V427H27.9189L7.00003 409.145Z" fill="url(#paint0_radial_465_1288)"/>
                    </g>
                <text id="Deployment center" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="22" letter-spacing="0em"><tspan x="115.214" y="35">DEPLOYMENT CENTER</tspan></text>
                    <path id="Vector_3" d="M397.921 78.6013V434.02H23.86L0.634277 415.236V58H372.474L397.921 78.6013Z" stroke="#525252" stroke-miterlimit="10"/>
                    <g id="leavequeue" @click="leaveMatchMaking()" style="cursor: pointer">
                    <path id="Rectangle 5" d="M272.25 403.896L272.25 375.25L377.75 375.25L377.75 405.566L372.768 410.75L279.104 410.75L272.25 403.896Z" stroke="#FB1515" stroke-width="0.5"/>
                    <text id="leave-queue-btn" fill="#FB1515" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan x="284.308" y="395.736">LEAVE QUEUE</tspan></text>
                    </g>
                    <g id="Deployment center_2">
                    <g id="Ranked-group">
                    <text id="Ranked / p2e" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="24" letter-spacing="0em"><tspan x="33" y="258.148">RANKED / P2E</tspan></text>
                    </g>
                    </g>
                    <text id="Assert your global dominance on the ranked leaderboard. Destroy enemy fleets and earn loot. You will be matched with enemy fleet captains based on your Elo." fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="11" letter-spacing="0em"><tspan x="33" y="283.26">Assert your global dominance </tspan><tspan x="33" y="296.26">on the ranked leaderboard. </tspan><tspan x="33" y="309.26">Destroy enemy fleets and earn </tspan><tspan x="33" y="322.26">loot. You will be matched with </tspan><tspan x="33" y="335.26">enemy fleet captains based on </tspan><tspan x="33" y="348.26">your Elo. </tspan></text>
                    </g>
                    <defs>
                    <pattern id="pattern-ranked-cover" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_465_1288" transform="translate(-0.140407) scale(0.00156335 0.00166945)"/>
                    </pattern>
                    <radialGradient id="paint0_radial_465_1288" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(191 234) rotate(43.8527) scale(264.865 253.955)">
                    <stop stop-opacity="0.2"/>
                    <stop offset="0.84083"/>
                    </radialGradient>
                    <image id="image0_465_1288" data-name="ranked.png" width="800" height="599" href="https://res.cloudinary.com/station0x/image/upload/v1644941306/encouter/home/ranked_m1lhd5_1_hyhgad.webp"/>
                    </defs>
                    <filter id="glowRed" height="300%" width="320%" x="-75%" y="-50%">
                        <!-- Thicken out the original shape -->
                        <feMorphology operator="dilate" radius="3" in="SourceAlpha" result="thicken" />

                        <!-- Use a gaussian blur to create the soft blurriness of the glow -->
                        <feGaussianBlur in="thicken" stdDeviation="17" result="blurred" />

                        <!-- Change the colour -->
                        <feFlood flood-color="#FB1515" result="glowColor" />

                        <!-- Color in the glows -->
                        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />

                        <!--	Layer the effects together -->
                        <feMerge>
                            <feMergeNode in="softGlow_colored"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <filter id="glowYellow" height="300%" width="320%" x="-75%" y="-50%">
                        <!-- Thicken out the original shape -->
                        <feMorphology operator="dilate" radius="3" in="SourceAlpha" result="thicken" />

                        <!-- Use a gaussian blur to create the soft blurriness of the glow -->
                        <feGaussianBlur in="thicken" stdDeviation="17" result="blurred" />

                        <!-- Change the colour -->
                        <feFlood flood-color="#FBC115" result="glowColor" />

                        <!-- Color in the glows -->
                        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />

                        <!--	Layer the effects together -->
                        <feMerge>
                            <feMergeNode in="softGlow_colored"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </svg>
                <div v-if="matchmakingLoader" class="loading-box">
                    <b-button class="loader-fake-btn" :loading="true" ></b-button>
                    <h1 class="loading-text">Waiting for opponent!</h1>
                </div>
            </div>
        </div>
        <div class="lobby-background"></div>
    </div>
</template>

<script>
import GameGuide from '@/components/GameGuide.vue'
import axios from 'axios'
export default {
    data() {
        return {
            invitationLink: '',
            checkMatchLoader: true,
            createMatchLoader: false,
            matchmakingLoader: false,
            linkCopied: false
        }
    },
    methods: {
        async createMatch() {
            this.createMatchLoader = true
            try {
                const res = await axios.get('/api/match/createMatch', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
                this.linkPrefix = window.location.host.split(':')[0] === 'localhost' ? 'http://' : 'https://'
                this.invitationLink = window.location.host + '/play/' + res.data.inviteLink
            } finally {
                this.createMatchLoader = false
            }
        },
        formatInvitationLink(link) {
            return link.slice(0, link.length - 15) + '...' + link.slice(-4)
        },
        openGameGuideModal() {
            this.$buefy.modal.open({
                component: GameGuide
            })
        },
        copyLink() {
            this.$copyText(this.invitationLink).then((e) => {
                this.$buefy.snackbar.open({
                    duration: 5000,
                    message: 'Link Copied!',
                    type: 'is-success',
                    position: 'is-bottom',
                })
                this.linkCopied = true
            }, (e) => {
                this.$buefy.snackbar.open({
                    duration: 5000,
                    message: 'Try Again! ' + e,
                    type: 'is-danger',
                    position: 'is-bottom',
                })
            })
        },
        clearInvitationLink() {
            this.invitationLink = ''
            this.linkCopied = false
        },
        async joinMatchMaking() {
            this.checkMatchLoader = true
            try {
                const res = await axios.get('/api/matchmaker/joinMatchmaking', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
            } finally {
                this.matchmakingLoader = true
            }
        },
        async leaveMatchMaking() {
            this.matchmakingLoader = false
            try {
                this.matchmakingLoader = false
                const res = await axios.get('/api/matchmaker/leaveMatchmaking', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
            } finally {
                this.checkMatchmaking()
            }
        },
        // async triggerMatchmaking() { 
        //     this.findingMatchLoader = true

        // },
        async checkMatchmaking() {
            try {
                const res = await axios.get('/api/matchmaker/checkMatchmaking', {
                    params:{
                        signature:this.$store.state.signature
                    }
                })
                if(res.data.enqueued) {
                    this.checkMatchLoader = false
                    this.matchmakingLoader = true
                }
            } finally {
                this.checkMatchLoader = false
            }
        }
    },
    created() {
        this.checkMatchmaking()
    }
}
</script>


<style>
g#leavequeue:hover > #leave-queue-btn {
    filter: url(#glowRed);
}
.primary-btn {
    background: #F88C09 !important;
    color: black;
    border: none;
    width: 230px;
    height: 60px;
    margin: 15px;
    padding: 15px;
    font-size: 19px;
    font-weight: 500;
    transition: 250ms ease-in-out;
}
.primary-btn:hover {
    background: #f39a2d;
}
.secondary-btn {
    background: rgba(248, 140, 9, 0.1);
    border: 1px solid #F88C09;
    color: #F88C09;
    width: 230px;
    height: 60px;
    margin: 15px;
    padding: 15px;
    font-size: 19px;
    font-weight: 500;
    transition: 250ms ease-in-out;
}
.secondary-btn:hover {
    color: black;
    background: #F88C09;
    border: #F88C09;
}
.deployment-wrapper {
    position: absolute;
    width: 60vw;
    min-width: 350px;
    max-width: 600px;
    padding: 50px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    margin-top: 30px;
    z-index: 2;
    user-select: none;
}
.polygon-container {
    display: inline-block;
    position: relative;
    height: 375px;
    width: 195px;
    background: rgba(82, 82, 82, 0.6);
    box-sizing: border-box;
    -webkit-clip-path: polygon(10% 0, 100% 0, 100% 95%, 90% 100%, 0 100%, 0 5%);
    clip-path: polygon(10% 0, 100% 0, 100% 95%, 90% 100%, 0 100%, 0 5%);
}
.polygon-container .child-img {
    position: absolute;
    top: 1px; /* equal to border thickness */
    left: 1px; /* equal to border thickness */
    height: 373px; /* container height - (border thickness * 2) */
    width: 193px; /* container height - (border thickness * 2) */
    -webkit-clip-path: polygon(10% 0, 100% 0, 100% 95%, 90% 100%, 0 100%, 0 5%);
    clip-path: polygon(10% 0, 100% 0, 100% 95%, 90% 100%, 0 100%, 0 5%);
}
.lobby-background {
  height: 100vh;
  width: 100vw;
  background-image: url('https://res.cloudinary.com/station0x/image/upload/v1644936865/encouter/backgrounds/bk_oltge5.webp');
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: center;
  position: fixed;
  top: 0;
  z-index: 1;
  left: 0;
  right: 0;
}
.custom-view {
    position: relative;
}
.back-btn {
    border: none !important;
    position: absolute !important; 
    left: -50px;
    top: 95px;
}
.back-btn:focus {
    outline: none;
    border: none;
    box-shadow: none !important;
}
.back-btn-icon::before {
    color: #FBC115;
    font-size: 46px;
}
.loading-box {
    display: inline-block;
}
.loading-text {
    float: right;
    line-height: 40px;
    vertical-align: middle;
    opacity: 0.5;
    font-size: 13px;
}
#find-match {
    cursor: pointer;
    pointer-events: all;
}
#create-btn {
    cursor: pointer;
    pointer-events: all;
}
.disabled-cta {
    opacity: 0.5;
    cursor: not-allowed !important;
    pointer-events: none !important;
}
@media screen and (min-width: 1500px) {
    .deployment-wrapper {
        position: absolute;
        width: 60vw;
        min-width: 350px;
        max-width: 570px;
        top: 40%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translate(-50%,-50%);
        margin-top: 30px;
        z-index: 2;
    }
}
</style>