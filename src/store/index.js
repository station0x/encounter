import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as Realm from "realm-web"

const realm = new Realm.App({ id: process.env.VUE_APP_REALM_APP_ID });
const credentials = Realm.Credentials.anonymous();

console.log(realm)
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signature: window.localStorage.getItem('signature'),
        address: window.localStorage.getItem('address'),
        intervalId: undefined,
        matchId: undefined,
        matchState: undefined
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
        },
        setMatchState(state, matchDoc) {
            matchDoc._id =  matchDoc._id.toString()
            matchDoc.playerIs = state.address === matchDoc.player0 ? 0 : 1
            matchDoc.state = matchDoc.board
            delete matchDoc.board
            state.matchState = matchDoc
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
                if(!state.matchId){
                    const res = await axios.get('/api/getActiveMatchId', {
                        params:{
                            signature: state.signature
                        }
                    })
                    if(res.data.matchId && state.matchId !== res.data.matchId) {
                        dispatch("startRealm")
                    }
                    commit('setActiveMatchId', res.data.matchId)   
                    console.log(res.data.matchId)
                }
            }
            intervalFunc()
            const intervalId = setInterval(intervalFunc, 5000)
            commit('setIntervalId', intervalId)
        },
        stopPolling({state, commit}) {
            clearInterval(state.intervalId)
            commit('setIntervalId')
        },
        async startRealm({state, commit}) {
            await realm.logIn(credentials);
            const mongodb = realm.currentUser.mongoClient("mongodb-atlas");
            const matches = mongodb.db("encounter").collection("matches");
            const intialMatchDoc = await matches.findOne({_id:Realm.BSON.ObjectId(state.matchId)})

            commit("setMatchState", intialMatchDoc)
            const watcher = matches.watch({ids:[Realm.BSON.ObjectId(state.matchId)]})
            for await (const change of watcher) {
                const { fullDocument: matchDoc } = change;
                commit("setMatchState", matchDoc)
            }
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