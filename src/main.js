import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import { i18n } from '@/plugins/i18n'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

new Vue({
  data: {
    lang: "en"
  },
  created: function() {
    this.$i18n.locale
  },
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
