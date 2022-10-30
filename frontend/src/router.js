import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HomePage from './pages/HomePage.vue'
import MintPage from './pages/MintPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage
    },
    {
        path: "/hello",
        name: "hello",
        component: HelloWorld
    },
    {
        path: "/mint-nft",
        name: "mint",
        component: MintPage
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfilePage
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: "active",
    routes
})
export default router

