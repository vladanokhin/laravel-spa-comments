<template>
    <div class="new-comment-form bg-light shadow rounded-3 p-3">
        <div class="mb-3">
            <label for="username" class="form-label">User name</label>
            <input
                v-model="name"
                type="text" class="form-control"
                id="name">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
                v-model="email"
                type="email"
                class="form-control"
                id="email">
        </div>
        <div class="mb-3">
            <label for="homepage" class="form-label">Home page</label>
            <input
                v-model="url"
                type="url"
                class="form-control"
                id="url">
        </div>
        <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea
                v-model="message"
                class="form-control"
                id="message"
                rows="3">
            </textarea>
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
export default {
    name: "NewCommentForm",
    data() {
        return {
            name: null,
            email: null,
            url: null,
            message: null,
        }
    },
    methods: {
        addComment() {
            axios.post('api/comments/new', {name: this.name, email: this.email, url: this.url, message: this.message})
        }
    }
}
</script>

<style scoped>

</style>
