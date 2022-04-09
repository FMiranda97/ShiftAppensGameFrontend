import {createStore} from 'vuex'
import axios from "axios";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            isLoggedIn: false,
            isAdmin: false,
            token: null,
            userId: null,
            username: null,
            challenges: []
        }
    },
    mutations: {
        login(state, payload) {
            state.isLoggedIn = true;
            state.isAdmin = payload.isAdmin
            state.token = payload.token
            state.userId = payload.userId
            state.username = payload.username
            if (payload.token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
            } else {
                delete axios.defaults.headers.common["Authorization"];
            }
        },
        logout(state) {
            state.isLoggedIn = false
            state.isAdmin = false
            state.token = null
            state.userId = null
            state.username = null
            delete axios.defaults.headers.common["Authorization"];
        },
        setChallenges(state, challenges) {
            challenges.sort((a, b) => new Date(a.date) - new Date(b.date))
            state.challenges = challenges;
        }
    },
    actions: {
        login(context, payload) {
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/auth/login`, {
                username: payload.username,
                password: payload.password
            }).then(response => {
                context.commit('login', response.data)
            }).catch(error => {
                console.log(error.response)
            })
        },
        logout(context) {
            context.commit('logout')
        },
        signup(context, payload) {
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/auth/signup`, {
                username: payload.username,
                email: payload.email,
                password: payload.password
            }).then(response => {
                context.commit('login', response.data)
            }).catch(error => {
                console.log(error.response)
            })
        },
        getChallenges(context) {
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
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        isAdmin(state) {
            return state.isAdmin
        },
        token(state) {
            return state.token
        },
        username(state) {
            return state.username
        },
        challenges(state) {
            return state.challenges
        },
        getChallenge: (state) => (id) =>  {
            return state.challenges.find((challenge) => challenge._id === id)
        }
    }
})

export default store;