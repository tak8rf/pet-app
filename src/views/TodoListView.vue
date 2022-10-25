<script setup lang="ts"> 
    import { computed, provide } from 'vue';
    import { useStore } from '../store'
    import { useRoute } from 'vue-router';
    import { TodoList } from '../types/todolist'
    import draggable from 'vuedraggable';
    import AddList from '../components/TodoList/AddList.vue'
    import RemoveList from '../components/TodoList/RemoveList.vue'
    import TodoCard from '../components/TodoList/TodoCardView.vue';
    import AddCard from '../components/TodoList/AddCard.vue'

    const store = useStore()

    const todoLists = computed<TodoList[]>({
        get: () => store.getters['TodoLists/todoLists'],
        set: val=> {
            store.dispatch('TodoLists/dragList', val)
        }
    })
    const route = useRoute()

    const pet_id = parseInt(route.params.id as string)

    provide('pet_id', pet_id)
</script>

<template>
    <div>
        <add-list :pet_id="pet_id" />
        <draggable v-model="todoLists" group="list" item-key="id" class="list-index" >
            <template #item="{element}">
                <div class="list">
                    <p class="list-title">{{element.description}}</p>
                    <remove-list :list_id="element.id" />
                    <todo-card :list_id="element.id" />
                    <add-card :list_id="element.id"/>
                </div>
            </template>
        </draggable>
    </div>
</template>

<style>

</style>