<template>
    <div>
        <MessagesVue />
        <MessageForm />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageForm from './MessageForm.vue';
import MessagesVue from './MessagesVue.vue';

export default defineComponent({
    name: 'JMessenger',
    components: {
        MessageForm,
        MessagesVue
    },
    setup() {
        return {}
    }
})
</script>