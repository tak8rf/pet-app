import { Module, ActionTree, MutationTree, GetterTree } from "vuex";
import { RootState} from '../../types/rootstate'
import { PetState } from '../../types/pet'
import router from '../../router'

const savedPets = localStorage.getItem('pets')

export const state: PetState = {
    pets: savedPets ? JSON.parse(savedPets): [
        {
            id: 1,
            name: 'アレン',
            birthday: '2008-02-14',
            age: '14'
        },
        {
            id: 2,
            name: 'ゆしお',
            birthday: '1997-10-22',
            age: '24'
        },
    ]
};

const getters: GetterTree<PetState, RootState> = {
    getPets: state => state.pets,
    getPetById: state => (id: number) => state.pets.find(pet=>pet.id === id)
};

const mutations: MutationTree<PetState> = {
    addPet(state, pet){
        state.pets.push(pet)
        router.push('/') 
    },
  
    removePet(state, payload){
        state.pets = state.pets.filter(pet=> pet.id !== payload.pet_id)
    },
};

const actions: ActionTree<PetState, RootState> = {
    addPet({commit}, pet) {
        commit('addPet', pet)
    },
    removePet({commit}, payload) {
        commit('removePet', payload)
    },
}

export const PetModule: Module<PetState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};