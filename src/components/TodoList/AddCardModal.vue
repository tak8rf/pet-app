<script setup lang="ts">
    import { computed, inject } from 'vue'
    import { PetInfo } from '../../types/pet'
    import { useStore } from '../../store'
    import { useField, useForm } from 'vee-validate';
    import { object, string } from 'yup';

    const schema = object({
        person_name: string().required('必須の項目です。').label('名前'),
        card_description: string().required('必須の項目です。').label('タスク'),
        card_date: string().required('必須の項目です。').label('日付'),
        card_time: string().required('必須の項目です。').label('時間'),
    });

    const { errors, meta } = useForm({
        validationSchema: schema,
        initialValues: {
            person_name: "",
            card_description: "",
            card_date: "",
            card_time: "",
        },
    });

    const { value: person_name } = useField<string>('person_name');
    const { value: card_description } = useField<string>('card_description');
    const { value: card_date } = useField<string| Date>('card_date');
    const { value: card_time } = useField<string| Date>('card_time');

    const clearForm = () => {
        person_name.value = ""
        card_description.value = ""
        card_date.value = ""
        card_time.value = ""
    };
    
    interface Props {
        list_id: number;
        isVisible: boolean;
    }

    const props = defineProps<Props>()

    const emitTest = defineEmits(['close'])

    const pet_id = inject('pet_id')

    const store = useStore()

    const pet = computed<PetInfo>(()=>{
        return store.getters['Pet/getPetById'](pet_id)
    })

    const addCard = () => {
        store.dispatch('TodoLists/addCard', {
            todoCard:{
            id: Math.floor(Math.random() * 100000), 
            pet_name: pet.value.name,
            person_name: person_name.value,
            description: card_description.value,
            date: card_date.value,
            time: card_time.value,
            isEditable: false
            },
            list_id: props.list_id
        });
        clearForm();
    }
</script>

<template>
  <div>
    <!-- モーダルビューを呼び込む。その先で登録できるようにしたい。つまり、list_idをpropsとして渡す。リロードしても画面が消えないようにしたいため、値はtodoListsのstateで管理したい。  -->
    <teleport to="body">
        <div class="modal" id="sample-modal" v-show="props.isVisible" @click="emitTest('close')"></div>
            <div class="modal-content" v-show="isVisible">
                <form @submit.prevent="addCard" >
                    <label>
                        誰が実行するか入力してください。
                        <span v-if="errors.person_name">
                            |{{ errors.person_name }}
                        </span><br>
                        <input type="text" id="person_name" v-model="person_name" /><br>
                    </label>
                    <label>
                        実行するタスクの内容を記載してください。
                        <span v-if="errors.card_description">
                            |{{ errors.card_description }}
                        </span><br>
                        <input type="text" id="description" v-model="card_description" /><br>
                    </label>
                    <label>
                        実行する日付と時間を記載してください。
                        <span v-if="errors.card_date">
                            |{{ errors.card_date }}
                        </span><br>
                        <input name="date" type="date" v-model="card_date" />
                        <input name="time" type="time" v-model="card_time" /><br>
                    </label>
                    <input type="submit" value="submit" class="add-button" :disabled="!meta.valid"/>
                </form>
            </div>
    </teleport>
  </div>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    background-color: white;
    width: 600px;
    height: auto;
    border-radius: 20px;
    padding: 20px;
}
</style>