<script>
import {defineComponent} from 'vue'
import commentFilesRules from "@src/validators/commentFilesRules";
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import tooltip from "@src/mixins/tooltip";
import uploadFiles from "@src/mixins/uploadFiles";
import {useCommentsStore} from "@src/store/comments";

export default defineComponent({
    name: "DropFiles",
    expose: ['files', 'addServerMessageErrors', 'v$', 'filesId'],
    props: {
        isPreviewMode: Boolean,
    },
    mixins: [tooltip, uploadFiles],
    setup() {
        const serverMessageErrors = ref({})

        return {
            serverMessageErrors,
            v$: useVuelidate({ $externalResults: serverMessageErrors }),
            commentStore: useCommentsStore(),
        }
    },
    data() {
        return {
            isDragging: false,
            urlUpload: 'api/comments/files/upload/',
            filesId: [],
        }
    },
    watch: {
        files: {
            /**
             * This watcher starts uploading files when
             * the user deletes files that have not passed front-end validation
             */
            handler() {
                if(this.v$.$error || this.files.length === 0 || this.isStartUploading || this.filesId.length > 0)
                    return

                this.uploadToServer(this.files, 'files[]')
            },
            deep: true,
        },
    },
    methods: {
        deleteFile(index) {
            if(this.isPreviewMode)
                return

            this.clearServerErrorsByFileName(index)
            this.files.splice(index, 1)
            this.filesId.splice(index, 1)
        },
        clearServerErrorsByFileName(index) {
            const fileName = this.files[index].name.toLowerCase()
            const filteredErrors = this.serverMessageErrors['files']
                ?.filter( (msg) => !msg.toLowerCase().includes(`"${fileName}"`) )

            if(!this.hasErrorValidations() || !filteredErrors)
                return

            this.serverMessageErrors['files'] = filteredErrors
        },
        addServerMessageErrors(errors) {
            // Get errors only for files
            const errorsFile = Object.fromEntries(Object.entries(errors)
                                        .filter(([key]) => key.includes('files.')))
            // Get errors message
            let errorsMessage = [];
            for (const index in errorsFile) {
                for(const error in errorsFile[index]) {
                    errorsMessage.push(errorsFile[index][error]);
                }
            }

            // Set errors
            Object.assign(this.serverMessageErrors, {'files': errorsMessage})
        },
    },
    validations() {
        return commentFilesRules
    },
})
</script>

<template>
    <div
        class="dropzone-main flex-column"
        :class="{'is-invalid': v$.files.$errors.length}"
    >
        <input
            type="file"
            multiple
            id="user-file"
            class="hidden-input"
            @change="onUpload"
            ref="upload"
            :class="{'is-invalid': v$.files.$errors.length}"
            accept="text/plain"
        />
        <div
            class="dropzone-container"
            :class="{'dragging': isDragging}"
            @dragover="dragOver"
            @dragleave="dragLeave"
            @drop="dropFile"
            v-if="files.length === 0"
            data-key-name="files[]"
        >
            <label
                @click="clickToUploadFile"
                for="user-file"
                class="file-label"
                ref="uploadLabel"
            >
                <span
                    v-if="isDragging"
                >
                    Release to drop files here.
                </span>
                <span
                    v-else
                >
                    Drop files here or <u>click here</u> to upload.
                </span>
            </label>
        </div>
        <div
            v-else
            class="files"
        >
            <div
                class="file-item"
                v-for="file in files"
                :key="file.name"
            >
                <span
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    :data-bs-title="file.name"
                    class="text-truncate me-1 js-file">
                    {{ file.name }}
                </span>
                <span
                    class="delete-file"
                    @click="deleteFile(files.indexOf(file))"
                >
                    Delete
                </span>
            </div>
        </div>
        <div class="invalid-feedback mb-1" v-for="error in v$.files.$errors">
            {{ error.$message }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropzone-main {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    text-align: center;

    &.is-invalid {
        .file-item {
            background: rgb(255 0 0 / 20%);
        }
    }
}

.dropzone-container {
    padding: 2rem;
    background: #f7fafc;
    border: 1px dashed #9e9e9e;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
    &:hover,
    &.dragging {
        border: 1px dashed #41707a;
        background: rgb(64 110 142 / 20%);
    }
}

.files {
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    border-radius: 8px;
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
    font-size: 12px;
    line-height: 1.5;
}

.file-item {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(56 111 164 / 20%);
    padding: 7px 7px 7px 15px;
    margin-top: 10px;

    &:first-child {
        margin-top: 0;
    }

    .delete-file {
        background: rgb(0 148 198);
        color: #fff;
        padding: 5px 10px;
        border-radius: 8px;
        cursor: pointer;
    }
}

.file-label {
    font-size: 14px;
    display: block;
    cursor: pointer;
}

.invalid-feedback {
    word-break: break-all;
    text-align: left;
}

</style>
