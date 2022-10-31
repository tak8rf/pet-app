<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from '../../store'
  import addCardModal from '../TodoList/AddCardModal.vue'

  interface Props {
    list_id: number
  }

  const props = defineProps<Props>()

    const isVisible = computed<boolean>(()=>{
        return store.getters['TodoLists/getTodoList'](props.list_id).isVisible
    })

  const store = useStore()

  const toggleModal = () => {
      store.dispatch('TodoLists/toggleAddModal', {
          isVisible: isVisible.value,
          list_id: props.list_id,
      })
  };

</script>

<template>
  <div>
    <p class="text-input" @click="toggleModal">Add Card</p>
    <add-card-modal :list_id="props.list_id" :isVisible="isVisible" @close="toggleModal"/>
  </div>
</template>

<style>
</style>