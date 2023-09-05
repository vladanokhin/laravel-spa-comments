import {isEmpty} from "lodash";

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
        dragOver(e) {
            e.preventDefault()
            this.isDragging = true
        },
        dragLeave() {
            this.isDragging = false
        },
        dropFile(e) {
            e.preventDefault();
            this.$refs.upload.files = e.dataTransfer.files
            this.onUpload()
            this.isDragging = false
        },
    },
}
