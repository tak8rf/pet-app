<script setup lang="ts">
import moment from 'moment'
import { ref, computed } from 'vue'
// import AddEvent from '../components/Calendar/AddEvent.vue'
import EditEvent from '../components/Calendar/EditEvent.vue'
import { useStore } from '../store'
import { useRoute } from 'vue-router'
import { EventItem, DateItem } from '../types/event'
import { PetInfo } from '../types/pet'

const currentDate = ref(moment())

const getStartDate = () => {
  let date = moment(currentDate.value);
  //月の始まりを算出
  date.startOf("month");
  const youbiNum = date.day();
  //曜日の数だけ日数を引く
  return date.subtract(youbiNum, "days");
};
const getEndDate = () => {
  let date = moment(currentDate.value);
  date.endOf("month");
  const youbiNum = date.day();
  return date.add(6 - youbiNum, "days");
};

const getCalendar = () => {
  //カレンダーに表示する最初の日
  let startDate = getStartDate();
  //カレンダーに表示する最後の日
  const endDate = getEndDate();
  // カレンダーの縦列を表示
  const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

  let calendars: DateItem[][] = [];
  let calendarDate = getStartDate();

  for (let week = 0; week < weekNumber; week++) {
  let weekRow: DateItem[] = [];
  for (let day = 0;  day < 7; day++) {
    let dayEvents: EventItem[] = getDayEvents(calendarDate)
    weekRow.push({
      date: calendarDate.get("date"),
      month: calendarDate.format("YYYY-MM"),
      dayEvents
    });
    calendarDate.add(1, "days");
  }
  calendars.push(weekRow);
}
  return calendars;
}

const getDayEvents = (date: moment.Moment) => {
  return events.value.filter((event: EventItem)=> {
    let startDate = moment(event.start).format('YYYY-MM-DD')
    let endDate = moment(event.end).format('YYYY-MM-DD')
    let Date = date.format('YYYY-MM-DD')
    if(startDate <= Date && endDate >= Date) return true;
  });
}

const store = useStore()

const route = useRoute()

const id = parseInt(route.params.id as string)

const pet = computed<PetInfo>(()=>{
  return store.getters['Pet/getPetById'](id)
})

const displayMonth = computed(()=>{
  return currentDate.value.format('YYYY[年]M[月]')
})

const prevMonth = () => {
  currentDate.value= moment(currentDate.value).subtract(1, "month")
}

const nextMonth = () => {
  currentDate.value = moment(currentDate.value).add(1, "month")
}

const youbi = (dayIndex: number) => {
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  return week[dayIndex];
}

const calendars = computed(()=>{
  return getCalendar()
})

const currentMonth= computed(()=>{
  return currentDate.value.format('YYYY-MM')
})

const events = computed<EventItem[]>(()=>{
  return store.getters['Calendar/getEvents'].filter((event: EventItem)=>event.pet_id == id)
})

</script>
<template>
  <div>
    <div class="content">
    <h2>{{ pet.name}}の体調管理</h2>
    <router-link :to="{name:'add-event', params:{id}}">イベントを追加する</router-link> |
    <router-link :to="{name:'search-event', params:{id}}">体調を検索する</router-link>
    <hr />
    <h2>現在の日付：{{ displayMonth }}</h2>
    <div class="button-area">
      <button @click="prevMonth" class="button">前の月</button>
      <button @click="nextMonth" class="button">次の月</button>
    </div>
    <div class="calendar">
      <div class="calendar-weekly">
        <div class="calendar-youbi" v-for="n in 7" :key="n">
          {{ youbi(n-1) }}
        </div>
      </div>
      <div class="calendar-weekly" v-for="(week, index) in calendars" :key="index">
        <div class="calendar-daily" :class="{outside: currentMonth !== day.month}" v-for="(day, index) in week" :key="index">
          <div class="calendar-day">
            {{ day.date }}
          </div>
          <div v-for="dayEvent in day.dayEvents" :key="dayEvent.id" >
            <div class="calendar-event" :style="`background-color:${dayEvent.color}`" >
              <edit-event :event_id="dayEvent.id" :health_description="dayEvent.health" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
.content{
  margin:2em auto;
  width:900px;
}
.button-area{
  margin:0.5em 0;
}
.button{
  padding:4px 8px;
  margin-right:8px;
}
.calendar{
  max-width:900px;
  border-top:1px solid #E0E0E0;
  font-size:0.8em;
}
.calendar-weekly{
  display:flex;
  border-left:1px solid #E0E0E0;
  /* background-color: black; */
}
.calendar-daily{
  flex:1;
  min-height:125px;
  border-right:1px solid #E0E0E0;
  border-bottom:1px solid #E0E0E0;
  margin-right:-1px;
}
.calendar-day{
  text-align: center;
}

.calendar-youbi{
  flex:1;
  border-right:1px solid #E0E0E0;
  margin-right:-1px;
  text-align:center;
}
.outside{
  background-color: #f7f7f7;
}
.calendar-event{
  color:white;
  margin-bottom:1px;
  height:25px;
  line-height:25px;
}
.calendar-event{
  color:white;
  margin-bottom:1px;
  height:25px;
  line-height:25px;
  z-index:1;
  border-radius:4px;
  padding-left:4px;
}
</style>