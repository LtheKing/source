import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Axios from 'axios'

Vue.use(Buefy)
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
