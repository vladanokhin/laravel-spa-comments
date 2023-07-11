<template xmlns="http://www.w3.org/1999/html">
    <div class="container">
        <div class="row d-flex align-items-center">
            <div class="col-12 mt-3 mb-3">
                <div class="shadow d-flex align-items-center bg-light rounded-3 page-comments-header p-3">
                    <i class="bi bi-funnel ms-4 me-3"></i>
                    <span class="me-3" role="button" @click="filterByName">
                        Name
                        <i class="bi bi-sort-alpha-up" v-if="isFilterByNameAsc"></i>
                        <i class="bi bi-sort-alpha-down" v-else></i>
                    </span>
                    <span class="me-3" role="button" @click="filterByEmail">
                        Email
                        <i class="bi bi-sort-alpha-up" v-if="isFilterByEmailAsc"></i>
                        <i class="bi bi-sort-alpha-down" v-else></i>
                    </span>
                    <span class="me-3" role="button" @click="filterByDate">
                        Date
                        <i class="bi bi-sort-numeric-up" v-if="isFilterByDateAsc"></i>
                        <i class="bi bi-sort-numeric-down" v-else></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { useCommentsStore } from "@src/store/comments";

export default {
    name: "Header",
    setup() {
        return {
            commentStore: useCommentsStore(),
        }
    },
    data() {
        return {
            isFilterByNameAsc: true,
            isFilterByEmailAsc: true,
            isFilterByDateAsc: true,
        }
    },
    methods: {
        filterByName() {
            this.commentStore.filterByUserField('name', this.isFilterByNameAsc)
            this.isFilterByNameAsc = !this.isFilterByNameAsc
        },
        filterByEmail() {
            this.commentStore.filterByUserField('email', this.isFilterByEmailAsc)
            this.isFilterByEmailAsc = !this.isFilterByEmailAsc
        },
        filterByDate() {
            this.commentStore.filterByDate(this.isFilterByDateAsc)
            this.isFilterByDateAsc = !this.isFilterByDateAsc
        },
    },
}
</script>

<style scoped>
    .page-comments-header {
        height: 35px;
    }
</style>
