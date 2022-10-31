import { ActionTree } from 'vuex';
import { TodoListsState, TodoList, TodoCard } from '../../types/todolist';
import { RootState } from '../../types/rootstate';

const actions: ActionTree<TodoListsState, RootState> = {
    addList({commit}, todoList:TodoList) {
        commit('addList', todoList)
    },
    removeList({commit}, payload: { list_id: number }) {
        commit('removeList', payload)
    },
    
    dragList({commit}, newTodoLists: TodoList[]) {
        commit('dragList', newTodoLists)
    },
    
    addCard({commit}, payload: {list_id:number, todoCard: TodoCard}) {
        commit('addCard', payload)
    },
    editCard({commit}, payload: {card_id:number, list_id:number, todoCard: TodoCard}) {
        commit('editCard', payload)
    },
    removeCard({commit}, card_id: number) {
        commit('removeCard', card_id)
    },
    
    dragCard({commit}, payload: {val: TodoCard[], list_id: number}) {
        commit('dragCard', payload)
    },


    toggleModal({commit}, payload: { isEditable: boolean, list_id: number, card_id: number}) {
        commit('toggleModal', payload)
    },
    toggleAddModal({commit}, payload: { isVisible: boolean, list_id: number, card_id: number}) {
        commit('toggleAddModal', payload)
    },
}

export default actions;