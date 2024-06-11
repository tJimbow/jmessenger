<template>
    <div>
        <TimelineVue />
        <MessageForm />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageForm from './MessageForm.vue';
import TimelineVue from './TimelineVue.vue';

export default defineComponent({
    name: 'JMessenger',
    components: {
        MessageForm,
        TimelineVue
    },
    setup() {
        return {}
    }
})
</script>