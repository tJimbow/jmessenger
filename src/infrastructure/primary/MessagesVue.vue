<template>
    <div>
        <h1 data-selector="messages.title">{{ title }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MessagesVue',
    setup() {
        return {
            title: 'Messages'
        }
    }
})
</script>