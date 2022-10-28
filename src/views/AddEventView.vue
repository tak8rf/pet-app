<script setup lang="ts">
import { useStore } from '../store'
import { useRoute } from 'vue-router'
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

    const schema = yup.object({
        selected_health: yup.string().required('必須の項目です。').label('名前'),
        detail: yup.string().required('必須の項目です。').label('名前'),
        start: yup.string().required('必須の項目です。').label('日付'),
        selected_color: yup.string().required('必須の項目です。').label('日付'),
    });

    const { errors, meta } = useForm({
        validationSchema: schema,
        initialValues: {
            selected_health: "",
            detail: "",
            start: "",
            selected_color: ""
        },
    });

    const { value: selected_health} = useField<string>('selected_health');
    const { value: detail } = useField<string>('detail');
    const { value: start } = useField<string>('start');
    const { value: selected_color } = useField<string>('selected_color');

    const clearForm = () => {
        selected_health.value = ""
        detail.value = ""
        start.value = ""
        selected_color.value = ""
    };

    const store =  useStore()

    const route = useRoute()

    const id = parseInt(route.params.id as string)

    const onSubmit = () =>{
        store.dispatch('Calendar/addEvent', {
            id: Math.floor(Math.random() * 100000),
            pet_id: id,
            health: selected_health.value,
            detail: detail.value,
            start: start.value,
            end: start.value,
            color: selected_color.value,
            isEditable: false
        })
        clearForm();
    }

</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
        <label>
            体調を選択してください。<br>
            <select v-model="selected_health">
                <option disabled value="">Please select one</option>
                <option>良い</option>
                <option>悪い</option>
            </select>
            <span v-if="errors.selected_health">
                {{ errors.selected_health }}
            </span>
        </label><br>
        <label>
            詳細を記載してください。
            <span v-if="errors.detail">
                | {{ errors.detail }}
            </span><br>
            <textarea v-model="detail" placeholder="詳細を教えてください。"></textarea>
        </label><br>
        <label>
            日付を入力してください。
            <span v-if="errors.start">
                | {{ errors.start }}
            </span><br>
            <input name="date" type="date" v-model="start" /><br>
        </label>
        <label>
            色を選択してください。<br>
            <select v-model="selected_color">
                <option disabled value="">Please select one
                    <span v-if="errors.selected_color">
                        | {{ errors.selected_color }}
                    </span>
                </option>
                <option>blue</option>
                <option>red</option>
                <option>limegreen</option>
                <option>deepskyblue</option>
                <option>dimgray</option>
                <option>navy</option>
                <option>orange</option>
                <option>limegreen</option>
                <option>teal</option>
                <option>royalblue</option>
            </select><br>
        </label>
        <span>Selected: {{ selected_color }}</span><br>
        <input type="submit" value="submit" style="margin-bottom:10px;" :disabled="!meta.valid"/>
    </form>
    <router-link :to="{name:'calendar', params:{id}}">体調管理へ戻る</router-link>
  </div>
</template>
