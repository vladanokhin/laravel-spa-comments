<template>
    <TransitionGroup name="comment-list">
        <div class="user-comment" v-for="comment in listComments" :key="comment.id">
            <div class="row comment-header bg-body-secondary m-3">
                <div class="col-12 d-flex justify-content-start align-items-center">
                    <div class="user-icon text-overflow">
                        <span class="text-uppercase fs-5">{{ comment.user.name.charAt(0) }}</span>
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
                    {{ comment.message }}
                </div>
                <CommentFiles :files="comment.files" v-if="comment.files.length"/>
            </div>
            <div class="child" v-if="comment.children && comment.children.length">
                <CommentsList :comments="comment.children" :is-child="true"/>
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

<script>
import moment from "moment";
import { useCommentsStore } from "@src/store/comments";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import CommentFiles from "@src/components/comments/CommentFiles";

export default {
    name: "CommentsList",
    props: {
        'comments': Object,
        'isChild': false,
    },
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
          this.commentStore.replyToComment = comment
        },
        paginationChangePage(page) {
            this.commentStore.loadListComments(page)
                .then(() => {
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 250)
                })
        }
    },
    components: {
        Bootstrap5Pagination,
        CommentFiles,
    }
}
</script>

<style scoped>

.user-comment {
    overflow: hidden;
}

.user-comment > div.child {
    margin-left: 45px;
}

.comment-header {
    height: 38px;
}

.comment-header .user-icon {
    height: 30px;
    width: 30px;
    border-radius: 250px;
    border: 3px solid white;
    color: #000000;
    text-align: center;
    line-height: 23px;
    background: #bbb;
}

.comment-header .text-overflow {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.comment-header .comment-date {
    font-size: 13px;
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
