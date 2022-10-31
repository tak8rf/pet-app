import moment from 'moment'
import { ref, computed } from 'vue'

const currentDate = ref(moment())

export const displayDate = computed<string>(()=>{
    return currentDate.value.format('YYYY-MM-DD')
})