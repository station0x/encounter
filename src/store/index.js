import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as Realm from "realm-web"
import Queue from 'promise-queue'
import CONSTANTS from '../../constants'
import { debounce } from "debounce"

const axiosQueue = new Queue(1)
const realm = new Realm.App({ id: process.env.VUE_APP_REALM_APP_ID });
const credentials = Realm.Credentials.anonymous();

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signature: window.localStorage.getItem('signature'),
        address: window.localStorage.getItem('address'),
        intervalId: undefined,
        matchId: undefined,
        matchState: undefined,
        loaded: false,
        registered: false
    },
    getters: {},
    mutations: {
        sign(state, {signature, address}) {
            state.signature = signature
            state.address = address
        },
        setIntervalId(state, intervalId) {
            state.intervalId = intervalId
        },
        setActiveMatchId(state, matchId) {
            state.matchId = matchId
            if(!matchId) state.matchState = undefined
        },
        setMatchState(state, matchDoc) {
            matchDoc._id =  matchDoc._id.toString()
            matchDoc.playerIs = state.address === matchDoc.player0 ? 0 : 1
            matchDoc.state = matchDoc.board
            delete matchDoc.board
            state.matchState = matchDoc
        },
        setBoard(state, board) {
            const matchState = {...state.matchState}
            matchState.state = board;
            state.matchState = matchState;
        },
        endTurn(state) {
            const matchState = {...state.matchState}
            matchState.playerTurn = matchState.playerTurn === 0 ? 1 : 0;
            matchState['fuel' + matchState.playerTurn] = Math.min(matchState['fuel' + matchState.playerTurn] + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
            matchState.lastTurnTimestamp = undefined
            state.matchState = matchState;
        },
        setMyFuel(state, newFuel) {
            const matchState = {...state.matchState}
            if(matchState.playerIs === 0) {
                matchState.fuel0 = newFuel
            } else if(matchState.playerIs === 1) {
                matchState.fuel1 = newFuel
            }
            state.matchState = matchState;
        },
        setWinner (state, playerNumber) {
            const matchState = {...state.matchState}
            matchState.winner = playerNumber;
            state.matchState = matchState;
        },
        load (state) {
            state.loaded = true
        },
        sendMessage(state, msg) {
            const matchState = {...state.matchState}
            matchState.chat.push({msg, index: matchState.logsIndex + 1, playerNo: matchState.playerIs, timestamp: Date.now()})
            state.matchState = matchState
        },
        registerAddress(state, bool) {
            if(bool) state.registered = true
            else state.registered = false
        }
    },
    actions: {
        connect({commit, dispatch}, {signature, address}) {
            commit('sign', {signature, address})
            window.localStorage.setItem('signature', signature)
            window.localStorage.setItem('address', address)
            dispatch('startPolling')
        },
        disconnect({commit, dispatch}) {
            commit('sign', {})
            window.localStorage.removeItem('signature')
            window.localStorage.removeItem('address')
            dispatch('stopPolling')
        },
        startPolling({state, commit, dispatch}) {
            if(state.intervalId) {
                clearInterval(state.intervalId)
            }
            const intervalFunc = async function(){
                const res = await axios.get('/api/match/getActiveMatchId', {
                    params:{
                        signature: state.signature
                    }
                })
                if(res.data.matchId && state.matchId !== res.data.matchId) {
                    dispatch("startRealm")
                    dispatch("stopPolling")
                }
                commit('setActiveMatchId', res.data.matchId)   

                if(!res.data.matchId) {
                    commit('load')
                }
            }
            intervalFunc()
            const intervalId = setInterval(intervalFunc, 5000)
            commit('setIntervalId', intervalId)
        },
        stopPolling({state, commit}) {
            clearInterval(state.intervalId)
            commit('setIntervalId')
            commit('setActiveMatchId')
        },
        async startRealm({state, commit, dispatch}) {
            await realm.logIn(credentials);
            const mongodb = realm.currentUser.mongoClient("mongodb-atlas");
            const matches = mongodb.db(process.env.VUE_APP_DB_NAME).collection("matches");
            const intialMatchDoc = await matches.findOne({_id:Realm.BSON.ObjectId(state.matchId)})

            commit("setMatchState", intialMatchDoc)
            commit('load')
            const watcher = matches.watch({ids:[Realm.BSON.ObjectId(state.matchId)]})
            for await (const change of watcher) {
                const { fullDocument: matchDoc } = change
                if(matchDoc.winner === 0 || matchDoc.winner === 1 || !state.signature) {
                    commit("setMatchState", matchDoc)
                    break
                }
                if(axiosQueue.getQueueLength() === 0 && axiosQueue.getPendingLength() <= 1) {
                    if(state.matchState.playerIs === state.matchState.playerTurn) {
                        debounce(()=>commit("setMatchState", matchDoc), 2000)()
                    } else {
                        commit("setMatchState", matchDoc)
                    }
                }
            }
        },
        // async getPlayerMatches(_, playerAddress){
        //     await realm.logIn(credentials);
        //     const mongodb = realm.currentUser.mongoClient("mongodb-atlas");
        //     const matches = mongodb.db(process.env.VUE_APP_DB_NAME).collection("matches");
        //     const intialMatchDoc = await matches.findOne({_id:Realm.BSON.ObjectId(state.matchId)})
        // },
        enqueue(_, axiosPromise) {
            axiosQueue.add(() => {
                return axiosPromise()
            })
        }
    },
    plugins: [
        function({state, dispatch}) {
            if(state.signature) {
                dispatch('startPolling')
            }
        }  
    ]
})