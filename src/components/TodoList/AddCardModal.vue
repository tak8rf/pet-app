<script setup lang="ts">
    import { computed, reactive, inject } from 'vue'
    import { TodoCard } from '../../types/todolist'
    import { PetInfo } from '../../types/pet'
    import { useStore } from '../../store'
    
    interface Props {
        list_id: number;
        isVisible: boolean;
    }

    const props = defineProps<Props>()

    const emitTest = defineEmits(['close'])

    const pet_id = inject('pet_id')

    const todoCard = reactive<TodoCard>({
        id: 0,
        pet_name: '',
        person_name: '',
        description:'',
        isEditable: false
    })

    const clearForm = () => {
        todoCard.person_name = "";
        todoCard.description = "";
    };

    const store = useStore()

    const pet = computed<PetInfo>(()=>{
        return store.getters['Pet/getPetById'](pet_id)
    })

    const addCard = () => {
        store.dispatch('TodoLists/addCard', {
            todoCard:{
            id: Math.floor(Math.random() * 100000), 
            pet_name: pet.value.name,
            person_name: todoCard.person_name,
            description: todoCard.description,
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
                <form @submit.prevent="addCard">
                    <label>
                        誰が実行するか入力してください。<br>
                        <input type="text" id="person_name" v-model="todoCard.person_name" /><br>
                    </label>
                    <label>
                        実行するタスクの内容を記載してください。<br>
                        <input type="text" id="description" v-model="todoCard.description" /><br>
                    </label>
                    <input type="submit" value="submit" class="add-button" />
                    <p>{{props.list_id}}</p>
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