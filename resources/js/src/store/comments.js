import { defineStore } from 'pinia'


export const useCommentsStore = defineStore('comments', {
    state: () => ({
        listComments: {},
        replyToComment: {},
        lastOpenedFile: {},
    }),
    getters: {},
    actions: {
        /**
         * Create new comment
         * @param {FormData} data
         * @return {Promise<axios.AxiosResponse<any>>}
         */
        addComment(data) {
            return axios.post('api/comments/new', data)
        },

        /**
         * Get file content by file id.
         * @param id
         * @return {Promise<axios.AxiosResponse<any>>|Promise<any>}
         */
        getFile(id) {
            if (id === this.lastOpenedFile?.id)
                return new Promise((resolve, reject) => {
                    resolve(this.lastOpenedFile)
                });

            return axios.get(`api/comments/files/show/${id}`)
                .then((response) => {
                    this.lastOpenedFile = response['data']['data']
                    return this.lastOpenedFile
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

        /**
         * Upload files
         * @param {string} url
         * @param {FormData} data
         * @return {Promise<axios.AxiosResponse<any>>}
         */
        uploadFiles(url, data) {
            return axios.post(`${url}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
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
