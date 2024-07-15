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
import type { Timeline } from './Timeline';
import { ViewTimeline } from './ViewTimeline';

export default defineComponent({
    name: 'TimelineVue',
    setup() {
        const viewTimeline = inject<ViewTimeline>("viewTimeline")!;
        const timelineMessages = ref<Timeline>([]);
        
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