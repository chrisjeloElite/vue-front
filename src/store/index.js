import Vue from 'vue';
import Vuex from 'vuex';
import crews from './modules/crews';
import icon from '../services/icon';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    crews,icon
  }

})
