export default {
    data() {
        return {
            isDragging: false,
            files: []
        }
    },
    methods: {
        onUpload() {
            this.files.push(...this.$refs.upload.files)
        },
        dragOver(event) {
            event.preventDefault()
            this.isDragging = true
        },
        dragLeave() {
            this.isDragging = false
        },
        dropFile(event) {
            event.preventDefault();
            this.uploadToServer(event.dataTransfer.files, event.currentTarget.getAttribute('data-key-name'))
                .then((response) => {
                    this.files.push(...response.data.data)
                })
            this.isDragging = false

        },
        uploadToServer(files, keyName) {
            const formData = new FormData()
            Array.from(files).forEach((file) => {
                formData.append(keyName, file)
            })

            return this.commentStore.uploadFiles(this.urlUpload, formData)
        }
    },
}
