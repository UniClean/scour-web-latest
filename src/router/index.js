import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Customers from '@/views/Customers/index.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                    title: 'Home'
                }
            },
            {
                path: '/customers',
                name: 'customers',
                component: Customers
            }]
    }]

export default createRouter({
    history: createWebHashHistory(),
    routes
})