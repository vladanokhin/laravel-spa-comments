import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@src/App.vue'
import router from '@src/router'
import vue3PhotoPreview from 'vue3-photo-preview';

const app = createApp(App)
    .use(createPinia())
    .use(vue3PhotoPreview)
    .use(router)
    .mount('#app')
