<script setup lang="ts">
  import { ref } from 'vue'
  import addCardModal from '../TodoList/AddCardModal.vue'

  interface Props {
        list_id: number
    }

  const props = defineProps<Props>()

  const ModalVisible = ref(false)

  const toggleModal = () => {
    ModalVisible.value = !ModalVisible.value
  };
</script>

<template>
  <div>
    <!-- クリックしたらモーダルがオープン -->
    <p class="text-input" @click="toggleModal">Add Card</p>
    <!-- モーダルビューを呼び込む。その先で登録できるようにしたい。つまり、list_idをpropsとして渡す。リロードしても画面が消えないようにしたいため、値はtodoListsのstateで管理したい。  -->
    <add-card-modal :list_id="props.list_id" :isVisible="ModalVisible" @close="toggleModal"/>
  </div>
</template>

<style>
</style>