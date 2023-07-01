const commentsRoute = [
    {
        path: '/',
        name: 'comments.show',
        component: () => import('@src/views/Comments'),
        meta: { title: 'Comments' },
    },
]


export default commentsRoute
