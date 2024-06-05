<template>
    <div>
        <h2 data-selector="message.add.title">{{ title }}</h2>
        <input data-selector="message.add.text" type="text" placeholder="Enter your message" v-model="messageText" />
        <button data-selector="message.add.button" @click="sendMessage">Send</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'MessageForm',
    setup() {
        const messageText = ref<string | null>(null);

        const sendMessage = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author: "Alice", message: messageText.value, postedAt: new Date().toISOString()})
            };

            await fetch("http://localhost:4173/api/add-message", requestOptions);
        }

        return {
            sendMessage,
            title: 'Add a message',
            messageText
        }
    }
})
</script>