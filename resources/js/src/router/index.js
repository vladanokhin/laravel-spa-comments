import {createRouter, createWebHistory} from "vue-router"

import commentsRoute from "@src/router/comments";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound.show',
            component: () => import('@src/views/NotFound'),
            meta: { title : 'Not Found' }
        },
        ...commentsRoute,
    ]
})

// Set the title of page
router.beforeEach((to, from, next) => {
    document.title = `SPA | ${to.meta.title}`
    next()
})

export default router
