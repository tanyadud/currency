import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Paginate from 'vuejs-paginate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyD34hZfHFkjzs_Sr9hbFAxLpW6NOqoPPpQ",
  authDomain: "crm-test-e9d91.firebaseapp.com",
  projectId: "crm-test-e9d91",
  storageBucket: "crm-test-e9d91.appspot.com",
  messagingSenderId: "747960738230",
  appId: "1:747960738230:web:bc23317497bf0b97c1a117"
};

let app

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})


