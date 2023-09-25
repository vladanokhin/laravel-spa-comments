const commentsRoute = [
    {
        path: '/',
        name: 'comments.show',
        component: () => import('@src/views/Comments.vue'),
        meta: { title: 'Comments' },
    },
]


export default commentsRoute
