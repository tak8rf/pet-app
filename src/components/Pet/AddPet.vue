<script setup lang="ts">
// import { reactive } from 'vue'
import { useStore } from '../../store'
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import moment from 'moment'

    const schema = object({
        name: string().required('必須の項目です。').label('名前'),
        birthday: string().required('必須の項目です。').label('日付'),
    });

    const { errors } = useForm({
        validationSchema: schema,
    });

    const { value: name } = useField('name');
    const { value: birthday } = useField('birthday');

    const clearForm = () => {
        name.value = ""
        birthday.value = ""
    };

    const store =  useStore()

    const onSubmit = () =>{
        store.dispatch('Pet/addPet', {
            id: Math.floor(Math.random() * 100000),
            name: name.value,
            birthday: birthday.value,
            age: moment().diff((birthday.value as Date), 'years')
        })
        clearForm();
    }

// const pet = reactive({
//     name: '',
//     birthday: ''
// })

// const clearForm = () => {
//     pet.name = ""
//     pet.birthday = ""
// };

// const store = useStore()

// const onSubmit = () =>{
//     store.dispatch('Pet/addPet', {
//         id: Math.floor(Math.random() * 100000),
//         name: pet.name,
//         birthday: pet.birthday,
//         age: moment().diff(pet.birthday, 'years')
//     })
//     clearForm();
// }

</script>
<template>
    <div>
        <form>
            <label>
                名前を入力してください。<br>
                <input name="text" type="text" v-model="name"><br>
                <span v-if="errors.name">
                    {{ errors.name }}
                </span>
            </label><br>
            <label>
                誕生日を入力してください。<br>
                <input name="date" type="date" v-model="birthday" /><br>
                <span v-if="errors.birthday">
                    {{ errors.birthday }}
                </span>
            </label><br>
        </form>
        <button @click="onSubmit">Add Pet</button>
        <hr />
    </div>
</template>