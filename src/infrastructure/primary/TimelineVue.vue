<template>
    <div>
        <h1 data-selector="messages.title">{{ title }}</h1>
        <div>
            <span data-selector="timeline.message.1.publicationTime">less than a minute ago : </span>
            <span data-selector="timeline.message.1.text">my last message</span>
        </div>
        <div>
            <span data-selector="timeline.message.2.publicationTime">one minute ago : </span>
            <span data-selector="timeline.message.2.text">my second message</span>
        </div>
        <div>
            <span data-selector="timeline.message.3.publicationTime">2 minutes ago : </span>
            <span data-selector="timeline.message.3.text">my first message</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { HttpInstance } from './HttpInstance';

export default defineComponent({
    name: 'TimelineVue',
    setup() {
        const httpInstance = inject<HttpInstance>("httpInstance")!;

        const response = httpInstance.get("http://localhost:4173/api/messages?author=Alice");
        return {
            title: 'Timeline'
        }
    }
})
</script>