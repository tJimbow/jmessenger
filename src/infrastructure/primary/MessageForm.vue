<template>
    <div>
        <h2 data-selector="message.add.title">{{ title }}</h2>
        <input data-selector="message.add.text" type="text" placeholder="Enter your message" v-model="messageText" />
        <span v-if="errorText != ''" data-selector="message.add.error">{{ errorText }}</span>
        <button data-selector="message.add.button" @click="onClick">Send</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import type { DateProvider } from './DateProvider';
import { PostMessage } from './PostMessage';
import { MessageHttp } from '../secondary/MessageHttp';
import type { HttpInstance } from '@/infrastructure/primary/HttpInstance';
import { MessageTooLongError } from '@/domain/MessageTooLongError';

export default defineComponent({
    name: 'MessageForm',
    setup() {
        const httpInstance = inject<HttpInstance>("httpInstance")!;
        const dateProvider = inject<DateProvider>("dateProvider")!;
        const errorText = ref<string>("");
        const messageText = ref<string>("");

        const messageHttp = new MessageHttp(httpInstance);
        const postMessage = new PostMessage(messageHttp, dateProvider);

        const onClick = async () => {
            errorText.value = "";

            try {
                await postMessage.handle({ id: "message-id", author: "Alice", text: messageText.value });
            } catch (error) {
                if(error instanceof MessageTooLongError) {
                    errorText.value = "Message is too long";
                } else {
                    errorText.value = "Message should not be empty";
                }
            }
        }

        return {
            onClick,
            title: 'Add a message',
            errorText,
            messageText
        }
    }
})
</script>