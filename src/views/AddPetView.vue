<script setup lang="ts">
// import { reactive } from 'vue'
import { useStore } from '../store'
import { useField, useForm } from 'vee-validate';
import { object, string }  from 'yup';
import moment from 'moment'

    const schema = object({
        name: string().required('必須の項目です。').label('名前'),
        birthday: string().required('必須の項目です。').label('日付'),
    });

    const { errors, meta } = useForm({
        validationSchema: schema,
        initialValues: {
            name: '',
            birthday: '',
        },
    });

    const { value: name } = useField<string>('name');
    const { value: birthday } = useField<string>('birthday');

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
            age: moment().diff((birthday.value as unknown as Date), 'years')
        })
        clearForm();
    }

</script>
<template>
    <div>
        <form>
            <label>
                名前を入力してください。
                <span v-if="errors.name">
                    |{{ errors.name }}
                </span><br>
                <input name="text" type="text" v-model="name"><br>
            </label><br>
            <label>
                誕生日を入力してください。
                <span v-if="errors.birthday">
                    | {{ errors.birthday }}
                </span><br>
                <input name="date" type="date" v-model="birthday" /><br>
            </label><br>
        </form>
        <button @click="onSubmit"  :disabled="!meta.valid">Add Pet</button>
    </div>
</template>