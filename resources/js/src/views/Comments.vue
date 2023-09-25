<script>
import {defineComponent} from 'vue'
import Header from '@src/components/comments/Header.vue'
import NewCommentForm from '@src/components/comments/new/CommentForm.vue'
import CommentsList from "@src/components/comments/CommentsList.vue";
import {useCommentsStore} from "@src/store/comments.js";
import BootstrapModal from "@src/components/shared/BootstrapModal.vue";

export default defineComponent({
    name: "Comments",
    setup() {
        return {
            commentStore: useCommentsStore(),
        }
    },
    data() {
        return {
            lastComment: {},
        }
    },
    methods: {
        addComment(data) {
            this.commentStore.addComment(data)
                .then((res) => {
                    this.lastComment = res.data.data
                    this.commentStore.replyToComment = {}
                })
                .catch((error) => {
                    // Show errors message from server
                    this.$refs.commentForm.addServerMessageErrors(error.response.data.errors)
                })
        },
        openFile(fileId) {
            this.commentStore.getFile(fileId)
                .then((file) => {
                    this.$refs.bootstrapModal.show(file.name, file.content);
                })
        }
    },
    components: {
        BootstrapModal,
        Header,
        NewCommentForm,
        CommentsList,
    },
})
</script>

<template>
    <Header/>
    <div class="container">
        <div class="row d-flex justify-content-between">
            <div class="col-8 col-sm-5 col-md-8">
                <div class="bg-light shadow rounded-3 p-3 mb-3">
                    <CommentsList
                        :key="lastComment.id"
                        @open-file="openFile"
                    />
                </div>
            </div>
            <div class="col-4 col-sm-7 col-md-4">
                <NewCommentForm
                    @create-new-comment="addComment"
                    :key="lastComment.id"
                    ref="commentForm"
                />
            </div>
        </div>
    </div>
    <BootstrapModal ref="bootstrapModal"/>
</template>

<style scoped>

</style>
