<script>
import {defineComponent} from 'vue'
import {useCommentsStore} from "@src/store/comments";
import {deepSearch, scrollToElement} from "@src/helpers/functions";

export default defineComponent({
    name: "PreviewMode",
    emits: ['changed-preview-mode'],
    setup() {
        return {
            commentStore: useCommentsStore(),
        }
    },
    data() {
        return {
            isPreviewMode: false,
            replyToComment: null,
        }
    },
    methods: {
        enablePreview() {
            if(!this.$parent.validateForm())
                return

            this.isPreviewMode = true
            const data = this.prepareDate()

            if(this.commentStore.isCommentToReply) {
                this.replyToComment = deepSearch(this.commentStore.listComments.data, this.commentStore.replyToComment.id)
                this.replyToComment.children.unshift(data)
            }
            else {
                this.commentStore.listComments.data.unshift(data)
            }

            this.$emit('changed-preview-mode', true)
            scrollToElement('js-preview-comment')
        },
        prepareDate() {
            const formData = this.$parent.getFormData(true)
            let avatar = JSON.parse(formData.get('avatar'))
            avatar = avatar?.length ? avatar[0] : null

            return {
                'preview': true,
                'files': JSON.parse(formData.getAll('files[]')),
                'date': new Date(),
                'message': formData.get('message'),
                'user': {
                    'avatar': avatar,
                    'email': formData.get('email'),
                    'name': formData.get('name'),
                    'url': formData.get('url'),
                }
            }
        },
        disablePreview() {
            this.isPreviewMode = false
            if(this.commentStore.isCommentToReply)
                this.replyToComment.children.shift()
            else
                this.commentStore.listComments.data.shift()

            this.$emit('changed-preview-mode', false)
            window.scrollTo(0, 0);
        },
    },
})
</script>

<template>
    <button
        v-if="isPreviewMode"
        type="button"
        class="btn btn-outline-dark mt-3"
        @click="disablePreview"
    >
        Disable comment preview
        <i class="bi bi-eye-slash-fill"></i>
    </button>

    <button
        v-else
        type="button"
        class="btn btn-outline-info mt-3"
        @click="enablePreview"
    >
        Comment preview
        <i class="bi bi-eye-fill"></i>
    </button>
</template>

<style scoped>

</style>
