import { createApp } from 'vue'
import App from './App.vue'
import "./assets/styles/global.css"
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import mitt from 'mitt'
import CKEditor from '@ckeditor/ckeditor5-vue';




 const emitter = mitt();
 const app =  createApp(App).use(router)
 app.use(VueAxios, { $request:axios })
app.use(CKEditor)
 axios.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )
 app.use(VueSweetalert2)
 app.config.globalProperties.emitter = emitter;
 app.mount('#app')

 


