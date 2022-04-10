import {createStore} from 'vuex'
import axios from "axios";
import {router} from "../main"

function calculateRemainingTime(expirationTime) {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime - currentTime;
}


// Create a new store instance.
const store = createStore({
    state() {
        const authInfo = JSON.parse(localStorage.getItem('authInfo'))
        if (authInfo) {
            const state = {
                ...authInfo,
                challenges: [],
                leaderboards: [],
                errorMessage: ""
            }
            const remainingTime = calculateRemainingTime(authInfo.expirationTime)
            setTimeout(() => {
                this.$store.dispatch('logout')
            }, remainingTime)
            axios.defaults.headers.common["Authorization"] = `Bearer ${authInfo.token}`;
            return state
        }

        return {
            isLoggedIn: false,
            isAdmin: false,
            token: null,
            userId: null,
            username: null,
            challenges: [],
            leaderboards: [],
            errorMessage: ""
        }
    }, mutations: {
        login(state, payload) {
            state.isLoggedIn = true;
            state.isAdmin = payload.isAdmin
            state.token = payload.token
            state.userId = payload.userId
            state.username = payload.username
            state.expirationTime = payload.expirationTime
            localStorage.setItem('authInfo', JSON.stringify({
                isLoggedIn: true,
                isAdmin: payload.isAdmin,
                token: payload.token,
                userId: payload.userId,
                username: payload.username,
                expirationTime: payload.expirationTime
            }))
            axios.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
        }, logout(state) {
            state.isLoggedIn = false
            state.isAdmin = false
            state.token = null
            state.userId = null
            state.username = null
            delete axios.defaults.headers.common["Authorization"];
        }, setChallenges(state, challenges) {
            challenges.sort((a, b) => new Date(a.date) - new Date(b.date))
            state.challenges = challenges;
        }, setLeaderboard(state, leaderboards) {
            leaderboards.sort((a, b) => b.totalPoints - a.totalPoints)
            state.leaderboards = leaderboards
        }, setErrorMessage(state, message) {
            state.errorMessage = message;
        },
    }, actions: {
        login(context, payload) {
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/auth/login`, {
                username: payload.username, password: payload.password
            }).then(response => {
                const expirationTime = new Date(new Date().getTime() + +response.data.expiresIn * 1000).toISOString();
                const remainingTime = calculateRemainingTime(expirationTime)
                setTimeout(() => {
                    context.dispatch('logout');
                }, remainingTime)
                context.commit('login', {...response.data, expirationTime})
                router.back()
            }).catch(error => {
                context.commit('setErrorMessage', error.response.data.message)
            })
        }, logout(context) {
            context.commit('logout')
            localStorage.clear()
            router.push('/')
        }, signup(context, payload) {
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/auth/signup`, {
                username: payload.username, email: payload.email, password: payload.password
            }).then(response => {
                context.commit('login', response.data)
                router.push('/challenges')
            }).catch(error => {
                console.log(error.response.data.data[0].msg)
                context.commit('setErrorMessage', error.response.data.data[0].msg)
                console.log(error.response)
            })
        }, getChallenges(context) {
            axios.get(`${process.env.VUE_APP_BACKEND_URL}/challenges`)
                .then(response => {
                    const allChallenges = response.data.challenges;
                    if (context.state.isLoggedIn) {
                        axios.get(`${process.env.VUE_APP_BACKEND_URL}/challenges/userchallenges`)
                            .then(response => {
                                const userChallengesIds = response.data.challenges.map((challenge) => {
                                    return challenge._id
                                });
                                let difference = allChallenges.filter(x => !userChallengesIds.includes(x._id));
                                context.commit('setChallenges', difference)
                            }).catch(error => {
                            console.log(error.response)
                        })
                    } else {
                        context.commit('setChallenges', response.data.challenges)
                    }
                }).catch(error => {
                console.log(error.response)
            })
        }, getLeaderboard(context) {
            axios.get(`${process.env.VUE_APP_BACKEND_URL}/leaderboard`)
                .then(response => {
                    const leaderboard = response.data.ranks;
                    context.commit('setLeaderboard', leaderboard)

                }).catch(error => {
                console.log(error.response)
            })
        }
    }, getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        }, isAdmin(state) {
            return state.isAdmin
        }, token(state) {
            return state.token
        }, username(state) {
            return state.username
        }, challenges(state) {
            return state.challenges
        }, getChallenge: (state) => (id) => {
            return state.challenges.find((challenge) => challenge._id === id)
        }, getLeaderboards: (state) => {
            return state.leaderboards
        }, errorMessage: (state) => {
            return state.errorMessage
        }
    }
})

export default store;