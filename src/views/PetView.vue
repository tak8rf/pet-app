<script setup lang="ts">
import AddPet from '../components/Pet/AddPet.vue'
import { computed } from 'vue'
import { useStore } from '../store'
import { PetInfo } from '../types/pet'
import RemovePet from '../components/Pet/RemovePet.vue'

const store = useStore()

const pets = computed<PetInfo[]>(()=>{
    return store.getters['Pet/getPets']
})

const hasPets = computed<number>(()=>{
    return store.getters['Pet/getPets'].length
})

</script>
<template>
    <div>
        <add-pet />
        <p>登録ペット数:{{hasPets}}</p>
        <table>
            <thead>
                <th>Name</th>
                <th>Age</th>
                <th>Todo</th>
                <th>Health</th>
            </thead>
            <tbody>
                <tr v-for="pet in pets" :key="pet.id">
                    <td>
                        {{pet.name}}
                    </td>
                    <td>{{pet.age}}</td>
                    <td>
                        <router-link :to="{name:'todo', params:{id: pet.id}}">
                        タスク管理
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{name:'calendar', params:{id: pet.id}}">
                        体調管理
                        </router-link>
                    </td>
                    <remove-pet :pet_id="pet.id" />
                </tr>
            </tbody>
            <!-- <p>{{pets}}</p> -->
        </table>
    </div>
</template>
<style scoped>
table{
    margin: 20px auto;
}
</style>