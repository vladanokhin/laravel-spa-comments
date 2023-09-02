<template>
    <div class="new-comment-form bg-light shadow rounded-3 p-3">
        <form @submit.prevent="createEmitNewComment">
            <ReplyBlock/>
            <div class="mb-3">
                <label for="name" class="form-label">User name</label>
                <input
                    v-model="name"
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
                    v-model="email"
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
                <label for="homepage" class="form-label">Home page</label>
                <input
                    v-model="url"
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
                    v-model="message"
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

<script>
import { ref } from "vue";
import captcha from "@src/mixins/captcha";
import { useVuelidate } from '@vuelidate/core'
import { useCommentsStore } from "@src/store/comments";
import commentFormRules from "@src/validators/commentFormRules";
import ReplyBlock from "@src/components/comments/ReplyBlock";
import DropFiles from "@src/components/shared/DropFiles";

export default {
    name: "NewCommentForm",
    mixins: [captcha],
    emits: ['create-new-comment'],
    data() {
        return {
            name: null,
            email: null,
            url: null,
            message: null,
        }
    },
    validations() {
        return commentFormRules
    },
    setup() {
        const serverMessageErrors = ref({})

        return {
            serverMessageErrors,
            v$: useVuelidate({ $externalResults: serverMessageErrors }),
            commentStore: useCommentsStore(),
        }
    },
    methods: {
        createEmitNewComment(event) {
            // Validation form
            this.checkedCaptcha = true;
            this.v$.$validate()
            if (this.v$.$error || !this.isValidCaptcha)
                return;

            // Creating data
            const formData = new FormData(event.currentTarget)
            this.$refs.uploadFiles.files.forEach((file) => {
                formData.append('files[]', file)
            })

            this.$emit('create-new-comment', formData)
        },
        addServerMessageErrors(errors) {
            Object.assign(this.serverMessageErrors, errors)
        }
    },
    components: {
        ReplyBlock,
        DropFiles,
    }
}
</script>

<style scoped>
@import url("/node_modules/vue-client-recaptcha/dist/style.css");

.vue_client_recaptcha {
    justify-content: start;
}

</style>
