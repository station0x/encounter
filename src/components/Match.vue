<template>
    <div class="match-wrapper">
        <PickingView v-if="$store.state.matchState.picking && !$store.state.matchState.dodged"
            :state="$store.state.matchState.state"
            :playerIs="$store.state.matchState.playerIs"
            :playerTurn="$store.state.matchState.playerTurn"
            :lastTurnTimestamp="$store.state.matchState.lastTurnTimestamp"
            :pickingRound="$store.state.matchState.pickingRound"
            :player0PickingInsertions="$store.state.matchState.player0PickingInsertions"
            :player1PickingInsertions="$store.state.matchState.player1PickingInsertions"
        />
        <Board
            v-else-if="!$store.state.matchState.picking && !$store.state.matchState.dodged"
            :state="$store.state.matchState.state"
            :playerIs="$store.state.matchState.playerIs"
            :playerTurn="$store.state.matchState.playerTurn"
            :fuel0="$store.state.matchState.fuel0"    
            :fuel1="$store.state.matchState.fuel1"    
            :turnNum="$store.state.matchState.turnNum"
            :chat="$store.state.matchState.chat"
            :log="$store.state.matchState.log"
            :lastTurnTimestamp="$store.state.matchState.lastTurnTimestamp"
        />
        <div v-if="$store.state.matchState.picking && $store.state.matchState.dodged" class="afk">
            <div :class="{'not-red': $store.state.matchState.dodgedBy !== this.$store.state.address}" style="position: absolute; bottom: 0; left: 0; right: 0">
                <svg viewBox="0 0 1514 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M0.70752 31.1064V23.5558H156.605C161.732 23.548 166.81 24.5541 171.547 26.516C176.284 28.4779 180.587 31.357 184.207 34.9878C187.502 38.3016 191.422 40.9288 195.739 42.7173C200.057 44.5058 204.686 45.4201 209.36 45.4072H457.764C462.437 45.4201 467.067 44.5058 471.384 42.7173C475.702 40.9288 479.622 38.3016 482.917 34.9878L491.895 26.0092C495.512 22.3739 499.814 19.4917 504.552 17.5294C509.29 15.5672 514.369 14.5638 519.497 14.5773H758.348V18.0389H761.377V14.5773H996.333C1001.46 14.5638 1006.54 15.5672 1011.28 17.5294C1016.02 19.4917 1020.32 22.3739 1023.93 26.0092L1032.91 34.9878C1036.21 38.3016 1040.13 40.9288 1044.45 42.7173C1048.76 44.5058 1053.39 45.4201 1058.07 45.4072H1306.47C1311.14 45.4201 1315.77 44.5058 1320.09 42.7173C1324.41 40.9288 1328.33 38.3016 1331.62 34.9878C1334.72 31.8815 1338.32 29.32 1342.27 27.4112H1354L1514.47 27.2294V97.3268H0.923869V31.1237L0.70752 31.1064Z" fill="#3C3C3C"/>
                    <path d="M757.716 14.7721H995.701C1000.83 14.7586 1005.91 15.762 1010.65 17.7243C1015.38 19.6865 1019.69 22.5686 1023.3 26.204L1032.28 35.1825C1035.58 38.4963 1039.5 41.1236 1043.81 42.9121C1048.13 44.7006 1052.76 45.6149 1057.43 45.602H1305.84C1310.51 45.6149 1315.14 44.7006 1319.46 42.9121C1323.78 41.1236 1327.7 38.4963 1330.99 35.1825C1334.61 31.5472 1338.91 28.665 1343.65 26.7028C1348.39 24.7405 1353.47 23.7371 1358.59 23.7506H1514.51V27.2122H1358.61C1353.94 27.1993 1349.31 28.1136 1344.99 29.9021C1340.67 31.6906 1336.75 34.3178 1333.46 37.6316C1329.84 41.2677 1325.54 44.1504 1320.8 46.1127C1316.06 48.075 1310.98 49.078 1305.86 49.0636H1057.45C1052.32 49.078 1047.24 48.075 1042.51 46.1127C1037.77 44.1504 1033.47 41.2677 1029.85 37.6316L1020.87 28.6531C1017.58 25.3393 1013.66 22.7121 1009.34 20.9236C1005.02 19.135 1000.39 18.2208 995.718 18.2337H757.733L757.716 14.7721Z" fill="url(#paint0_linear_289_23142)"/>
                    <path d="M518.848 14.7721H760.728V18.2337H518.848C514.175 18.2208 509.546 19.135 505.228 20.9236C500.911 22.7121 496.991 25.3393 493.696 28.6531L484.717 37.6316C481.101 41.2677 476.799 44.1504 472.061 46.1127C467.323 48.075 462.243 49.078 457.115 49.0636H208.711C203.583 49.078 198.503 48.075 193.765 46.1127C189.027 44.1504 184.725 41.2677 181.109 37.6316C177.814 34.3178 173.894 31.6906 169.576 29.9021C165.259 28.1136 160.629 27.1993 155.956 27.2122H0.0585938V23.7506H155.956C161.084 23.7371 166.164 24.7405 170.902 26.7028C175.639 28.665 179.941 31.5472 183.558 35.1825C186.853 38.4963 190.773 41.1236 195.091 42.9121C199.408 44.7006 204.037 45.6149 208.711 45.602H457.115C461.788 45.6149 466.418 44.7006 470.735 42.9121C475.053 41.1236 478.973 38.4963 482.268 35.1825L491.247 26.204C494.863 22.5686 499.165 19.6865 503.903 17.7243C508.641 15.762 513.72 14.7586 518.848 14.7721V14.7721Z" fill="url(#paint1_linear_289_23142)"/>
                    <g opacity="0.5">
                    <path opacity="0.5" d="M1173.03 20.8037H1182.26C1184.71 20.8039 1187.14 21.2874 1189.4 22.2266C1191.67 23.1658 1193.73 24.5423 1195.46 26.2774L1206.04 36.8569H1197.14C1192.29 36.8568 1187.63 34.9666 1184.14 31.5866L1173.03 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.4">
                    <path opacity="0.4" d="M1200.45 20.8037H1209.67C1214.62 20.805 1219.38 22.774 1222.88 26.2774L1233.46 36.8569H1224.56C1219.71 36.8512 1215.06 34.9613 1211.58 31.5866L1200.45 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.3">
                    <path opacity="0.3" d="M1227.88 20.8037H1237.1C1242.06 20.805 1246.81 22.774 1250.31 26.2774L1260.89 36.8569H1251.99C1247.15 36.8512 1242.49 34.9613 1239.01 31.5866L1227.88 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.2">
                    <path opacity="0.2" d="M1255.3 20.8037H1264.53C1269.48 20.805 1274.23 22.774 1277.73 26.2774L1288.31 36.8569H1279.42C1274.56 36.8568 1269.9 34.9666 1266.42 31.5866L1255.3 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.1">
                    <path opacity="0.1" d="M1282.72 20.8037H1291.95C1294.4 20.8038 1296.83 21.2872 1299.1 22.2264C1301.37 23.1656 1303.42 24.5421 1305.16 26.2774L1315.73 36.8569H1306.84C1301.99 36.8568 1297.32 34.9666 1293.84 31.5866L1282.72 20.8037Z" fill="#DB0000"/>
                    </g>
                    <path d="M1035.08 20.8037H1044.3C1046.75 20.8034 1049.18 21.2867 1051.45 22.2259C1053.72 23.1652 1055.77 24.5419 1057.51 26.2774L1068.09 36.8569H1059.19C1054.34 36.8559 1049.67 34.9658 1046.19 31.5866L1035.08 20.8037Z" fill="#DB0000"/>
                    <g opacity="0.9">
                    <path opacity="0.9" d="M1062.5 20.8037H1071.73C1074.18 20.8034 1076.61 21.2867 1078.87 22.2259C1081.14 23.1652 1083.2 24.5419 1084.93 26.2774L1095.51 36.8569H1086.62C1081.76 36.8559 1077.1 34.9658 1073.61 31.5866L1062.5 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.8">
                    <path opacity="0.8" d="M1089.93 20.8037H1099.15C1101.6 20.8034 1104.03 21.2867 1106.3 22.2259C1108.56 23.1652 1110.62 24.5419 1112.36 26.2774L1122.94 36.8569H1114.04C1109.2 36.8512 1104.54 34.9613 1101.06 31.5866L1089.93 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.7">
                    <path opacity="0.7" d="M1117.35 20.8037H1126.59C1129.05 20.8034 1131.47 21.2867 1133.74 22.2259C1136.01 23.1652 1138.07 24.5419 1139.8 26.2774L1150.38 36.8569H1141.48C1136.63 36.8512 1131.98 34.9613 1128.5 31.5866L1117.35 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.6">
                    <path opacity="0.6" d="M1144.77 20.8037H1153.99C1156.44 20.8039 1158.87 21.2874 1161.14 22.2266C1163.4 23.1658 1165.46 24.5423 1167.2 26.2774L1177.78 36.8569H1168.88C1164.03 36.8568 1159.36 34.9666 1155.88 31.5866L1144.77 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.5">
                    <path opacity="0.5" d="M343.107 20.8037H333.886C331.433 20.8034 329.005 21.2867 326.739 22.2259C324.473 23.1652 322.414 24.5419 320.68 26.2774L310.088 36.8655H318.98C323.835 36.8648 328.5 34.9746 331.987 31.5952L343.107 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.4">
                    <path opacity="0.4" d="M315.683 20.8037H306.458C304.005 20.8034 301.576 21.2867 299.31 22.2259C297.044 23.1652 294.985 24.5419 293.252 26.2774L282.672 36.8569H291.564C296.42 36.8561 301.085 34.966 304.571 31.5866L315.683 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.3">
                    <path opacity="0.3" d="M288.258 20.8037H279.033C276.58 20.8034 274.151 21.2867 271.885 22.2259C269.619 23.1652 267.561 24.5419 265.827 26.2774L255.248 36.8569H264.144C268.991 36.8503 273.645 34.9606 277.125 31.5866L288.258 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.2">
                    <path opacity="0.2" d="M260.834 20.8037H251.609C249.156 20.8034 246.727 21.2867 244.461 22.2259C242.195 23.1652 240.136 24.5419 238.403 26.2774L227.823 36.8569H236.72C241.566 36.8503 246.221 34.9606 249.701 31.5866L260.834 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.1">
                    <path opacity="0.1" d="M233.409 20.8037H224.184C219.237 20.8112 214.494 22.7831 211 26.286L200.42 36.8655H209.317C214.171 36.8655 218.835 34.9752 222.319 31.5952L233.409 20.8037Z" fill="#DB0000"/>
                    </g>
                    <path d="M481.061 20.8037H471.831C466.878 20.805 462.128 22.774 458.625 26.2774L448.046 36.8569H456.942C461.789 36.8512 466.444 34.9613 469.923 31.5866L481.061 20.8037Z" fill="#DB0000"/>
                    <g opacity="0.9">
                    <path opacity="0.9" d="M453.636 20.8037H444.407C439.453 20.805 434.703 22.774 431.201 26.2774L420.621 36.8569H429.513C434.36 36.8512 439.015 34.9613 442.494 31.5866L453.636 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.8">
                    <path opacity="0.8" d="M426.211 20.8037H416.965C412.011 20.805 407.261 22.774 403.759 26.2774L393.179 36.8569H402.076C406.922 36.8512 411.577 34.9613 415.057 31.5866L426.211 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.7">
                    <path opacity="0.7" d="M398.791 20.8037H389.562C387.108 20.8038 384.679 21.2872 382.412 22.2264C380.146 23.1656 378.086 24.5421 376.352 26.2774L365.776 36.8569H374.668C379.515 36.8512 384.17 34.9613 387.649 31.5866L398.791 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.6">
                    <path opacity="0.6" d="M371.363 20.8037H362.138C359.685 20.8034 357.256 21.2867 354.99 22.2259C352.724 23.1652 350.665 24.5419 348.932 26.2774L338.352 36.8569H347.244C352.1 36.8561 356.764 34.966 360.251 31.5866L371.363 20.8037Z" fill="#DB0000"/>
                    </g>
                    <g opacity="0.24">
                    <path opacity="0.24" d="M633.531 15.962L616.574 32.9195C614.885 34.6088 612.881 35.9488 610.674 36.8627C608.467 37.7767 606.102 38.2468 603.714 38.246H545.438C543.049 38.2453 540.684 38.7153 538.478 39.6293C536.271 40.5432 534.266 41.8832 532.578 43.5725L512.185 63.9657C510.496 65.655 508.492 66.995 506.285 67.909C504.078 68.8229 501.713 69.293 499.325 69.2922H313.943C311.555 69.293 309.19 68.8229 306.983 67.909C304.777 66.995 302.772 65.655 301.084 63.9657V63.9657C297.671 60.5556 293.044 58.6398 288.219 58.6391H239.519C237.131 58.6399 234.766 58.1699 232.559 57.2559C230.352 56.3419 228.348 55.0019 226.659 53.3126L221.683 48.3322H456.687C465.39 48.332 473.737 44.8752 479.892 38.722L493.903 24.7068C496.981 21.6309 500.639 19.1973 504.665 17.5475C508.691 15.8977 513.005 15.0646 517.356 15.0966L633.531 15.962Z" fill="#3C3C3C"/>
                    </g>
                    <g opacity="0.24">
                    <path opacity="0.24" d="M881.468 15.9619L898.426 32.9193C900.114 34.6087 902.119 35.9486 904.326 36.8626C906.532 37.7766 908.897 38.2466 911.286 38.2459H969.562C971.95 38.2452 974.315 38.7152 976.522 39.6292C978.728 40.5431 980.733 41.8831 982.421 43.5724L1002.81 63.9656C1004.5 65.6549 1006.51 66.9949 1008.71 67.9088C1010.92 68.8228 1013.29 69.2929 1015.67 69.2921H1201.06C1203.44 69.2929 1205.81 68.8228 1208.02 67.9088C1210.22 66.9949 1212.23 65.6549 1213.92 63.9656V63.9656C1217.33 60.5555 1221.96 58.6397 1226.78 58.639H1275.48C1277.87 58.6397 1280.23 58.1697 1282.44 57.2558C1284.65 56.3418 1286.65 55.0018 1288.34 53.3125L1293.32 48.3364H1058.31C1049.61 48.3362 1041.26 44.8794 1035.11 38.7262L1021.1 24.698C1018.02 21.6221 1014.36 19.1886 1010.33 17.5387C1006.31 15.8889 1001.99 15.0558 997.644 15.0878L881.468 15.9619Z" fill="#3C3C3C"/>
                    </g>
                    <g opacity="0.24">
                    <g opacity="0.5">
                    <path opacity="0.5" d="M0.491294 97.2016H416.857L413.72 94.0645C411.226 91.5713 407.844 90.1705 404.317 90.1702H263.257C261.511 90.171 259.781 89.8274 258.168 89.1592C256.555 88.4909 255.089 87.5112 253.854 86.2759L251.907 84.3288C249.413 81.8355 246.031 80.4348 242.505 80.4345H193.359C191.612 80.4352 189.883 80.0917 188.27 79.4234C186.656 78.7552 185.19 77.7754 183.956 76.5402L180.494 73.0786C178 70.5853 174.618 69.1846 171.092 69.1843H134.511C130.985 69.1846 127.603 70.5853 125.109 73.0786C123.875 74.3138 122.409 75.2936 120.795 75.9618C119.182 76.6301 117.453 76.9736 115.706 76.9729H93.4049C91.6586 76.9736 89.9293 76.6301 88.3159 75.9618C86.7025 75.2936 85.2367 74.3138 84.0024 73.0786L80.5408 69.617C78.0468 67.1237 74.6647 65.723 71.1382 65.7227H0.0585938L0.491294 97.2016Z" fill="#3C3C3C"/>
                    </g>
                    <g opacity="0.5">
                    <path opacity="0.5" d="M1514.94 65.7227H1443.86C1440.33 65.723 1436.95 67.1237 1434.46 69.617L1431 73.0786C1429.76 74.3138 1428.3 75.2936 1426.68 75.9618C1425.07 76.6301 1423.34 76.9736 1421.59 76.9729H1399.29C1397.55 76.9736 1395.82 76.6301 1394.2 75.9618C1392.59 75.2936 1391.13 74.3138 1389.89 73.0786C1387.4 70.5853 1384.01 69.1846 1380.49 69.1843H1343.91C1340.38 69.1846 1337 70.5853 1334.51 73.0786L1331.04 76.5402C1329.81 77.7754 1328.34 78.7552 1326.73 79.4234C1325.12 80.0917 1323.39 80.4352 1321.64 80.4345H1272.51C1268.99 80.4348 1265.6 81.8355 1263.11 84.3288L1261.16 86.2759C1259.93 87.5112 1258.46 88.4909 1256.85 89.1592C1255.24 89.8274 1253.51 90.171 1251.76 90.1702H1110.7C1107.17 90.1705 1103.79 91.5713 1101.3 94.0645L1098.16 97.2016H1514.51L1514.94 65.7227Z" fill="#3C3C3C"/>
                    </g>
                    <path opacity="0.24" d="M1035.08 97.3919L1031.03 93.3418C1030 92.3192 1028.79 91.5081 1027.45 90.955C1026.12 90.4018 1024.68 90.1175 1023.24 90.1182H916.231C914.784 90.119 913.352 89.8344 912.015 89.2805C910.678 88.7266 909.464 87.9143 908.442 86.8903L897.322 75.7569C896.3 74.7329 895.086 73.9206 893.749 73.3667C892.413 72.8128 890.98 72.5281 889.533 72.529H867.609C864.688 72.5285 861.887 71.3691 859.82 69.3053L841.067 50.5521C839.003 48.4838 836.203 47.3242 739.382 47.3242H681.703C680.257 47.3234 678.824 47.608 677.487 48.1619C676.151 48.7159 674.937 49.5281 673.915 50.5521L655.162 69.3053C653.095 71.3691 650.294 72.5285 647.373 72.529H625.448C624.001 72.5281 622.569 72.8128 621.232 73.3667C619.896 73.9206 618.681 74.7329 617.659 75.7569L606.53 86.8816C605.508 87.9056 604.294 88.7179 602.958 89.2718C601.621 89.8257 600.189 90.1104 598.742 90.1096H491.735C490.289 90.1089 488.856 90.3932 487.52 90.9463C486.184 91.4994 484.969 92.3105 483.947 93.3332L479.896 97.3832L711.668 97.3054L1035.08 97.3919Z" fill="#3C3C3C"/>
                    </g>
                    <path style="mix-blend-mode:overlay" d="M1122.91 63.1263C1266.3 63.1263 1382.53 49.0811 1382.53 31.7555C1382.53 14.4299 1266.3 0.384766 1122.91 0.384766C979.531 0.384766 863.295 14.4299 863.295 31.7555C863.295 49.0811 979.531 63.1263 1122.91 63.1263Z" fill="url(#paint2_radial_289_23142)"/>
                    <path style="mix-blend-mode:overlay" d="M453.528 63.1263C596.912 63.1263 713.148 49.0811 713.148 31.7555C713.148 14.4299 596.912 0.384766 453.528 0.384766C310.144 0.384766 193.908 14.4299 193.908 31.7555C193.908 49.0811 310.144 63.1263 453.528 63.1263Z" fill="url(#paint3_radial_289_23142)"/>
                    <defs>
                    <linearGradient id="paint0_linear_289_23142" x1="1136.11" y1="14.772" x2="1136.11" y2="49.0637" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#411C1C"/>
                    <stop offset="1" stop-color="#BC0000" stop-opacity="0.53"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_289_23142" x1="380.393" y1="14.772" x2="380.393" y2="49.0637" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#411C1C"/>
                    <stop offset="1" stop-color="#BC0000" stop-opacity="0.53"/>
                    </linearGradient>
                    <radialGradient id="paint2_radial_289_23142" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-469520 -5942.53) rotate(180) scale(221897 3485.63)">
                    <stop stop-color="white"/>
                    <stop offset="1" stop-color="white" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="paint3_radial_289_23142" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1.27211e+06 -5942.53) rotate(180) scale(221897 3485.63)">
                    <stop stop-color="white"/>
                    <stop offset="1" stop-color="white" stop-opacity="0"/>
                    </radialGradient>
                    </defs>
                </svg>
            </div>
            <div>
                <div class="afk-dialog">
                    <svg height="280" viewBox="0 0 531 222" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group 311">
                        <g id="Group 310">
                        <g id="Group 293">
                        <path id="Vector" d="M361.467 22.2657H359.045V18.0273H361.463L361.467 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'"/>
                        <path id="Vector_2" d="M365.1 22.2657H363.283V18.0273H365.096L365.1 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.9"/>
                        <path id="Vector_3" d="M369.338 22.2657H366.916V18.0273H369.334L369.338 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.8"/>
                        <path id="Vector_4" d="M372.971 22.2657H371.154V18.0273H372.968L372.971 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.7"/>
                        <path id="Vector_5" d="M377.209 22.2657H374.787V18.0273H377.205L377.209 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.6"/>
                        <path id="Vector_6" d="M380.842 22.2657H379.025V18.0273H380.839L380.842 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.5"/>
                        <path id="Vector_7" d="M385.081 22.2657H382.659V18.0273H385.076L385.081 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.4"/>
                        <path id="Vector_8" d="M388.713 22.2657H386.897V18.0273H388.71L388.713 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.3"/>
                        <path id="Vector_9" d="M392.952 22.2657H390.53V18.0273H392.947L392.952 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.2"/>
                        <path id="Vector_10" d="M396.584 22.2657H394.768V18.0273H396.581L396.584 22.2657Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.1"/>
                        </g>
                        <g id="Group 294">
                        <path id="Vector_11" d="M170.137 18.0278L172.559 18.0278L172.559 22.2661L170.141 22.2661L170.137 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'"/>
                        <path id="Vector_12" d="M166.504 18.0278L168.321 18.0278L168.321 22.2661L166.508 22.2661L166.504 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.9"/>
                        <path id="Vector_13" d="M162.266 18.0278L164.688 18.0278L164.688 22.2661L162.27 22.2661L162.266 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.8"/>
                        <path id="Vector_14" d="M158.633 18.0278L160.45 18.0278L160.45 22.2661L158.636 22.2661L158.633 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.7"/>
                        <path id="Vector_15" d="M154.395 18.0278L156.817 18.0278L156.817 22.2661L154.399 22.2661L154.395 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.6"/>
                        <path id="Vector_16" d="M150.762 18.0278L152.579 18.0278L152.579 22.2661L150.765 22.2661L150.762 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.5"/>
                        <path id="Vector_17" d="M146.523 18.0278L148.945 18.0278L148.945 22.2661L146.528 22.2661L146.523 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.4"/>
                        <path id="Vector_18" d="M142.891 18.0278L144.707 18.0278L144.707 22.2661L142.894 22.2661L142.891 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.3"/>
                        <path id="Vector_19" d="M138.652 18.0278L141.074 18.0278L141.074 22.2661L138.657 22.2661L138.652 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.2"/>
                        <path id="Vector_20" d="M135.02 18.0278L136.836 18.0278L136.836 22.2661L135.023 22.2661L135.02 18.0278Z" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" fill-opacity="0.1"/>
                        </g>
                        <g id="Group 309">
                        <g id="Group 292">
                        <path id="Vector_21" d="M17.1044 133.275V122.37V66.731H15.8251V123.652L10.644 128.842V139.99L17.1044 133.519V133.275Z" fill="url(#paint0_linear_289_23253)"/>
                        <path id="Vector_22" d="M28.9495 15L15.8242 28.1474V51.5846H17.1035V37.0149L29.5508 24.5466V16.2814H96.495L105.731 25.5333H425.971L434.657 16.8453L435.233 16.2814H501.448V24.5466L513.895 37.0277V51.5846H515.175V28.1474L502.049 15H28.9495ZM424.922 24.1814H106.793L100.115 16.2814H431.6L424.922 24.1814Z" fill="url(#paint1_linear_289_23253)"/>
                        <path id="Vector_23" d="M502.05 221.708L515.175 208.561V185.136H513.896V199.68L501.449 212.161V220.427H434.492L425.256 211.175H105.016L96.3038 219.863L95.7537 220.427H29.5259V212.161L17.0786 199.68V185.136H15.7993V208.561L28.9246 221.708H502.05ZM99.3868 220.427L106.077 213.738H424.194L430.884 220.427H99.3868Z" fill="url(#paint2_linear_289_23253)"/>
                        <path id="Vector_24" d="M17.1044 181.989V164.35V153.445V153.202L10.644 146.73V157.879L15.8251 163.069V181.989H17.1044Z" fill="url(#paint3_linear_289_23253)"/>
                        <path id="Vector_25" d="M520.356 128.842L515.175 123.652V66.731H513.896V122.37V133.275V133.519L520.356 139.99V128.842Z" fill="url(#paint4_linear_289_23253)"/>
                        <path id="Vector_26" d="M520.356 157.879V146.73L513.896 153.202V153.445V164.35V180.989H515.175V163.069L520.356 157.879Z" fill="url(#paint5_linear_289_23253)"/>
                        <path id="Vector_27" d="M2.55854 105.404L10.49 97.4596L10.4516 93.8716L0 104.341V181.649L11.2064 192.874V189.261L2.55854 180.598V105.404Z" fill="url(#paint6_linear_289_23253)"/>
                        <path id="Vector_28" d="M520.51 97.4593L528.442 105.404V180.598L519.794 189.261L519.768 192.913L531 181.649V104.341L520.523 93.8457L520.51 97.4593Z" fill="url(#paint7_linear_289_23253)"/>
                        </g>
                        <text id="Match cancelled" :fill="$store.state.matchState.dodgedBy === this.$store.state.address ? '#DB0000' : '#FBC115'" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="28" letter-spacing="0em"><tspan x="181.166" y="19.756">match cancelled</tspan></text>
                        </g>
                        </g>
                        <text id="You were disconnected from the match due to inactivity. make sure to stay active during matchmaking to avoid future penalties" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em" x="50%" text-anchor="middle">
                            <tspan x="50%" :y="$store.state.matchState.dodgedBy === this.$store.state.address ? '83.6553' : '105'">{{ $store.state.matchState.dodgedBy === this.$store.state.address ? 'YOU WERE DISCONNECTED FROM THE MATCH DUE TO INACTIVITY.' : 'YOU WERE DISCONNECTED FROM THE MATCH DUE TO ENEMY INACTIVITY.' }}&#10;</tspan>
                            <tspan x="50%" y="99.6553"> {{ $store.state.matchState.dodgedBy === this.$store.state.address ? 'MAKE SURE TO STAY ACTIVE DURING MATCHMAKING TO AVOID' : '' }} </tspan>
                            <tspan x="50%" y="115.655">{{ $store.state.matchState.dodgedBy === this.$store.state.address ? 'FUTURE PENALTIES' : '' }}</tspan>
                        </text>
                        <g id="Group 287">
                        <g @click="continueBtn" style="cursor: pointer" id="Group 135">
                        <path id="Rectangle 5" d="M193.25 154.25L339.75 154.25L339.75 184.566L334.767 189.75L200.103 189.75L193.25 182.896L193.25 154.25Z" fill="url(#paint8_linear_289_23253)" stroke="#FBC115" stroke-width="0.5"/>
                        <text id="Accept" fill="#FBC115" xml:space="preserve" style="white-space: pre; cursor: pointer" font-family="Anson" font-size="18" letter-spacing="0em" x="50%" text-anchor="middle" y="174.736">{{ $store.state.matchState.dodgedBy === this.$store.state.address ? 'ACCEPT' : 'NEW MATCH'}}</text>
                        </g>
                        </g>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear_289_23253" x1="13.8742" y1="66.731" x2="13.8742" y2="139.99" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#252525" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#494949"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_289_23253" x1="265.499" y1="15" x2="265.499" y2="51.5846" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#252525" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#494949"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_289_23253" x1="265.487" y1="185.136" x2="265.487" y2="221.708" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#252525" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#494949"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_289_23253" x1="13.8742" y1="146.73" x2="13.8742" y2="219.989" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#252525" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#494949"/>
                        </linearGradient>
                        <linearGradient id="paint4_linear_289_23253" x1="517.126" y1="66.731" x2="517.126" y2="139.99" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#252525" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#494949"/>
                        </linearGradient>
                        <linearGradient id="paint5_linear_289_23253" x1="517.126" y1="146.73" x2="517.126" y2="219.989" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#252525" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#494949"/>
                        </linearGradient>
                        <linearGradient id="paint6_linear_289_23253" x1="5.60321" y1="93.8716" x2="5.60321" y2="192.874" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#252525" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#494949"/>
                        </linearGradient>
                        <linearGradient id="paint7_linear_289_23253" x1="525.384" y1="93.8457" x2="525.384" y2="192.913" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#252525" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#494949"/>
                        </linearGradient>
                        <linearGradient id="paint8_linear_289_23253" x1="246.5" y1="190" x2="246.5" y2="154" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FBC115" stop-opacity="0"/>
                        <stop offset="1" stop-color="#FBC115" stop-opacity="0.12"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <center>
                        <div v-if="loading" class="loading-box">
                            <b-button class="loader-fake-btn" :loading="true" ></b-button>
                            <h1 class="loading-text">Cleaning up the battlefield! Be catious next time.</h1>
                        </div>
                    </center>
                </div>
            </div>
        </div>
        <!-- Victory -->
        <div class="end-wrapper" v-if="$store.state.matchState.playerIs === $store.state.matchState.winner && $store.state.matchState.type === 'matchmaking'">
            <center>
                <svg class="svg-ores" viewBox="0 0 531 253" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Group 370">
                    <g id="Group 316">
                    <g id="Group 311">
                    <g id="Group 310">
                    <g id="Group 293">
                    <path id="Vector" d="M341.467 23.2657H339.045V19.0273H341.463L341.467 23.2657Z" fill="#FBC115"/>
                    <path id="Vector_2" d="M345.1 23.2657H343.283V19.0273H345.096L345.1 23.2657Z" fill="#FBC115" fill-opacity="0.9"/>
                    <path id="Vector_3" d="M349.338 23.2657H346.916V19.0273H349.334L349.338 23.2657Z" fill="#FBC115" fill-opacity="0.8"/>
                    <path id="Vector_4" d="M352.971 23.2657H351.154V19.0273H352.968L352.971 23.2657Z" fill="#FBC115" fill-opacity="0.7"/>
                    <path id="Vector_5" d="M357.209 23.2657H354.787V19.0273H357.205L357.209 23.2657Z" fill="#FBC115" fill-opacity="0.6"/>
                    <path id="Vector_6" d="M360.842 23.2657H359.025V19.0273H360.839L360.842 23.2657Z" fill="#FBC115" fill-opacity="0.5"/>
                    <path id="Vector_7" d="M365.08 23.2657H362.658V19.0273H365.076L365.08 23.2657Z" fill="#FBC115" fill-opacity="0.4"/>
                    <path id="Vector_8" d="M368.713 23.2657H366.896V19.0273H368.71L368.713 23.2657Z" fill="#FBC115" fill-opacity="0.3"/>
                    <path id="Vector_9" d="M372.951 23.2657H370.529V19.0273H372.947L372.951 23.2657Z" fill="#FBC115" fill-opacity="0.2"/>
                    <path id="Vector_10" d="M376.584 23.2657H374.768V19.0273H376.581L376.584 23.2657Z" fill="#FBC115" fill-opacity="0.1"/>
                    </g>
                    <g id="Group 294">
                    <path id="Vector_11" d="M190.137 19.0278L192.559 19.0278L192.559 23.2661L190.141 23.2661L190.137 19.0278Z" fill="#FBC115"/>
                    <path id="Vector_12" d="M186.504 19.0278L188.32 19.0278L188.32 23.2661L186.507 23.2661L186.504 19.0278Z" fill="#FBC115" fill-opacity="0.9"/>
                    <path id="Vector_13" d="M182.266 19.0278L184.688 19.0278L184.688 23.2661L182.27 23.2661L182.266 19.0278Z" fill="#FBC115" fill-opacity="0.8"/>
                    <path id="Vector_14" d="M178.633 19.0278L180.449 19.0278L180.449 23.2661L178.636 23.2661L178.633 19.0278Z" fill="#FBC115" fill-opacity="0.7"/>
                    <path id="Vector_15" d="M174.395 19.0278L176.816 19.0278L176.816 23.2661L174.399 23.2661L174.395 19.0278Z" fill="#FBC115" fill-opacity="0.6"/>
                    <path id="Vector_16" d="M170.762 19.0278L172.578 19.0278L172.578 23.2661L170.765 23.2661L170.762 19.0278Z" fill="#FBC115" fill-opacity="0.5"/>
                    <path id="Vector_17" d="M166.523 19.0278L168.945 19.0278L168.945 23.2661L166.528 23.2661L166.523 19.0278Z" fill="#FBC115" fill-opacity="0.4"/>
                    <path id="Vector_18" d="M162.891 19.0278L164.707 19.0278L164.707 23.2661L162.894 23.2661L162.891 19.0278Z" fill="#FBC115" fill-opacity="0.3"/>
                    <path id="Vector_19" d="M158.652 19.0278L161.074 19.0278L161.074 23.2661L158.657 23.2661L158.652 19.0278Z" fill="#FBC115" fill-opacity="0.2"/>
                    <path id="Vector_20" d="M155.02 19.0278L156.836 19.0278L156.836 23.2661L155.023 23.2661L155.02 19.0278Z" fill="#FBC115" fill-opacity="0.1"/>
                    </g>
                    <g id="Group 309">
                    <g id="Group 292">
                    <path id="Vector_21" d="M17.1039 134.275V123.37V67.731H15.8246V124.652L10.6436 129.842V140.99L17.1039 134.519V134.275Z" fill="url(#paint0_linear_481_1290)"/>
                    <path id="Vector_22" d="M28.9495 16L15.8242 29.1474V52.5846H17.1035V38.0149L29.5508 25.5466V17.2814H96.495L105.731 26.5333H425.971L434.657 17.8453L435.233 17.2814H501.448V25.5466L513.895 38.0277V52.5846H515.175V29.1474L502.049 16H28.9495ZM424.922 25.1814H106.793L100.115 17.2814H431.6L424.922 25.1814Z" fill="url(#paint1_linear_481_1290)"/>
                    <path id="Vector_23" d="M502.05 252.708L515.175 239.561V216.136H513.896V230.68L501.448 243.161V251.427H434.491L425.255 242.175H105.015L96.3033 250.863L95.7533 251.427H29.5254V243.161L17.0781 230.68V216.136H15.7988V239.561L28.9242 252.708H502.05ZM99.3863 251.427L106.077 244.738H424.193L430.884 251.427H99.3863Z" fill="url(#paint2_linear_481_1290)"/>
                    <path id="Vector_24" d="M17.1039 202.989V165.35V154.445V154.202L10.6436 147.73V158.879L15.8246 164.069V202.989H17.1039Z" fill="url(#paint3_linear_481_1290)"/>
                    <path id="Vector_25" d="M520.357 129.842L515.176 124.652V67.731H513.896V123.37V134.275V134.519L520.357 140.99V129.842Z" fill="url(#paint4_linear_481_1290)"/>
                    <path id="Vector_26" d="M520.357 158.879V147.73L513.896 154.202V154.445V165.35V201.989H515.176V164.069L520.357 158.879Z" fill="url(#paint5_linear_481_1290)"/>
                    <path id="Vector_27" d="M2.55854 106.404L10.49 98.4596L10.4516 94.8716L0 105.341V182.649L11.2064 193.874V190.261L2.55854 181.598V106.404Z" fill="url(#paint6_linear_481_1290)"/>
                    <path id="Vector_28" d="M520.511 98.4593L528.442 106.404V181.598L519.794 190.261L519.769 193.913L531.001 182.649V105.341L520.523 94.8457L520.511 98.4593Z" fill="url(#paint7_linear_481_1290)"/>
                    </g>
                    </g>
                    </g>
                    <text id="Rewards" fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em" x="50%" text-anchor="middle" y="67.5"> {{ $store.state.profile.elo >= CONSTANTS.economicPolicy.minRewardsElo ? 'Match Rewards' : `Reach ${CONSTANTS.economicPolicy.minRewardsElo} Elo to become eligible for rewards` }}</text>
                    <g @click="continueBtn()" id="Group 287" style="cursor: pointer">
                    <g id="Group 135">
                    <path id="Rectangle 5" d="M329.25 217.896L329.25 189.25L475.75 189.25L475.75 219.566L470.768 224.75L336.104 224.75L329.25 217.896Z" fill="url(#paint8_linear_481_1290)" stroke="#FBC115" stroke-width="0.5"/>
                    <text id="Continue" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan x="372.24" y="209.736">CONTINUE</tspan></text>
                    </g>
                    </g>
                    <g v-if="$store.state.profile.elo < CONSTANTS.economicPolicy.minRewardsElo" id="Group 311_2" style="cursor: not-allowed">
                        <g id="Group 135_2">
                            <path id="Rectangle 5_2" d="M54.25 217.896L54.25 189.25L200.75 189.25L200.75 219.566L195.768 224.75L61.1035 224.75L54.25 217.896Z" stroke="#7A7A7A" stroke-width="0.5"/>
                            <text id="CLAIM" fill="#7A7A7A" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan x="109.378" y="209.736">CLAIM</tspan></text>
                        </g>
                    </g>
                    <g v-else @click="claimBtn" id="Group 311_2" style="cursor: pointer">
                        <g id="Group 135_2">
                            <path id="Rectangle 5_2" d="M54.25 217.896L54.25 189.25L200.75 189.25L200.75 219.566L195.768 224.75L61.1035 224.75L54.25 217.896Z" fill="url(#paint8_linear_481_1290)" stroke="#FBC115" stroke-width="0.5"/>
                            <text id="CLAIM" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan x="109.378" y="209.736">CLAIM</tspan></text>
                        </g>
                    </g>

                    </g>
                    </g>
                    <g id="VictoryWrapper">
                    <g id="VictoryBox">
                    <g id="Bottom">
                    <path id="Vector_73" d="M298.383 41.2958H271.213V40.5825H298.096L314.594 23.8862L315.083 24.3819L298.383 41.2958Z" fill="url(#paint13_linear_481_1290)"/>
                    <path id="Vector_74" d="M360.768 41.1991H302.692L319.787 23.8863L320.288 24.3819L304.376 40.4858H360.076V25.3975H332.799L329.313 21.8672H313.938V21.166H329.6L333.085 24.6963H360.768V41.1991Z" fill="url(#paint14_linear_481_1290)"/>
                    <path id="Vector_75" d="M372.001 41.2834H364.684V23.2451L372.001 31.0311V41.2834ZM365.376 40.5821H371.345V31.3212L365.376 25.0103V40.5821Z" fill="url(#paint15_linear_481_1290)"/>
                    <path id="Vector_76" d="M290.396 40.9329L293.715 37.584H301.558L298.239 40.9329H290.396Z" fill="url(#paint16_linear_481_1290)"/>
                    <path id="Vector_77" d="M310.13 34.1631V37.5845L306.942 40.8247H303.54L310.13 34.1631Z" fill="url(#paint17_linear_481_1290)"/>
                    <path id="Vector_78" d="M339.65 25.0469L341.787 27.211H360.422V25.0469H339.65Z" fill="url(#paint18_linear_481_1290)"/>
                    <path id="Vector_79" d="M358.834 32.5303H355.957V38.1037H358.834V32.5303Z" fill="url(#paint19_linear_481_1290)"/>
                    <path id="Vector_80" d="M365.019 34.8521L367.812 37.669V40.8487H365.019V34.8521Z" fill="url(#paint20_linear_481_1290)"/>
                    <path id="Vector_81" d="M320.3 21.5167L321.482 20.3198H331.103L335.842 25.1075H332.942L329.42 21.553L320.3 21.5167Z" fill="url(#paint21_linear_481_1290)"/>
                    <path id="Vector_82" d="M313.293 39.4703H310.798V38.757H313.006L324.645 26.9692L325.135 27.477L313.293 39.4703Z" fill="url(#paint22_linear_481_1290)"/>
                    <path id="Vector_83" d="M318.199 39.4703H315.692V38.757H317.901L329.54 26.9692L330.029 27.477L318.199 39.4703Z" fill="url(#paint23_linear_481_1290)"/>
                    <path id="Vector_84" d="M323.654 39.4703H321.147V38.757H323.368L335.007 26.9692L335.496 27.477L323.654 39.4703Z" fill="url(#paint24_linear_481_1290)"/>
                    <path id="Vector_85" d="M328.549 39.4703H326.054V38.757H328.262L339.901 26.9692L340.391 27.477L328.549 39.4703Z" fill="url(#paint25_linear_481_1290)"/>
                    <path id="Vector_86" d="M232.249 41.2958H259.419V40.5825H232.536L216.05 23.8862L215.561 24.3819L232.249 41.2958Z" fill="url(#paint26_linear_481_1290)"/>
                    <path id="Vector_87" d="M169.863 41.1991H227.939L210.845 23.8863L210.355 24.3819L226.256 40.4858H170.568V25.3975H197.845L201.331 21.8672H216.706V21.166H201.044L197.558 24.6963H169.863V41.1991Z" fill="url(#paint27_linear_481_1290)"/>
                    <path id="Vector_88" d="M158.643 31.0311L165.972 23.2451V41.2834H158.643V31.0311ZM165.268 24.9861L159.299 31.297V40.558H165.268V24.9861Z" fill="url(#paint28_linear_481_1290)"/>
                    <path id="Vector_89" d="M240.247 40.9329L236.929 37.584H229.086L232.393 40.9329H240.247Z" fill="url(#paint29_linear_481_1290)"/>
                    <path id="Vector_90" d="M220.503 34.1631V37.5845L223.702 40.8247H227.104L220.503 34.1631Z" fill="url(#paint30_linear_481_1290)"/>
                    <path id="Vector_91" d="M190.981 25.0469L188.844 27.211H170.21V25.0469H190.981Z" fill="url(#paint31_linear_481_1290)"/>
                    <path id="Vector_92" d="M174.687 32.5303H171.81V38.1037H174.687V32.5303Z" fill="url(#paint32_linear_481_1290)"/>
                    <path id="Vector_93" d="M165.614 34.8521L162.82 37.669V40.8487H165.614V34.8521Z" fill="url(#paint33_linear_481_1290)"/>
                    <path id="Vector_94" d="M210.343 21.5167L209.162 20.3198H199.528L194.801 25.1075H197.702L201.211 21.553L210.343 21.5167Z" fill="url(#paint34_linear_481_1290)"/>
                    <path id="Vector_95" d="M217.34 39.4703H219.847V38.757H217.638L205.999 26.9692L205.51 27.477L217.34 39.4703Z" fill="url(#paint35_linear_481_1290)"/>
                    <path id="Vector_96" d="M212.445 39.4703H214.951V38.757H212.731L201.104 26.9692L200.603 27.477L212.445 39.4703Z" fill="url(#paint36_linear_481_1290)"/>
                    <path id="Vector_97" d="M206.978 39.4703H209.484V38.757H207.276L195.637 26.9692L195.147 27.477L206.978 39.4703Z" fill="url(#paint37_linear_481_1290)"/>
                    <path id="Vector_98" d="M202.083 39.4703H204.59V38.757H202.369L190.742 26.9692L190.253 27.477L202.083 39.4703Z" fill="url(#paint38_linear_481_1290)"/>
                    </g>
                    <g id="Top">
                    <path id="Vector_99" d="M232.26 0.000106344L259.43 0.000108719L259.43 0.713417L232.546 0.713415L216.049 17.4097L215.559 16.914L232.26 0.000106344Z" fill="url(#paint39_linear_481_1290)"/>
                    <path id="Vector_100" d="M169.874 0.0967967L227.95 0.0968018L210.856 17.4096L210.354 16.9139L226.267 0.810112L170.567 0.810107L170.567 15.8984L197.844 15.8984L201.33 19.4287L216.705 19.4287L216.705 20.1299L201.043 20.1299L197.557 16.5996L169.874 16.5996L169.874 0.0967967Z" fill="url(#paint40_linear_481_1290)"/>
                    <path id="Vector_101" d="M158.641 0.0125268L165.959 0.0125275L165.959 18.0508L158.641 10.2648L158.641 0.0125268ZM165.267 0.713766L159.298 0.713766L159.298 9.97465L165.267 16.2856L165.267 0.713766Z" fill="url(#paint41_linear_481_1290)"/>
                    <path id="Vector_102" d="M240.246 0.362991L236.927 3.71191L229.085 3.71191L232.403 0.36299L240.246 0.362991Z" fill="url(#paint42_linear_481_1290)"/>
                    <path id="Vector_103" d="M220.513 7.13281L220.513 3.71135L223.7 0.47124L227.103 0.47124L220.513 7.13281Z" fill="url(#paint43_linear_481_1290)"/>
                    <path id="Vector_104" d="M190.992 16.249L188.855 14.0849L170.221 14.0849L170.221 16.249L190.992 16.249Z" fill="url(#paint44_linear_481_1290)"/>
                    <path id="Vector_105" d="M171.809 8.76562L174.686 8.76562L174.686 3.19215L171.809 3.19215L171.809 8.76562Z" fill="url(#paint45_linear_481_1290)"/>
                    <path id="Vector_106" d="M165.624 6.44385L162.831 3.62688L162.831 0.447219L165.624 0.447219L165.624 6.44385Z" fill="url(#paint46_linear_481_1290)"/>
                    <path id="Vector_107" d="M210.343 19.7792L209.161 20.9761L199.539 20.9761L194.8 16.1884L197.701 16.1884L201.223 19.7429L210.343 19.7792Z" fill="url(#paint47_linear_481_1290)"/>
                    <path id="Vector_108" d="M217.35 1.82563L219.845 1.82563L219.845 2.53894L217.636 2.53894L205.997 14.3267L205.508 13.8189L217.35 1.82563Z" fill="url(#paint48_linear_481_1290)"/>
                    <path id="Vector_109" d="M212.443 1.82563L214.95 1.82563L214.95 2.53894L212.742 2.53894L201.103 14.3267L200.613 13.8189L212.443 1.82563Z" fill="url(#paint49_linear_481_1290)"/>
                    <path id="Vector_110" d="M206.988 1.82563L209.495 1.82563L209.495 2.53894L207.275 2.53894L195.636 14.3267L195.146 13.8189L206.988 1.82563Z" fill="url(#paint50_linear_481_1290)"/>
                    <path id="Vector_111" d="M202.094 1.82563L204.589 1.82563L204.589 2.53894L202.38 2.53894L190.741 14.3267L190.252 13.8189L202.094 1.82563Z" fill="url(#paint51_linear_481_1290)"/>
                    <path id="Vector_112" d="M298.393 0.00010726L271.224 0.000104885L271.224 0.713413L298.107 0.713416L314.593 17.4097L315.082 16.914L298.393 0.00010726Z" fill="url(#paint52_linear_481_1290)"/>
                    <path id="Vector_113" d="M360.779 0.0968018L302.703 0.0967967L319.798 17.4096L320.287 16.9139L304.387 0.810107L360.075 0.810112L360.075 15.8984L332.798 15.8984L329.312 19.4287L313.937 19.4287L313.937 20.1299L329.599 20.1299L333.084 16.5996L360.779 16.5996L360.779 0.0968018Z" fill="url(#paint53_linear_481_1290)"/>
                    <path id="Vector_114" d="M372 10.2648L364.67 18.0508L364.67 0.0125268L372 0.0125275L372 10.2648ZM365.375 16.3098L371.343 9.99886L371.343 0.737934L365.375 0.737934L365.375 16.3098Z" fill="url(#paint54_linear_481_1290)"/>
                    <path id="Vector_115" d="M290.395 0.36299L293.714 3.71191L301.557 3.71191L298.25 0.362991L290.395 0.36299Z" fill="url(#paint55_linear_481_1290)"/>
                    <path id="Vector_116" d="M310.14 7.13281L310.14 3.71135L306.94 0.47124L303.538 0.471239L310.14 7.13281Z" fill="url(#paint56_linear_481_1290)"/>
                    <path id="Vector_117" d="M339.661 16.249L341.798 14.0849L360.433 14.0849L360.433 16.249L339.661 16.249Z" fill="url(#paint57_linear_481_1290)"/>
                    <path id="Vector_118" d="M355.956 8.76562L358.833 8.76562L358.833 3.19215L355.956 3.19215L355.956 8.76562Z" fill="url(#paint58_linear_481_1290)"/>
                    <path id="Vector_119" d="M365.029 6.44385L367.822 3.62688L367.822 0.447219L365.029 0.447219L365.029 6.44385Z" fill="url(#paint59_linear_481_1290)"/>
                    <path id="Vector_120" d="M320.299 19.7792L321.481 20.9761L331.115 20.9761L335.842 16.1884L332.941 16.1884L329.431 19.7429L320.299 19.7792Z" fill="url(#paint60_linear_481_1290)"/>
                    <path id="Vector_121" d="M313.303 1.82563L310.796 1.82563L310.796 2.53894L313.004 2.53894L324.643 14.3267L325.133 13.8189L313.303 1.82563Z" fill="url(#paint61_linear_481_1290)"/>
                    <path id="Vector_122" d="M318.198 1.82563L315.691 1.82563L315.691 2.53894L317.912 2.53894L329.539 14.3267L330.04 13.8189L318.198 1.82563Z" fill="url(#paint62_linear_481_1290)"/>
                    <path id="Vector_123" d="M323.665 1.82563L321.158 1.82563L321.158 2.53894L323.367 2.53894L335.006 14.3267L335.495 13.8189L323.665 1.82563Z" fill="url(#paint63_linear_481_1290)"/>
                    <path id="Vector_124" d="M328.56 1.82563L326.053 1.82563L326.053 2.53894L328.273 2.53894L339.9 14.3267L340.39 13.8189L328.56 1.82563Z" fill="url(#paint64_linear_481_1290)"/>
                    </g>
                    </g>
                    <g id="Victory">
                    <path id="Vector_125" d="M198.985 9.23389H208.116L209.81 21.9793L216.102 9.23389H222.615L211.449 31.8727H204.607L201.989 12.2866L198.985 9.23389Z" fill="url(#paint65_linear_481_1290)"/>
                    <path id="Vector_126" d="M221.966 9.23389H230.767L227.566 31.8504H221.042L223.957 11.2059L221.966 9.23389Z" fill="url(#paint66_linear_481_1290)"/>
                    <path id="Vector_127" d="M249.346 9.23389L248.026 18.637L244.561 15.1276H237.96L236.453 25.9567H244.154L247.366 23.3497L246.167 31.8504H229.094L231.822 12.5094L235.694 9.23389H249.346Z" fill="url(#paint67_linear_481_1290)"/>
                    <path id="Vector_128" d="M248.488 9.23389H269.489L268.653 15.1276H262.217L259.852 31.8392H253.318L255.672 15.1276H249.874L250.435 11.2059L248.488 9.23389Z" fill="url(#paint68_linear_481_1290)"/>
                    <path id="Vector_129" d="M285.967 9.23389L289.378 12.6765L286.947 29.8673L283.426 31.8504H271.711L268.322 28.4189L270.522 12.5094L274.395 9.23389H285.967ZM276.672 15.161L275.143 25.9902H280.929L282.447 15.161H276.672Z" fill="url(#paint69_linear_481_1290)"/>
                    <path id="Vector_130" d="M290.125 9.23389H306.373L309.773 12.6765L308.474 21.8679L306.274 24.1519H303.425L307.77 31.8504H301.06L296.715 24.1519H295.901L294.801 31.8504H288.277L290.994 12.5094H293.415L290.125 9.23389ZM297.122 15.1276L296.693 18.2582H302.446L302.886 15.1276H297.122Z" fill="url(#paint70_linear_481_1290)"/>
                    <path id="Vector_131" d="M308.573 9.23389H317.374L319.717 16.3531L324.403 9.23389H331.4L322.599 22.5475L321.279 31.8504H314.745L315.922 23.5837L312.071 11.8186L308.573 9.23389Z" fill="url(#paint71_linear_481_1290)"/>
                    </g>
                    </g>
                    </g>
                    <foreignObject y="73" width="100%" height="100px">
                        <ResourceItem
                        height="80" width="90" x="0" y="100"
                        v-for="(quantity, rewardSymbol) in $store.state.matchState.potentialRewards" :key="rewardSymbol"
                        :symbol="rewardSymbol" 
                        :quantity="quantity"
                        :disabled="$store.state.profile.elo < CONSTANTS.economicPolicy.minRewardsElo" />
                    </foreignObject>
                    <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_481_1290" transform="translate(-0.0157623) scale(0.00103359 0.000925926)"/>
                    </pattern>
                    <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_481_1290" transform="translate(-0.0157623) scale(0.00103359 0.000925926)"/>
                    </pattern>
                    <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_481_1290" transform="translate(-0.0157623) scale(0.00103359 0.000925926)"/>
                    </pattern>
                    <pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_481_1290" transform="translate(-0.0157623) scale(0.00103359 0.000925926)"/>
                    </pattern>
                    <linearGradient id="paint0_linear_481_1290" x1="13.8737" y1="67.731" x2="13.8737" y2="140.99" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_481_1290" x1="265.499" y1="16" x2="265.499" y2="52.5846" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_481_1290" x1="265.487" y1="216.136" x2="265.487" y2="252.708" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear_481_1290" x1="13.8737" y1="147.73" x2="13.8737" y2="220.989" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint4_linear_481_1290" x1="517.127" y1="67.731" x2="517.127" y2="140.99" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint5_linear_481_1290" x1="517.127" y1="147.73" x2="517.127" y2="220.989" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint6_linear_481_1290" x1="5.60321" y1="94.8716" x2="5.60321" y2="193.874" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint7_linear_481_1290" x1="525.385" y1="94.8457" x2="525.385" y2="193.913" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#494949"/>
                    </linearGradient>
                    <linearGradient id="paint8_linear_481_1290" x1="382.5" y1="225" x2="382.5" y2="189" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115" stop-opacity="0"/>
                    <stop offset="1" stop-color="#FBC115" stop-opacity="0.12"/>
                    </linearGradient>
                    <radialGradient id="paint9_radial_481_1290" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.5754 83.8175) rotate(90) scale(2.00496 2.01193)">
                    <stop stop-color="#616161"/>
                    <stop offset="1" stop-color="#121212"/>
                    </radialGradient>
                    <radialGradient id="paint10_radial_481_1290" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(171.575 83.8175) rotate(90) scale(2.00496 2.01193)">
                    <stop stop-color="#616161"/>
                    <stop offset="1" stop-color="#121212"/>
                    </radialGradient>
                    <radialGradient id="paint11_radial_481_1290" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(279.575 83.8175) rotate(90) scale(2.00496 2.01193)">
                    <stop stop-color="#616161"/>
                    <stop offset="1" stop-color="#121212"/>
                    </radialGradient>
                    <radialGradient id="paint12_radial_481_1290" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(387.575 83.8175) rotate(90) scale(2.00496 2.01193)">
                    <stop stop-color="#616161"/>
                    <stop offset="1" stop-color="#121212"/>
                    </radialGradient>
                    <linearGradient id="paint13_linear_481_1290" x1="293.148" y1="23.8862" x2="293.148" y2="41.2958" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint14_linear_481_1290" x1="331.73" y1="21.166" x2="331.73" y2="41.1991" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint15_linear_481_1290" x1="368.342" y1="23.2451" x2="368.342" y2="41.2834" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint16_linear_481_1290" x1="295.977" y1="37.584" x2="295.977" y2="40.9329" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint17_linear_481_1290" x1="306.835" y1="34.1631" x2="306.835" y2="40.8247" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint18_linear_481_1290" x1="350.036" y1="25.0469" x2="350.036" y2="27.211" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint19_linear_481_1290" x1="357.395" y1="32.5303" x2="357.395" y2="38.1037" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint20_linear_481_1290" x1="366.415" y1="34.8521" x2="366.415" y2="40.8487" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint21_linear_481_1290" x1="328.071" y1="20.3198" x2="328.071" y2="25.1075" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint22_linear_481_1290" x1="317.966" y1="26.9692" x2="317.966" y2="39.4703" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint23_linear_481_1290" x1="322.861" y1="26.9692" x2="322.861" y2="39.4703" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint24_linear_481_1290" x1="328.322" y1="26.9692" x2="328.322" y2="39.4703" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint25_linear_481_1290" x1="333.222" y1="26.9692" x2="333.222" y2="39.4703" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint26_linear_481_1290" x1="237.49" y1="23.8862" x2="237.49" y2="41.2958" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint27_linear_481_1290" x1="198.901" y1="21.166" x2="198.901" y2="41.1991" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint28_linear_481_1290" x1="162.307" y1="23.2451" x2="162.307" y2="41.2834" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint29_linear_481_1290" x1="234.667" y1="37.584" x2="234.667" y2="40.9329" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint30_linear_481_1290" x1="223.804" y1="34.1631" x2="223.804" y2="40.8247" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint31_linear_481_1290" x1="180.596" y1="25.0469" x2="180.596" y2="27.211" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint32_linear_481_1290" x1="173.248" y1="32.5303" x2="173.248" y2="38.1037" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint33_linear_481_1290" x1="164.217" y1="34.8521" x2="164.217" y2="40.8487" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint34_linear_481_1290" x1="202.572" y1="20.3198" x2="202.572" y2="25.1075" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint35_linear_481_1290" x1="212.678" y1="26.9692" x2="212.678" y2="39.4703" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint36_linear_481_1290" x1="207.777" y1="26.9692" x2="207.777" y2="39.4703" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint37_linear_481_1290" x1="202.316" y1="26.9692" x2="202.316" y2="39.4703" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint38_linear_481_1290" x1="197.421" y1="26.9692" x2="197.421" y2="39.4703" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint39_linear_481_1290" x1="237.495" y1="17.4097" x2="237.495" y2="0.000106801" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint40_linear_481_1290" x1="198.912" y1="20.1299" x2="198.912" y2="0.0967992" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint41_linear_481_1290" x1="162.3" y1="18.0508" x2="162.3" y2="0.0125271" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint42_linear_481_1290" x1="234.665" y1="3.71191" x2="234.665" y2="0.362991" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint43_linear_481_1290" x1="223.808" y1="7.13281" x2="223.808" y2="0.47124" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint44_linear_481_1290" x1="180.607" y1="16.249" x2="180.607" y2="14.0849" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint45_linear_481_1290" x1="173.247" y1="8.76562" x2="173.247" y2="3.19215" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint46_linear_481_1290" x1="164.227" y1="6.44385" x2="164.227" y2="0.447219" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint47_linear_481_1290" x1="202.571" y1="20.9761" x2="202.571" y2="16.1884" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint48_linear_481_1290" x1="212.676" y1="14.3267" x2="212.676" y2="1.82563" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint49_linear_481_1290" x1="207.782" y1="14.3267" x2="207.782" y2="1.82563" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint50_linear_481_1290" x1="202.321" y1="14.3267" x2="202.321" y2="1.82563" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint51_linear_481_1290" x1="197.42" y1="14.3267" x2="197.42" y2="1.82563" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint52_linear_481_1290" x1="293.153" y1="17.4097" x2="293.153" y2="0.000106802" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint53_linear_481_1290" x1="331.741" y1="20.1299" x2="331.741" y2="0.0967992" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint54_linear_481_1290" x1="368.335" y1="18.0508" x2="368.335" y2="0.0125271" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint55_linear_481_1290" x1="295.976" y1="3.71191" x2="295.976" y2="0.362991" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint56_linear_481_1290" x1="306.839" y1="7.13281" x2="306.839" y2="0.47124" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint57_linear_481_1290" x1="350.047" y1="16.249" x2="350.047" y2="14.0849" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint58_linear_481_1290" x1="357.395" y1="8.76562" x2="357.395" y2="3.19215" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint59_linear_481_1290" x1="366.426" y1="6.44385" x2="366.426" y2="0.447219" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint60_linear_481_1290" x1="328.07" y1="20.9761" x2="328.07" y2="16.1884" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2F2D29" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#62542A"/>
                    </linearGradient>
                    <linearGradient id="paint61_linear_481_1290" x1="317.964" y1="14.3267" x2="317.964" y2="1.82563" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint62_linear_481_1290" x1="322.866" y1="14.3267" x2="322.866" y2="1.82563" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint63_linear_481_1290" x1="328.327" y1="14.3267" x2="328.327" y2="1.82563" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint64_linear_481_1290" x1="333.221" y1="14.3267" x2="333.221" y2="1.82563" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#252525" stop-opacity="0.82"/>
                    <stop offset="1" stop-color="#FBC115"/>
                    </linearGradient>
                    <linearGradient id="paint65_linear_481_1290" x1="210.8" y1="9.23389" x2="210.8" y2="31.8727" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115"/>
                    <stop offset="1" stop-color="#846300"/>
                    </linearGradient>
                    <linearGradient id="paint66_linear_481_1290" x1="225.904" y1="9.23389" x2="225.904" y2="31.8504" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115"/>
                    <stop offset="1" stop-color="#846300"/>
                    </linearGradient>
                    <linearGradient id="paint67_linear_481_1290" x1="239.22" y1="9.23389" x2="239.22" y2="31.8504" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115"/>
                    <stop offset="1" stop-color="#846300"/>
                    </linearGradient>
                    <linearGradient id="paint68_linear_481_1290" x1="258.988" y1="9.23389" x2="258.988" y2="31.8392" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115"/>
                    <stop offset="1" stop-color="#846300"/>
                    </linearGradient>
                    <linearGradient id="paint69_linear_481_1290" x1="278.85" y1="9.23389" x2="278.85" y2="31.8504" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115"/>
                    <stop offset="1" stop-color="#846300"/>
                    </linearGradient>
                    <linearGradient id="paint70_linear_481_1290" x1="299.025" y1="9.23389" x2="299.025" y2="31.8504" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115"/>
                    <stop offset="1" stop-color="#846300"/>
                    </linearGradient>
                    <linearGradient id="paint71_linear_481_1290" x1="319.986" y1="9.23389" x2="319.986" y2="31.8504" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FBC115"/>
                    <stop offset="1" stop-color="#846300"/>
                    </linearGradient>
                    </defs>
                </svg>
                <center style="margin-top: 50px">
                    <div v-if="loading" class="loading-box">
                        <b-button class="loader-fake-btn" :loading="true" ></b-button>
                        <h1 class="loading-text">Cleaning up the battlefield...</h1>
                        <!-- <h1 style="margin-top: 30px">{{ currentHint }}</h1> -->
                    </div>
                </center>
            </center>
        </div>
        <div v-if="$store.state.matchState.playerIs === $store.state.matchState.winner && $store.state.matchState.type !== 'matchmaking'" class="end-wrapper">
            <center>
                <img class="result-vector" :src="victory"/>
                    <svg width="210" viewBox="0 0 147 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-top: 55px">
                        <g id="Group 287" @click="continueBtn" style="cursor: pointer">
                        <g id="Group 135">
                        <path id="Rectangle 5" d="M0.250001 28.8964L0.250003 0.249998L146.75 0.250011L146.75 30.566L141.768 35.75L7.10355 35.75L0.250001 28.8964Z" fill="url(#paint0_linear_293_27083)" stroke="#FBC115" stroke-width="0.5"/>
                        </g>
                        <text id="Continue" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan x="43.2402" y="20.736">CONTINUE</tspan></text>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear_293_27083" x1="53.5" y1="36" x2="53.5" y2="6.54214e-06" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FBC115" stop-opacity="0"/>
                        <stop offset="1" stop-color="#FBC115" stop-opacity="0.12"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <center style="margin-top: 50px">
                    <div v-if="loading" class="loading-box">
                        <b-button class="loader-fake-btn" :loading="true" ></b-button>
                        <h1 class="loading-text">Cleaning up the battlefield...</h1>
                        <!-- <h1 style="margin-top: 30px">{{ currentHint }}</h1> -->
                    </div>
                    </center>
            </center>
        </div>
        <!-- Defeat -->
        <div class="end-wrapper" v-if="($store.state.matchState.playerIs === 0 ? 1 : 0) === $store.state.matchState.winner">
            <center>
                <img class="result-vector" :src="defeat"/>
                    <svg width="210" viewBox="0 0 147 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-top: 55px">
                        <g id="Group 287" @click="continueBtn" style="cursor: pointer">
                        <g id="Group 135">
                        <path id="Rectangle 5" d="M0.250001 28.8964L0.250003 0.249998L146.75 0.250011L146.75 30.566L141.768 35.75L7.10355 35.75L0.250001 28.8964Z" fill="url(#paint0_linear_293_27083)" stroke="#FBC115" stroke-width="0.5"/>
                        </g>
                        <text id="Continue" fill="#FBC115" xml:space="preserve" style="white-space: pre" font-family="Anson" font-size="18" letter-spacing="0em"><tspan x="43.2402" y="20.736">CONTINUE</tspan></text>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear_293_27083" x1="53.5" y1="36" x2="53.5" y2="6.54214e-06" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FBC115" stop-opacity="0"/>
                        <stop offset="1" stop-color="#FBC115" stop-opacity="0.12"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <center style="margin-top: 50px">
                    <div v-if="loading" class="loading-box">
                        <b-button class="loader-fake-btn" :loading="true" ></b-button>
                        <h1 class="loading-text">Cleaning up the battlefield...</h1>
                        <!-- <h1 style="margin-top: 30px">{{ currentHint }}</h1> -->
                    </div>
                    </center>
            </center>
        </div>
    </div>
</template>

<script>
import Board from './Board.vue'
import PickingView from './PickingView.vue'
import CONSTANTS from '../../constants'
import ResourceItem from '@/components/ResourceItem.vue'
import Rewards from '@/components/Rewards.vue'

export default {
    data() {
        return {
            onboarding: false,
            victory: 'https://res.cloudinary.com/station0x/image/upload/v1645057034/encouter/victory_msdozp.svg',
            defeat: 'https://res.cloudinary.com/station0x/image/upload/v1645057036/encouter/defeat_nahvao.svg',
            loading: false,
            CONSTANTS
        }
    },
    components: {
        Board,
        PickingView,
        ResourceItem
    },
    methods: {
        async continueBtn () {
            this.loading = true
            await this.$store.dispatch("startPolling")
        },
        async claimBtn () {
            this.loading = true
            await this.$store.dispatch("startPolling")
            this.$buefy.modal.open({
                parent: this,
                component: Rewards,
                canCancel: ['escape', 'button']
            })
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    watch: {
        "$store.state.matchState" (newState, oldState) {
            if(newState.picking !== oldState.picking ) {
            }
        }
    }
}
</script>

<style scoped>
.end-wrapper {
    height: 100vh;
    width: 100vw;
    position: absolute;
    background: rgba(0,0,0,.7);
    z-index: 5;
    top: 0;
    left: 0;
    opacity: 1;
    animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 3s;
    animation-fill-mode: backwards;
}
.end-wrapper-wining {
    position: relative;
    width: 70vw;
    max-width: 700px;
}
.in-game-btn {
    position: absolute;
    top: 2px;
    right: 8vw;
    color: white;
}
.in-game-btn:hover {
    border-bottom: 1px solid white;
}
.sound-btn {
    position: absolute;
    background: none;
    border: none;
    color: white;
    font-size: 25px;
    top: 2.6vh;
    right: 29vw;
    z-index: 30;
}
.sound-btn:hover {
    color: rgba(255,255,255,0.8);
}
.sound-btn:focus:not(:active), .sound-btn.is-focused:not(:active) {
    color: white;
    box-shadow: none;
}
.result-vector {
    margin-top: 28vh;
    display: block;
    width: 500px;
}
.primary-btn {
    background: black;
    color: white;
    border: none;
    width: 230px;
    height: 60px;
    margin: 15px;
    padding: 15px;
    font-size: 19px;
    font-weight: 500;
    border: 1px solid white;
    transition: 250ms ease-in-out;
}
.primary-btn:hover {
    background: white;
    color: black;
}
.onboarding-animation {
    background: black;
    z-index: 5;
    height: 100vh;
    width: 100vw;
    padding: 0;
    position: absolute;
    top: 0;
    vertical-align: top;
    line-height: 10vh;
    padding-top: 25vh;
    animation-name: fadeOutOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 3s;
    animation-fill-mode: backwards;
    opacity: 0;
    animation-delay: 18s;
}
.wrapper {
    width: fit-content;
}
.paragraph {
    font-family: 'Roboto';
    font-size: 38px;
    text-align: left;
    color: white;
    z-index: 100;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 5s;
    animation-fill-mode: backwards;
    opacity: 1;

}
.para-1 {
    animation-delay: 1s;

}
.para-2 {
    animation-delay: 4s;
}
.para-3 {
    animation-delay: 7s;
}
.para-4 {
    animation-delay: 11s;
}
.skip-btn {
    font-family: 'Roboto';
    font-size: 21px;
    color: rgba(255,255,255,.3);
    cursor: pointer;
    text-transform: uppercase;
}
.skip-btn:hover {
    color: white;
}
.afk-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.svg-ores {
    width: 60vw;
    max-width: 700px;
    margin-top: 25vh;
}
.not-red {
    filter: grayscale(1);
}
@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes fadeOutOpacity {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

</style>