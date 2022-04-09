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
            state.challenges = challenges;
        }
    },
    actions: {
        login(context, payload) {
            axios.post('http://localhost:8080/auth/login', {
                username: payload.username,
                password: payload.password
            }).then(response => {
                context.commit('login', response.data)
            }).catch(error => {
                console.log(error)
            })
        },
        logout(context) {
            context.commit('logout')
        },
        signup(context, payload) {
            axios.post('http://localhost:8080/auth/signup', {
                username: payload.username,
                email: payload.email,
                password: payload.password
            }).then(response => {
                context.commit('login', response.data)
            }).catch(error => {
                console.log(error)
            })
        },
        getChallenges(context) {
            axios.get('http://localhost:8080/challenges')
            .then(response => {
                context.commit('setChallenges', response.data.challenges)
            }).catch(error => {
                console.log(error)
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
        }
    }
})

export default store;