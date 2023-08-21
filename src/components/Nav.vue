<script setup lang="ts">
import { useAppStore } from '@/stores/app';
const app = useAppStore();



</script>
<template>
  <header>
    <nav
      class="flex bg-darker justify-between fixed w-full z-20 top-0 left-0 border-b border-dark-light px-3 text-white text-sm font-bold h-[36px] items-center">

      <div class="flex-none flex items-center" style="width: 38px !important">
        <router-link to="/" class="flex items-center">
          <span class="dot bg-info mr-2"></span>
          <span class="text-1xl font-semibold whitespace-nowrap text-white">{{ app.siteName }}</span>
        </router-link>
      </div>
      <div class="flex h-[25px] items-center">


        <router-link to="/create" class="mr-2">
          <svg class="fill-dark-lighter hover:bg-dark-light flex-none rounded hover:bg-dark-light p-[0px]"
            viewBox="0 -960 960 960">
            <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
          </svg></router-link>

        <router-link v-if="!app.isAuthenticated" to="/login">
          <svg class="fill-dark-lighter hover:bg-dark-light flex-none rounded hover:bg-dark-light p-[1px]"
            viewBox="0 -960 960 960">
            <path
              d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z" />
          </svg>
        </router-link>
        <button v-else class="nav-item" @click="app.logout">
          <svg class="fill-dark-lighter hover:bg-dark-light flex-none rounded hover:bg-dark-light p-[2px]"
            viewBox="0 -960 960 960">
            <path
              d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
}


svg {
  width: 25px;
  height: 100%;
}
</style>
