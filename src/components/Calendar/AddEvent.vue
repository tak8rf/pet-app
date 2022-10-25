<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useStore } from '../../store'

    interface Props {
        pet_id: number;
    }

    const props = defineProps<Props>()

    const event = reactive({
        id: 0,
        selected_health: '',
        detail: '',
        start: '',
        selected_color: ''
    });

    const clearForm = () => {
        event.selected_health = ""
        event.detail = ""
        event.start = ""
        event.selected_color = ""
    };

    const store = useStore()

    const onSubmit = () =>{
        store.dispatch('Calendar/addEvent', {
            id: Math.floor(Math.random() * 100000),
            pet_id: props.pet_id,
            health: event.selected_health,
            detail: event.detail,
            start: event.start,
            end: event.start,
            color: event.selected_color,
            isEditable: false
        })
        clearForm();
    }

    const events = computed(()=>{
        return store.getters['Calendar/getEvents']
    })
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
        <label>
            体調を選択してください。<br>
            <select v-model="event.selected_health">
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
        <label>
            色を選択してください。<br>
            <select v-model="event.selected_color">
                <option disabled value="">Please select one</option>
                <option>blue</option>
                <option>red</option>
                <option>limegreen</option>
                <option>deepskyblue</option>
                <option>dimgray</option>
                <option>navy</option>
                <option>orange</option>
                <option>limegreen</option>
                <option>teal</option>
                <option>royalblue</option>
            </select><br>
        </label>
        <span>Selected: {{ event.selected_color }}</span><br>
        <input type="submit" value="submit" />
    </form>
  </div>
  <hr />
</template>