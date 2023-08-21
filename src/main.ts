import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)
app.mount('#app')
export { app }
// app.use(createPinia())
// app.use(router)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')
