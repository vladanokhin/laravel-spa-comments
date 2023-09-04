<script>
import {defineComponent} from 'vue'
import uploadFiles from "@src/mixins/uploadFiles";

export default defineComponent({
    name: "UserImage",
    mixins: [uploadFiles],
    data() {
        return {
            imagePreviewUrl: null,
            hover: false,
        }
    },
    methods: {
        onChange() {
            this.onUpload()
            const reader = new FileReader
            reader.onload = (event) => {
                this.imagePreviewUrl = event.target.result
            }
            reader.readAsDataURL(this.files[0])
            this.hover = false
        }
    },
})
</script>

<template>
    <div
        class="user-image"
        :class="{'dragging': isDragging}"
    >
        <input
            type="file"
            id="user-image"
            class="hidden-input"
            @change="onChange"
            ref="upload"
            accept="image/jpeg,image/png,image/gif"
        />
        <div
            class="preview"
            v-if="files.length"
            @mouseover="hover = true"
            @mouseleave="hover = false"
        >
            <img :src="imagePreviewUrl" alt="User avatar">
            <div class="image-btn-remove" v-if="hover">
                <span
                    class="text-decoration-underline"
                    @click="deleteFile(0)"
                >
                    Remove
                </span>
            </div>
        </div>
        <div
            @dragover="dragOver"
            @dragleave="dragLeave"
            @drop="dropFile"
            class="upload-text"
            v-else
        >
            <label for="user-image" class="file-label">
                <span>Upload image</span>
            </label>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.user-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 70px;
    border-radius: 250px;
    border: 1px dashed #9e9e9e;
    line-height: 15px;
    background: #f7fafc;
    font-size: 11px;
    cursor: pointer;

    &.dragging,
    &:hover {
        border: 1px dashed #41707a;
        background: rgb(64 110 142 / 20%);
    }

    .preview > img {
        height: 70px;
        width: 70px;
        border-radius: 250px;
        border: 1px dashed #9e9e9e;
    }

    .image-btn-remove {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0A0A0A99;
        height: 70px;
        width: 70px;
        text-align: center;
        position: absolute;
        top: 83px;
        border-radius: 250px;
        color: white;
    }
}

.file-label {
    width: 100%;
    text-align: center;
    cursor: pointer;
}
</style>
