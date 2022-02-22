<template>
    <div @click="$emit('click')" class="item" xmlns="http://www.w3.org/1999/xhtml">
        <svg width="90" height="80" viewBox="0 0 90 80" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Ore">
            <g id="Ore_2">
            <path id="Vector" d="M77.6591 80.0001H20.0756L20.0065 79.933L16.336 76.2734H3.89811L3.82893 76.2063L0.0219727 72.4106V37.4106L0.0892835 37.3417L3.76162 33.6839V3.87025L3.82893 3.80129L7.63776 0.00561523H77.6591L77.7282 0.0745812L85.2767 7.59696V42.069L89.0164 45.7957V68.6839L88.9472 68.7529L77.6591 80.0001ZM20.2626 79.5342H77.4721L88.5545 68.4919V45.9764L84.8149 42.2497V7.77766L77.4721 0.460263H7.82474L4.21785 4.05659V33.8703L4.14867 33.9392L0.47821 37.597V72.2243L4.07949 75.8131H16.5174L16.5865 75.882L20.2626 79.5342Z" :fill="selected ? '#FBC115' : '#6A6A6A'"/>
            <path id="Vector_2" d="M73.882 76.182H22.5867L22.5455 76.1392L18.847 72.4553H11.4092L11.368 72.4125L7.5835 68.6466V15.082L7.62463 15.0429L18.8847 3.81995H70.1386L70.1797 3.8628L81.4398 15.082V68.6466L81.3987 68.6857L73.882 76.182ZM22.7045 75.9007H73.7642L81.1612 68.5293V15.1994L70.0245 4.10127H19.0062L7.86958 15.1994V68.5293L11.527 72.174H18.9648L19.006 72.2168L22.7045 75.9007Z" fill="#6A6A6A"/>
            <path id="Vector_3" d="M5.9998 41.3683H1.97406V39.2236H5.99605L5.9998 41.3683ZM2.26015 41.087H5.71371V39.505H2.26015V41.087Z" fill="#6A6A6A"/>
            <path id="Vector_4" d="M87.0531 63.7287H83.0273V61.584H87.0493L87.0531 63.7287ZM83.3134 63.4473H86.767V61.8653H83.3097L83.3134 63.4473Z" fill="#6A6A6A"/>
            <path id="Vector_5" d="M9.59924 7.82791C9.20156 7.82828 8.81268 7.71121 8.48174 7.49145C8.1508 7.2717 7.89263 6.95915 7.73985 6.59326C7.58707 6.22736 7.54652 5.82451 7.62334 5.43567C7.70015 5.04682 7.89088 4.68943 8.17144 4.40855C8.45199 4.12767 8.80978 3.9359 9.19961 3.85755C9.58944 3.7792 9.99383 3.81781 10.3617 3.96837C10.7296 4.11892 11.0444 4.37465 11.2665 4.70343C11.4885 5.0322 11.6078 5.41922 11.6093 5.81553C11.6103 6.34794 11.3991 6.85898 11.0222 7.23633C10.6453 7.61368 10.1335 7.82643 9.59924 7.82791ZM9.59924 4.1012C9.25653 4.1001 8.92121 4.20049 8.63584 4.38962C8.35048 4.57876 8.12793 4.84814 7.99644 5.16353C7.86495 5.47893 7.83043 5.82612 7.8973 6.16108C7.96416 6.49605 8.12938 6.80367 8.37198 7.0449C8.61458 7.28614 8.92363 7.45011 9.2599 7.51602C9.59618 7.58192 9.94451 7.54684 10.2607 7.41512C10.5769 7.2834 10.8467 7.06102 11.0359 6.77623C11.2251 6.49144 11.3251 6.15705 11.3232 5.81553C11.3207 5.36098 11.1382 4.92578 10.8153 4.60471C10.4924 4.28364 10.0554 4.10267 9.59924 4.1012Z" fill="#6A6A6A"/>
            <path id="Vector_6" d="M83.3134 47.0032H83.033V59.8603H83.3134V47.0032Z" fill="#6A6A6A"/>
            <path id="Vector_7" d="M85.1832 47.0032H84.9028V59.8603H85.1832V47.0032Z" fill="#6A6A6A"/>
            <path id="Vector_8" d="M87.0531 47.0032H86.7726V59.8603H87.0531V47.0032Z" fill="#6A6A6A"/>
            <path id="Vector_9" d="M2.26015 43.0901H1.97968V59.8603H2.26015V43.0901Z" fill="#6A6A6A"/>
            <path id="Vector_10" d="M4.12996 43.0901H3.84949V52.4069H4.12996V43.0901Z" fill="#6A6A6A"/>
            <path id="Vector_11" d="M5.99983 43.0901H5.71936V59.8603H5.99983V43.0901Z" fill="#6A6A6A"/>
            </g>
            <rect :class="{'disabled': disabled}"  id="Mtare 4" x="20.022" y="-2" width="48" height="54" :fill="'url(#pattern'+symbol+')'"/>
            <rect id="Rectangle 15" x="10.022" y="47" width="69" height="14" :fill="disabled ? 'rgba(255,255,255,0.3)' : '#FBC115'"/>
            <text :class="{'disabled': disabled}" id="name" fill="#091016" xml:space="preserve" style="white-space: pre; text-transform: capitalize" font-family="Roboto" font-size="10" font-weight="bold" letter-spacing="0em" text-anchor="middle" x="50%" y="57.4915">{{ name }}</text>
            <text :class="{'disabled': disabled}" id="1,084" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="10" font-weight="bold" letter-spacing="0em" text-anchor="middle" x="50%"  y="71.8794">{{ quantity }}</text>
            </g>
            
            <defs>
            <pattern :id="'pattern'+symbol" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use :xlink:href="'#' + symbol" transform="translate(-0.0197917) scale(0.00104167 0.000925926)"/>
            </pattern>
            <image :id="symbol" data-name="resourse.png" width="998" height="1080" :href="img"/>
            </defs>
        </svg>
    </div>
</template>

<script>
import CONSTANTS from '../../constants.json'
export default {
    props: ['symbol', 'quantity', 'disabled', 'selected'],
    computed: {
        img() {
            return CONSTANTS.economicPolicy.assets[this.symbol].img
        },
        name() {
            return CONSTANTS.economicPolicy.assets[this.symbol].name
        }
    }
}
</script>

<style scoped>
.disabled {
    filter: saturate(0);
}
.item {
    margin: 10px;
    width: 90px;
    display: inline-block;
}
</style>