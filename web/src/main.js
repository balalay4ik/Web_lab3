import { createApp } from 'vue'
import App from './App.vue';
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import './assets/main.css'
import store from './store/auth';

const app = createApp(App)

app.use(router)
app.use(BootstrapVue3);
app.use(store);
app.mount('#app')