import { defineStore } from 'pinia'


export const useCommentsStore = defineStore('comments', {
    state: () => ({
        listComments: {},
        replyToComment: {},
    }),
    getters: {},
    actions: {
        /**
         * Create new comment
         * @param {FormData} data
         * @return {Promise<axios.AxiosResponse<any>>}
         */
        addComment(data) {
            return axios.post('api/comments/new', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
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
        },
        filterByUserField(field, asc = true) {
            const sorted = this.listComments['data']
                                .sort((a, b) => a.user[field].localeCompare(b.user[field]))

            this.listComments['data'] = asc ? sorted : sorted.reverse()
        },

        filterByDate(asc = true) {
            const sorted = this.listComments['data'] = this.listComments['data']
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

            this.listComments['data'] = asc ? sorted : sorted.reverse()
        },
    }
})
