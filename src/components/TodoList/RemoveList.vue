<script setup lang="ts">
import { useStore } from '../../store'

  interface Props {
    list_id: number
  }

  const props = defineProps<Props>()

  const store = useStore()

  const removeList = () =>{
    store.dispatch('TodoLists/removeList', {
      list_id: props.list_id
    })
  }
</script>

<template>
  <div>
    <button @click="removeList" class="deletelist">X</button>
  </div>
</template>