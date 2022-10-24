<script setup lang="ts">   
    import { reactive, computed } from 'vue';
    import { useStore, TodoCard } from "../store";
    import draggable from 'vuedraggable';

    interface Props {
        list_id: number
    }

    const props = defineProps<Props>()

    const todoCard = reactive<TodoCard>({
        id: 0,
        description:''
    })

    const clearForm = () => {
        todoCard.description = "";
    };

    const store = useStore()

    const addCard = () => {
        store.dispatch('addCard', {
            todoCard:{
            id: Math.floor(Math.random() * 100000), 
            description: todoCard.description
            },
            list_id: props.list_id
        });
        clearForm();
    }

    const removeCard = (card_id: number) => {
        store.dispatch('removeCard', {
            card_id, 
            list_id: props.list_id
        })
    }

    const todoCards = computed<TodoCard[]>({
        get: () => store.getters.todoCard(props.list_id),
        set: val => {
            store.dispatch('dragCard', {
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
                <div>
                    {{element.description}}
                    <button @click="removeCard(element.id)">X</button>
                </div>
            </template>
        </draggable>
        <form @submit.prevent="addCard">
            <input type="text" id="description" v-model="todoCard.description" />
            <input type="submit" value="submit" />
        </form>
        <p>{{todoCards}}</p>
        <p>{{props.list_id}}</p>
        <hr/>
    </div>
</template>