<script>
import {defineComponent} from 'vue'
import {Modal} from "bootstrap";

export default defineComponent({
    name: "BootstrapModal",
    props: {
        'placementSelector': String,
    },
    expose: ['showModal'],
    data() {
        return {
            modal: null,
        }
    },
    mounted() {
        // this.modal = new Modal('#js-bootstrap-modal')
    },
    methods: {
        showModal() {
            console.log('Clicked open modal')
            this.modal.show()
        }
    },
})
</script>

<template>
    <Teleport :to="placementSelector">
        <div class="modal fade" id="js-bootstrap-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>

</style>
