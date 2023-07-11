<template>
    <div class="mb-3" v-if="commentStore.replyToComment.id">
        <div class="d-flex align-items-center border rounded-top">
            <div class="flex-grow-1">
                <span class="ps-2">Reply to: </span>
                <span class="fw-bold">{{ commentStore.replyToComment.user.name }}</span>
            </div>
            <button
                type="button"
                class="btn-close reply-close-btn"
                aria-label="Close"
                @click="removeReplyComment"
            >
            </button>
        </div>
        <div class="d-flex border rounded-bottom p-2">
            <span class="text-truncate">{{ commentStore.replyToComment.message }}</span>
        </div>
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

.reply-close-btn {
    width: 4px;
    height: 4px;
    margin-right: 4px;
}

</style>
