<template>
    <div>
        <h2 data-selector="message.add.title">{{ title }}</h2>
        <input data-selector="message.add.text" type="text" placeholder="Enter your message" />
        <button data-selector="message.add.button" @click="sendMessage">Send</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MessageForm',
    setup() {
        const sendMessage = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author: "Alice", message: "my first message", postedAt: "2019-01-01T14:00:00.000Z"})
            };

            await fetch("http://localhost:4173/api/add-message", requestOptions);
        }

        return {
            sendMessage,
            title: 'Add a message',

        }
    }
})
</script>