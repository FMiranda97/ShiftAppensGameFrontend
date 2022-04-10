import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'

import ChallengePage from "@/pages/ChallengePage";
import SignUp from "@/pages/SignUp";
import ChallengeDetail from "@/components/ChallengeDetail";
import SignIn from "@/pages/SignIn";
import LeaderBoard from "@/components/leaderBoard";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import store from "./store/store"
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const routes = [{path: '/', component: HomePage}, {path: '/challenges', component: ChallengePage}, {
    path: '/signup', component: SignUp, beforeEnter: () => store.getters.isLoggedIn ? {path: '/challenges'} : true
}, {
    path: '/login', component: SignIn, beforeEnter: () => store.getters.isLoggedIn ? {path: '/challenges'} : true
}, {path: '/challenge/:id', component: ChallengeDetail, props: true}, {
    path: '/leaderboard', component: LeaderBoard
}, {path: '/admin', component: AdminPage, beforeEnter: () => !store.getters.isAdmin ? {path: '/challenges'} : true}
]

export const router = createRouter({
    history: createWebHistory(), routes,
})

router.afterEach((to, from) => {
    const routesOrder = ["/", "/challenges", "/leaderboard", "/admin", "/signup", "/login"]
    const toIndex = routesOrder.indexOf(to.path)
    const fromIndex = routesOrder.indexOf(from.path)
    to.meta.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
})


const app = createApp(App)
app.use(store)
app.use(router)

import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faRankingStar, faFaceSmile, faCircleCheck, faCircleXmark, faBars, faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import HomePage from "@/pages/HomePage";
import AdminPage from "@/pages/AdminPage";

app.component("font-awesome-icon", FontAwesomeIcon)
library.add(faRankingStar)
library.add(faFaceSmile)
library.add(faFaceSmile)
library.add(faCircleXmark)
library.add(faCircleCheck)
library.add(faBars)
library.add(faArrowLeft)


app.mount('#app')
