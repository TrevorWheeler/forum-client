import { ref, type Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'
import router from '@/router'
import type { Token } from '@/interfaces/Token'

export const useAppStore = defineStore('app', () => {
  const siteName: Ref<String> = ref(import.meta.env.VITE_SITE_NAME)
  const serverURL: Ref<String> = ref(
    import.meta.env.VITE_NODE_ENV === 'development'
      ? import.meta.env.VITE_DEV_SERVER_URL
      : import.meta.env.VITE_PROD_SERVER_URL
  )

  const username: Ref<string> = ref(getUsername())
  const isAuthenticated: Ref<boolean> = ref(getIsAuthenticated())
  const agreement: Ref<boolean> = ref(false)

  const posts: Ref<any[]> = ref([])
  const post: Ref<any[]> = ref([])

  function getUsername(): string {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return ''
      }
      const decoded: Token | null = jwtDecode(token)
      return decoded ? decoded.username : ''
    } catch (e) {
      console.error(e)
      return ''
    }
  }
  function getIsAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return false
      }
      const decoded: Token | null = jwtDecode(token)
      return decoded && decoded._id ? true : false
    } catch (e) {
      return false
    }
  }

  function logout() {
    localStorage.removeItem('token')
    username.value = ''
    agreement.value = false
    isAuthenticated.value = false
    router.push({ name: 'login' })
  }

  function reset() {
    localStorage.removeItem('token')
    router.push('/agreement')
  }

  return {
    siteName,
    serverURL,
    isAuthenticated,
    username,
    getUsername,
    posts,
    post,
    agreement,
    logout,
    reset
  }
})
