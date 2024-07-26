<script lang="ts" setup>
import viewport_animation from '@/components/viewport_animation.vue';
import { ElUpload, ElCard, type UploadFile, type UploadFiles } from 'element-plus';
const onUpload = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    console.log(uploadFile, uploadFiles);
};
</script>

<template>
    <div class="index_container">
        <viewport_animation>
            <ElCard :header="'Taco🌮'">
                <ElUpload @change="onUpload" :limit="1" :auto-upload="false">
                    <div class="upload_area">点击/拖拽上传epub</div>
                </ElUpload>
            </ElCard>
        </viewport_animation>
    </div>
</template>

<style lang="scss" scoped>
.index_container {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAAXNSR0IArs4c6QAAAWlJREFUeNqlloFtwzAMBFU0PxF34k5eoUtktBZVnBysixEEUWBD+idpUnrTGXNkhPvt18awXZjKyE5BE5ix8sw6IEQHfKA1kZoMF5ZNnndqy1k2vae+wTAjMBPIp+sY3QJP1JADaXtvFjv4LR1TFKA5GD4suFSQcGEhjPWRn2+zKpRLT0hBwSo3lRerdpScpbMQCgZS2cH4tHQwerJVPIQjUVBH9wFTPOMgxnRwObhWLLkKlpaJA8TnpDxBwEv1r8Uo+ImegDVX4DBXKKWt3mQnZRRMlxZ7vfxDra6j0vD8vKUtKvJ79Pt1X9W6XxZNTvphhYxcGEjneWncGVH3pM2kAs6Qlq4XDIus4x2qDKieYEsz0nTAYd96MelYZEEgElZxnJtEa4mefZpr7hHGsLLmS2uDVgPGEUadgBxwrn3zwRwGhkU2NVqy6fUEbRs1CruoCM5zlPaIIL6/biLs0edft/d7IfjhT9gfL6wnSxDYPyIAAAAASUVORK5CYII=);
    background-attachment: scroll;
    // background-color: var(--background-gray-50);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .upload_area {
        width: 600px;
        height: 100px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        border: 1px dashed #ccc;
        &:hover {
            border-color: #409eff;
        }
    }
}
</style>
