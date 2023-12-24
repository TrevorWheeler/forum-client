import { useAppStore } from '@/stores/app'
const app = useAppStore()
const toast = useToast()
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default function image() {
  const router = useRouter()
  const isValid = async (url: string) => {
    try {
      const res = await fetch(url)
      console.log(res)
      const buff = await res.blob()

      return buff.type.startsWith('image/')
    } catch (e) {
      console.log(e)
      return false
    }
  }
  return { isValid }
}
