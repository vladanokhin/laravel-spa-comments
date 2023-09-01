<template>
    <div class="mb-3" v-if="commentStore.replyToComment.id">
        <div class="d-flex align-items-center border rounded-top">
            <div class="flex-grow-1">
                <span class="ps-2">Reply to: </span>
                <span class="fw-bold">{{ commentStore.replyToComment.user.name }}</span>
            </div>
            <span
                role="button"
                class="fs-5 me-1"
                @click="removeReplyComment"
            >
                <i class="bi bi-x"></i>
            </span>
        </div>
        <div class="d-flex border rounded-bottom p-2">
            <span class="text-truncate">{{ commentStore.replyToComment.message }}</span>
        </div>
        <input type="hidden" name="reply" :value="commentStore.replyToComment.id"/>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCommentsStore } from "@src/store/comments";

export default defineComponent({
    name: "ReplyBlock",
    setup() {
        return {
            commentStore: useCommentsStore(),
        }
    },
    methods: {
        removeReplyComment() {
            this.commentStore.replyToComment = {}
        }
    }

})
</script>

<style scoped>

</style>
