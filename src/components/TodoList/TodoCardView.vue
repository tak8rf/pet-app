<script setup lang="ts">   
    import { ref, computed } from 'vue';
    import { useStore } from "../../store";
    import { TodoCard } from '../../types/todolist'
    import draggable from 'vuedraggable';
    import RemoveCard from './RemoveCard.vue'
    import EditCard from '../TodoList/EditCard.vue'
    import moment from 'moment'


    interface Props {
        list_id: number
    }

    const props = defineProps<Props>()

    const store = useStore()

    const currentDate = ref(moment())

    const displayDate = computed<string>(()=>{
        return currentDate.value.format('YYYY-MM-DD')
    })

    const todoCards = computed<TodoCard[]>({
        get: () => store.getters['TodoLists/todoCard'](props.list_id).filter((todoCard: TodoCard)=>todoCard.date.toString().includes(displayDate.value)),
        set: val => {
            store.dispatch('TodoLists/dragCard', {
                val, 
                list_id: props.list_id
            })
        }
    })

</script>

<template>
    <div>
        <draggable v-model="todoCards" group="card" item-key="id">
            <template #item="{element}">
                <div class="card">
                    <edit-card :list_id="props.list_id" :card_id="element.id" :card_description="element.description" />
                    <remove-card :list_id="props.list_id" :card_id="element.id" />
                </div>
            </template>
        </draggable>
        <hr/>
    </div>
</template>