<script setup lang="ts"> 
    import { reactive, computed } from 'vue';
    import { useStore, TodoList } from '../store'
    import draggable from 'vuedraggable';
    import TodoCard from '../components/TodoCard.vue';

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
        store.dispatch('addList', {
            id: ++todoList.id,
            description: todoList.description,
            todoCards: todoList.todoCards
        });
        clearForm();
    }

    const removeList = (list_id: number) =>{
        store.dispatch('removeList',list_id)
    }

    const todoLists = computed<TodoList[]>({
        get: () => store.getters.todoLists,
        set: val=> {
            store.dispatch('dragList', val)
        }
    })
</script>

<template>
    <div>
        <form @submit.prevent="addList">
            <input type="text" id="description" v-model="todoList.description" />
            <input type="submit" value="submit" />
        </form>
        <p>{{todoList.description}}</p>
        <hr/>
        <draggable v-model="todoLists" group="list" item-key="id">
            <template #item="{element}">
                <div>
                    {{element.description}}
                    <button @click="removeList(element.id)">X</button>
                    <todo-card :list_id="element.id" />
                </div>
            </template>
        </draggable>
        <p>{{todoLists}}</p>
    </div>
</template>

<style>

</style>