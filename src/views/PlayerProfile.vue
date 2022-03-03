<template>
    <div>
        <div class="loader-wrapper" v-if="fetchingProfileLoader">
            <Loader v-model="fetchingProfileLoader"/>
        </div>
        <div v-else class="profile-wrapper">
            <center><h1 style="font-family: 'Anson'; font-size: 1.6em; letter-spacing: 5px; margin-bottom: 17px; margin-top: 10px">PROFILE</h1></center>
            <b-tabs class="profile-tabs" position="is-centered" v-model="activeTab">
                <b-tab-item label="Overview">
                    <text id="profile" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="17" letter-spacing="0.23em"><tspan x="282.061" y="12.084">PROFILE</tspan></text>
                    <svg class="frosted" viewBox="0 87 634 398" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Profile Group">
                        <text id="overview" fill="#FAC015" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="214.148" y="53.9688">Overview</tspan></text>
                        <text id="Match history" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="336.141" y="53.9688">Match History</tspan></text>
                        <line id="Line 28" x1="317" y1="68.5" x2="455" y2="68.5" stroke="#484848"/>
                        <line id="Line 29" x1="179" y1="68.5" x2="317" y2="68.5" stroke="#FBC115"/>
                        <g id="Vector" filter="url(#filter0_b_548_1914)">
                        <path d="M182.206 374.566V256.238L192 246.447V103.434L182.563 94H45.8201L16.7944 123.016V217.583L7 227.374V364.775L26.2313 384H172.769L182.206 374.566Z" fill="black" fill-opacity="0.3"/>
                        <path d="M181.852 255.884L181.706 256.031V256.238V374.359L172.562 383.5H26.4383L7.5 364.568V227.581L17.1479 217.937L17.2944 217.79V217.583V123.223L46.0271 94.5H182.356L191.5 103.641V246.24L181.852 255.884Z" stroke="#515151"/>
                        </g>
                        <g id="Vector_2" filter="url(#filter1_b_548_1914)">
                        <path d="M624.206 475.541V327.212L634 317.421V98.4079L624.563 88.9743L218.794 88L208.794 97.99V258.557L199 268.348V465.75L218.231 484.974H614.769L624.206 475.541Z" fill="black" fill-opacity="0.5"/>
                        <path d="M623.852 326.859L623.706 327.005V327.212V475.333L614.562 484.474H218.438L199.5 465.542V268.555L209.148 258.911L209.294 258.764V258.557V98.1973L219.001 88.5005L624.356 89.4738L633.5 98.6151V317.214L623.852 326.859Z" stroke="#515151"/>
                        </g>
                        <g id="Vector_3" filter="url(#filter2_b_548_1914)">
                        <path d="M188.322 259.97L188.176 260.116V260.323V380.831L178.522 390.5H20.4782L0.5 370.492V223.05L10.6776 212.857L10.8238 212.71V212.504V117.848L41.1258 87.5H188.846L198.5 97.1688V249.777L188.322 259.97Z" stroke="#515151"/>
                        </g>
                        <g id="Vector_4" filter="url(#filter3_b_548_1914)">
                        <path d="M472.106 215.835L471.958 215.982V216.191V245.366L469.803 247.5H421.197L416.5 242.85V207.276L418.894 204.906L419.042 204.759V204.55V181.667L426.281 174.5H472.345L474.5 176.634V213.465L472.106 215.835Z" stroke="#89ABDF"/>
                        </g>
                        <g id="Vector_5" filter="url(#filter4_b_548_1914)">
                        <path d="M598.106 215.835L597.958 215.982V216.191V245.366L595.803 247.5H547.197L542.5 242.85V205.276L544.894 202.906L545.042 202.759V202.55V181.667L552.281 174.5H598.345L600.5 176.634V213.465L598.106 215.835Z" stroke="#515151"/>
                        </g>
                        <g id="Vector_6" filter="url(#filter5_b_548_1914)">
                        <path d="M478.309 216.323L478.457 216.176L478.457 215.968L478.457 170.027L481.012 167.5L535.988 167.5L541.5 172.952L541.5 200.362L538.691 203.14L538.543 203.287L538.543 203.496L538.543 239.123L530.074 247.5L478.055 247.5L475.5 244.973L475.5 219.101L478.309 216.323Z" stroke="#FBC115"/>
                        </g>
                        <g id="Group 386">
                        <g id="Mask Group">
                        <mask id="mask0_548_1914" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="38" y="115" width="68" height="64">
                        <path id="Vector_7" d="M105.132 130.558V167.254L105.109 167.288L97.7121 178.322H46.0896L46.0519 178.283L38.6536 170.923V130.558L38.6951 130.519L53.4464 115.841H64.5955L64.6351 115.88L68.2729 119.5H94.0169L94.0565 119.54L105.132 130.558Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0_548_1914)">
                        <rect id="image 2" x="35.938" y="114.234" width="71.1788" height="67.276" fill="url(#pattern0)"/>
                        </g>
                        </g>
                        <g id="my profile frame">
                        <path id="Vector_8" d="M109 123.132V174.613L108.962 174.67L101.439 185.77H67.6762L67.606 185.703L63.9498 182.105H37.8629L37.7946 182.038L34 178.304V123.132L34.0662 123.064L37.7264 119.466V115.801L37.7946 115.734L41.5893 112H75.3177L75.388 112.067L79.0462 115.667H101.405L101.473 115.734L109 123.132ZM108.534 174.475V123.321L101.218 116.125H78.8555L78.7873 116.058L75.1291 112.458H41.7799L38.1899 115.991V119.656L38.1237 119.723L34.4636 123.321V178.115L38.0535 181.645H64.1404L64.2087 181.713L67.8669 185.313H101.178L108.534 174.475Z" fill="white"/>
                        <path id="Vector_9" d="M105.311 130.459V167.286L105.288 167.319L97.9009 178.393H46.3445L46.3069 178.354L38.918 170.968V130.459L38.9596 130.419L53.6919 115.688H64.8267L64.8662 115.728L68.4994 119.361H94.2103L94.2499 119.4L105.311 130.459ZM105.035 167.203V130.573L94.0956 119.638H68.3847L68.3452 119.596L64.712 115.963H53.8066L39.1949 130.573V170.859L46.4611 178.122H97.7525L105.035 167.203Z" fill="white"/>
                        <path id="Vector_10" d="M65.9672 179.623L70.8853 183.312V181.467L68.4249 179.623H65.9672Z" fill="white"/>
                        <path id="Vector_11" d="M65.9672 113.229L70.8853 118.148V115.689L68.4249 113.229H65.9672Z" fill="white"/>
                        <path id="Vector_12" d="M47.5246 113.229L42.1968 119.377H40.1476L45.4736 113.229H47.5246ZM42.0911 119.083L46.9125 113.524H45.581L40.7577 119.083H42.0911Z" fill="white"/>
                        <path id="Vector_13" d="M99.1639 181.754V182.082H72.6836L72.6457 182.035L70.8853 179.855L71.0712 179.623L72.7955 181.754H99.1639Z" fill="white"/>
                        <path id="Vector_14" d="M99.1639 121.615L98.9786 121.836L95.5034 117.692H77.9455L77.9077 117.645L76.1908 115.595H72.6777L72.6399 115.55L70.8853 113.453L71.0706 113.229L72.7893 115.279H76.3005L76.3383 115.326L78.0551 117.376H95.613L95.6508 117.421L99.1639 121.615Z" fill="white"/>
                        <path id="Vector_15" d="M86.8689 116.918H80.7213V118.148H86.8689V116.918Z" fill="white"/>
                        <path id="Vector_16" d="M99.1639 180.852H94.2459V182.082H99.1639V180.852Z" fill="white"/>
                        <path id="Vector_17" d="M42.6066 178.195L42.3992 178.393L36.459 172.758V131.672H36.7553V172.642L42.6066 178.195Z" fill="white"/>
                        </g>
                        </g>
                        <rect id="empty-owned 1" x="382" y="331" width="72.7065" height="82.19" fill="url(#patternempty)"/>
                        <text id="user name" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="22" letter-spacing="0em"><tspan x="34" y="229.844">{{ playerInfo.playerAlias.length > 0 ? playerInfo.playerAlias : 'Captain' }}</tspan></text>
                        <text id="Rank" fill="#FFBF00" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="12" letter-spacing="0.2em"><tspan x="34" y="205.324">RANK</tspan></text>
                        <text id="#1" fill="#FFBF00" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="68" y="206.102">{{ myRank }}</tspan></text>
                        <text id="Stats" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="17" letter-spacing="0.23em"><tspan x="237" y="124.084">STATS</tspan></text>
                        <text id="win rate" fill="#9A9A9A" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="237" y="157.102">Win Rate</tspan></text>
                        <text id="wins" fill="#9A9A9A" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="351" y="157.102">Wins</tspan></text>
                        <text id="most picked spaceships" fill="#9A9A9A" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="443" y="157.102">Most Picked Spaceships</tspan></text>
                        <text id="loses" fill="#9A9A9A" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="351" y="211.102">Loses</tspan></text>
                        <text id="NO SPACeSHIPS OWNED" fill="#363636" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="349" y="439.102">NO SPACESHIPS OWNED</tspan></text>
                        <text id="owned ships" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="17" letter-spacing="0.23em"><tspan x="237" y="289.084">OWNED SHIPS</tspan></text>
                        <text id="0xB0b1....8C0" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="34" y="255.102">{{ formattedAddress }}</tspan></text>
                        <text id="Joined date" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="10" letter-spacing="0em"><tspan x="34" y="301.418">Joined</tspan></text>
                        <text id="25 jan 2011" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="10" letter-spacing="0em"><tspan x="106.805" y="302.418">{{ playerInfo.joinedDate }} </tspan></text>
                        <g id="Group 387">
                        <text id="ELO" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="16" letter-spacing="0em"><tspan x="47.2367" y="327.432">ELO</tspan></text>
                        <text id="1400" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="134.438" y="328.102">{{ playerInfo.elo }}</tspan></text>
                        <g id="Group">
                        <path id="Vector_18" d="M39.1419 319.643C39.1077 319.541 39.0193 319.466 38.911 319.449L37.9363 319.307L37.5002 318.423C37.4517 318.326 37.352 318.264 37.2437 318.264C37.1354 318.264 37.0357 318.326 36.9872 318.423L36.5511 319.307L35.5764 319.449C35.4681 319.466 35.3797 319.541 35.3456 319.643C35.3114 319.746 35.3399 319.86 35.4168 319.937L36.1237 320.624L35.9584 321.596C35.9385 321.704 35.984 321.812 36.0696 321.875C36.1579 321.941 36.2747 321.949 36.3717 321.898L37.2437 321.439L38.1158 321.898C38.1585 321.92 38.2042 321.929 38.2498 321.929C38.3097 321.929 38.3667 321.912 38.418 321.875C38.5064 321.812 38.5491 321.704 38.5292 321.595L38.3638 320.624L39.0707 319.937C39.1476 319.86 39.1761 319.746 39.1419 319.643L39.1419 319.643Z" fill="#FBC115"/>
                        <path id="Vector_19" d="M40.3503 321.681C40.2676 321.63 40.1622 321.627 40.0738 321.672L37.2435 323.117L34.4133 321.672C34.3249 321.627 34.2195 321.63 34.1368 321.681C34.0513 321.735 34 321.826 34 321.926V323.687C34 323.796 34.0599 323.893 34.1539 323.941L37.1152 325.452C37.1552 325.474 37.198 325.483 37.2435 325.483C37.2891 325.483 37.3319 325.474 37.3746 325.452L40.3331 323.941C40.4271 323.893 40.487 323.796 40.487 323.687V321.926C40.4871 321.826 40.4358 321.735 40.3503 321.681H40.3503Z" fill="#FBC115"/>
                        <path id="Vector_20" d="M40.3503 325.198C40.2676 325.147 40.1622 325.141 40.0738 325.187L37.2435 326.632L34.4133 325.187C34.3249 325.141 34.2195 325.147 34.1368 325.198C34.0513 325.25 34 325.341 34 325.44V327.205C34 327.31 34.0599 327.41 34.1539 327.458L37.1152 328.969C37.1552 328.989 37.198 329 37.2435 329C37.2891 329 37.3319 328.989 37.3746 328.969L40.3331 327.458C40.4271 327.41 40.487 327.31 40.487 327.205V325.44C40.4871 325.341 40.4358 325.249 40.3503 325.198L40.3503 325.198Z" fill="#FBC115"/>
                        </g>
                        </g>
                        <g id="Group 393">
                        <text id="Matches" fill="white" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="16" letter-spacing="0em"><tspan x="47" y="352.432">MATCHES</tspan></text>
                        <text id="500" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="141.328" y="353.102">{{ allMatches.length }}</tspan></text>
                        <g id="Group_2">
                        <path id="Vector_21" d="M34.1367 347.802C34.2194 347.854 34.3248 347.856 34.4132 347.811L37.2435 346.366L40.0737 347.811C40.1621 347.856 40.2675 347.854 40.3502 347.802C40.4357 347.748 40.487 347.657 40.487 347.557L40.487 345.796C40.487 345.687 40.4271 345.591 40.3331 345.542L37.3718 344.031C37.3318 344.009 37.289 344 37.2435 344C37.1979 344 37.1551 344.009 37.1124 344.031L34.1539 345.542C34.0599 345.59 34 345.687 34 345.796L34 347.557C33.9999 347.657 34.0512 347.748 34.1367 347.802L34.1367 347.802Z" fill="#FBC115"/>
                        <path id="Vector_22" d="M40.3503 349.198C40.2676 349.147 40.1622 349.141 40.0738 349.187L37.2435 350.632L34.4133 349.187C34.3249 349.141 34.2195 349.147 34.1368 349.198C34.0513 349.25 34 349.341 34 349.44V351.205C34 351.31 34.0599 351.41 34.1539 351.458L37.1152 352.969C37.1552 352.989 37.198 353 37.2435 353C37.2891 353 37.3319 352.989 37.3746 352.969L40.3331 351.458C40.4271 351.41 40.487 351.31 40.487 351.205V349.44C40.4871 349.341 40.4358 349.249 40.3503 349.198L40.3503 349.198Z" fill="#FBC115"/>
                        </g>
                        </g>
                        <line id="Line 30" x1="7" y1="275.5" x2="182" y2="275.5" stroke="#4F4F4E"/>
                        <g id="edit-2" @click="editProfile()" style="cursor: pointer">
                        <rect id="Rectangle 92" x="161" y="220" width="15" height="15" fill="#101010" fill-opacity="0.01"/>
                        <path id="Vector_23" d="M171.752 231.466H163.586C163.431 231.466 163.283 231.528 163.173 231.637C163.064 231.747 163.002 231.895 163.002 232.05C163.002 232.204 163.064 232.353 163.173 232.462C163.283 232.572 163.431 232.633 163.586 232.633H171.752C171.907 232.633 172.056 232.572 172.165 232.462C172.274 232.353 172.336 232.204 172.336 232.05C172.336 231.895 172.274 231.747 172.165 231.637C172.056 231.528 171.907 231.466 171.752 231.466ZM163.586 230.3H163.638L166.071 230.078C166.337 230.051 166.586 229.934 166.777 229.745L172.027 224.495C172.23 224.28 172.341 223.993 172.333 223.697C172.325 223.4 172.2 223.119 171.986 222.915L170.387 221.316C170.179 221.12 169.905 221.008 169.619 221C169.333 220.993 169.054 221.091 168.836 221.275L163.586 226.525C163.397 226.716 163.28 226.965 163.253 227.231L163.002 229.664C162.995 229.749 163.006 229.835 163.035 229.916C163.064 229.997 163.111 230.07 163.172 230.13C163.226 230.185 163.291 230.227 163.362 230.256C163.433 230.285 163.509 230.3 163.586 230.3ZM169.577 222.133L171.169 223.725L170.002 224.863L168.439 223.3L169.577 222.133Z" fill="#FBC115"/>
                        </g>
                        <g id="Group 395">
                        <g v-if="playerInfo.elo > 1300" id="Group 390">
                        <g id="decor 6">
                        <path id="Vector_24" d="M134.31 116H119V119.877H137.989V119.704L134.31 116Z" fill="#B5FF7A"/>
                        <path id="Vector_25" d="M134.374 118.015L135.974 119.621V132.98H121.022V118.015H134.38H134.374ZM135.219 116H119.006V134.995H137.995V118.783L135.219 116V116Z" fill="#B5FF7A"/>
                        <path id="Vector_26" d="M134.758 130.581H122.333V131.95H134.758V130.581Z" fill="white"/>
                        </g>
                        <g id="P2E">
                        <path d="M127.337 123.045L127.238 126.177L126.888 126.33L126.682 126.422L126.233 126.62V126.613L125.701 126.834H125.138L125.084 128.148H124.118L124.308 123.045H127.337ZM125.701 125.81L126.264 125.566L126.309 124.023H125.259L125.183 125.81H125.701Z" fill="#B5FF7A"/>
                        <path d="M130.114 124.359L130.076 125.352V125.421L130.038 126.506L129.034 126.941L129.026 127.163H130.008L129.97 128.156H127.512L127.543 127.315V127.163L127.565 126.719L127.573 126.513L128.57 126.078L129.072 125.856L129.095 125.352H128.6L128.585 125.765H127.603L127.619 125.352H127.611L127.649 124.359H130.114Z" fill="#B5FF7A"/>
                        <path d="M131.31 128.148L131.345 127.079L132.847 127.101L132.794 128.148H131.31ZM131.38 126.001L131.413 125.008H132.953L132.908 126.001H131.38ZM131.445 124.023L131.477 123.045L133.075 123.037L133.022 124.03L131.445 124.023ZM131.31 128.148H130.321L130.488 123.045H131.477L131.394 125.596L131.31 128.148Z" fill="#B5FF7A"/>
                        </g>
                        </g>
                        <!-- 1st -->
                        <g v-if="myRank === '#1'" id="Group 392">
                        <g id="Group 391">
                        <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M119 157.789V138.794H137.995V157.789H119ZM120.103 146.841H122.316V139.923H120.103V146.841ZM135.043 156.916H137.256V154.703H135.043V156.916ZM125.104 148.292H122.937L120.583 149.693L121.645 151.556L122.858 150.834L122.641 156.547H124.808L125.104 148.292ZM126.483 154.933H125.92L125.985 152.218H126.548H127.112H129.286V153.33H127.085L127.074 153.807H129.322L129.318 153.929H129.336L129.235 156.529H128.744H128.13H125.963V155.403H127.155H128.165L128.179 154.933H127.047H126.483ZM129.668 156.529H130.073H130.795H131.156L132.601 155.908L132.211 154.904L130.835 155.489L130.919 153.33H132.471V152.218H130.962L131.019 150.751H129.871L129.688 155.977L129.647 155.995L129.685 156.043L129.668 156.529Z" fill="#FBC115"/>
                        </g>
                        </g>
                        <!-- 2nd -->
                        <g v-else-if="myRank === '#2'" id="Group 392">
                        <g id="Group2nd">
                        <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M119 71V52H138V71H119ZM120.103 60.049H122.317V53.1289H120.103V60.049ZM123.292 60.049H125.506V53.1289H123.292V60.049ZM135.047 70.1262H137.26V67.9131H135.047V70.1262ZM120.302 61H122.504H123.594H125.796L125.708 63.202V63.3567L125.627 65.7575L123.388 66.7222L123.373 67.2157H125.553L125.472 69.4177H123.285H122.187H120L120.066 67.5544V67.2157L120.118 66.2362L120.133 65.7796L122.357 64.8075L123.469 64.3214L123.52 63.202H122.423L122.386 64.1152H120.206L120.236 63.202H120.221L120.302 61ZM128.911 64.9548L127.725 65.4704L127.74 64.9548H126.591L126.437 69.3515H127.585L127.681 66.7444L128.867 66.2215L128.756 69.3515H129.905L130.06 64.9548H128.911ZM132.741 64.9548L132.8 63.4303L134 63.4819L133.794 69.3735H132.645V69.0716L131.908 69.3735H130.369L130.531 64.9548H132.741ZM131.621 66.0963L131.54 68.3057L132.645 67.827L132.704 66.0963H131.621Z" fill="#0050DB"/>                        </g>
                        </g>
                        <!-- 3rd -->
                        <g v-else-if="myRank === '#3'" id="Group 392">
                        <g id="Group3nd">
                        <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M119 52V71H138V52H119ZM122.317 60.049H120.103V53.1289H122.317V60.049ZM125.506 60.049H123.292V53.1289H125.506V60.049ZM137.26 70.1262H135.047V67.9131H137.26V70.1262ZM126.287 60.049H128.5V53.1289H126.287V60.049ZM125.789 61.0221H123.582L123.56 61H120.28L120.191 63.2068H123.472V64.244H121.824L121.743 66.186H123.421L123.369 67.2232H120.088L120 69.43H125.48L125.789 61.0221ZM127.415 69.3639H126.267L126.422 64.9503H127.562L127.539 65.634L129.055 64.9723L129.416 66.0684L127.497 66.9038L127.415 69.3639ZM129.541 69.3638H130.004H130.688H131.078L131.787 69.0599L131.777 69.3638H132.917L133.123 63.4791H131.976L131.926 64.9503H130.828H130.21H129.695L129.541 69.3638ZM130.792 66.0904L130.721 68.3244L131.828 67.8452L131.887 66.0904H130.792Z" fill="#42526D"/>                        </g>
                        </g>
                        </g>
                        <g id="Group 404">
                        <g id="Group 396">
                        <path id="Vector_29" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 24)" d="M267.619 177.767C269.096 177.462 270.593 177.265 272.099 177.179V170C269.967 170.086 267.848 170.365 265.767 170.833L267.619 177.767Z" fill="#FBC115"/>
                        <path id="Vector_30" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 23)" d="M260.641 180.251C261.983 179.559 263.38 178.983 264.819 178.528L262.967 171.608C260.93 172.245 258.954 173.066 257.066 174.063L260.641 180.251Z" fill="#FBC115"/>
                        <path id="Vector_31" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 22)" d="M254.54 184.415C255.663 183.405 256.863 182.483 258.129 181.658L254.554 175.47C252.75 176.611 251.054 177.913 249.486 179.361L254.54 184.415Z" fill="#FBC115"/>
                        <path id="Vector_32" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 21)" d="M249.73 190.157C250.559 188.894 251.48 187.695 252.486 186.568L247.433 181.514C245.98 183.079 244.678 184.775 243.542 186.583L249.73 190.157Z" fill="#FBC115"/>
                        <path id="Vector_33" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 20)" d="M246.586 196.791C247.052 195.353 247.633 193.956 248.323 192.613L242.121 189.038C241.129 190.926 240.312 192.901 239.68 194.938L246.586 196.791Z" fill="#FBC115"/>
                        <path id="Vector_34" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 19)" d="M245.15 204.084C245.235 202.574 245.432 201.072 245.739 199.59L238.833 197.738C238.365 199.824 238.086 201.948 238 204.084H245.15Z" fill="#FBC115"/>
                        <path id="Vector_35" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 18)" d="M245.796 211.464C245.49 209.987 245.293 208.49 245.207 206.984H238.029C238.115 209.116 238.394 211.235 238.861 213.316L245.796 211.464Z" fill="#FBC115"/>
                        <path id="Vector_36" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 17)" d="M248.28 218.441C247.59 217.103 247.009 215.71 246.543 214.278L239.637 216.13C240.271 218.166 241.088 220.141 242.077 222.031L248.28 218.441Z" fill="#FBC115"/>
                        <path id="Vector_37" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 16)" d="M252.486 224.615C251.48 223.493 250.559 222.298 249.73 221.04L243.542 224.615C244.681 226.415 245.984 228.107 247.433 229.669L252.486 224.615Z" fill="#FBC115"/>
                        <path id="Vector_38" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 15)" d="M258.071 229.353C256.799 228.537 255.599 227.615 254.482 226.596L249.457 231.665C251.029 233.108 252.725 234.41 254.525 235.555L258.071 229.353Z" fill="#FBC115"/>
                        <path id="Vector_39" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 14)" d="M264.819 232.54C263.382 232.074 261.985 231.493 260.641 230.803L257.066 237.005C258.955 237.997 260.93 238.814 262.967 239.446L264.819 232.54Z" fill="#FBC115"/>
                        <path id="Vector_40" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 13)" d="M272.099 233.876C270.592 233.804 269.093 233.607 267.619 233.287L265.767 240.207C267.848 240.67 269.968 240.944 272.099 241.025V233.876Z" fill="#FBC115"/>
                        <path id="Vector_41" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 12)" d="M279.493 233.229C278.018 233.549 276.52 233.746 275.013 233.818V240.997C277.144 240.915 279.263 240.641 281.345 240.178L279.493 233.229Z" fill="#FBC115"/>
                        <path id="Vector_42" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 11)" d="M286.47 230.803C285.126 231.493 283.729 232.074 282.292 232.54L284.144 239.446C286.182 238.814 288.157 237.997 290.045 237.005L286.47 230.803Z" fill="#FBC115"/>
                        <path id="Vector_43" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 10)" d="M292.529 226.596C291.412 227.615 290.212 228.537 288.94 229.353L292.529 235.555C294.323 234.406 296.013 233.105 297.583 231.665L292.529 226.596Z" fill="#FBC115"/>
                        <path id="Vector_44" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 9)" d="M297.382 220.969C296.558 222.23 295.636 223.426 294.625 224.543L299.679 229.597C301.128 228.035 302.43 226.344 303.57 224.543L297.382 220.969Z" fill="#FBC115"/>
                        <path id="Vector_45" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 8)" d="M300.569 214.278C300.103 215.71 299.522 217.103 298.832 218.441L305.034 222.031C306.024 220.141 306.841 218.166 307.475 216.13L300.569 214.278Z" fill="#FBC115"/>
                        <path id="Vector_46" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 7)" d="M301.904 206.984C301.826 208.491 301.629 209.988 301.316 211.464L308.221 213.316C308.689 211.235 308.968 209.116 309.054 206.984H301.904Z" fill="#FBC115"/>
                        <path id="Vector_47" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 6)" d="M301.316 199.59C301.629 201.07 301.826 202.573 301.904 204.084H309.083C308.997 201.948 308.718 199.824 308.25 197.738L301.316 199.59Z" fill="#FBC115"/>
                        <path id="Vector_48" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 5)" d="M305.034 189.038L298.832 192.613C299.522 193.956 300.103 195.353 300.569 196.791L307.475 194.938C306.843 192.901 306.026 190.926 305.034 189.038Z" fill="#FBC115"/>
                        <path id="Vector_49" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 4)" d="M294.625 186.511C295.636 187.634 296.558 188.834 297.382 190.1L303.57 186.525C302.434 184.718 301.131 183.021 299.679 181.457L294.625 186.511Z" fill="#FBC115"/>
                        <path id="Vector_50" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 3)" d="M288.983 181.701C290.232 182.514 291.417 183.421 292.529 184.414L297.583 179.361C296.015 177.931 294.324 176.644 292.529 175.513L288.983 181.701Z" fill="#FBC115"/>
                        <path id="Vector_51" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 2)" d="M282.292 178.528C283.731 178.983 285.129 179.559 286.47 180.251L290.045 174.063C288.157 173.066 286.182 172.245 284.144 171.608L282.292 178.528Z" fill="#FBC115"/>
                        <path id="Vector_52" :opacity="getCicularWinRateOpacity(wins, allMatches.length, 1)" d="M275.013 177.236C276.519 177.323 278.016 177.519 279.493 177.825L281.345 170.919C279.264 170.451 277.144 170.172 275.013 170.086V177.236Z" fill="#FBC115"/>
                        </g>
                        
                        <text id="80%" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="bold" letter-spacing="0em"><tspan x="258" y="210.969"> {{ allMatches.length > 0 ? Math.floor(wins/allMatches.length * 100) : 0 }}%</tspan></text>
                        </g>
                        <text id="500_2" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" font-weight="500" letter-spacing="0em"><tspan x="351" y="184.102">{{ wins }}</tspan></text>
                        <text id="30" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" font-weight="500" letter-spacing="0em"><tspan x="351" y="238.102">{{ loses }}</tspan></text>
                        <text id="80%_2" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="497.174" y="240.102">{{ picks[0].number > 0 ? Math.floor(picks[0].number/picksCnt * 100) : 0 }}%</tspan></text>
                        <text id="10%" fill="#89ABDF" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="10" font-weight="bold" letter-spacing="0em"><tspan x="437.174" y="240.102">{{ picks[0].number > 0 ? Math.floor(picks[1].number/picksCnt * 100) : 0 }}%</tspan></text>
                        <text id="5%" fill="#515151" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="10" font-weight="bold" letter-spacing="0em"><tspan x="563.119" y="240.102">{{ picks[0].number > 0 ?  Math.floor(picks[2].number/picksCnt * 100) : 0 }}%</tspan></text>
                        <text id="Vampship" fill="#FBC115" xml:space="preserve" style="white-space: pre; text-transform: uppercase" font-family="Anson" font-size="10" letter-spacing="0em"><tspan :x="getXValue(491.464, picks[0].type)" y="223.02">{{ picks[0].type }}</tspan></text>
                        <text id="Vampship_2" fill="#89ABDF" xml:space="preserve" style="white-space: pre; text-transform: uppercase" font-family="Anson" font-size="9" letter-spacing="0em"><tspan :x="getXValue(428.464, picks[1].type)" y="223.02">{{ picks[1].type }}</tspan></text>
                        <text id="Vampship_3" fill="#515151" xml:space="preserve" style="white-space: pre; text-transform: uppercase" font-family="Anson" font-size="9" letter-spacing="0em"><tspan :x="getXValue(553.464, picks[2].type)" y="223.02">{{ picks[2].type }}</tspan></text>
                        <rect id="Vampire-ship" x="494" y="175" width="29" height="36" fill="url(#pattern2)"/>
                        <rect id="Vampire-ship_2" x="434" y="182" width="22.5556" height="28" fill="url(#pattern3)"/>
                        <rect id="Vampire-ship_3" x="559" y="182" width="22.5556" height="28" fill="url(#pattern4)"/>
                        <rect id="Layer-1 1_2" x="373" y="330" width="87" height="95" fill="url(#pattern5)"/>
                        </g>
                        <defs>
                        <filter id="filter0_b_548_1914" x="-217" y="-130" width="633" height="738" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="112"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_548_1914"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_548_1914" result="shape"/>
                        </filter>
                        <filter id="filter1_b_548_1914" x="-25" y="-136" width="883" height="844.974" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="112"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_548_1914"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_548_1914" result="shape"/>
                        </filter>
                        <filter id="filter2_b_548_1914" x="-224" y="-137" width="647" height="752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="112"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_548_1914"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_548_1914" result="shape"/>
                        </filter>
                        <filter id="filter3_b_548_1914" x="192" y="-50" width="507" height="522" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="112"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_548_1914"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_548_1914" result="shape"/>
                        </filter>
                        <filter id="filter4_b_548_1914" x="318" y="-50" width="507" height="522" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="112"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_548_1914"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_548_1914" result="shape"/>
                        </filter>
                        <filter id="filter5_b_548_1914" x="251" y="-57" width="515" height="529" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="112"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_548_1914"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_548_1914" result="shape"/>
                        </filter>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_548_1914" transform="translate(0 -0.0290062) scale(0.0005)"/>
                        </pattern>
                        <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image1_548_1914" transform="scale(0.001)"/>
                        </pattern>
                        <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#first_pick" transform="translate(-0.125) scale(0.005 0.004)"/>
                        </pattern>
                        <pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#second_pick" transform="translate(-0.125) scale(0.005 0.004)"/>
                        </pattern>
                        <pattern id="pattern4" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#third_pick" transform="translate(-0.125) scale(0.005 0.004)"/>
                        </pattern>
                        <pattern id="pattern5" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image3_548_1914" transform="translate(-0.045977) scale(0.00109195)"/>
                        </pattern>
                        <pattern id="patternempty" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image4_548_1914" transform="translate(0 -0.00277941) scale(0.00195312 0.00172776)"/>
                        </pattern>
                        <image id="image0_548_1914" data-name="image.png" width="2000" height="2000" :href="gravatar" />
                        <image id="image1_548_1914" data-name="Layer-1(edit).png" width="1000" height="1000"/>

                        <image id="first_pick" data-name="Vampire-ship.png" width="250" height="250" :href="require(`../assets/blue/${picks[0].type}.webp`)"/>
                        <image id="second_pick" data-name="Vampire-ship.png" width="250" height="250" :href="require(`../assets/blue/${picks[1].type}.webp`)"/>                
                        <image id="third_pick" data-name="Vampire-ship.png" width="250" height="250" :href="require(`../assets/blue/${picks[2].type}.webp`)"/>

                        <image id="image3_548_1914" data-name="Layer-1.png" width="1000" height="1000"/>
                        <image id="image4_548_1914" data-name="empty-owned.png" width="512" height="582" href="https://res.cloudinary.com/station0x/image/upload/v1646097876/encouter/elements/empty-owned_eduunq.svg"/>
                        </defs>
                    </svg>
                </b-tab-item>
                <b-tab-item label="Matches History">
                    <svg class="frosted" viewBox="0 0 640 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group-matches">
                        <g id="Group 466">
                        <g id="Vector" filter="url(#filter0_b_587_1615)">
                        <path d="M629.322 266.97L629.176 267.116V267.323V387.831L619.522 397.5H20.4782L0.5 377.492V230.05L10.6776 219.857L10.8238 219.71V219.504V30.8475L41.1258 0.5H629.846L639.5 10.1688V256.777L629.322 266.97Z" stroke="#515151"/>
                        </g>
                        <path id="Vector_2" d="M621.852 263.884L621.706 264.031V264.238V382.359L612.562 391.5H26.4383L7.5 372.568V235.581L17.1479 225.937L17.2944 225.79V225.583V36.2229L46.0271 7.5H622.356L631.5 16.6409V254.24L621.852 263.884Z" fill="black" fill-opacity="0.7" stroke="#515151"/>
                        </g>
                        <foreignObject y="20" x="30" width="92%" height="90%" style="margin-top: 10px; overflow: auto">
                            <!-- Victory header -->
                            <div v-for="(match, matchIndex) in sortedMatches" :key="matchIndex">
                                <VictoryMatch 
                                v-if="match.winner === playerIs(match)"
                                :enemyAddress="playerIs(match) === 0 ? match.player1 : match.player0"
                                :matchIndex="allMatches.length - matchIndex"
                                :mode="match.type"
                                :enemyAlias="match.enemyAlias"
                                :duration="match.duration"
                                :startDate="match.startDate"
                                />
                                <DefeatMatch
                                v-else
                                :enemyAddress="playerIs(match) === 0 ? match.player1 : match.player0"
                                :matchIndex="allMatches.length - matchIndex"
                                :mode="match.type"
                                :enemyAlias="match.enemyAlias"
                                :duration="match.duration"
                                :startDate="match.startDate"
                                />
                            </div>
                        </foreignObject>
                        </g>
                        <defs>
                        <filter id="filter0_b_587_1615" x="-224" y="-224" width="1088" height="846" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="112"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_587_1615"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_587_1615" result="shape"/>
                        </filter>
                        <filter id="filter1_b_587_1615" x="35" y="27" width="583.069" height="69" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="2.5"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_587_1615"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_587_1615" result="shape"/>
                        </filter>
                        <filter id="filter2_b_587_1615" x="35" y="93" width="583.069" height="69" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="2.5"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_587_1615"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_587_1615" result="shape"/>
                        </filter>
                        <linearGradient id="paint0_linear_587_1615" x1="326.534" y1="-1.5" x2="326.534" y2="110.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#564104"/>
                        <stop offset="1" stop-color="#616161" stop-opacity="0"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_587_1615" x1="326.534" y1="32" x2="326.534" y2="91" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FBC115" stop-opacity="0.7"/>
                        <stop offset="1" stop-color="#FBC115" stop-opacity="0.22"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_587_1615" x1="326.534" y1="64.5" x2="326.534" y2="176.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#480101"/>
                        <stop offset="1" stop-color="#616161" stop-opacity="0"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_587_1615" x1="326.534" y1="98" x2="326.534" y2="157" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FA1515" stop-opacity="0.7"/>
                        <stop offset="1" stop-color="#FA1515" stop-opacity="0.22"/>
                        </linearGradient>
                        </defs>
                    </svg>
                </b-tab-item>
            </b-tabs>
        </div>
        <div v-show="!fetchingProfileLoader" class="profile-background"></div>
        <v-gravatar style="display: none" ref="gravatar" :email="playerAddress" alt="Nobody" :size="530"/>
    </div>
</template>

<script>
import { ethers } from 'ethers'
import Loader from '@/components/Loader.vue'
import VictoryMatch from '@/components/match-elements/VictoryMatch.vue'
import DefeatMatch from '@/components/match-elements/DefeatMatch.vue'
import axios from 'axios'
import arraySort from 'array-sort'

export default {
    data() {
        return {
            isAddress: false,
            fetchingProfileLoader: true,
            playerAddress: undefined,
            gravatar: null,
            newName: "",
            loading: false,
            rankings: undefined,
            allMatches: [],
            picks: [],
            picksCnt: undefined,
            activeTab: 0,
            playerInfo: undefined
        }
    },
    components: {
        Loader,
        VictoryMatch,
        DefeatMatch
    },
    computed: {
        formattedAddress() {
            if(this.playerInfo) {
                return this.playerInfo.address.slice(0, 7) + '...' + this.playerInfo.address.slice(-4)
            } else return '---'
        },
        myRank() {
            let rank = '--'
            if(this.rankings){          
                this.rankings.map((player, index) => {
                    if(player.address === this.playerInfo.address) {
                        rank = '#' + (index + 1)
                    }
                })
            }
            return rank
        },
        wins() {
            return this.allMatches.reduce((wins, match) => {
                const playerNo = match.player0 === this.playerAddress ? 0 : 1;
                return match.winner === playerNo ? wins+1 : wins
            }, 0)
        },
        loses() {
            return this.allMatches.reduce((loses, match) => {
                const playerNo = match.player0 === this.playerAddress ? 0 : 1;
                return match.winner !== playerNo ? loses+1 : loses
            }, 0)
        },
        sortedMatches() {
            return arraySort([...this.allMatches], 'lastTurnTimestamp', {reverse: true})
        }
    },
    methods: {
        getCicularWinRateOpacity(wins, matches, slot) {
            const rate = Math.floor(wins/matches * 100)
            return slot <= rate / (100/24) ? "1" : "0.43"
        },
        getXValue(x, type) {
            if(type.length > 8) return x - (type.length*0.5)
            else if(type.length < 8) return x + (type.length*0.5)
            else return x
        },
        playerIs(match) {
          return match.player0 === this.playerAddress ? 0 : 1  
        },
        async fetchProfile() {
            const res = await axios.get('/api/player/fetchPlayerProfile', {
				params:{
					address: this.playerAddress
				}
            })
            this.playerInfo = res.data.playerDoc
        },
        async fetchLeaderboard() { 
            try {
                const res = await axios.get('/api/player/getLeaderboard')
                this.rankings = res.data.leaderboard
            } catch {
                this.fetchLeaderboard()
            }
        },
        async fetchPlayerPicks() { 
            try {
                const res = await axios.get('/api/player/getPlayerPicks', {
                    params: {
                        address: this.playerAddress
                    }
                })
                this.picks = res.data.picks
                this.picksCnt = res.data.allPicks
            } catch {
                this.fetchPlayerPicks()
            }
        },
        async getPlayerMatches () { 
            try {
                const res = await axios.get('/api/player/getPlayerMatches', {
                    params: {
                        address: this.playerAddress 
                    }
                })
                this.allMatches = res.data.allMatches
            } catch {
                this.getPlayerMatches()
            }
            // if(this.$store.state.address) {
            //     const playerId = this.data.find(o => o.address === this.$store.state.address)
            //     const playerIndex = this.data.indexOf(playerId)
            //     this.selected = this.data[playerIndex]
            // }
        },
        async submitName () {
            if(this.newName.length > 0) {
                this.loading = true
                try {
                    const res = await axios.get('/api/player/changePlayerAlias', {
                        params:{
                            signature: this.$store.state.signature, 
                            alias: this.newName
                        }
                    })
                    const success = res.data.success
                    if(success) {
                        this.$buefy.toast.open({
                            duration: 5000,
                            message: `Name saved`,
                            position: 'is-bottom',
                            type: 'is-success'
                        })
                        this.newName = ""
                        this.fetchProfile()
                    } else {
                        this.$buefy.toast.open({
                            duration: 5000,
                            message: res.data.error,
                            position: 'is-bottom',
                            type: 'is-danger'
                        })
                    }
                } finally {
                    this.loading = false
                }
            }
        }
    },
    async created() {
        if(ethers.utils.isAddress(this.$route.params.playerAddress)) {
            this.isAddress = true
            this.playerAddress = this.$route.params.playerAddress
            await Promise.all([
                this.fetchProfile(),
                this.fetchLeaderboard(),
                this.getPlayerMatches(),
                this.fetchPlayerPicks()
            ])
            this.fetchingProfileLoader = false
        } else {
            this.$router.push({ name: 'Not found', params: {message: 'Profile'} })
        }
    },
    mounted: function() {
        this.gravatar = this.$refs.gravatar.url
    }
}
</script>

<style>
svg.frosted {
    backdrop-filter: blur(10px);
    background: rgba(32,33,27,.0);
}
.profile-tabs .tabs ul {
    border-bottom-color: transparent !important;
}
.profile-tabs .tabs a {
    border-bottom-color: #484848;
    border-bottom-width: 2px;
}
.profile-tabs .tabs li.is-active a {
    border-bottom-color: #FBC115;
    color: #FBC115;
}
.profile-tabs nav.tabs {
    font-weight: 500;
    font-size: 17px;
    margin-bottom: 17px;
}
.profile-tabs .b-tabs .tabs li:not(.is-active) a:focus {
    border-bottom-color: #FBC115;
}
.profile-wrapper {
    position: absolute;
    width: 75vw;
    min-width: 500px;
    max-width: 950px;
    top: 500px;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    z-index: 2;
    height: 700px;
    padding: 20px;
}
.hex {
    background: white;
    display: block;
    margin: 20px auto;
    position: relative;
    width: 120px;
    height: 130px;
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -moz-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    
}
.hex-background {
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 5px; /* equal to border thickness */
    right: 5px;
    width: 110px; /* container height - (border thickness * 2) */
    height: 120px; /* container height - (border thickness * 2) */
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    -moz-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.gravatar {
    height: 120px;
}
.name {
    height: fit-content;
    width: fit-content;
    margin: 0 auto;
    font-size: 2rem;
    color: white;
    font-family: 'Roboto';
    font-weight: 500;
    letter-spacing: 2px;
    padding: 25px 30px;
}
.address {
    height: fit-content;
    width: fit-content;
    margin: 0 auto;
    margin-top: -40px;
    margin-bottom: 20px;
    font-size: 17px;
    font-family: 'Roboto';
    font-weight: 300;
    letter-spacing: 1.1px;
    color: rgba(255,255,255,.7);
    padding: 20px 25px;
    overflow-wrap: anywhere;
}
.submit-btn {
  height: 50px !important;
  width: 170px !important;
  font-size: 15px !important;
  background: #0E1739 !important;
  color: white !important;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23416BFF' stroke-width='2' stroke-dasharray='3%2c 56%2c 16' stroke-dashoffset='22' stroke-linecap='square'/%3e%3c/svg%3e") !important;
  border: none !important;
  border-radius: 0px !important;
  font-family: 'Roboto';
  color: white;
  transition: 200ms ease-in;
}
.name-textarea {
	background: black;
}
input.input.is-small.name-textarea {
    background: black;
    border-top: 1px solid #416BFF;
	border-left: 1px solid #416BFF;
	border-bottom: 1px solid #416BFF;
	border-right: none;
	font-size: 15px;
	height: 50px;
	padding: 14px;
	color: white;
}
input.input.is-small.name-textarea:focus {
	box-shadow: none;
}
input[placeholder], [placeholder], *[placeholder] {
    color: white;
}
.profile-background {
  height: 100vh;
  width: 100vw;
  background-image: url('https://res.cloudinary.com/station0x/image/upload/v1646006132/encouter/backgrounds/bk_2_sqtdyo.webp');
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: center;
  position: fixed;
  top: 0;
  z-index: 1;
  left: 0;
  right: 0;
}
</style>