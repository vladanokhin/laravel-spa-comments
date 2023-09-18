<script>
import {defineComponent} from 'vue'
import {useCommentsStore} from "@src/store/comments";

export default defineComponent({
    name: "PreviewMode",
    setup() {
        return {
            commentStore: useCommentsStore(),
        }
    },
    data() {
        return {
            isPreviewMode: false,
        }
    },
    methods: {
        enablePreview() {
            if(!this.$parent.validateForm())
                return

            this.isPreviewMode = true
            const formData = this.$parent.getFormData()

            this.commentStore.listComments.data.unshift({
                'files': [],
                'date': new Date(),
                'message': formData.get('message'),
                'user': {
                    'avatar': null,
                    'email': formData.get('email'),
                    'name': formData.get('name'),
                    'url': formData.get('url'),
                }
            })

            this.$emit('enable-preview')
            window.scrollTo(0, 0);
        },
        disablePreview() {
            this.isPreviewMode = false
            this.commentStore.listComments.data.shift()

            this.$emit('disable-preview')
            window.scrollTo(0, 0);
        }
    },
})
</script>

<template>
    <button
        v-if="isPreviewMode"
        type="button"
        class="btn btn-outline-secondary mt-3"
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
