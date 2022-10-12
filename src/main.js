import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import '@/assets/style/main.css'

library.add(fas, faUserSecret);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
