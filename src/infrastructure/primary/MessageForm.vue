<template>
    <div>
        <h2 data-selector="message.add.title">{{ title }}</h2>
        <input data-selector="message.add.text" type="text" placeholder="Enter your message" v-model="messageText" />
        <button data-selector="message.add.button" @click="onClick">Send</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { DateProvider } from './DateProvider';
import { PostMessage } from './PostMessage';
import type { MessageRepository } from '../../domain/MessageRepository';
import { Message } from '../../domain/Message';
import { MessageJson } from '../secondary/MessageJson';
import axios from 'axios';

export default defineComponent({
    name: 'MessageForm',
    setup() {
        const messageText = ref<string>("");
        const nowProvider: DateProvider = {
            getNow: () => new Date()
        };


        const saveMessage = async (message: Message) => {
            axios.post("http://localhost:4173/api/add-message", MessageJson.of(message));
        }

        const postMessageRespository: MessageRepository = {
            save: saveMessage
        };

        const postMessage = new PostMessage(postMessageRespository, nowProvider);

        const onClick = () => postMessage.handle({ id: "message-id", author: "Alice", text: messageText.value });

        return {
            onClick,
            title: 'Add a message',
            messageText
        }
    }
})
</script>