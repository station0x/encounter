<template>
    <div class="hud-wrapper">
        <b-button v-if="isAdmin" @click="$router.push({ name: 'Dashboard'})" class="admin-btn">ADMIN DASHBOARD</b-button>
        <svg viewBox="0 0 499 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="HUD">
            <g id="Mask Group" @click="openProfile" style="cursor: pointer">
            <mask id="mask0_363_1285" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="26" y="30" width="55" height="51">
            <path id="Vector" d="M80.8543 42.0941V71.94L80.835 71.9672L74.8192 80.9419H32.8329L32.8023 80.9099L26.7849 74.924V42.0941L26.8187 42.062L38.8164 30.124H47.8844L47.9165 30.156L50.8753 33.1001H71.8137L71.846 33.1321L80.8543 42.0941Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_363_1285)">
            <rect id="image 2" x="24.5762" y="28.8169" width="57.8921" height="54.7178" fill="url(#pattern-hud-profile)"/>
            </g>
            </g>
            <g id="my profile frame">
            <path id="Vector_2" d="M84 36.0537V77.9254L83.969 77.972L77.8502 87H50.39L50.3329 86.9454L47.3592 84.019H26.1418L26.0863 83.9644L23 80.9273V36.0537L23.0539 35.999L26.0308 33.0727V30.0917L26.0863 30.0371L29.1726 27H56.6051L56.6622 27.0546L59.6375 29.9825H77.8225L77.8779 30.0371L84 36.0537ZM83.6213 77.8131V36.2078L77.6706 30.355H59.4825L59.427 30.3004L56.4517 27.3724H29.3277L26.4078 30.2458V33.2268L26.3539 33.2814L23.377 36.2078V80.7732L26.2968 83.6449H47.5142L47.5697 83.6996L50.5451 86.6275H77.6381L83.6213 77.8131Z" fill="white"/>
            <path id="Vector_3" d="M81 42.013V71.9658L80.9808 71.9931L74.9727 81H33.0402L33.0096 80.9678L27 74.9605V42.013L27.0338 41.9808L39.016 30H48.0724L48.1045 30.0321L51.0595 32.9867H71.9711L72.0033 33.0188L81 42.013ZM80.7748 71.8982V42.1062L71.8777 33.2119H50.9662L50.9341 33.1781L47.9791 30.2235H39.1094L27.2252 42.1062V74.8721L33.1351 80.7796H74.8521L80.7748 71.8982Z" fill="white"/>
            <path id="Vector_4" d="M49 82L53 85V83.5L50.9989 82H49Z" fill="white"/>
            <path id="Vector_5" d="M49 28L53 32V30L50.9989 28H49Z" fill="white"/>
            <path id="Vector_6" d="M34 28L29.6667 33H28L32.3318 28H34ZM29.5807 32.7608L33.5022 28.2392H32.4192L28.4962 32.7608H29.5807Z" fill="white"/>
            <path id="Vector_7" d="M76 83.7328V84H54.4627L54.4318 83.9618L53 82.1889L53.1512 82L54.5537 83.7328H76Z" fill="white"/>
            <path id="Vector_8" d="M76 34.8201L75.8493 35L73.0227 31.6294H58.7423L58.7116 31.5909L57.3152 29.9239H54.4579L54.4271 29.8872L53 28.1817L53.1507 28L54.5486 29.6669H57.4044L57.4351 29.7055L58.8315 31.3724H73.1119L73.1427 31.4091L76 34.8201Z" fill="white"/>
            <path id="Vector_9" d="M66 31H61V32H66V31Z" fill="white"/>
            <path id="Vector_10" d="M76 83H72V84H76V83Z" fill="white"/>
            <path id="Vector_11" d="M30 80.8383L29.8313 81L25 76.4166V43H25.241V76.3219L30 80.8383Z" fill="white"/>
            </g>
            <g id="Rank frame">
            <path id="Vector_12" d="M308.781 86.5001H299.22L299.191 86.4712L297.639 84.9349H200.364L198.783 86.5001H189.222L189.192 86.4712L186.003 83.3118V73.8422L186.032 73.8132L187.584 72.277V69.2248L186.003 67.6596V58.19L186.032 58.161L189.222 55.0024H198.783L198.812 55.0306L200.364 56.5677H297.639L299.22 55.0024H308.781L308.81 55.0306L312 58.19V67.6596L311.971 67.6885L310.42 69.2248V72.277L312 73.8422V83.3118L311.971 83.3407L308.781 86.5001ZM299.299 86.3045H308.702L311.806 83.2311V73.9181L310.225 72.3529V69.1442L310.254 69.1153L311.806 67.5789V58.2659L308.702 55.1934H299.299L297.718 56.7586H200.285L200.255 56.7297L198.704 55.1934H189.301L186.198 58.2659V67.5789L187.778 69.1442V72.3529L187.749 72.3818L186.198 73.9181V83.2311L189.301 86.3045H198.704L200.285 84.7392H297.718L297.747 84.7675L299.299 86.3045Z" fill="url(#paint0_linear_363_1285)"/>
            <path id="Vector_13" d="M307.184 83.3306H190.816L190.798 83.3126L189.2 81.7309V59.7686L189.218 59.7522L190.816 58.1689H307.184L307.202 58.1869L308.8 59.7686V81.7309L308.782 81.7474L307.184 83.3306ZM190.865 83.2125H307.135L308.681 81.6816V59.8179L307.135 58.2871H190.865L189.319 59.8179V81.6816L190.865 83.2125Z" fill="url(#paint1_linear_363_1285)"/>
            <path id="Vector_14" d="M190.109 57.5043H189.2V56.6035H190.109V57.5043ZM189.319 57.3861H189.991V56.7217H189.319V57.3861Z" fill="#FBC115" fill-opacity="0.2"/>
            <path id="Vector_15" d="M191.69 57.5043H190.781V56.6035H191.69V57.5043ZM190.899 57.3861H191.571V56.7217H190.899V57.3861Z" fill="#FBC115" fill-opacity="0.4"/>
            <path id="Vector_16" d="M193.27 57.5043H192.361V56.6035H193.27V57.5043ZM192.48 57.3861H193.151V56.7217H192.48V57.3861Z" fill="#FBC115" fill-opacity="0.6"/>
            <path id="Vector_17" d="M194.85 57.5043H193.942V56.6035H194.85V57.5043ZM194.06 57.3861H194.732V56.7217H194.06V57.3861Z" fill="#FBC115" fill-opacity="0.8"/>
            <path id="Vector_18" d="M196.431 57.5043H195.522V56.6035H196.431V57.5043ZM195.641 57.3861H196.312V56.7217H195.641V57.3861Z" fill="#FBC115" fill-opacity="0.9"/>
            <path id="Vector_19" d="M198.011 57.5043H197.103V56.6035H198.011V57.5043ZM197.221 57.3861H197.893V56.7217H197.221V57.3861Z" fill="#FBC115"/>
            <path id="Vector_20" d="M300.897 57.5043H299.989V56.6035H300.897V57.5043ZM300.107 57.3861H300.779V56.7217H300.107V57.3861Z" fill="#FBC115"/>
            <path id="Vector_21" d="M302.478 57.5043H301.569V56.6035H302.478V57.5043ZM301.688 57.3861H302.359V56.7217H301.688V57.3861Z" fill="#FBC115" fill-opacity="0.9"/>
            <path id="Vector_22" d="M304.058 57.5043H303.15V56.6035H304.058V57.5043ZM303.268 57.3861H303.94V56.7217H303.268V57.3861Z" fill="#FBC115" fill-opacity="0.8"/>
            <path id="Vector_23" d="M305.639 57.5043H304.73V56.6035H305.639V57.5043ZM304.849 57.3861H305.52V56.7217H304.849V57.3861Z" fill="#FBC115" fill-opacity="0.6"/>
            <path id="Vector_24" d="M307.219 57.5043H306.31V56.6035H307.219V57.5043ZM306.429 57.3861H307.101V56.7217H306.429V57.3861Z" fill="#FBC115" fill-opacity="0.4"/>
            <path id="Vector_25" d="M308.8 57.5043H307.891V56.6035H308.8V57.5043ZM308.009 57.3861H308.681V56.7217H308.009V57.3861Z" fill="#FBC115" fill-opacity="0.2"/>
            <path id="Vector_26" d="M190.193 84.1131H189.235L189.218 84.095L187.536 82.4297H188.494L188.511 82.4476L190.193 84.1131ZM189.284 83.9949H189.907L188.445 82.5478H187.822L189.284 83.9949Z" fill="#FBC115"/>
            <path id="Vector_27" d="M308.765 84.1131H307.807L309.506 82.4297H310.464L308.765 84.1131ZM308.093 83.9949H308.716L310.178 82.5478H309.555L308.093 83.9949Z" fill="#FBC115"/>
            <path id="Vector_28" d="M186.099 69.1851L186.889 69.9677V71.5329L186.099 72.3155V69.1851Z" fill="#FBC115"/>
            <path id="Vector_29" d="M311.901 69.1851L311.111 69.9677V71.5329L311.901 72.3155V69.1851Z" fill="#FBC115"/>
            </g>
            <foreignObject class="hud-elo-text" x="205" y="59">
                <span class="saf-elo-text">ELO</span>
            </foreignObject>
            <foreignObject class="hud-elo-number" x="272" y="55.3">
                <span class="saf-elo-number">{{ elo }}</span>
            </foreignObject>
            <g id="my-user-info" @click="openProfile" style="cursor: pointer">
            <foreignObject class="hud-username" x="95" y="38">
                <span style="position: fixed">{{ playerAlias }}</span>
            </foreignObject>
            <foreignObject class="hud-address" x="95" y="55">
                <span style="position: fixed">{{ formattedAddress }}</span>
                </foreignObject>
            </g>
            <g id="Hud Frame">
            <path id="Vector_30" d="M245.637 98.7444H11.3251L0.4594 91.4998V80.3241L4.1346 76.6485V34.1878L4.06844 34.1198L0.4594 30.5122V16.0009L4.00045 12.4595H197.886L252.854 49.109L253.313 48.8627L198.025 12H3.80934L3.74135 12.0662L0 15.8098V30.7033L0.0661536 30.7713L3.6752 34.379V76.4574L0 80.133V91.7461L11.1855 99.2039H245.828L245.895 99.1377L253.313 91.7185L252.854 91.5274L245.637 98.7444Z" fill="url(#paint2_linear_363_1285)"/>
            <path id="Vector_31" d="M15.0261 16.1352H52.6895L56.3647 19.8108H153.949L154.015 19.7447L157.624 16.1352H183.183L230.96 49.2157H245.637L249.178 52.7572L249.638 52.5661L249.57 52.4981L245.828 48.7563H231.104L183.326 15.6758H157.433L157.366 15.7419L153.757 19.3514H56.5558L52.8806 15.6758H14.8349L14.767 15.7419L7.3504 23.1612V88.0688L7.45331 88.1405L18.5359 95.5284H161.299L161.365 95.4623L164.974 91.8528H245.828L245.895 91.7867L249.638 88.0431L249.178 87.8519L245.637 91.3934H164.783L164.717 91.4595L161.108 95.069H18.6755L7.8098 87.8244V23.3523L15.0261 16.1352Z" fill="url(#paint3_linear_363_1285)"/>
            <path id="Vector_32" d="M256.988 48.8626L245.803 41.4048H216.405L198.088 28.5806L197.823 28.9592L216.258 41.8642H245.663L256.529 49.1089" fill="white"/>
            <g id="yellow-dashes-right" class="blinking-element">
                <path id="Vector_33" d="M238.239 93.3232H240.354V97.2763H238.239V93.3232Z" fill="#FBC115"/>
                <path id="Vector_34" d="M234.564 93.3232H236.679V97.2763H234.564V93.3232Z" fill="#FBC115" fill-opacity="0.9"/>
                <path id="Vector_35" d="M230.889 93.3232H233.004V97.2763H230.889V93.3232Z" fill="#FBC115" fill-opacity="0.8"/>
                <path id="Vector_36" d="M227.214 93.3232H229.329V97.2763H227.214V93.3232Z" fill="#FBC115" fill-opacity="0.7"/>
                <path id="Vector_37" d="M223.538 93.3232H225.653V97.2763H223.538V93.3232Z" fill="#FBC115" fill-opacity="0.6"/>
                <path id="Vector_38" d="M219.863 93.3232H221.978V97.2763H219.863V93.3232Z" fill="#FBC115" fill-opacity="0.5"/>
                <path id="Vector_39" d="M216.188 93.3232H218.303V97.2763H216.188V93.3232Z" fill="#FBC115" fill-opacity="0.4"/>
                <path id="Vector_40" d="M212.513 93.3232H214.628V97.2763H212.513V93.3232Z" fill="#FBC115" fill-opacity="0.3"/>
                <path id="Vector_41" d="M208.838 93.3232H210.953V97.2763H208.838V93.3232Z" fill="#FBC115" fill-opacity="0.2"/>
                <path id="Vector_42" d="M205.162 93.3232H207.277V97.2763H205.162V93.3232Z" fill="#FBC115" fill-opacity="0.1"/>
                <path id="Vector_43" d="M201.487 93.3232H203.602V97.2763H201.487V93.3232Z" fill="#FBC115" fill-opacity="0.05"/>
            </g>
            <path id="Vector_44" d="M253.363 98.7444H487.675L498.541 91.4998V80.3241L494.865 76.6485V34.1878L494.932 34.1198L498.541 30.5122V16.0009L495 12.4595H301.114L246.146 49.109L245.687 48.8627L300.975 12H495.191L495.259 12.0662L499 15.8098V30.7033L498.934 30.7713L495.325 34.379V76.4574L499 80.133V91.7461L487.814 99.2039H253.171L253.105 99.1377L245.687 91.7185L246.146 91.5274L253.363 98.7444Z" fill="url(#paint4_linear_363_1285)"/>
            <path id="Vector_45" d="M483.974 16.4595H446.311L442.635 20.1351H345.051L344.985 20.0689L341.376 16.4595H315.817L268.04 49.54H253.363L249.822 53.0814L249.362 52.8903L249.43 52.8223L253.172 49.0805H267.896L315.674 16H341.567L341.634 16.0662L345.243 19.6756H442.444L446.119 16H484.165L484.233 16.0662L491.65 23.4854V88.393L491.547 88.4647L480.464 95.8527H337.701L337.635 95.7865L334.026 92.177H253.172L253.105 92.1109L249.362 88.3673L249.822 88.1761L253.363 91.7176H334.217L334.283 91.7838L337.892 95.3932H480.324L491.19 88.1486V23.6765L483.974 16.4595Z" fill="url(#paint5_linear_363_1285)"/>
            <path id="Vector_46" d="M242.012 48.8626L253.197 41.4048H282.597L300.912 28.5806L301.177 28.9592L282.742 41.8642H253.337L242.471 49.1089" fill="white"/>
            <g id="yellow-dashes-right" class="blinking-element">
                <path id="Vector_47" d="M260.755 97.2763H258.637V93.3232H260.752L260.755 97.2763Z" fill="#FBC115"/>
                <path id="Vector_48" d="M264.431 97.2763H262.312V93.3232H264.427L264.431 97.2763Z" fill="#FBC115" fill-opacity="0.9"/>
                <path id="Vector_49" d="M268.106 97.2763H265.987V93.3232H268.102L268.106 97.2763Z" fill="#FBC115" fill-opacity="0.8"/>
                <path id="Vector_50" d="M271.781 97.2763H269.662V93.3232H271.777L271.781 97.2763Z" fill="#FBC115" fill-opacity="0.7"/>
                <path id="Vector_51" d="M275.456 97.2763H273.337V93.3232H275.452L275.456 97.2763Z" fill="#FBC115" fill-opacity="0.6"/>
                <path id="Vector_52" d="M279.131 97.2763H277.013V93.3232H279.128L279.131 97.2763Z" fill="#FBC115" fill-opacity="0.5"/>
                <path id="Vector_53" d="M282.806 97.2763H280.688V93.3232H282.803L282.806 97.2763Z" fill="#FBC115" fill-opacity="0.4"/>
                <path id="Vector_54" d="M286.482 97.2763H284.363V93.3232H286.478L286.482 97.2763Z" fill="#FBC115" fill-opacity="0.3"/>
                <path id="Vector_55" d="M290.157 97.2763H288.038V93.3232H290.153L290.157 97.2763Z" fill="#FBC115" fill-opacity="0.2"/>
                <path id="Vector_56" d="M293.832 97.2763H291.713V93.3232H293.828L293.832 97.2763Z" fill="#FBC115" fill-opacity="0.1"/>
                <path id="Vector_57" d="M297.507 97.2763H295.389V93.3232H297.504L297.507 97.2763Z" fill="#FBC115" fill-opacity="0.05"/>
            </g>
            <path id="Vector_58" d="M196.118 15.9053H190.605V17.7431L234.707 47.148H242.058V45.3102L199.793 15.9053H196.118Z" fill="url(#paint6_linear_363_1285)"/>
            <path id="Vector_59" d="M302.882 15.9053H308.395V17.7431L264.293 47.148H256.942V45.3102L299.207 15.9053H302.882Z" fill="url(#paint7_linear_363_1285)"/>
            </g>
            <g @click="openSettings()" id="settings icon" style="cursor: pointer">
                <rect id="Rectangle 87" x="463" y="29" width="14" height="14" fill="#060A0E" fill-opacity="0"/>
                <path id="settings"  d="M474.659 36.8203C474.683 36.6215 474.702 36.4227 474.702 36.2115C474.702 36.0003 474.683 35.8016 474.659 35.6028L475.969 34.5779C476.087 34.4847 476.118 34.317 476.044 34.1804L474.801 32.0312C474.727 31.8945 474.559 31.8448 474.423 31.8945L472.876 32.5157C472.553 32.2672 472.205 32.0622 471.826 31.9069L471.59 30.2609C471.571 30.1118 471.441 30 471.286 30H468.801C468.646 30 468.515 30.1118 468.497 30.2609L468.261 31.9069C467.882 32.0622 467.534 32.2734 467.211 32.5157L465.664 31.8945C465.521 31.8386 465.36 31.8945 465.285 32.0312L464.043 34.1804C463.962 34.317 464 34.4847 464.118 34.5779L465.428 35.6028C465.403 35.8016 465.385 36.0066 465.385 36.2115C465.385 36.4165 465.403 36.6215 465.428 36.8203L464.118 37.8452C464 37.9383 463.969 38.1061 464.043 38.2427L465.285 40.3919C465.36 40.5286 465.528 40.5783 465.664 40.5286L467.211 39.9074C467.534 40.1559 467.882 40.3609 468.261 40.5161L468.497 42.1622C468.515 42.3113 468.646 42.4231 468.801 42.4231H471.286C471.441 42.4231 471.571 42.3113 471.59 42.1622L471.826 40.5161C472.205 40.3609 472.553 40.1497 472.876 39.9074L474.423 40.5286C474.565 40.5845 474.727 40.5286 474.801 40.3919L476.044 38.2427C476.118 38.1061 476.087 37.9383 475.969 37.8452L474.659 36.8203ZM470.043 38.3856C468.845 38.3856 467.869 37.4104 467.869 36.2115C467.869 35.0127 468.845 34.0375 470.043 34.0375C471.242 34.0375 472.217 35.0127 472.217 36.2115C472.217 37.4104 471.242 38.3856 470.043 38.3856Z" fill="#FBC115"/>
            </g>
            <g @click="goHome()" id="home icon" style="cursor: pointer">
                <rect id="Rectangle 86" x="463" y="49" width="14" height="14" fill="#060A0E" fill-opacity="0.01"/>
                <path id="home"  d="M470.212 50C470.212 50 466.369 53.317 464.222 55.1133C464.153 55.1729 464.098 55.2461 464.06 55.3283C464.022 55.4105 464.001 55.4998 464 55.5904C464 55.7551 464.065 55.9131 464.182 56.0296C464.298 56.1461 464.456 56.2115 464.621 56.2115H465.863V60.5596C465.863 60.7244 465.929 60.8824 466.045 60.9988C466.162 61.1153 466.32 61.1808 466.485 61.1808H468.348C468.513 61.1808 468.671 61.1153 468.787 60.9988C468.904 60.8824 468.969 60.7244 468.969 60.5596V58.075H471.454V60.5596C471.454 60.7244 471.519 60.8824 471.636 60.9988C471.752 61.1153 471.91 61.1808 472.075 61.1808H473.938C474.103 61.1808 474.261 61.1153 474.378 60.9988C474.494 60.8824 474.56 60.7244 474.56 60.5596V56.2115H475.802C475.967 56.2115 476.125 56.1461 476.241 56.0296C476.358 55.9131 476.423 55.7551 476.423 55.5904C476.422 55.498 476.4 55.4071 476.359 55.3244C476.318 55.2418 476.258 55.1696 476.185 55.1133C474.053 53.317 470.212 50 470.212 50Z" fill="#FBC115"/>
            </g>
            <rect id="wide 1" x="176" width="148" height="42" fill="url(#pattern-1-hud)"/>
            <g id="stars icon">
            <path id="Vector_60" d="M199.905 66.6431C199.871 66.5405 199.783 66.4665 199.674 66.4493L198.7 66.3067L198.263 65.4232C198.215 65.3263 198.115 65.2637 198.007 65.2637C197.899 65.2637 197.799 65.3264 197.751 65.4233L197.314 66.3069L196.34 66.4494C196.231 66.4665 196.143 66.5407 196.109 66.6432C196.075 66.7458 196.103 66.8599 196.18 66.9368L196.887 67.6237L196.722 68.5956C196.702 68.7039 196.747 68.8122 196.833 68.875C196.921 68.9406 197.038 68.9491 197.135 68.8978L198.007 68.4387L198.879 68.8976C198.922 68.9204 198.968 68.929 199.013 68.929C199.073 68.929 199.13 68.9119 199.181 68.8749C199.27 68.8121 199.312 68.7038 199.292 68.5955L199.127 67.6235L199.834 66.9367C199.911 66.8597 199.939 66.7457 199.905 66.6431L199.905 66.6431Z" fill="#FBC115"/>
            <path id="Vector_61" d="M201.114 68.6809C201.031 68.6296 200.925 68.6267 200.837 68.6723L198.007 70.1173L195.177 68.6723C195.088 68.6267 194.983 68.6296 194.9 68.6809C194.815 68.735 194.763 68.8262 194.763 68.926V70.6874C194.763 70.7957 194.823 70.8926 194.917 70.9411L197.878 72.4517C197.918 72.4745 197.961 72.483 198.007 72.483C198.052 72.483 198.095 72.4745 198.138 72.4517L201.096 70.9411C201.19 70.8927 201.25 70.7957 201.25 70.6874V68.926C201.25 68.8262 201.199 68.735 201.114 68.6809H201.114Z" fill="#FBC115"/>
            <path id="Vector_62" d="M201.114 72.1981C201.031 72.1468 200.925 72.1411 200.837 72.1866L198.007 73.6318L195.177 72.1868C195.088 72.1412 194.983 72.1468 194.9 72.1982C194.815 72.2495 194.763 72.3408 194.763 72.4405V74.2047C194.763 74.3102 194.823 74.4099 194.917 74.4583L197.878 75.9689C197.918 75.9888 197.961 76.0002 198.007 76.0002C198.052 76.0002 198.095 75.9888 198.138 75.9689L201.096 74.4583C201.19 74.4099 201.25 74.3102 201.25 74.2047V72.4405C201.25 72.3406 201.199 72.2494 201.114 72.1981L201.114 72.1981Z" fill="#FBC115"/>
            </g>
            <g @click="openInventory()"  id="Inventory" style="cursor: pointer">
            <rect width="35" height="40" x="406" y="35" style="cursor: pointer; fill: transaprent" fill="transparent"/>    
            <path id="Inventory_2" d="M407.393 70.0156H406.093L406.323 63.3156H407.623L407.393 70.0156ZM409.2 70.0156H407.9L408.08 65.0356H409.38L409.2 70.0156ZM408.67 67.3456L408.14 66.1556L410.71 65.0356L411.11 66.2756L408.67 67.3456ZM411.83 70.0156H410.53L410.7 65.0356H412L411.83 70.0156ZM412.841 70.0156L412.351 69.3956L416.381 67.6456L416.371 69.0056L414.051 70.0156H412.841ZM416.371 69.0056L415.061 69.5756L415.211 65.0356H416.511L416.371 69.0056ZM413.641 70.0156H412.351L412.521 65.0356H413.821L413.641 70.0156ZM420.705 65.0256L420.675 66.0556L420.635 67.4356L418.215 68.4656V68.7456H418.625L420.635 67.8856L420.595 69.2556L418.965 70.0156H418.165H417.235H416.865L417.035 65.0256H417.625H418.335H420.705ZM418.295 66.3256L418.265 67.0956L419.555 66.5456V66.3256H418.295ZM422.345 70.0156H421.045L421.225 65.0356H422.525L422.345 70.0156ZM421.815 67.3456L421.285 66.1556L423.855 65.0356L424.255 66.2756L421.815 67.3456ZM424.975 70.0156H423.675L423.845 65.0356H425.145L424.975 70.0156ZM426.016 70.0156L425.526 69.3956L428.486 68.1356L428.936 69.2956L427.236 70.0156H426.016ZM426.046 66.3256V65.0356H428.816L428.786 66.3256H426.046ZM426.826 70.0156H425.526L425.756 63.3156H427.056L426.826 70.0156ZM430.418 70.0156H429.128L429.298 65.0356H430.598L430.418 70.0156ZM433.048 70.0156H431.748L431.918 65.0356H433.218L433.048 70.0156ZM429.978 65.0356H432.528V66.3256H429.978V65.0356ZM429.858 68.7156H432.408V70.0156H429.858V68.7156ZM434.632 67.3456L434.112 66.1556L436.672 65.0356L437.082 66.2756L434.632 67.3456ZM434.812 70.0156H433.512L433.692 65.0356H434.982L434.812 70.0156ZM441.034 71.3656L439.734 71.9356L439.994 65.0856H441.294L441.034 71.3656ZM438.524 70.0656H437.234L437.404 65.0856H438.704L438.524 70.0656ZM437.744 70.0656L437.254 69.4556L440.514 68.0456V69.4056L438.954 70.0656H437.744ZM438.274 72.5756L437.744 71.3856L440.314 70.2656L440.714 71.5056L438.274 72.5756Z" fill="#FBC115"/>
            <g id="Group 5">
            <path id="Vector_63" d="M421.6 45.8H426.4C426.798 45.8 427.179 45.642 427.461 45.3608C427.742 45.0794 427.9 44.6978 427.9 44.3V40.1H426.553L426.4 39.524C426.274 39.0831 426.008 38.6955 425.641 38.4203C425.274 38.1451 424.828 37.9975 424.369 38H423.631C423.172 37.9975 422.726 38.1451 422.359 38.4203C421.992 38.6955 421.726 39.0831 421.6 39.524L421.447 40.1H420.1V44.3C420.1 44.6978 420.258 45.0793 420.539 45.3608C420.821 45.642 421.202 45.8 421.6 45.8H421.6ZM422.767 39.8539C422.82 39.6658 422.934 39.5003 423.09 39.3823C423.245 39.2643 423.435 39.2003 423.631 39.1999H424.369C424.564 39.2003 424.755 39.2643 424.91 39.3823C425.066 39.5003 425.179 39.6658 425.233 39.8539L425.305 40.0999H422.695L422.767 39.8539Z" fill="#FBC115"/>
            <path id="Vector_64" d="M420.1 49.1001H427.9V50.3001H420.1V49.1001Z" fill="#FBC115"/>
            <path id="Vector_65" d="M426.7 52.0999C426.7 52.2656 426.566 52.3999 426.4 52.3999C426.234 52.3999 426.1 52.2656 426.1 52.0999V50.8999H420.1V53.5999H427.9V50.8999H426.7V52.0999Z" fill="#FBC115"/>
            <path id="Vector_66" d="M416.5 47.9272C416.081 47.9981 415.7 48.2149 415.426 48.5394C415.151 48.8639 415 49.2751 415 49.7002V50.3002H416.5V47.9272Z" fill="#FBC115"/>
            <path id="Vector_67" d="M416.5 50.8999H415V53.2999C415 53.7281 415.153 54.1422 415.432 54.4676C415.71 54.7932 416.095 55.0088 416.518 55.0759C416.507 54.9843 416.501 54.8922 416.5 54.7999L416.5 50.8999Z" fill="#FBC115"/>
            <path id="Vector_68" d="M431.5 54.7999C431.499 54.8922 431.493 54.9843 431.482 55.0759C431.905 55.0088 432.29 54.7932 432.568 54.4676C432.847 54.1422 433 53.7281 433 53.2999V50.8999H431.5L431.5 54.7999Z" fill="#FBC115"/>
            <path id="Vector_69" d="M431.5 47.9272V50.3002H433V49.7002C433 49.2751 432.849 48.8639 432.574 48.5395C432.3 48.2149 431.919 47.9981 431.5 47.9273V47.9272Z" fill="#FBC115"/>
            <path id="Vector_70" d="M429.1 40.1001H428.5V44.3001C428.5 44.8571 428.279 45.3912 427.885 45.785C427.491 46.1788 426.957 46.4001 426.4 46.4001H421.6C421.043 46.4001 420.509 46.1788 420.115 45.785C419.721 45.3912 419.5 44.8571 419.5 44.3001V40.1001H418.9C418.423 40.1001 417.965 40.2897 417.627 40.6272C417.29 40.9649 417.1 41.4226 417.1 41.9001V54.8001C417.1 55.2775 417.29 55.7353 417.627 56.0729C417.965 56.4104 418.423 56.6001 418.9 56.6001H429.1C429.577 56.6001 430.035 56.4104 430.373 56.0729C430.71 55.7353 430.9 55.2775 430.9 54.8001V41.9001C430.9 41.4226 430.71 40.9649 430.373 40.6272C430.035 40.2897 429.577 40.1001 429.1 40.1001ZM428.5 53.9001C428.5 53.9796 428.468 54.056 428.412 54.1122C428.356 54.1685 428.28 54.2001 428.2 54.2001H419.8C419.634 54.2001 419.5 54.0658 419.5 53.9001V48.8001C419.5 48.6344 419.634 48.5001 419.8 48.5001H428.2C428.28 48.5001 428.356 48.5317 428.412 48.5879C428.468 48.6442 428.5 48.7205 428.5 48.8001V53.9001Z" fill="#FBC115"/>
            </g>
            </g>
            <g @click="openRewards()" id="Rewards" style="cursor: pointer">
            <rect width="35" height="40" x="356" y="35" style="cursor: pointer; fill: transaprent" fill="transparent"/>
            <path id="Rewards_2" d="M361.927 63.3256H362.477L362.357 66.7656L362.347 66.7756V66.8656L361.147 67.9056L362.257 68.9956V70.0256H361.217L359.667 68.4256L359.617 70.0156H358.317L358.557 63.3256H359.227H359.847H361.177H361.927ZM361.067 66.3056L361.127 64.6256H359.807L359.707 67.3956L361.067 66.3056ZM366.65 65.0256L366.62 66.0556L366.58 67.4356L364.16 68.4656V68.7456H364.57L366.58 67.8856L366.54 69.2556L364.91 70.0156H364.11H363.18H362.81L362.98 65.0256H363.57H364.28H366.65ZM364.24 66.3256L364.21 67.0956L365.5 66.5456V66.3256H364.24ZM370.49 65.0356H371.78L371.61 70.0156H370.31L370.49 65.0356ZM367.06 65.0356H368.36L368.19 70.0156H366.89L367.06 65.0356ZM370.31 70.0156L369.28 68.9456L368.18 70.0156V68.3256L369.34 67.2756L370.39 68.4256L370.31 70.0156ZM375.81 69.9856H374.51L374.62 65.0056H375.92L375.81 69.9856ZM373.27 69.9856H371.97L372.14 65.0056H373.44L373.27 69.9856ZM372.48 69.9856V68.9756L375.03 67.8756V69.2256L373.29 69.9856H372.48ZM372.67 65.0056H375.21V66.3056H372.67V65.0056ZM377.316 67.3456L376.796 66.1556L379.356 65.0356L379.766 66.2756L377.316 67.3456ZM377.496 70.0156H376.196L376.376 65.0356H377.666L377.496 70.0156ZM381.208 70.0156H379.908L380.088 65.0356H381.388L381.208 70.0156ZM383.738 70.0156H382.438L382.668 63.3156H383.968L383.738 70.0156ZM380.438 70.0156L379.948 69.3956L382.988 68.0756V69.4356L381.648 70.0156H380.438ZM380.668 65.0356H383.218V66.3256H380.668V65.0356ZM384.876 66.3256V65.0356H388.036L387.996 66.3256H384.876ZM384.796 68.1756V66.8756H388.076L388.036 68.1756H384.796ZM385.446 68.1756H384.146L384.226 65.0356H385.526L385.446 68.1756ZM385.576 68.7156H387.516L387.386 70.0156H385.536H384.276H384.236L384.276 68.7156H385.576ZM387.976 70.0156H386.676L386.766 67.0156H388.066L387.976 70.0156Z" fill="#FBC115"/>
            <path id="Vector_71" d="M366.631 38.9962C366.513 39.008 366.402 39.057 366.313 39.1359C366.225 39.2148 366.163 39.3198 366.138 39.4357L365.111 44.0575H371.399V38.9963H366.685V38.9962C366.668 38.9954 366.65 38.9954 366.632 38.9962L366.631 38.9962ZM372.524 38.9962V44.0574H375.476V38.9962H372.524ZM376.601 38.9962L376.601 44.0574H382.886L381.859 39.4356L381.858 39.4355C381.831 39.3109 381.761 39.1996 381.661 39.1197C381.562 39.0399 381.438 38.9963 381.31 38.996L376.601 38.9962ZM365 45.1824V56.431C365 56.5801 365.058 56.7234 365.163 56.8294C365.268 56.9352 365.411 56.9951 365.56 56.9956H382.435C382.585 56.9962 382.729 56.937 382.835 56.8309C382.941 56.7249 383.001 56.5809 383 56.431V45.1824H376.602V48.7001C376.6 49.1273 376.142 49.3957 375.768 49.189L373.998 48.2134L372.233 49.189C371.859 49.3957 371.401 49.1273 371.4 48.7001V45.1824L365 45.1824ZM372.525 45.1824V47.7444L373.729 47.0796C373.898 46.9861 374.103 46.9861 374.273 47.0796L375.477 47.7444V45.1824H372.525ZM371.872 51.2785H376.125L376.125 51.2784C376.275 51.2779 376.419 51.3372 376.525 51.4432C376.631 51.5492 376.69 51.6932 376.69 51.8431V53.8437C376.69 53.9937 376.631 54.1375 376.525 54.2436C376.419 54.3496 376.275 54.409 376.125 54.4084H371.872C371.722 54.409 371.578 54.3496 371.472 54.2436C371.366 54.1377 371.307 53.9936 371.307 53.8437V51.8431C371.307 51.6932 371.366 51.5492 371.472 51.4432C371.578 51.3372 371.722 51.2779 371.872 51.2784L371.872 51.2785ZM372.433 52.4035V53.2835H375.563V52.4035H372.433Z" fill="#FBC115"/>
            </g>
            <circle v-if="Object.keys($store.getters.rewards).length > 0" r="4" cx="383" cy="40" fill="red"/>
            <foreignObject y="66" x="464" class="sound-btn-wrapper">
                <b-button v-if="soundisOn" @click="soundOff" class="sound-btn" icon-right="volume-high"></b-button>
                <b-button v-else-if="!soundisOn" @click="soundOn" class="sound-btn" icon-right="volume-off"></b-button>
            </foreignObject>
            </g>
            <defs>
                <pattern id="pattern-hud-profile" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#gravatar" transform="translate(0 -0.0290062) scale(0.0005)"/>
                </pattern>
                <pattern id="pattern-1-hud" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image1_363_1285" transform="translate(0 -0.019822) scale(0.000486855 0.00171558)"/>
                </pattern>
                <linearGradient id="paint0_linear_363_1285" x1="249.002" y1="55.0024" x2="249.002" y2="86.5001" gradientUnits="userSpaceOnUse">
                <stop stop-color="#555555" stop-opacity="0.82"/>
                <stop offset="1" stop-color="#9B9B9B"/>
                </linearGradient>
                <linearGradient id="paint1_linear_363_1285" x1="249" y1="58.1689" x2="249" y2="83.3306" gradientUnits="userSpaceOnUse">
                <stop stop-color="#555555" stop-opacity="0.82"/>
                <stop offset="1" stop-color="#9B9B9B"/>
                </linearGradient>
                <linearGradient id="paint2_linear_363_1285" x1="126.657" y1="12" x2="126.657" y2="99.2039" gradientUnits="userSpaceOnUse">
                <stop stop-color="#555555" stop-opacity="0.82"/>
                <stop offset="1" stop-color="#9B9B9B"/>
                </linearGradient>
                <linearGradient id="paint3_linear_363_1285" x1="128.494" y1="15.6758" x2="128.494" y2="95.5284" gradientUnits="userSpaceOnUse">
                <stop stop-color="#555555" stop-opacity="0.82"/>
                <stop offset="1" stop-color="#9B9B9B"/>
                </linearGradient>
                <linearGradient id="paint4_linear_363_1285" x1="372.343" y1="12" x2="372.343" y2="99.2039" gradientUnits="userSpaceOnUse">
                <stop stop-color="#555555" stop-opacity="0.82"/>
                <stop offset="1" stop-color="#9B9B9B"/>
                </linearGradient>
                <linearGradient id="paint5_linear_363_1285" x1="370.506" y1="16" x2="370.506" y2="95.8527" gradientUnits="userSpaceOnUse">
                <stop stop-color="#555555" stop-opacity="0.82"/>
                <stop offset="1" stop-color="#9B9B9B"/>
                </linearGradient>
                <linearGradient id="paint6_linear_363_1285" x1="216.331" y1="15.9053" x2="216.331" y2="47.148" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FBC115"/>
                <stop offset="1" stop-color="#5FB4A1" stop-opacity="0.11"/>
                </linearGradient>
                <linearGradient id="paint7_linear_363_1285" x1="282.669" y1="15.9053" x2="282.669" y2="47.148" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FBC115"/>
                <stop offset="1" stop-color="#5FB4A1" stop-opacity="0.11"/>
                </linearGradient>
                <image id="image1_363_1285" data-name="wide.png" width="2054" height="606" href="https://res.cloudinary.com/station0x/image/upload/v1644890557/encouter/wide_1_2_ffvc63.webp"/>
                <image id="gravatar" data-name="image.png" width="2000" height="2000" :href="$store.state.gravatar"/>
            </defs>

        </svg>
        <v-gravatar style="display: none" ref="gravatar" :email="$store.state.address" alt="Nobody" :size="82"/>
    </div>
</template>

<script>
import {Howl} from 'howler'
import axios from 'axios'
import Settings from '@/components/Settings.vue'
import Rewards from '@/components/Rewards.vue'
import Inventory from '@/components/Inventory.vue'
import CONSTANTS from '../../constants'

export default {
    data() {
        return {
            audio: new Howl({src: [require('../assets/sfx/background-music.webm')], loop: true}),
            soundisOn: undefined,
            gravatar: null
        }
    },
    computed: {
        formattedAddress() {
            return this.$store.state.address.slice(0, 5) + '...' + this.$store.state.address.slice(-4)
        },
        elo() {
            return this.$store.state.profile === undefined || this.$store.state.profile.elo === undefined ? '---' : this.$store.state.profile.elo
        },
        playerAlias() {
            if(this.$store.state.profile !== undefined){
                return this.$store.state.profile.playerAlias.length === 0 || this.$store.state.profile.playerAlias === undefined ? 'You' : this.$store.state.profile.playerAlias
            } else return 'You'
        },
        isAdmin() {
            return CONSTANTS.admins.includes(this.$store.state.address)
        }
    },
    methods: {
        soundOn() {
            this.audio.play()
            this.soundisOn = true
        },
        soundOff() {
            this.audio.pause()
            this.soundisOn = false
        },
        goHome() {
            if(this.$route.name !== "Home") this.$router.push({name: 'Home'})
        },
        openProfile() {
          let routeData = this.$router.resolve({ name: 'Player Profile', params: { playerAddress: this.$store.state.address } })
          window.open(routeData.href, '_self')
        },
        openSettings() {
            this.$buefy.modal.open({
                parent: this,
                component: Settings,
                canCancel: ['escape', 'button']
            })
        },
        async openRewards() {
            this.$buefy.modal.open({
                parent: this,
                component: Rewards,
                canCancel: ['escape', 'button']
            })
        },
        openInventory() {
            this.$store.dispatch('fetchInventory')
            this.$buefy.modal.open({
                parent: this,
                component: Inventory,
                canCancel: ['escape', 'button']
            })
        }
    },
    async beforeMount() {
        this.$store.dispatch('fetchProfile')
    },
    watch: {
        "$store.state.profile"() {
            this.$store.dispatch('refreshWithdrawnRewards');
        }
    },
    created () {
        // this.soundOn()
        this.$store.dispatch('refreshWithdrawnRewards');
    },
    mounted: function() {
        this.gravatar = this.$refs.gravatar.url
        this.$store.commit('setGravatar', this.$refs.gravatar.url)
    },
    beforeDestroy() {
        this.soundOff()
    }
}
</script>



<style scoped>
/* #gravatar {
    filter: grayscale(1);
} */
.hud-wrapper {
    width: 700px;
    position: absolute;
    top: 25px;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
    background-color: transparent;
    z-index: 2;
}
.hud-address {
    color: white;
    font-size: 11.5px;
    width: 80px;
    height: 50px;
    font-weight: 500;
    user-select: none;
}
.hud-username {
    font-family: 'Anson', 'Roboto';
    color: #FBC115;
    font-size: 16px;
    width: 80px;
    height: 20px;
    overflow: hidden;
    font-weight: 500;
    user-select: none;
}
.hud-elo {
    font-family: 'Roboto';
    color: #FBC115;
    font-weight: 500;
}
.hud-elo-text {
    font-family: 'Anson', 'Roboto';
    text-transform: uppercase;
    font-size: 17px;
    color: white;
    width: 40px;
    height: 20px;
    user-select: none;
}
.hud-elo-number {
    font-family: 'Anson', 'Roboto';
    text-transform: uppercase;
    font-size: 21px;
    color: #FBC115;
    width: 34px;
    height: 30px;
    user-select: none;
    letter-spacing: 1.5px;
}
.sound-btn {
    background: none;
    border: none;
    color: #FBC115;
    font-size: 16px;
    padding: 0 !important;
    width: 12px;
    height: 20px;
    position: fixed;
}
.sound-btn:hover {
    color: #face4c;
}
.sound-btn:focus:not(:active), .sound-btn.is-focused:not(:active) {
    color: #FBC115;
    box-shadow: none;
}
.sound-btn-wrapper {
    width: 12px;
    height: 40px;
}
.saf-elo-text {
    width: 40px;
    position: fixed;
    font-size: 18px;
}
.saf-elo-number {
    width: 40px;
    position: fixed;
    font-size: 21px;
}
@media not all and (min-resolution:.001dpcm)
{ @supports (-webkit-appearance:none) {

    .sound-btn {
        font-size: 21px;
        left: 1px;
        top: 2px;
    }

    @media screen and (max-width: 768px) {
    .saf-elo-text {
        width: 40px;
        position: fixed;
        font-size: 13px;
        top: -2px;
    }
    .saf-elo-number {
        width: 40px;
        position: fixed;
        font-size: 14px;
        left: -2px;
        top: -1px;
    }
    .sound-btn {
        font-size: 12px;
        top: -4px;
        left: -2px;
    }
    .hud-username {
        font-size: 12px;
    }
    .hud-address {
        font-size: 7px;
        margin-top: 10px;
    }
}
}}
@media screen and (max-width: 1500px) {
    .hud-wrapper {
        width: 70vw;
        max-width: 600px;
        position: absolute;
        top: 10px;
        left: 0; 
        right: 0; 
        margin-left: auto; 
        margin-right: auto; 
    }
}
.admin-btn {
    position: fixed;
    top: 20px;
    left: 20px;
}
</style>