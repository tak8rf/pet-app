import { GetterTree } from 'vuex';
import { TodoListsState } from '../../types/todolist';
import { RootState  } from '../../types/rootstate';

const getters: GetterTree<TodoListsState, RootState> = {
    todoLists: state => state.todoLists,
    getTodoList: state => (list_id: number) =>state.todoLists.find(list=>list.id === list_id)!,
    todoCard: state => (list_id: number) => {
        const todoList = state.todoLists.find(todoList=>todoList.id === list_id)
        if (!todoList) {
            return
        }
        return todoList.todoCards
        },
    getTodoCardById: state => (list_id: number, card_id: number) =>state.todoLists.find(list=>list.id === list_id)!.todoCards.find(card => card.id == card_id)!
};

export default getters;