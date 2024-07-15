import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import type { DateProvider } from './infrastructure/primary/DateProvider'
import { AxiosHttpInstance } from './infrastructure/primary/HttpInstance'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.provide('axiosHttpInstance', new AxiosHttpInstance(axios))

const dateProvider: DateProvider = {
    getNow: () => new Date()
};

app.provide('dateProvider', dateProvider)

