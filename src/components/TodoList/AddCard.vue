<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from '../../store'
  import addCardModal from '../TodoList/AddCardModal.vue'

  interface Props {
    list_id: number
  }

  const props = defineProps<Props>()

    const isVisible = computed(()=>{
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
    <!-- クリックしたらモーダルがオープン -->
    <p class="text-input" @click="toggleModal">Add Card</p>
    <!-- モーダルビューを呼び込む。その先で登録できるようにしたい。つまり、list_idをpropsとして渡す。リロードしても画面が消えないようにしたいため、値はtodoListsのstateで管理したい。  -->
    <add-card-modal :list_id="props.list_id" :isVisible="isVisible" @close="toggleModal"/>
  </div>
</template>

<style>
</style>