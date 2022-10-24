<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from '../store'

  const form = reactive({
    email:'',
    password:'',
  })

    const store = useStore()
    
    const login = () => {
        store.dispatch('Auth/login', {
            email: form.email,
            password: form.password,
        })
        form.email = '';
        form.password = '';
    }
</script>

<template>
    <div>
        <h3>ログイン</h3>
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="form.email">
        <br><br>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="form.password">
        <br><br>
        <button @click="login">送信</button>
        <p>{{form.email}}</p>
        <p>{{form.password}}</p>
    </div>
</template>