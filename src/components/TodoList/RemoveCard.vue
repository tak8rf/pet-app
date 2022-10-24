<script setup lang="ts">
import { useStore } from '../../store'

  interface Props {
    list_id: number
    card_id: number
  }

  const props = defineProps<Props>()

  const store = useStore()

    const removeCard = () => {
        store.dispatch('TodoLists/removeCard', {
            card_id: props.card_id, 
            list_id: props.list_id
        })
    }
</script>

<template>
  <div>
    <button @click="removeCard" class="close-button">X</button>
    <p>{{props.card_id}}</p>
  </div>
</template>