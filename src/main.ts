import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import type { DateProvider } from './infrastructure/primary/DateProvider'
import { AxiosHttpInstance } from './infrastructure/primary/HttpInstance'
import { PostMessage } from './infrastructure/primary/PostMessage'
import { MessageHttp } from './infrastructure/secondary/MessageHttp'
import { ViewTimeline } from './infrastructure/primary/ViewTimeline'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const axiosHttpInstance = new AxiosHttpInstance(axios);
const messageHttp = new MessageHttp(axiosHttpInstance);
const dateProvider: DateProvider = {
    getNow: () => new Date()
};

app.mount('#app');
app.provide('postMessage', new PostMessage(messageHttp, dateProvider));
app.provide('viewTimeline', new ViewTimeline(messageHttp, dateProvider));


app.provide('dateProvider', dateProvider);

