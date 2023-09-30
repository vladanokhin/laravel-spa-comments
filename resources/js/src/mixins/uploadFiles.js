export default {
    data() {
        return {
            isDragging: false,
            files: [],
            isStartUploading: false,
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
            this.isDragging = false

            if(this.isPreviewMode)
                return;

            this.$refs.upload.files = event.dataTransfer.files
            this.onUpload()

            // Normal upload when the user has uploaded valid files
            this.uploadToServer(
                event.dataTransfer.files,
                event.currentTarget.getAttribute('data-key-name')
            )
        },
        uploadToServer(files, keyName) {
            if(this.hasErrorValidations())
                return;

            this.isStartUploading = true

            const formData = new FormData()
            Array.from(files).forEach((file) => {
                formData.append(keyName, file)
            })

            return this.commentStore.uploadFiles(this.urlUpload, formData)
                .then((response) => {
                    this.filesId = response.data.data
                }).catch((error) => {
                    this.addServerMessageErrors(error.response.data.errors)
                }).finally(() => this.isStartUploading = false)
        },
        hasErrorValidations() {
            this.v$.$validate()
            return this.v$.$error || Object.keys(this.serverMessageErrors).length > 0
        },
        clickToUploadFile(event) {
            if(this.isPreviewMode)
                event.preventDefault()
        },
        deleteFileOnServer(fileId, url) {
            return this.commentStore.deleteFileOnServer(fileId, url)
        }
    },
}
