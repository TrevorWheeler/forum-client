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
      let result: any = null
      switch (response.status) {
        case 200:
          const text = await response.text()
          try {
            result = JSON.parse(text)
          } catch (e) {
            result = text
          }
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
      console.log('------------- GET - ' + app.serverURL + '/' + endpoint + ' -------------')
      console.log(result)
      console.log('---------------------------------------------------------------------')
      return result
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong.', { color: 'error' })
      localStorage.removeItem('token')
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
          const text = await response.text()
          try {
            result = JSON.parse(text)
          } catch (e) {
            result = text
          }
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
      console.log('------------- POST - url:' + app.serverURL + '/' + endpoint + ' -------------')
      console.log(data)
      console.log(result)
      console.log('-------------------------------------------------------------------------')
      return result
    } catch (e) {
      return e
    }
  }
  return { get, post }
}
