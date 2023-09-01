<script>
import {defineComponent} from 'vue'
import {Tooltip} from "bootstrap";
import BootstrapModal from "@src/components/shared/BootstrapModal.vue";

export default defineComponent({
    name: "CommentFiles",
    components: {BootstrapModal},
    props: {
        files: Array,
    },
    mounted() {
        this.initTooltips()
    },
    data() {
        return {
            openedFile: null,
        }
    },
    methods: {
        initTooltips() {
            const files = document.querySelectorAll('.comment-files .file-name')
            for (let file of files) {
              new Tooltip(file)
            }

        },
        openFile(file) {
            this.$parent.$refs.bootstrapModal.showModal();
            this.openedFile = file
        }
    },
})
</script>

<template>
    <div class="col comment-files d-flex">
        <div
            v-for="file in files" :key="file.id"
            @click="openFile(file)"
            class="d-flex align-items-center justify-content-center flex-column me-2"
        >
            <i class="bi bi-file-earmark-medical"></i>
            <span
                class="file-name text-truncate"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                :data-bs-title="file.name"
            >
                {{ file.name }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user-comment .comment-text {

    .comment-files {
        font-size: 27px;
        margin-top: 4px;
        & > div > i.bi {
            cursor: pointer;
            margin-right: 10px;
            &:before {
                padding: 3px;
                text-align: center;
            }
            &:hover {
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 2px 3px 8px grey;
            }
        }

        span.file-name {
            cursor: pointer;
            max-width: 80px;
            font-size: 12px;
        }
    }
}
</style>
