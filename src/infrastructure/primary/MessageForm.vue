<template>
    <div>
        <h2 data-selector="message.add.title">{{ title }}</h2>
        <input data-selector="message.add.text" type="text" placeholder="Enter your message" v-model="messageText" />
        <span v-if="isErrorVisible" data-selector="message.add.error">Message is too long</span>
        <button data-selector="message.add.button" @click="onClick">Send</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import type { DateProvider } from './DateProvider';
import { PostMessage } from './PostMessage';
import { MessageHttp } from '../secondary/MessageHttp';
import type { HttpInstance } from '@/infrastructure/primary/HttpInstance';

export default defineComponent({
    name: 'MessageForm',
    setup() {
        const httpInstance = inject<HttpInstance>("httpInstance")!;
        const dateProvider = inject<DateProvider>("dateProvider")!;
        const messageText = ref<string>("");
        const isErrorVisible = ref<boolean>(false);

        const messageHttp = new MessageHttp(httpInstance);
        const postMessage = new PostMessage(messageHttp, dateProvider);

        const onClick = async () => {
            try {
                await postMessage.handle({ id: "message-id", author: "Alice", text: messageText.value });
            } catch (error) {
                isErrorVisible.value = true;
            }
        }

        return {
            isErrorVisible,
            onClick,
            title: 'Add a message',
            messageText
        }
    }
})
</script>