import { Module, ActionTree, MutationTree, GetterTree } from "vuex";
import { RootState} from '../../types/rootstate'
import { EventState } from '../../types/event'

const savedEvents = localStorage.getItem('events')

export const state: EventState = {
    events: savedEvents ? JSON.parse(savedEvents): []
};

const getters: GetterTree<EventState, RootState> = {
    getEvents: state => state.events
};

const mutations: MutationTree<EventState> = {
    addEvent(state, event){
        state.events.push(event)
    },
    editEvent(state, payload){
        console.log(payload)
        const event = state.events.find(event=>event.id === payload.event_id)!
        event.health = payload.event.health
        event.detail = payload.event.detail
        event.start = payload.event.start
        event.end = payload.event.start
    },
  
    removeEvent(state, payload){
        state.events = state.events.filter(event=> event.id !== payload.event_id)
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
}

export const CalendarModule: Module<EventState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};