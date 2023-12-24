import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'vue-plyr/dist/vue-plyr.css'
// Plugins
import { registerPlugins } from '@/plugins'
import { setComposables } from './plugins/composables'

const app = createApp(App)

registerPlugins(app)
setComposables(app)

app.mount('#app')
export { app }
// app.use(createPinia())
// app.use(router)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')
