import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Customers from '@/views/Customers/index.vue'
import Employees from '@/views/Employees/index.vue'
import EmployeeCreate from '@/views/Employees/Create.vue'
import Objects from '@/views/Objects/index.vue'
import ObjectCreate from '@/views/Objects/Create.vue'
import Orders from '@/views/Orders/index.vue'

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
            },

            {
                path: '/employees',
                name: 'employees',
                component: Employees
            },
            {
                path: '/employees/create',
                name: 'employees-create',
                component: EmployeeCreate
            },
            {
                path: '/employees/edit/:id',
                name: 'employees-edit',
                component: EmployeeCreate
            },


            {
                path: '/objects',
                name: 'objects',
                component: Objects
            },
            {
                path: '/objects/create',
                name: 'objects-create',
                component: ObjectCreate
            },
            {
                path: '/objects/edit/:id',
                name: 'objects-edit',
                component: ObjectCreate
            },


            {
                path: '/orders',
                name: 'orders',
                component: Orders
            }
        ]
    }]

export default createRouter({
    history: createWebHashHistory(),
    routes
})