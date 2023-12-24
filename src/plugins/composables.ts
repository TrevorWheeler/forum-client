import Tooltip from '@/components/tooltip.vue'

import YouTube from 'vue3-youtube'

export function setComposables(app: any) {
  app.component('YouTube', YouTube)
  app.component('Tooltip', Tooltip)
}
