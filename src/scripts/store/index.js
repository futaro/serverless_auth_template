import Vue        from 'vue'
import Vuex       from 'vuex'
import AuthModule from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AuthModule,
  }
})