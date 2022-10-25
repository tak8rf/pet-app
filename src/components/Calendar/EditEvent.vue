<script setup lang="ts">
import { useStore } from '../../store'
import { computed } from 'vue'
import EditEventModal from './EditEventModal.vue'

interface Props {
  event_id: number;
  health_description: string;
}

const props = defineProps<Props>()

const store = useStore()

const isEditable = computed(()=>{
  return store.getters['Calendar/getEvent'](props.event_id).isEditable
})

const toggleModal = () => {
    store.dispatch('Calendar/toggleModal', {
        isEditable: isEditable.value,
        event_id: props.event_id,
    })
};
</script>
<template>
  <div>
    <p @click="toggleModal" >{{ props.health_description }}</p>
    <edit-event-modal :isEditable="isEditable" :event_id="props.event_id" @close="toggleModal" />
  </div>
</template>