<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../store'
import { EventItem } from '../../types/event'
import RemoveEvent from '../Calendar/RemoveEvent.vue'

interface Props {
  event_id: number;
  isEditable: boolean;
}

const props = defineProps<Props>()

  const emitTest = defineEmits(['close'])

    const event = computed<EventItem>(()=>{
      return store.getters['Calendar/getEvent'](props.event_id)
    })

    const store = useStore()

    const editCard = () => {
        store.dispatch('Calendar/editEvent', {
            event:{
                health: event.value.health,
                detail: event.value.detail,
                start: event.value.start,
                end: event.value.start
            },
            event_id: props.event_id
        });
    }

</script>
<template>
  <div>
    <teleport to="body">
      <div class="modal" id="sample-modal" v-show="props.isEditable" @click="emitTest('close')"></div>
      <div class="modal-content" v-show="isEditable">
        <h3>編集画面</h3>
        <form @submit.prevent="editCard">
            <label>
            体調を選択してください。<br>
            <select v-model="event.health">
                <option disabled value="">Please select one</option>
                <option>良い</option>
                <option>悪い</option>
            </select>
            </label><br>
            <label>
                詳細を記載してください。<br>
                <textarea v-model="event.detail" placeholder="詳細を教えてください。"></textarea>
            </label><br>
            <label>
                日付を入力してください。<br>
                <input name="date" type="date" v-model="event.start" /><br>
            </label>
            <input type="submit" value="submit" />
        </form>
        <remove-event :event_id="props.event_id" />
      </div>
  </teleport>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  background-color: white;
  width: 600px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
}
</style>