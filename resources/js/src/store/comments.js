import { defineStore } from 'pinia'


export const useCommentsStore = defineStore('comments', {
    state: () => ({
        listComments: {},
    }),
    getters: {
        // TODO: getters for filtering list comments
    },
    actions: {
        /**
         * Create new comment
         * @param {Object} data
         * @return {Promise<axios.AxiosResponse<any>>}
         */
        addComment(data) {
            return axios.post('api/comments/new', data)
        },

        /**
         * Get list of comments and authors
         * @param {number} page number of page.
         * @return {Promise<axios.AxiosResponse<any>>}
         */
        loadListComments(page = null) {
            const url = page === null ? 'api/comments' : `api/comments?page=${page}`
            return axios.get(url)
                .then((res) => {
                    this.listComments = res['data'];
                })
        }
    }
})
