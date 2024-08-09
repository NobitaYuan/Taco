<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { zhCn } from 'element-plus/es/locale/index.mjs'
import layout from '@/layout/index.vue'
</script>

<template>
    <el-config-provider :locale="zhCn">
        <layout />
    </el-config-provider>
</template>

<style lang="scss" scoped></style>
