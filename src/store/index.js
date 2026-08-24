import { createStore } from 'vuex'

export default createStore({

    state: {
        counter: 10
    },
    getters: {
        getCounter(state) {
            return state.counter>0?state.counter:"error"
        }
    },
    mutations:{
        addCounter(state,number){
            state.counter+=number
        }
    }
})