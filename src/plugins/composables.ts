import Tooltip from '@/components/tooltip.vue'

import Image from '@/components/image/image.vue'
import Video from '@/components/video/video.vue'
import X from '@/components/x/x.vue'
export function setComposables(app: any) {
  app.component('Tooltip', Tooltip)
  app.component('Image', Image)
  app.component('Video', Video)
  app.component('X', X)
}
