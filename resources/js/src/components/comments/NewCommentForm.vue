<template>
    <div class="new-comment-form bg-light shadow rounded-3 p-3">
        <div class="mb-3">
            <label for="username" class="form-label">User name</label>
            <input type="text" class="form-control" id="username">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email">
        </div>
        <div class="mb-3">
            <label for="homepage" class="form-label">Home page</label>
            <input type="url" class="form-control" id="homepage">
        </div>
        <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea class="form-control" id="message" rows="3"></textarea>
        </div>
        <div class="mb-3">
            <h6>Captcha</h6>
        </div>
        <div class="mb-3">
            <button class="btn btn-outline-primary">Add a comment</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewCommentForm"
}
</script>

<style scoped>
    .new-comment-form {

    }

</style>
