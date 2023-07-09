<template>
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
                    <span role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reply-all-fill" viewBox="0 0 16 16">
                            <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
                            <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div class="row comment-text m-2">
            <div class="col-12">
                {{ comment.message }}!
            </div>
        </div>
        <div class="child" v-if="comment.children && comment.children.length">
            <CommentsList :comments="comment.children" :is-child="true"/>
        </div>
    </div>
    <Bootstrap5Pagination
        v-if="!isChild"
        class="d-flex justify-content-center mt-3"
        :data="commentStore.listComments"
        @pagination-change-page="commentStore.loadListComments"
    />
</template>

<script>
import moment from "moment";
import { useCommentsStore } from "@src/store/comments";
import { Bootstrap5Pagination } from "laravel-vue-pagination";

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
    },
    components: {
        Bootstrap5Pagination,
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

</style>
