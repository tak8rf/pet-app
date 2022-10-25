<script setup lang="ts">   
    import { ref, computed } from 'vue';
    import { useStore } from "../../store";
    import { TodoCard } from '../../types/todolist'
    import draggable from 'vuedraggable';
    import RemoveCard from './RemoveCard.vue'
    import EditCard from '../TodoList/EditCard.vue'


    interface Props {
        list_id: number
    }

    const props = defineProps<Props>()

    const store = useStore()

    const todoCards = computed<TodoCard[]>({
        get: () => store.getters['TodoLists/todoCard'](props.list_id),
        set: val => {
            store.dispatch('TodoLists/dragCard', {
                val, 
                list_id: props.list_id
            })
        }
    })

    const editModalVisible = ref(false)

    const toggleModal = () => {
        editModalVisible.value = !editModalVisible.value
        console.log(editModalVisible.value)
    };

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