<template>
    <div>
        <h1 data-selector="messages.title">{{ title }}</h1>
        <div v-for="(message, index) in timelineMessages" :key="index">
            <span :data-selector="`timeline.message.${index}.publicationTime`">{{ message.publicationTime }} : </span>
            <span :data-selector="`timeline.message.${index}.text`">{{ message.text }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue';
import type { HttpInstance } from './HttpInstance';
import type { DateProvider } from './DateProvider';
import type { Timeline } from './Timeline';
import { MessageHttp } from '../secondary/MessageHttp';
import { ViewTimeline } from './ViewTimeline';

export default defineComponent({
    name: 'TimelineVue',
    setup() {
        const httpInstance = inject<HttpInstance>("httpInstance")!;
        const dateProvider = inject<DateProvider>("dateProvider")!;
        const timelineMessages = ref<Timeline>([]);
        
        const messageHttp = new MessageHttp(httpInstance);
        const viewTimeline = new ViewTimeline(messageHttp, dateProvider);

        onMounted(async () => {
            timelineMessages.value = await viewTimeline.handle({author: "Alice"});
        });

        return {
            timelineMessages,
            title: 'Timeline'
        }
    }
})
</script>