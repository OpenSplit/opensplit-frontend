import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))
Vue.use(Vuetify)

Vue.use(VueI18n)
import en from "./lang/en.json";
import de from "./lang/de.json";
const i18n = new VueI18n({
  locale: 'en',
  messages: {'en': en, 'de': de}
})

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
  created() {
    this.$store.dispatch('user')
    this.$store.dispatch('groups')
  }
}).$mount('#app')
