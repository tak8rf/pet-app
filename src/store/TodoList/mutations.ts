import { MutationTree } from 'vuex';
import { TodoListsState, TodoList, TodoCard } from '../../types/todolist';
import { state } from './index'

const mutations: MutationTree<TodoListsState> = {
    addList(state, todoList: TodoList){
        state.todoLists.push(todoList)
        save()
    },
    removeList(state, payload: { list_id: number }){
        state.todoLists = state.todoLists.filter(list=> list.id !== payload.list_id)
        save()
    },
  
    dragList(state, newTodoLists: TodoList[]) {
        state.todoLists = newTodoLists
        save()
    },
  
  
    addCard(state, payload: {list_id: number, todoCard: TodoCard}){
        const todoList = state.todoLists.find(list=>list.id === payload.list_id)!
        todoList.todoCards.push(payload.todoCard)
        todoList.isVisible = false
        save()
    },
    editCard(state, payload: {card_id: number,list_id: number, todoCard: TodoCard}){
        const todoList = state.todoLists.find(list=>list.id === payload.list_id)!
        const oldTodoCard = todoList.todoCards.find(card => card.id == payload.card_id)!
        console.log(oldTodoCard)
        oldTodoCard.description = payload.todoCard.description
        oldTodoCard.person_name = payload.todoCard.person_name
        oldTodoCard.isEditable = false
        console.log(payload.todoCard)
        console.log(oldTodoCard)
        
        save()
    },
    removeCard(state, payload: {card_id: number, list_id: number}){
        const todoList = state.todoLists.find(list=>list.id === payload.list_id)!
        todoList.todoCards = todoList.todoCards.filter(card => card.id !== payload.card_id)
        save()
    },

    dragCard(state, payload: {val: TodoCard[], list_id: number}){
        const todoList = state.todoLists.find(list=>list.id === payload.list_id)!
        todoList.todoCards = payload.val
        save()
    },

    toggleModal(state, payload){
        const todoCard = state.todoLists.find(list=>list.id === payload.list_id)!.todoCards.find(card => card.id == payload.card_id)!
        todoCard.isEditable = !payload.isEditable
    },
    toggleAddModal(state, payload){
        const todoList = state.todoLists.find(list=>list.id === payload.list_id)!
        todoList.isVisible = !payload.isVisible
    },
};

export const save = () => {
    localStorage.setItem('todo-lists', JSON.stringify(state.todoLists))
};

export default mutations;