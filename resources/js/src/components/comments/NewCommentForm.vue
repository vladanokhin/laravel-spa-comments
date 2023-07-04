<template>
    <div class="new-comment-form bg-light shadow rounded-3 p-3">
        <div class="mb-3">
            <label for="username" class="form-label">User name</label>
            <input
                v-model="name"
                type="text"
                class="form-control"
                :class="{'is-invalid': v$.name.$errors.length}"
                id="name">
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
                id="email">
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
                id="url">
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
                rows="3">
            </textarea>
            <div class="invalid-feedback" v-for="error in v$.message.$errors">
                {{ error.$message }}
            </div>
        </div>
        <div class="mb-3">
            <h6>Captcha</h6>
        </div>
        <div class="mb-3">
            <button @click="addComment" class="btn btn-outline-primary">Add a comment</button>
        </div>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, url, minLength, maxLength, alphaNum } from '@vuelidate/validators'

export default {
    name: "NewCommentForm",
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            name: null,
            email: null,
            url: null,
            message: null,
        }
    },
    validations() {
        return {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(30),
                alphaNum,
            },
            email: { required, email },
            url: { url },
            message: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(250),
            },
        }
    },
    methods: {
        addComment() {
            this.v$.$validate()
            if (!this.v$.$error)
                axios.post('api/comments/new', {name: this.name, email: this.email, url: this.url, message: this.message})
        }
    }
}
</script>

<style scoped>

</style>
