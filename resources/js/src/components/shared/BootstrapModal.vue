<script>
import {defineComponent} from 'vue'
import {Modal} from "bootstrap";

export default defineComponent({
    name: "BootstrapModal",
    expose: ['show', 'close'],
    mounted() {
        this.modal = new Modal(document.getElementById('js-bootstrap-modal'))
    },
    data() {
        return {
            modal: null,
            title: null,
            content: null,
        }
    },
    methods: {
        show(title, content) {
            this.title = title
            this.content = content

            this.modal.show()
        },
        close() {
            this.modal.hide()
        }
    },
})
</script>

<template>
    <div class="modal fade"
         id="js-bootstrap-modal"
         data-bs-keyboard="false"
         tabindex="-1"
         aria-labelledby="staticBackdropLabel"
         aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ this.title }}</h1>
                    <button
                        @click="close"
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                    >
                    </button>
                </div>
                <div class="modal-body">
                    <pre>{{ this.content }}</pre>
                </div>
                <div class="modal-footer">
                    <button
                        @click="close"
                        type="button"
                        class="btn btn-secondary"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
