<script>
import {defineComponent} from 'vue'
import moment from "moment";
import {useCommentsStore} from "@src/store/comments";
import {Bootstrap5Pagination} from "laravel-vue-pagination";
import CommentFiles from "@src/components/comments/CommentFiles.vue";
import BootstrapModal from "@src/components/shared/BootstrapModal.vue";
import 'vue3-photo-preview/dist/index.css';
import {PhotoConsumer, PhotoProvider} from "vue3-photo-preview";
import {decodeHtml} from "@src/helpers/functions.js";

export default defineComponent({
    name: "CommentsList",
    props: {
        comments: Object,
        isChild: Boolean,
        isPreviewMode: Boolean,
    },
    emits: ['open-file', 'new-comment-in-list'],
    setup() {
        return {
            commentStore: useCommentsStore(),
        }
    },
    mounted() {
        if(typeof this.comments === 'undefined')
            this.commentStore.loadListComments();
    },
    computed: {
        listComments() {
            return typeof this.comments === 'undefined'
                ? this.commentStore.listComments.data
                : this.comments
        },
    },
    methods: {
        formatDate(_date) {
            return moment(_date, ).format('YY-MM-DD в HH:mm')
        },
        setCommentToReply(comment) {
            if(this.isPreviewMode)
                return

            this.commentStore.replyToComment = comment
            window.scrollTo(0, 0)
        },
        paginationChangePage(page) {
            this.commentStore.loadListComments(page)
                .then(() => {
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 250)
                })
        },
        emitOpenFile(fileId) {
            this.$emit('open-file', fileId)
        },
        toHtml(html) {
            return decodeHtml(html)
        }
    },
    watch: {
        listComments: {
            handler(newList) {
                if(Object.keys(newList).length === 0)
                    return

                this.$emit('new-comment-in-list')
            },
            deep: true,
        }
    },
    components: {
        PhotoConsumer,
        PhotoProvider,
        Bootstrap5Pagination,
        CommentFiles,
        BootstrapModal,
    }
})
</script>

<template>
    <TransitionGroup name="comment-list">
        <div
            v-if="listComments"
            class="user-comment"
            v-for="comment in listComments"
            :key="comment.id"
            :class="{'is-preview': comment.preview ?? false}"
            :id="comment.preview ? 'js-preview-comment' : `comment-${comment.id}`"
        >
            <div class="row comment-header bg-body-secondary m-3">
                <div class="col-12 d-flex justify-content-start align-items-center">
                    <div class="user-icon text-overflow">
                        <PhotoProvider v-if="comment.user.avatar?.url" :defaultBackdropOpacity="0.5">
                            <PhotoConsumer :src="comment.user.avatar.url">
                                <img :src="comment.user.avatar.url" :alt="comment.user.name" class="view-box"/>
                            </PhotoConsumer>
                        </PhotoProvider>
                        <span
                            v-else
                            class="text-uppercase fs-5"
                        >
                            {{ comment.user.name.charAt(0) }}
                        </span>
                    </div>
                    <div class="user-name text-overflow ms-2">
                        <span class="fw-bold">{{ comment.user.name }}</span>
                    </div>
                    <div class="user-email text-overflow ms-1">
                        <span class="fw-light">{{ comment.user.email }}</span>
                    </div>
                    <div class="comment-date text-overflow ms-3">
                        <span class="fw-light">{{ formatDate(comment.date) }}</span>
                    </div>
                    <div class="comment-action d-flex flex-column ms-auto mb-1">
                    <span role="button" @click="setCommentToReply(comment)">
                        <i class="bi bi-reply-all-fill"></i>
                    </span>
                    </div>
                </div>
            </div>
            <div class="row comment-text m-2">
                <div class="col-12">
                    <span v-html="toHtml(comment.message)"></span>
                </div>
                <CommentFiles
                    :files="comment.files"
                    v-if="comment.files.length"
                    @open-file="emitOpenFile"
                />
            </div>
            <div class="child" v-if="comment.children && comment.children.length">
                <CommentsList
                    :comments="comment.children"
                    :is-child="true"
                    :is-preview-mode="isPreviewMode"
                    @open-file="emitOpenFile"
                />
            </div>
        </div>
        <div v-else class="vh-100 d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading comments...</span>
            </div>
        </div>
    </TransitionGroup>

    <Bootstrap5Pagination
        v-if="!isChild"
        class="mt-3"
        align="center"
        :data="commentStore.listComments"
        @pagination-change-page="paginationChangePage"
    />
</template>

<style lang="scss" scoped>
.user-comment {
    overflow: hidden;

    &.is-preview {
        background-color: rgb(239 220 168 / 50%);
    }

    > div.child {
        margin-left: 45px;
    }

    .comment-header {
        height: 38px;

        .user-icon {
            height: 30px;
            width: 30px;
            border-radius: 250px;
            border: 3px solid white;
            color: #000000;
            text-align: center;
            line-height: 23px;
            background: #bbb;
            cursor: pointer;

            &:hover {
                border: 3px solid #41707a;
            }
        }

        .text-overflow {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .comment-date {
            font-size: 13px;
        }
    }
}

.comment-list-enter-active,
.comment-list-leave-active {
    transition: all 1s ease;
}
.comment-list-enter-from,
.comment-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

</style>
