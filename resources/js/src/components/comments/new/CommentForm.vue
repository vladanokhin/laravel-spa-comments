<script>
import {ref, defineComponent} from "vue";
import captcha from "@src/mixins/captcha";
import {useVuelidate} from '@vuelidate/core'
import {useCommentsStore}  from "@src/store/comments";
import commentFormRules from "@src/validators/commentFormRules";
import ReplyBlock from "@src/components/comments/new/ReplyBlock";
import DropFiles from "@src/components/shared/DropFiles";
import UserImage from "@src/components/shared/UserImage";
import { QuillEditor } from '@vueup/vue-quill'
import PreviewMode from "@src/components/comments/new/PreviewMode";

export default defineComponent({
    name: "CommentForm",
    mixins: [captcha],
    emits: ['create-new-comment'],
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
            name: null,
            email: null,
            url: null,
            message: null,
            editorMessage: null,
            isPreviewMode: false,
        }
    },
    methods: {
        createEmitNewComment() {
            if(!this.validateForm())
                return

            this.$emit('create-new-comment', this.getFormData())
        },
        validateForm() {
            this.checkedCaptcha = true;
            this.v$.$validate()
            this.$refs.uploadFiles.v$.$validate()
            this.$refs.uploadImage.v$.$validate()

            return !(this.v$.$error || this.$refs.uploadFiles.v$.$error
                   || this.$refs.uploadImage.v$.$error || !this.isValidCaptcha)
        },
        getFormData() {
            const formData = new FormData(document.getElementById('js-new-comment-form'))
            this.$refs.uploadFiles.files.forEach((file) => {
                formData.append('files[]', file.id)
            })

            if(this.$refs.uploadImage.files.length)
                formData.append('avatar', this.$refs.uploadImage.files[0].id)

            formData.set('message', this.$refs.editor.getHTML())
            formData.set('clear_message', this.$refs.editor.getText())

            return formData
        },
        addServerMessageErrors(errors) {
            // Rename the key to display messages correctly
            if('clear_message' in errors) {
                errors['message'] = errors['clear_message']
                delete errors['clear_message']
            }
            // Setting and displaying errors from the server
            Object.assign(this.serverMessageErrors, errors)
            // Displaying errors for uploaded files
            this.$refs.uploadFiles.addServerMessageErrors(errors)
            this.$refs.uploadImage.addServerMessageErrors(errors)
        },
    },
    watch: {
        editorMessage() {
            this.message = this.$refs.editor.getText().trimEnd()
        },
    },
    validations() {
        return commentFormRules
    },
    components: {
        ReplyBlock,
        DropFiles,
        UserImage,
        QuillEditor,
        PreviewMode
    }
})
</script>

<template>
    <div class="new-comment-form bg-light shadow rounded-3 p-3">
        <form @submit.prevent="createEmitNewComment" id="js-new-comment-form">
            <ReplyBlock/>
            <div class="d-flex flex-column align-items-center me-2">
                <UserImage ref="uploadImage"/>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">User name</label>
                <input
                    v-model="v$.name.$model"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid': v$.name.$errors.length}"
                    id="name"
                    name="name"
                    :disabled="isPreviewMode"
                >
                <div class="invalid-feedback" v-for="error in v$.name.$errors">
                    {{ error.$message }}
                </div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                    v-model="v$.email.$model"
                    type="email"
                    class="form-control"
                    :class="{'is-invalid': v$.email.$errors.length}"
                    id="email"
                    name="email"
                    :disabled="isPreviewMode"
                >
                <div class="invalid-feedback" v-for="error in v$.email.$errors">
                    {{ error.$message }}
                </div>
            </div>
            <div class="mb-3">
                <label for="url" class="form-label">Home page</label>
                <input
                    v-model="v$.url.$model"
                    type="url"
                    class="form-control"
                    :class="{'is-invalid': v$.url.$errors.length}"
                    id="url"
                    name="url"
                    :disabled="isPreviewMode"
                >
                <div class="invalid-feedback" v-for="error in v$.url.$errors">
                    {{ error.$message }}
                </div>
            </div>
            <div class="mb-3" :class="{'has-errors': v$.message.$errors.length}">
                <label for="message" class="form-label">Message</label>
                <input
                    type="hidden"
                    v-model="v$.message.$model"
                >
                <QuillEditor
                    :toolbar="['bold', 'italic', 'code-block', 'link']"
                    v-model:content="editorMessage"
                    content-type="html"
                    ref="editor"
                    :enable="!isPreviewMode"
                />
                <div :class="{'is-invalid': v$.message.$errors.length}"></div>
                <div class="invalid-feedback" v-for="error in v$.message.$errors">
                    {{ error.$message }}
                </div>
            </div>
            <div class="mb-3">
                <VueClientRecaptcha
                    :chars="captchaChars"
                    :value="captcha"
                    @isValid="setIsValidCaptcha"
                    @getCode="newCaptchaCode"
                    class="mb-3 justify-content-start"
                />
                <input
                    v-model="captcha"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid': !isValidCaptcha && checkedCaptcha}"
                    id="captcha"
                    :disabled="isPreviewMode"
                >
                <div class="invalid-feedback">
                    Invalid captcha
                </div>
            </div>
            <div class="mb-3">
                <DropFiles ref="uploadFiles"/>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-outline-primary mt-3">Add a comment</button>
                    <PreviewMode
                        @enable-preview="isPreviewMode = true"
                        @disable-preview="isPreviewMode = false"
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>
