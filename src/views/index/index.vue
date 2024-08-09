<script lang="ts" setup>
import viewport_animation from '@/components/viewport_animation.vue'
import { UploadFile, UploadFiles } from 'element-plus'
import { Book, Rendition } from 'epubjs'
import Navigation, { NavItem } from 'epubjs/types/navigation'
import { onMounted, ref } from 'vue'
const bookUrl = 'https://s3.amazonaws.com/moby-dick/OPS/package.opf'

const book: Book = new Book()
let rendition: Rendition | null = null
const isBookRendered = ref(false)
const bookName = ref('')
const cover = ref('')
const toc = ref<NavItem[]>([])

const onUpload = (file: UploadFile, uploadFiles: UploadFiles) => {
    if (window.FileReader) {
        bookName.value = file.name.split('.')[0]
        var reader = new FileReader()
        reader.readAsArrayBuffer(file.raw!)
        reader.onload = (e) => {
            if (e.target?.result) {
                var bookData = e.target.result as ArrayBuffer
                book.open(bookData, 'binary')
                rendition = book.renderTo('book', { flow: 'paginated', width: 600, height: 800, allowScriptedContent: true })
                rendition.display()
                isBookRendered.value = true
                setTimeout(() => {
                    console.log('book2', book, rendition)
                }, 1000)

                // 高亮颜色
                rendition.themes.default({
                    '::selection': {
                        background: 'rgba(255,255,0, 0.3)',
                    },
                    '.epubjs-hl': {
                        fill: 'yellow',
                        'fill-opacity': '0.3',
                        'mix-blend-mode': 'multiply',
                    },
                })

                // 高亮
                rendition.on('selected', function (cfiRange) {
                    book.getRange(cfiRange).then(function (range) {
                        console.log('cfiRange', cfiRange, 'range', range.toString())
                    })
                })
                // 封面
                book.coverUrl().then((res) => {
                    cover.value = res || ''
                    console.log('cover', cover.value)
                })

                // toc目录
                book.loaded.navigation.then(function (t) {
                    console.log('toc', t)
                    toc.value = t.toc
                })
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

// 全局添加上下翻页事件
document.addEventListener('keydown', (e) => {
    if (!isBookRendered.value) return
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevPage()
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextPage()
    }
})

const clickToc = (item: NavItem) => {
    console.log('item', item)
    rendition?.display(item.href)
    console.log('rendition', rendition)
}
</script>

<template>
    <div class="index_container">
        <div class="toc">
            <div class="toc_label mb-[4px]">目录</div>
            <div class="toc_item" v-for="item in toc" :key="item.id">
                <div class="toc_label" @click="clickToc(item)">{{ item.label }}</div>
                <div class="subitems_item" v-if="item.subitems" @click="clickToc(item)">
                    <template v-for="subitem in item.subitems">
                        <div class="subitems_label">{{ subitem.label }}</div>
                    </template>
                </div>
            </div>
        </div>
        <template v-if="!isBookRendered">
            <viewport_animation>
                <ElUpload class="elUpload" @change="onUpload" :drag="true" :limit="1" :auto-upload="false">
                    <div class="upload_area">点击/拖拽上传epub</div>
                </ElUpload>
            </viewport_animation>
        </template>
        <template v-else>
            <ElCard :header="bookName">
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
    min-height: calc(100vh - var(--nav-height));
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: center;
    padding-top: 24px;
    position: relative;
    .toc {
        position: absolute;
        left: 36px;
        top: 80px;
        width: 200px;
        // background-color: #fff;
        box-shadow: var(--el-box-shadow-light);
        border-radius: 4px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        // gap: 12px;
        .toc_item {
            cursor: pointer;
            padding: 14px 8px;
            border-radius: 4px;
            user-select: none;
            &:hover {
                color: var(--el-color-primary);
                box-shadow: var(--el-box-shadow-light) inset;
            }
            .toc_label {
                font-size: 14px;
                font-weight: 500;
            }
            .subitems_item {
                padding-left: 12px;
                .subitems_label {
                    font-size: 12px;
                    font-weight: 400;

                    cursor: pointer;
                    &:hover {
                    }
                }
            }
        }
    }
    .elUpload {
        box-shadow: var(--el-box-shadow-light);
        border-radius: 4px;
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
}
</style>
