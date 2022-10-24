import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from "vuex";

export type TodoList = {
  id: number;
  description: string;
  todoCards: TodoCard[]
};

export type TodoCard ={
  id: number;
  description: string;
}

// stateの型定義
type State = {
  todoLists: TodoList[];
};

export const key: InjectionKey<Store<State>> = Symbol();

const savedTodos = localStorage.getItem('todos')

export const store = createStore<State>({
  getters: {
    todoLists: state => state.todoLists,
    todoCard: state => (list_id:number) => {
      const todoList = state.todoLists.find(todoList=>todoList.id === list_id)
      if (!todoList) {
        return
      }
      return todoList.todoCards
    }
  },
  state: {
    todoLists: savedTodos ? JSON.parse(savedTodos): [],
  },
  mutations: {
    addList(state, todoList: TodoList){
      state.todoLists.push(todoList)
    },
    removeList(state, list_id: number){
      state.todoLists = state.todoLists.filter(list=> list.id !== list_id)
    },

    dragList(state, newTodoLists: TodoList[]) {
      state.todoLists = newTodoLists
    },


    addCard(state, payload: {list_id: number, todoCard: TodoCard}){
      const todoList = state.todoLists.find(list=>list.id === payload.list_id)
      if (!todoList) {
        return
      }
      return todoList.todoCards.push(payload.todoCard)
    },
    removeCard(state, payload: {card_id: number, list_id: number}){
      const todoList = state.todoLists.find(list=>list.id === payload.list_id)
      if (!todoList) {
        return
      }
      return todoList.todoCards = todoList.todoCards.filter(card => card.id !== payload.card_id)
    },

    dragCard(state, payload: {val: TodoCard[], list_id: number}){
      const todoList = state.todoLists.find(list=>list.id === payload.list_id)
      if (!todoList) {
        return
      }
      return todoList.todoCards = payload.val
    },
  },
  actions: {
    addList({commit}, todoList:TodoList) {
      commit('addList', todoList)
    },
    removeList({commit}, list_id: number) {
      commit('removeList', list_id)
    },

    dragList({commit}, newTodoLists: TodoList[]) {
      commit('dragList', newTodoLists)
    },

    addCard({commit}, payload: {list_id:number, todoCard: TodoCard}) {
      commit('addCard', payload)
    },
    removeCard({commit}, card_id: number) {
      commit('removeCard', card_id)
    },

    dragCard({commit}, payload: {val: TodoCard[], list_id: number}) {
      commit('dragCard', payload)
    },
  }
});

store.subscribe((mutation, state) => {
  localStorage.setItem('todos', JSON.stringify(state.todoLists))
})
export const useStore = () => {
  return baseUseStore(key);
}
