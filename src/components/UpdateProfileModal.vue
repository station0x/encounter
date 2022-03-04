<template>
    <div class="edit-profile-wrapper">
        <svg viewBox="0 0 565 233" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="update-name-modal">
        <g id="settings-dialog">
        <g id="settings-frame">
        <path id="Vector 5" d="M2 44L23 24V10.5H132L148 26H416L430.5 11H543V26L562.5 44V196L543 216.5V230H430.5L416 216.5H146L132 230H23V216.5L2 196.5V44Z" fill="black" fill-opacity="0.3"/>
        <g id="Group 348">
        <path id="Vector" d="M21.6777 8L0 29.7143V178.423H2.11285V44.3598L22.6708 23.7672V10.1164H133.236L148.491 25.3968H417.399L431.746 11.0476L432.696 10.1164H542.057V23.7672L562.615 44.381V68.4233H564.728V29.7143L543.05 8H21.6777ZM415.667 23.164H150.244L139.215 10.1164H426.696L415.667 23.164Z" fill="url(#paint0_linear_631_5828)"/>
        </g>
        <g id="Group 356">
        <path id="Vector_2" d="M543.05 232.423L564.728 210.709L564.728 102L562.615 102L562.615 196.063L542.057 216.656L542.057 230.307L431.492 230.307L416.237 215.026L147.329 215.026L132.982 229.376L132.032 230.307L22.6707 230.307L22.6707 216.656L2.1128 196.042L2.1128 172L-5.57528e-05 172L-5.91368e-05 210.709L21.6777 232.423L543.05 232.423ZM149.061 217.259L414.484 217.259L425.513 230.307L138.032 230.307L149.061 217.259Z" fill="url(#paint1_linear_631_5828)"/>
        </g>
        </g>
        <g id="update-name-btn">
        <g id="Group 481">
        <g id="Group 135">
        <text id="update name" fill="#FBC115" xml:space="preserve" style="white-space: pre; user-select: none" font-family="Anson" font-size="18" letter-spacing="0em"><tspan x="239.568" y="167.736">UPDATE NAME</tspan></text>
        <path id="Rectangle 5" @click="updateName()" style="cursor: pointer" d="M195.25 147.25L369.75 147.25L369.75 177.58L365.706 182.75L200.817 182.75L195.25 175.911L195.25 147.25Z" fill="url(#paint2_linear_631_5828)" stroke="#FBC115" stroke-width="0.5"/>
        </g>
        </g>
        </g>
        <g id="close-group" @click="closeModal()" style="cursor: pointer">
        <rect id="Rectangle 85" x="511" y="23" width="23" height="21" fill="#060A0E" fill-opacity="0.01"/>
        <path id="close" d="M529.587 38.5996L524.488 33.5L529.587 28.4004C530.138 27.8499 530.138 26.9635 529.587 26.4129C529.037 25.8624 528.15 25.8624 527.6 26.4129L522.5 31.5125L517.4 26.4129C516.85 25.8624 515.963 25.8624 515.413 26.4129C514.862 26.9635 514.862 27.8499 515.413 28.4004L520.512 33.5L515.413 38.5996C514.862 39.1501 514.862 40.0365 515.413 40.5871C515.963 41.1376 516.85 41.1376 517.4 40.5871L522.5 35.4875L527.6 40.5871C528.15 41.1376 529.037 41.1376 529.587 40.5871C530.134 40.0365 530.134 39.1462 529.587 38.5996Z" fill="#FBC115"/>
        </g>
        <text id="EDIT PROFILE NAME" fill="white" xml:space="preserve" style="white-space: pre; user-select: none" font-family="Anson" font-size="30" letter-spacing="0em"><tspan x="183" y="21.56">EDIT PROFILE NAME</tspan></text>
        </g>
        <g id="input-field">
        <g id="Group 287">
        <g id="Group 135_2">
        <path id="Rectangle 5_2" d="M143.25 81.25L419.75 81.25L419.75 111.566L414.768 116.75L150.104 116.75L143.25 109.896L143.25 81.25Z" stroke="#FBC115" stroke-width="0.5"/>
        </g>
        </g>
        <foreignObject x="154" y="82" width="258" height="35">
            <input
                v-model="newName"
                :placeholder="oldName"
                class="name-field"/>
        </foreignObject>
        </g>
        </g>
        <defs>
        <linearGradient id="paint0_linear_631_5828" x1="152.364" y1="8" x2="152.364" y2="68.4232" gradientUnits="userSpaceOnUse">
        <stop stop-color="#252525" stop-opacity="0.82"/>
        <stop offset="1" stop-color="#494949"/>
        </linearGradient>
        <linearGradient id="paint1_linear_631_5828" x1="412.364" y1="232.423" x2="412.364" y2="172" gradientUnits="userSpaceOnUse">
        <stop stop-color="#252525" stop-opacity="0.82"/>
        <stop offset="1" stop-color="#494949"/>
        </linearGradient>
        <linearGradient id="paint2_linear_631_5828" x1="238.551" y1="183" x2="238.551" y2="147" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FBC115" stop-opacity="0"/>
        <stop offset="1" stop-color="#FBC115" stop-opacity="0.12"/>
        </linearGradient>
        </defs>
        </svg>

    </div>
</template>

<script>
export default {
    data () {
        return {
            newName: ''
        }
    },
    props: ['oldName'],
    computed: {
        isConnected() {
        return this.$store.state.address && this.$store.state.address.length > 0? true : false
        }
    },
    methods: {
        closeModal() {
            // destroy the vue listeners, etc
            this.$emit('close')
        },
        updateName() {
            if(this.newName.length === 0) {
                this.$buefy.snackbar.open({
                    message: 'New player alias cannot be empty!',
                    type: 'is-danger',
                    position: 'is-bottom',
                    duration: 5000,
                })
            } else this.$emit('updateName', this.newName)
        }
    }
}
</script>

<style scoped>
.edit-profile-wrapper {
    width: 600px;
    margin: 0 auto;
}
.name-field {
    border: none;
    box-shadow: none;
    height: 33px !important;
    background: transparent;
    padding: 3px;
    width: 100%;
}
</style>