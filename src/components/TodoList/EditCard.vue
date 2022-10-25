<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../store'
import EditCardModal from './EditCardModal.vue';

    interface Props {
        list_id: number;
        card_id: number;
        card_description: string;
    }

    const props = defineProps<Props>()

    const isEditable = computed(()=>{
        return store.getters['TodoLists/getTodoCardById'](props.list_id, props.card_id).isEditable
    })

  const store = useStore()

const toggleModal = () => {
    store.dispatch('TodoLists/toggleModal', {
        isEditable: isEditable.value,
        list_id: props.list_id,
        card_id: props.card_id
    })
};
</script>
<template>
    <div>
        <p @click="toggleModal">{{props.card_description}}</p>
        <edit-card-modal :list_id ="props.list_id" :card_id="props.card_id" :isEditable="isEditable" @close="toggleModal" />
    </div>
</template>