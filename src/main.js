import './assets/tailwind.css';
import './assets/base.css';
import 'primeicons/primeicons.css';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});

app.mount('#app');
