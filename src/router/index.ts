import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TodoListView from '../views/TodoListView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/todo',
    name: 'todo',
    component: TodoListView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
