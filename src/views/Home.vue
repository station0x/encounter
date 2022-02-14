<template>
    <div class="section onboarding">
        <div class="home-wrapper">
            <svg viewBox="0 0 864 548" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="assets">
                <rect class="float-on-hover" @click="$router.push({name: 'Lobby'})" style="cursor: pointer" id="deployment" x="272" width="312" height="313" fill="url(#pattern-d)"/>
                <rect id="refinery" style="cursor: not-allowed" y="165" width="257.804" height="258" fill="url(#pattern-r)"/>
                <rect id="market" style="cursor: not-allowed" x="603" y="86" width="260.521" height="261" fill="url(#pattern-m)"/>
                <rect id="factory" style="cursor: not-allowed" x="430" y="326" width="222" height="222" fill="url(#pattern-f)"/>
                <rect class="float-on-hover" @click="$router.push({name: 'Leaderboard'})" style="cursor: pointer" id="leaderboard" x="237" y="372" width="170" height="170" fill="url(#pattern-l)"/>
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
                    <image id="image0_315_27460" data-name="assets_04.png" width="1319" height="1319" href="https://res.cloudinary.com/station0x/image/upload/v1644817940/encouter/home/deployment_mpckni.png"/>
                    <image id="image1_315_27460" data-name="Dim-assets-_02(edit).png" width="1318" height="1319" href="https://res.cloudinary.com/station0x/image/upload/v1644817940/encouter/home/refinery_refbp8.png"/>
                    <image id="image2_315_27460" data-name="Dim-assets-_08(edit).png" width="1318" height="1319" href="https://res.cloudinary.com/station0x/image/upload/v1644817940/encouter/home/market_xl54h3.png"/>
                    <image id="image3_315_27460" data-name="Dim-assets-_11(edit).png" width="1318" height="1318" href="https://res.cloudinary.com/station0x/image/upload/v1644817940/encouter/home/factory_zel1u6.png"/>
                    <image id="image4_315_27460" data-name="assets_06.png" width="1318" height="1319" href="https://res.cloudinary.com/station0x/image/upload/v1644817940/encouter/home/leaderboard_pal3oo.png"/>
                </defs>
            </svg>
        </div>
    </div>
</template>


<style scoped>
.home-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    margin-top: -40px;
    /* -webkit-animation: float 6s ease-in-out infinite;
    animation: float 6s ease-in-out infinite; */
}
.float-on-hover {
    transition: all .5s ease-in-out;
}
.float-on-hover:hover {
    transform: translatey(-10px);
}
@media screen and (max-width: 1500px) {
    .home-wrapper {
        max-width: 900px;
        margin: 0 auto;
        margin-top: -40px;
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