<script setup lang="ts">
import { reactive } from 'vue'
import { useStore } from '../../store'
import moment from 'moment'

const pet = reactive({
    id: 0,
    name: '',
    birthday: ''
})

const clearForm = () => {
    pet.name = ""
    pet.birthday = ""
};

const store = useStore()

const onSubmit = () =>{
    store.dispatch('Pet/addPet', {
        id: Math.floor(Math.random() * 100000),
        name: pet.name,
        birthday: pet.birthday,
        age: moment().diff(pet.birthday, 'years')
    })
    clearForm();
}

</script>
<template>
    <div>
        <form>
            <label>
                名前を入力してください。<br>
                <input name="text" type="text" v-model="pet.name">
            </label><br>
            <label>
                誕生日を入力してください。<br>
                <input name="date" type="date" v-model="pet.birthday" /><br>
            </label><br>
        </form>
        <button @click="onSubmit">Add Pet</button>
        <hr />
    </div>
</template>