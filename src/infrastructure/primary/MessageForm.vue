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
import { PostMessage } from './PostMessage';
import { MessageTooLongError } from '@/domain/MessageTooLongError';

export default defineComponent({
    name: 'MessageForm',
    setup() {
        const postMessage = inject<PostMessage>("postMessage")!;
        const errorText = ref<string>("");
        const messageText = ref<string>("");

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