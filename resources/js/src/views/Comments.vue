<template>
    <Header/>
    <div class="container">
        <div class="row d-flex justify-content-between">
            <div class="col-8 col-sm-5 col-md-8">
                <div class="bg-light shadow rounded-3 p-3">
                    Comments list!
                </div>
            </div>
            <div class="col-4 col-sm-7 col-md-4">
                <NewCommentForm/>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@src/components/comments/Header'
import NewCommentForm from '@src/components/comments/NewCommentForm'

export default {
    name: "Comments",
    components: {
        Header,
        NewCommentForm,
    }
}
</script>

<style scoped>

</style>
