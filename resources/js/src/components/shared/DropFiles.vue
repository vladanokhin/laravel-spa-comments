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
            :class="{'is-invalid': v$.files.$errors.length}"
            @change="onUpload"
            ref="upload"
            accept="text/plain"
        />
        <div
            class="dropzone-container"
            :class="{'dragging': isDragging}"
            @dragover="dragOver"
            @dragleave="dragLeave"
            @drop="dropFile"
            v-if="files.length === 0"
        >
            <label for="user-file" class="file-label">
                <span v-if="isDragging">Release to drop files here.</span>
                <span v-else>Drop files here or <u>click here</u> to upload.</span>
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

<script>


import commentFilesRules from "@src/validators/commentFilesRules";
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import tooltip from "@src/mixins/tooltip";
import {isEmpty} from "lodash";

export default {
    name: "DropFiles",
    expose: ['files', 'addServerMessageErrors', 'v$'],
    mixins: [tooltip],
    setup() {
        const serverMessageErrors = ref({})

        return {
            serverMessageErrors,
            v$: useVuelidate({ $externalResults: serverMessageErrors }),
        }
    },
    data() {
        return {
            isDragging: false,
            files: [],
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
            this.clearErrorServerMessages(index)
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
}
</script>

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
    &.dragging {
        border: 1px dashed #23395B;
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

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
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
