import { createApp } from 'vue'
import './assets/style/main.css'
import App from './App.vue'

import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
