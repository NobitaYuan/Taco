<script lang="ts" setup>
import { RouterView } from 'vue-router'
import headerView from './components/headerView.vue'
</script>

<template>
    <div class="layout">
        <header>
            <headerView />
        </header>
        <main>
            <RouterView v-slot="{ Component, route }">
                <transition :mode="'out-in'" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
                    <keep-alive>
                        <component :is="Component" :key="route.name" />
                    </keep-alive>
                </transition>
            </RouterView>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.layout {
    // 动画速度
    .animate__animated {
        --animate-duration: 0s;
    }
}
</style>
