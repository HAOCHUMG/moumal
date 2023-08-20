import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/util/axios.config'
import {vue_best_verify} from "vue-best-verify"
import "vue-best-verify/dist/style.css";
import Pagination from '@/components/Pagination/Pagination'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret,faBars, faXmark} from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret,faBars,faXmark)


createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(vue_best_verify).use(Pagination).use(ElementPlus).use(store).use(router).mount('#app')
