import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@src/App.vue'
import router from '@src/router'


const app = createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
