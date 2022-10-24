<script setup lang="ts">
import { TodoList } from '../../types/todolist'
import { reactive } from 'vue'
import { useStore } from '../../store'

    interface Props {
        pet_id: number
    }

  const props = defineProps<Props>()

    const todoList = reactive<TodoList>({
        id: 0,
        description: "",
        todoCards: []
    });

    const clearForm = () => {
        todoList.description = "";
    };

    const store = useStore()

    const addList = () =>{
        store.dispatch('TodoLists/addList', {
            id: Math.floor(Math.random() * 100000),
            pet_id: props.pet_id,
            description: todoList.description,
            todoCards: todoList.todoCards
        });
        clearForm();
    }
</script>

<template>
  <div>
    <form @submit.prevent="addList">
        <input type="text" id="description" v-model="todoList.description" />
        <input type="submit" value="submit" />
    </form>
  </div>
</template>
