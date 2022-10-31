export type TodoListsState = {
    todoLists: TodoList[];
};

export type TodoList = {
    id?: number;
    isVisible: boolean;
    pet_id?: number;
    description: string;
    todoCards: TodoCard[]
};
  
export type TodoCard ={
    id: number;
    pet_name: string,
    person_name: string,
    description: string;
    date: Date;
    time: Date;
    isEditable: boolean;
}

