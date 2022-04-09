import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'

import ChallengePage from "@/components/ChallengePage";
import SignUp from "@/components/SignUp";
import ChallengeDetail from "@/components/ChallengeDetail";
import SignIn from "@/components/SignIn";
import LeaderBoard from "@/components/leaderBoard";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import store from "./store/store"
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const routes = [
    {path: '/', component: HomePage}, 
    {path: '/challenges', component: ChallengePage},
    {path: '/signup', component: SignUp, beforeEnter: () => store.getters.isLoggedIn ? {path: '/challenges'} : true},
    {path: '/login', component: SignIn, beforeEnter: () => store.getters.isLoggedIn ? {path: '/challenges'} : true},
    {path: '/challenge/:id', component: ChallengeDetail, props: true},
    {path: '/leaderboard', component: LeaderBoard},
]

export const router = createRouter({
    history: createWebHistory(), routes,
})

router.afterEach((to, from) => {
    const routesOrder = ["/", "/challenges", "/leaderboard", "/signup", "/login"]
    const toIndex = routesOrder.indexOf(to.path)
    const fromIndex = routesOrder.indexOf(from.path)
    console.log(toIndex)
    console.log(fromIndex)
    to.meta.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
  })


const app = createApp(App)
app.use(store)
app.use(router)

import {library} from "@fortawesome/fontawesome-svg-core";
import {faRankingStar, faFaceSmile, faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import HomePage from "@/components/HomePage";

app.component("font-awesome-icon", FontAwesomeIcon)
library.add(faRankingStar)
library.add(faFaceSmile)
library.add(faFaceSmile)
library.add(faCircleXmark)
library.add(faCircleCheck)

app.mount('#app')
