import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/auth';  // Импортируем store напрямую

import HomePage from '../views/IndexPage.vue';
import AboutPage from '../views/AboutPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomePage,
            meta: { requiresAuth: true }
        },
        {
            path: '/index',
            component: HomePage,
            meta: { requiresAuth: true }
        },
        {
            path: '/about',
            component: AboutPage
        },
        {
            path: '/profile',
            component: ProfilePage,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/signup',
            component: SignUpPage
        }
    ]
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated; // Доступ к геттеру Vuex напрямую

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next('/login');  // Redirect to login if not authenticated
        } else {
            next();  // Proceed to the route if authenticated
        }
    } else {
        next();  // Proceed normally for routes that do not require auth
    }
});

export default router;
