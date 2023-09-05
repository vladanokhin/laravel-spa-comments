<script>
import {ref, defineComponent} from "vue";
import captcha from "@src/mixins/captcha";
import {useVuelidate} from '@vuelidate/core'
import {useCommentsStore}  from "@src/store/comments";
import commentFormRules from "@src/validators/commentFormRules";
import ReplyBlock from "@src/components/comments/new/ReplyBlock";
import DropFiles from "@src/components/shared/DropFiles";
import UserImage from "@src/components/shared/UserImage";

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
        }
    },
    methods: {
        createEmitNewComment(event) {
            if(!this.validateForm())
                return

            this.$emit('create-new-comment', this.getFormData(event))
        },
        validateForm() {
            this.checkedCaptcha = true;
            this.v$.$validate()
            this.$refs.uploadFiles.v$.$validate()
            this.$refs.uploadImage.v$.$validate()

            return !(this.v$.$error || this.$refs.uploadFiles.v$.$error || this.$refs.uploadImage.v$.$error || !this.isValidCaptcha)
        },
        getFormData(event) {
            const formData = new FormData(event.currentTarget)
            this.$refs.uploadFiles.files.forEach((file) => {
                formData.append('files[]', file)
            })

            if(this.$refs.uploadImage.files.length)
                formData.append('avatar', this.$refs.uploadImage.files[0])

            return formData
        },
        addServerMessageErrors(errors) {
            Object.assign(this.serverMessageErrors, errors)
            this.$refs.uploadFiles.addServerMessageErrors(errors)
            this.$refs.uploadImage.addServerMessageErrors(errors)

        }
    },
    validations() {
        return commentFormRules
    },
    components: {
        ReplyBlock,
        DropFiles,
        UserImage
    }
})
</script>

<template>
    <div class="new-comment-form bg-light shadow rounded-3 p-3">
        <form @submit.prevent="createEmitNewComment">
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
                >
                <div class="invalid-feedback" v-for="error in v$.url.$errors">
                    {{ error.$message }}
                </div>
            </div>
            <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea
                    v-model="v$.message.$model"
                    class="form-control"
                    :class="{'is-invalid': v$.message.$errors.length}"
                    id="message"
                    rows="3"
                    name="message"
                >
                </textarea>
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
                    class="mb-3"
                />
                <input
                    v-model="captcha"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid': !isValidCaptcha && checkedCaptcha}"
                    id="captcha"
                >
                <div class="invalid-feedback">
                    Invalid captcha
                </div>
            </div>
            <div class="mb-3">
                <DropFiles ref="uploadFiles"/>
                <button type="submit" class="btn btn-outline-primary mt-3">Add a comment</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
@import url("/node_modules/vue-client-recaptcha/dist/style.css");

.vue_client_recaptcha {
    justify-content: start;
}

</style>
