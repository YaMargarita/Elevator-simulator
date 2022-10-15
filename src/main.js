import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import '@/assets/style/main.css'

library.add(fas, faUserSecret);

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
