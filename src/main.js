import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css';

import { BootstrapVue, BPagination } from "bootstrap-vue";
Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.component("b-pagination", BPagination);
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
