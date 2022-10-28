<script setup lang="ts">
import { useStore } from '../../store'
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';

    const schema = object({
        list_description: string().required('必須の項目です。').label('リスト名'),
    });

    const { errors, meta } = useForm({
        validationSchema: schema,
        initialValues: {
            list_description: '',
        },
    });

    const { value: list_description } = useField('list_description');

    const clearForm = () => {
        list_description.value = ""
    };

    interface Props {
        pet_id: number
    }

  const props = defineProps<Props>()

    const store = useStore()

    const addList = () =>{
        store.dispatch('TodoLists/addList', {
            id: Math.floor(Math.random() * 100000),
            pet_id: props.pet_id,
            isVisible: false,
            description: list_description.value,
            todoCards: []
        });
        clearForm();
    }
</script>

<template>
  <div>
    <form @submit.prevent="addList">
        <span v-if="errors.list_description">
            {{ errors.list_description }}
        </span><br>
        <input type="text" id="description" v-model="list_description" /><br>
        <input type="submit" value="submit" :disabled="!meta.valid" />
    </form>
  </div>
  <hr />
</template>
