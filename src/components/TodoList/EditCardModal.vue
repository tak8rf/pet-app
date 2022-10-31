<script setup lang="ts">
    import { computed, reactive } from 'vue'
    import { TodoCard } from '../../types/todolist'
    import { useStore } from '../../store'
    
    interface Props {
        list_id: number;
        card_id: number;
        isEditable: boolean;
    }

    const props = defineProps<Props>()

    const emitTest = defineEmits(['close'])

    const todoCard = reactive({
        date: '',
    })

    const store = useStore()

    const card = computed<TodoCard>(()=>{
        return store.getters['TodoLists/getTodoCardById'](props.list_id, props.card_id)
    })

    const editCard = () => {
        store.dispatch('TodoLists/editCard', {
            todoCard:{
            id: Math.floor(Math.random() * 100000), 
            person_name: card.value.person_name,
            description: card.value.description,
            date: todoCard.date,
            time: card.value.time
            },
            list_id: props.list_id,
            card_id: props.card_id
        });
    }
</script>

<template>
  <div>
    <!-- モーダルビューを呼び込む。その先で登録できるようにしたい。つまり、list_idをpropsとして渡す。リロードしても画面が消えないようにしたいため、値はtodoListsのstateで管理したい。  -->
    <teleport to="body">
        <div class="modal" id="sample-modal" v-show="props.isEditable" @click="emitTest('close')"></div>
            <div class="modal-content" v-show="isEditable">
                <form @submit.prevent="editCard">
                    <label>
                        誰が実行するか入力してください。<br>
                        <input type="text" id="description" v-model="card.person_name" /><br>
                    </label>
                    <label>
                        実行するタスクの内容を記載してください。<br>
                        <input type="text" id="description" v-model="card.description" /><br>
                    </label>
                    <label>
                        日付と時間を入力してください。<br>
                        <input name="date" type="date" v-model="todoCard.date" />
                        <input name="time" type="time" v-model="card.time" /><br>
                    </label>
                    <input type="submit" value="submit" class="add-button" />
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