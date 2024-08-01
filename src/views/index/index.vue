<script lang="ts" setup>
import viewport_animation from '@/components/viewport_animation.vue'
import { UploadFile, UploadFiles } from 'element-plus'
import { Book, Rendition } from 'epubjs'
import { onMounted, ref } from 'vue'
// const bookUrl = '/api/ebook/epub/example.epub'

const book: Book = new Book()
let rendition: Rendition | null = null
const isBookRendered = ref(false)
const bookName = ref('')
const onUpload = (file: UploadFile, uploadFiles: UploadFiles) => {
    console.log('book', book.isOpen)
    if (window.FileReader) {
        var reader = new FileReader()
        reader.readAsArrayBuffer(file.raw!)
        reader.onload = (e) => {
            if (e.target?.result) {
                var bookData = e.target.result as ArrayBuffer
                book.open(bookData, 'binary')

                rendition = book.renderTo('book', { flow: 'paginated', width: 600, height: 800, allowScriptedContent: true })
                rendition.display()
                isBookRendered.value = true
                console.log('book2', book, rendition)
            }
        }
    }
}

const nextPage = () => {
    rendition?.next()
}
const prevPage = () => {
    rendition?.prev()
}
</script>

<template>
    <div class="index_container">
        <template v-if="!isBookRendered">
            <viewport_animation>
                <ElCard :header="'Taco🌮'">
                    <ElUpload @change="onUpload" :drag="true" :limit="1" :auto-upload="false">
                        <div class="upload_area">点击/拖拽上传epub</div>
                    </ElUpload>
                </ElCard>
            </viewport_animation>
        </template>
        <template v-else>
            <ElCard :header="'book'">
                <div id="book" class=""></div>
            </ElCard>
            <div class="flex justify-between w-[600px]">
                <!-- 上一页 -->
                <ElButton type="primary" @click="prevPage">上一页</ElButton>
                <!-- 下一页 -->
                <ElButton type="primary" @click="nextPage">下一页</ElButton>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.index_container {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAAXNSR0IArs4c6QAAAWlJREFUeNqlloFtwzAMBFU0PxF34k5eoUtktBZVnBysixEEUWBD+idpUnrTGXNkhPvt18awXZjKyE5BE5ix8sw6IEQHfKA1kZoMF5ZNnndqy1k2vae+wTAjMBPIp+sY3QJP1JADaXtvFjv4LR1TFKA5GD4suFSQcGEhjPWRn2+zKpRLT0hBwSo3lRerdpScpbMQCgZS2cH4tHQwerJVPIQjUVBH9wFTPOMgxnRwObhWLLkKlpaJA8TnpDxBwEv1r8Uo+ImegDVX4DBXKKWt3mQnZRRMlxZ7vfxDra6j0vD8vKUtKvJ79Pt1X9W6XxZNTvphhYxcGEjneWncGVH3pM2kAs6Qlq4XDIus4x2qDKieYEsz0nTAYd96MelYZEEgElZxnJtEa4mefZpr7hHGsLLmS2uDVgPGEUadgBxwrn3zwRwGhkU2NVqy6fUEbRs1CruoCM5zlPaIIL6/biLs0edft/d7IfjhT9gfL6wnSxDYPyIAAAAASUVORK5CYII=);
    background-attachment: scroll;
    // background-color: var(--background-gray-50);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: center;
    .upload_area {
        width: 600px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        // background-color: #fff;
        // cursor: pointer;
        // border-radius: 4px;
        // border: 1px dashed #ccc;
        // &:hover {
        //     border-color: #409eff;
        // }
    }
}
</style>
