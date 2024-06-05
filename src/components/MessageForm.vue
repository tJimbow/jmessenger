<template>
    <div>
        <h2 data-selector="message.add.title">{{ title }}</h2>
        <input data-selector="message.add.text" type="text" placeholder="Enter your message" />
        <button data-selector="message.add.button">Send</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MessageForm',
    setup() {
        return {
            title: 'Add a message'
        }
    }
})
</script>