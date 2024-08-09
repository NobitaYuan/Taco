import { useDark } from '@vueuse/core'
export const useDarkMode = () => {
    const isDark = useDark()
    const toggleDark = (bl?: boolean) => {
        if (bl === undefined) isDark.value = !isDark.value
        else isDark.value = Boolean(bl)
    }
    return {
        isDark,
        toggleDark,
    }
}
