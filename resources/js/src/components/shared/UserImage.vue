<script>
import {defineComponent, ref} from 'vue'
import uploadFiles from "@src/mixins/uploadFiles";
import {useVuelidate} from "@vuelidate/core";
import userAvatarRules from "@src/validators/userAvatarRules";
import {useCommentsStore} from "@src/store/comments";

export default defineComponent({
    name: "UserImage",
    mixins: [uploadFiles],
    expose: ['files', 'addServerMessageErrors', 'v$', 'filesId'],
    props: {
        isPreviewMode: Boolean
    },
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
            imagePreviewUrl: null,
            hover: false,
            urlUpload: 'api/comments/files/upload/avatar',
            filesId: [],
        }
    },
    watch: {
        files: {
            handler() {
                const image = this.files[0]
                if(!image)
                    return

                if(image instanceof File)
                    this.createPreviewImageUrl()
                else
                    this.imagePreviewUrl = this.files[0].url
            },
            deep: true
        },
    },
    methods: {
        onChange() {
            this.hover = false
        },
        addServerMessageErrors(errors) {
            const errorsMessage = errors['avatar']

            Object.assign(this.serverMessageErrors, {'files': errorsMessage})
        },
        deleteFile(index) {
            if(this.isPreviewMode)
                return

            const uploadedFile = this.filesId[index]

            if(uploadedFile) {
                this.deleteFileOnServer(uploadedFile.id, 'delete/avatar')
                    .then(() => {
                        this.files = []
                        this.filesId = []
                    })
            } else {
                this.serverMessageErrors = {}
                this.files = []
            }
        },
        createPreviewImageUrl() {
            // Create a preview of the uploaded image
            const reader = new FileReader()
            reader.onload = (event) => {
                this.imagePreviewUrl = event.target.result
            }

            reader.readAsDataURL(this.files[0])
            this.imagePreviewUrl = this.files[0].url
        }
    },
    validations() {
        return userAvatarRules
    },
})
</script>

<template>
    <div
        class="user-image"
        :class="{'dragging': isDragging, 'is-invalid': v$.files.$errors.length}"
    >
        <input
            type="file"
            id="avatar"
            class="hidden-input"
            :class="{'is-invalid': v$.files.$errors.length}"
            @change="onChange"
            ref="upload"
            accept="image/jpeg,image/png,image/gif"
        />
        <div
            v-if="files.length"
            class="preview"
            @mouseover="hover = true"
            @mouseleave="hover = false"
        >
            <img :src="imagePreviewUrl" alt="User avatar">
            <div class="image-btn-remove" v-if="hover">
            <span
                class="text-decoration-underline"
                @click="deleteFile(0)"
            >
                Remove
            </span>
            </div>
        </div>
        <div
            v-else
            @dragover="dragOver"
            @dragleave="dragLeave"
            @drop="dropFile"
            class="upload-text"
            data-key-name="avatar"
        >
            <label
                for="avatar"
                class="file-label"
                @click="clickToUploadFile"
            >
                <span>Upload image</span>
            </label>

        </div>
    </div>
    <div class="invalid-feedback" v-for="error in v$.files.$errors">
        {{ error.$message }}
    </div>
</template>

<style lang="scss" scoped>
.user-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 70px;
    border-radius: 250px;
    border: 1px dashed #9e9e9e;
    line-height: 15px;
    background: #f7fafc;
    font-size: 11px;
    cursor: pointer;
    position: relative;

    &.dragging,
    &:hover {
        border: 1px dashed #41707a;
        background: rgb(64 110 142 / 20%);
    }

    .preview > img {
        height: 70px;
        width: 70px;
        border-radius: 250px;
        border: 1px dashed #9e9e9e;
    }

    .image-btn-remove {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0A0A0A99;
        height: 70px;
        width: 70px;
        text-align: center;
        position: absolute;
        top: 0;
        border-radius: 250px;
        color: white;
    }

    .file-label {
        width: 100%;
        text-align: center;
        cursor: pointer;
    }
}
</style>
