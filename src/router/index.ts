import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TodoListView from '../views/TodoListView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import PetView from '../views/PetView.vue'
import CalendarView from  '../views/CalendarView.vue'
import SearchEventView from '../views/SearchEventView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/todo/:id',
    name: 'todo',
    component: TodoListView
  },
  {
    path: '/calendar/:id',
    name: 'calendar',
    component: CalendarView
  },
  {
    path: '/search-event/:id',
    name: 'search-event',
    component: SearchEventView
  },
  {
    path: '/',
    name: 'pet',
    component: PetView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
