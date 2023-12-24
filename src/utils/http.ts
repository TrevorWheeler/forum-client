import { useToast } from 'vue-toastification'
import { useAppStore } from '@/stores/app'
const app = useAppStore()
const toast = useToast()
import { useRoute, useRouter } from 'vue-router'

export default function useHttp() {
  const router = useRouter()
  async function get(endpoint: string) {
    try {
      const response = await fetch(app.serverURL + '/' + endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: null
      })
      console.log(response)
      let result: any = null
      switch (response.status) {
        case 200:
          result = JSON.parse(await response.text())
          break
        case 400:
          toast.error('Something went wrong.', { color: 'error' })
          break
        case 401:
          localStorage.removeItem('token')
          router.push('/')
          app.reset()
          break
        case 404:
          router.push({ path: '/404' })
          break
        default:
          app.reset()
          break
      }
      return result
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong.', { color: 'error' })
      localStorage.removeItem('token')
      router.push('/agreement')
      app.reset()
    }
  }

  async function post(endpoint: string, data: any) {
    try {
      const response = await fetch(app.serverURL + '/' + endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      let result: any = null
      switch (response.status) {
        case 200:
          result = JSON.parse(await response.text())
          break
        case 401:
          localStorage.removeItem('token')
          router.push('/')
          break
        case 404:
          router.push({ path: '/404' })
          break
        case 500:
          toast.error('Something went wrong.', { color: 'error' })
          break
        default:
          router.push({ path: '/' })
          break
      }
      return result
    } catch (e) {
      return e
    }
  }
  return { get, post }
}
