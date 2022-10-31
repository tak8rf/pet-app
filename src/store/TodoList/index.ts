import { Module } from "vuex";
// import { TodoListsState } from "../../types/todoList";
import { TodoListsState } from "../../types/todolist";
import { RootState  } from "../../types/rootstate";
import { displayDate } from '../../current-date'
import actions  from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const savedTodoLists = localStorage.getItem('todo-lists')

export const state: TodoListsState = {
    todoLists: savedTodoLists?  JSON.parse(savedTodoLists): [
        {
            id: 1,
            pet_id: 1,
            description: '未着手',
            isVisible: false,
            todoCards: [
                {
                    id: 1,
                    pet_name: 'アレン',
                    person_name: 'たくみ',
                    description:'散歩',
                    date: displayDate,
                    time: '21:33',
                    isEditable: false
                },
                {
                    id: 2,
                    pet_name: 'アレン',
                    person_name: 'たくみ',
                    description:'餌やり',
                    date: displayDate,
                    time: '21:33',
                    isEditable: false
                },
                {
                    id: 3,
                    pet_name: 'アレン',
                    person_name: 'たくみ',
                    description:'毛鋤き',
                    date: displayDate,
                    time: '21:33',
                    isEditable: false
                },
            ]
        },
        {
            id: 2,
            pet_id: 1,
            description: '進行中',
            isVisible: false,
            todoCards: []
        },
        {
            id: 3,
            pet_id: 1,
            description: '完了',
            isVisible: false,
            todoCards: []
        },
    ],
};


export const TodoListsModule: Module<TodoListsState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};



