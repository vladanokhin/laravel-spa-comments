<template>
    <div class="dropzone-main">
        <input
            type="file"
            multiple
            id="user-file"
            class="hidden-input"
            @change="onUpload"
            ref="upload"
            accept=".txt"
        />
        <div
            class="dropzone-container"
            :class="{'dragging': isDragging}"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
            v-if="files.length === 0"
        >
            <label for="user-file" class="file-label">
                <span v-if="isDragging">Release to drop files here.</span>
                <span v-else>Drop files here or <u>click here</u> to upload.</span>
            </label>
        </div>
        <div
            v-else
            class="files"
        >
            <div
                class="file-item"
                v-for="file in files"
                :key="file.name"
            >
                <span class="text-truncate me-1">{{ file.name }}</span>
                <span
                    class="delete-file"
                    @click="deleteFile(files.indexOf(file))"
                >
                    Delete
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "DropFiles",
    expose: ['files'],
    data() {
        return {
            isDragging: false,
            files: [],
        }
    },
    methods: {
        onUpload() {
            this.files.push(...this.$refs.upload.files);
        },
        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            this.$refs.upload.files = e.dataTransfer.files;
            this.onUpload();
            this.isDragging = false;
        },
        deleteFile(index) {
            this.files.splice(index, 1)
        }
    }

}
</script>

<style lang="scss" scoped>
.dropzone-main {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.dropzone-container {
    padding: 2rem;
    background: #f7fafc;
    border: 1px dashed #9e9e9e;
    border-radius: 8px;
    width: 100%;
    &.dragging {
        border: 1px dashed #23395B;
        background: rgb(64 110 142 / 20%);
    }
}

.files {
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    border-radius: 8px;
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
    font-size: 12px;
    line-height: 1.5;
}

.file-item {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(56 111 164 / 20%);
    padding: 7px 7px 7px 15px;
    margin-top: 10px;

    &:first-child {
        margin-top: 0;
    }

    .delete-file {
        background: rgb(0 148 198);
        color: #fff;
        padding: 5px 10px;
        border-radius: 8px;
        cursor: pointer;
    }
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    font-size: 14px;
    display: block;
    cursor: pointer;
}
</style>
