<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDarkMode } from '@/hooks'
const { isDark, toggleDark } = useDarkMode()
</script>

<template>
    <div class="headerView">
        <div class="safe_box">
            <RouterLink class="logo" to="/"> TACO 🌮 </RouterLink>
            <div class="slogan">Looking for a better reading experience.</div>
            <div class="colorMode" @click="toggleDark(undefined)">
                <el-icon v-if="isDark"><Moon /></el-icon>
                <el-icon v-else><Sunny /></el-icon>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.headerView {
    padding: 0 24px;
    box-shadow: 0px 4px 12px 0px rgba(64, 85, 128, 0.1);
    position: relative;
    z-index: 999;
    height: var(--nav-height);
    .safe_box {
        // width: var(--safe-width);
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: relative;
        .logo {
            font-size: 24px;
            font-weight: bold;
            user-select: none;
        }
        .slogan {
            font-family: monospace;
            margin: 0 auto;
            font-size: 14px;
        }
        .colorMode {
            cursor: pointer;
        }
    }
}
</style>
