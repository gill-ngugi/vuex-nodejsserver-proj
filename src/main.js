import Vue from 'vue'
import vuetify from '@/plugins/vuetify' 
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import App from "./App.vue";
import Slider from '@jeremyhamm/vue-slider';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueLocalStorage from 'vue-localstorage'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios';
import store from './store';
import router from './router';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Slider);
Vue.use(vueFilterPrettyBytes);
Vue.use(VueMoment, { moment });
Vue.use(VueLocalStorage);
window.axios = axios;

// const storey = new Vuex.Store(
//   {
//     state: {
//         authenticated: false
//     },
//     mutations: {
//         setAuthentication(state, status) {
//             state.authenticated = status;
//         }
//     }
//   }
// );

// const routery = new VueRouter({
//   mode: 'history',
//   routes,
//   base:'/'
// })

new Vue({
  vuetify,
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
