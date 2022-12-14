import { Module, ActionTree, MutationTree, GetterTree } from "vuex";
import { RootState} from '../../types/rootstate'
import { EventState } from '../../types/event'
import router from '../../router'

const savedEvents = localStorage.getItem('events')

export const state: EventState = {
    events: savedEvents ? JSON.parse(savedEvents): [
        {
            id: 1,
            pet_id: 1,
            health: "良い",
            detail: "元気一杯！",
            start: "2022-11-01",
            end: "2022-11-01",
            color: "blue",
            isEditable: false
        },
        {
            id: 2,
            pet_id: 2,
            health: "悪い",
            detail: "耳が膿んでいる",
            start: "2022-11-01",
            end: "2022-11-01",
            color: "red",
            isEditable: false
        },

    ]
};

const getters: GetterTree<EventState, RootState> = {
    getEvents: state => state.events,
    getEvent: state => (event_id: number) => state.events.find(event=>event.id === event_id)
};

const mutations: MutationTree<EventState> = {
    addEvent(state, event){
        state.events.push(event)
        const id = event.pet_id
        router.push({ name: 'calendar', params: { id } }) 
    },
    editEvent(state, payload){
        const event = state.events.find(event=>event.id === payload.event_id)!
        event.health = payload.event.health
        event.detail = payload.event.detail
        event.start = payload.event.start
        event.end = payload.event.start
        console.log(event.isEditable)
        event.isEditable = false
    },
  
    removeEvent(state, payload){
        state.events = state.events.filter(event=> event.id !== payload.event_id)
    },

    toggleModal(state, payload){
        const event = state.events.find(event=>event.id === payload.event_id)!
        event.isEditable = !payload.isEditable
        console.log(event.isEditable)
    },
};

const actions: ActionTree<EventState, RootState> = {
    addEvent({commit}, event) {
        commit('addEvent', event)
    },
    editEvent({commit}, payload) {
        commit('editEvent', payload)
    },
    removeEvent({commit}, event) {
        commit('removeEvent', event)
    },

    toggleModal({commit}, payload) {
        commit('toggleModal', payload)
    },
}

export const CalendarModule: Module<EventState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};