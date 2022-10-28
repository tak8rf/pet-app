import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TodoListView from '../views/TodoListView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import PetView from '../views/PetView.vue'
import CalendarView from  '../views/CalendarView.vue'
import SearchEventView from '../views/SearchEventView.vue'
import AddPetView from '../views/AddPetView.vue'
import AddEventView from '../views/AddEventView.vue'
import { store } from '../store'

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
    component: TodoListView,
    beforeEnter(to, from, next) {
      if (store.getters['Auth/idToken']) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/calendar/:id',
    name: 'calendar',
    component: CalendarView,
    beforeEnter(to, from, next) {
      if (store.getters['Auth/idToken']) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/add-event/:id',
    name: 'add-event',
    component: AddEventView
  },
  {
    path: '/search-event/:id',
    name: 'search-event',
    component: SearchEventView,
    beforeEnter(to, from, next) {
      if (store.getters['Auth/idToken']) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/',
    name: 'pet',
    component: PetView,
    beforeEnter(to, from, next) {
      if (store.getters['Auth/idToken']) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/add-pet',
    name: 'add-pet',
    component: AddPetView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
