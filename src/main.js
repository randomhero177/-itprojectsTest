import Vue from 'vue';
import store from './store/index';
import router from './router/index';
import App from './App.vue';
import '@/assets/common.styl';
import '@/assets/bootstrap-grid-only/grid.styl';
import '@/plugins/fontAwesome';
import '@/plugins/moment/plugin';
import Datepicker from 'vuejs-datepicker';
import VTooltip from 'v-tooltip';

Vue.use(VTooltip);
Vue.config.productionTip = false
Vue.component('datepicker', Datepicker);

new Vue({
  store,
  router,
  render: h => h(App),
  watch: {
    $route: {
      handler(to) {
        document.title = to.meta.title;
      },
      immediate: true,
    },
  },
}).$mount('#app')
