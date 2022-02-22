<template>
    <div class="spaceship-grid">
        <div class="spaceship-card" v-for="spaceshipObj in spaceshipsRotation" :key="spaceshipObj.name">
            <div class="spaceship-stats">
                <center>
                    <img width="85px" style="margin-top: -20px" :src="spaceshipObj.image"/>
                    <h1 class="spaceship-type" style="color: #416BFF">{{spaceshipObj.type}}</h1>
                    <h1 style="color: #29D403">HP: {{spaceshipObj.info.hp}}</h1>
                </center>
                <p class="spaceships-desc" style="text-align: left; color: rgba(255,255,255,.7)">{{ spaceshipObj.info.desc }}</p>
                <h1  style="color: white; font-size: 17px; text-align: left; margin: 10px 20px 10px 0px;font-family: 'Roboto';">Abilities</h1>
                <div style="margin-left: -10px">
                    <div class="info-card">
                            <img class="info-card-icon" :src="moveInfoIcon" />
                            <p class="info-card-move-number">1</p>
                            <h1 class="info-card-text"> Move </h1>
                            <span class="info-card-energy">-{{spaceshipObj.info.moveFuelCost}}</span>
                            <img class="info-card-energy-icon" src="/energy.svg" width="23px"/>
                    </div>
                    <div v-if="spaceshipObj.type !== 'salvation'" class="info-card">
                            <img class="info-card-icon" :src="attackInfoIcon" />
                            <p class="info-card-attack-number">{{ spaceshipObj.info.attack }}</p>
                            <h1 class="info-card-text"> Attack </h1>
                            <span class="info-card-energy">-{{spaceshipObj.info.attackFuelCost}}</span>
                            <img class="info-card-energy-icon" src="/energy.svg" width="23px"/>
                    </div>
                    <div v-if="spaceshipObj.type === 'salvation'" class="info-card">
                            <img class="info-card-icon" :src="repairInfoIcon" />
                            <p class="info-card-repair-number">25%</p>
                            <h1 class="info-card-text"> Repair </h1>
                            <span class="info-card-energy">-{{spaceshipObj.info.repairFuelCost}}</span>
                            <img class="info-card-energy-icon" src="/energy.svg" width="23px"/>
                    </div>
                    <div v-if="spaceshipObj.info.shock" class="info-card">
                            <img class="info-card-icon" :src="shockInfoIcon" />
                            <p class="info-card-shock-number">{{spaceshipObj.info.attack}}</p>
                            <h1 class="info-card-text"> Shock </h1>
                            <span class="info-card-energy">-{{spaceshipObj.info.attackFuelCost}}</span>
                            <img class="info-card-energy-icon" src="/energy.svg" width="23px"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CONSTANTS from '../../constants'
export default {
    data() {
        return {
           spaceships: [...CONSTANTS.freeSpaceshipsRotation],
            attackInfoIcon: 'https://res.cloudinary.com/station0x/image/upload/v1644548304/encouter/elements/icons/attack_kwg82o.svg',
            moveInfoIcon: 'https://res.cloudinary.com/station0x/image/upload/v1644548304/encouter/elements/icons/move_hngi7m.svg',
            repairInfoIcon: 'https://res.cloudinary.com/station0x/image/upload/v1644549515/encouter/elements/icons/repair_lj60dt.svg',
            shockInfoIcon: 'https://res.cloudinary.com/station0x/image/upload/v1644548304/encouter/elements/icons/shock_fiygbi.svg'
        }
    },
    computed: {
        spaceshipsRotation() {
            let spaceships = [...this.spaceships]
            return spaceships.map((spaceship) => {
                return {
                    type: spaceship,
                    image: require(`../assets/blue/${spaceship}.webp`),
                    info: CONSTANTS.spaceshipsAttributes[spaceship]
                }
            })
        },
    }
}
</script>

<style scoped>
.spaceship-card {
    width: 300px;
    margin: 10px;
    padding: 20px 15px;
    background: rgba(0,0,0,.3);
     backdrop-filter: blur(5px);
    height: 470px;
    float: left;
}
.spaceship-grid {
    display: inline-block;
}
</style>
