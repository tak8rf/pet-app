<script setup lang="ts">
import { useStore } from '../../store'

const props = defineProps({
    pet_id: Number
})

const store = useStore()

const removePet = () =>{
    store.dispatch('Pet/removePet', {
        pet_id: props.pet_id
    })
}

</script>
<template>
    <div>
        <button @click="removePet">X</button>
    </div>
</template>