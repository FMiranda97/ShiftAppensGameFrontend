import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'

import ChallengePage from "@/components/ChallengePage";
import SignUp from "@/components/SignUp";
import ChallengeDetail from "@/components/ChallengeDetail";
import SignIn from "@/components/SignIn";
import LeaderBoard from "@/components/leaderBoard";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store/store"
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const routes = [
    {path: '/', component: ChallengePage},
    {path: '/signup', component: SignUp},
    {path: '/login', component: SignIn},
    {path: '/challenge/:id', component: ChallengeDetail},
    {path: '/leaderboard', component: LeaderBoard},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(store)
app.use(router)

import { library } from "@fortawesome/fontawesome-svg-core";
import {faRankingStar} from "@fortawesome/free-solid-svg-icons";
app.component("font-awesome-icon", FontAwesomeIcon)
library.add(faRankingStar)

app.mount('#app')