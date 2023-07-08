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
         * @return {Promise<axios.AxiosResponse<any>>}
         */
        loadListComments() {
            return axios.get('api/comments')
                .then((res) => {
                    this.listComments = res['data'];
                })
        }
    }
})
