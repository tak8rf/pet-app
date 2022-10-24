import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import './assets/css/styles.css'

store.dispatch('Auth/autoLogin').then(() => {
    createApp(App).use(store, key).use(router).mount('#app')
})

