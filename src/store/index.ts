import { RootState } from '../types/rootstate';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { AuthModule } from '../store/Auth'
import { CalendarModule } from '../store/Calendar'
import { PetModule } from '../store/Pet'
import { TodoListsModule } from '../store/TodoList'


export const store = createStore<RootState>({
  state: {
    version: '1.0.0' 
  },
  modules: {
    Auth: AuthModule,
    Calendar: CalendarModule,
    Pet: PetModule,
    TodoLists: TodoListsModule
  },
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export const useStore = () => {
    return baseUseStore(key);
}

store.subscribe((mutation, state: any) => {
  localStorage.setItem('events', JSON.stringify(state.Calendar.events))
  localStorage.setItem('pets', JSON.stringify(state.Pet.pets))
})

