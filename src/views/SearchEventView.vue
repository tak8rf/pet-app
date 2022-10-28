<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import { computed, ref } from 'vue'
import { EventItem } from '../types/event'

    const eventFilter = ref('')

    const route = useRoute()
    const store = useStore()

    const id = parseInt(route.params.id as string)

    const events = computed(()=>{
        return store.getters['Calendar/getEvents'].filter((event: EventItem)=>event.pet_id == id).filter((element: EventItem)=> 
        element.detail.includes(eventFilter.value)|| 
        element.health.includes(eventFilter.value)||
        element.start.toString().includes(eventFilter.value)
        )
    })
</script>
<template>
    <div>
        <form>
            <label>
                検索したいキーワードを入力してください<br>
                <input type="text" v-model="eventFilter" >
            </label>
        </form>
        <div>
            <table>
            <thead>
                <th>日付</th>
                <th>状態</th>
                <th>詳細</th>
            </thead>
            <tbody>
                <tr v-for="event in events" :key="event.id">
                    <td>{{event.start}}</td>
                    <td>{{event.health}}</td>
                    <td>{{event.detail}}</td>
                </tr>
            </tbody>
        </table>
        </div>
        <router-link :to="{name:'calendar', params:{id}}">体調管理へ戻る</router-link>
    </div>
    <hr />
</template>
<style scoped>
table{
    margin: 20px auto;
}
</style>