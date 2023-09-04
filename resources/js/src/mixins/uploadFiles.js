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
            this.files.push(...this.$refs.upload.files);
        },
        dragOver(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragLeave() {
            this.isDragging = false;
        },
        dropFile(e) {
            e.preventDefault();
            this.$refs.upload.files = e.dataTransfer.files;
            this.onUpload();
            this.isDragging = false;
        },
        deleteFile(index) {
            // this.clearErrorServerMessages(index)
            this.files.splice(index, 1)
        },
        clearErrorServerMessages(index) {
            if(!this.v$.$error && isEmpty(this.serverMessageErrors))
                return

            if(this.files.left === 0) {
                this.serverMessageErrors = {}
                return
            }

            // Clear errors by file name
            const fileName = this.files[index].name.toLowerCase()
            this.serverMessageErrors['files'] = this.serverMessageErrors['files']
                ?.filter( (msg) => !msg.toLowerCase().includes(`"${fileName}"`) )
        },
    },
}
