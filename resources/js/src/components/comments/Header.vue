<template xmlns="http://www.w3.org/1999/html">
    <div class="container">
        <div class="row d-flex align-items-center">
            <div class="col-12 mt-3 mb-3 comments-header">
                <div class="shadow d-flex align-items-center bg-light rounded-3 comments-header p-3">
                    <span class="me-3">Email</span>
                    <span class="me-3">Name</span>
                    <span class="me-3">Date</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Header",
}
</script>

<style scoped>
    .comments-header {
        height: 35px;
    }
</style>
