import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import EventAll from '../views/events/EventAll.vue'
import EventCreate from '../views/events/EventCreate.vue'
import EventEdit from '../views/events/EventEdit.vue'

Vue.use(Router)

const isLoggedIn = false

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/events',
            name: 'events-all',
            component: EventAll,
            beforeEnter: (toolbar, from, next) => {
                if (isLoggedIn) {
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
            beforeEnter: (toolbar, from, next) => {
                if (isLoggedIn) {
                    next();
                } else {
                    next('/login')
                }
            }

        },
        {
            path: '/events/:id',
            name: 'events-edit',
            component: EventEdit
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: (toolbar, from, next) => {
                if (!isLoggedIn) {
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
            beforeEnter: (toolbar, from, next) => {
                if (!isLoggedIn) {
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