<script setup lang="ts">
import { useStore } from '../../store'

    const props = defineProps({
        event_id: Number
    })

    const store = useStore()

    const removeEvent = () =>{
        store.dispatch('Calendar/removeEvent', {
        event_id: props.event_id
        })
    }
</script>

<template>
  <div>
    <button @click="removeEvent">削除</button>
  </div>
</template>