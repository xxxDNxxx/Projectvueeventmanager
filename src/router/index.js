import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import EventAll from '../views/events/EventAll.vue'
import EventCreate from '../views/events/EventCreate.vue'
import EventEdit from '../views/events/EventEdit.vue'
import Profile from '../views/authentication/Profile.vue'
import EventManage from '../views/events/EventManage.vue'
import * as auth from '../services/AuthService'


Vue.use(Router)


export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/events',
            name: 'events-all',
            component: EventAll,
            beforeEnter: (to, from, next) => {
                if (auth.isLoggedIn()) {
                    next();
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/events/new',
            name: 'events-create',
            component: EventCreate,
            beforeEnter: (to, from, next) => {
                if (auth.isLoggedIn()) {
                    next();
                } else {
                    next('/login')
                }
            }

        },
        {
            path: '/eventsm/:id',
            name: 'events-manage',
            component: EventManage,
            beforeEnter: (to, from, next) => {
                if (auth.isLoggedIn()) {
                    next();
                } else {
                    next('/login')
                }
            }

        },
        {
            path: '/events/:id',
            name: 'events-edit',
            component: EventEdit,
            beforeEnter: (to, from, next) => {
                if (auth.isLoggedIn()) {
                    next();
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: Profile,
            beforeEnter: (to, from, next) => {
                if (auth.isLoggedIn()) {
                    next();
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: (to, from, next) => {
                if (!auth.isLoggedIn()) {
                    next();
                } else {
                    next('/')
                }
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (!auth.isLoggedIn()) {
                    next();
                } else {
                    next('/')
                }
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
    LinkActiveClass: 'active',
    mode: 'history'

})