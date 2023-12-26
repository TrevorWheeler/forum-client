<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Nav from '@/components/Nav.vue';
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { loadScript } from '@/utils/loadScript'
const router = useRouter();
const appStore = useAppStore();

onMounted(async () => {
  // let XWigetscript = document.createElement('script')
  // XWigetscript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
  // document.head.appendChild(XWigetscript)

  // loadScript('https://platform.twitter.com/widgets.js').then(() => {
  //   console.log("LOADED")
  // })
});




</script>

<template>
  <div class="bg-dark pt-[36px]">
    <header>
      <Nav />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
main {
  min-height: calc(100vh - 36px);
}
</style>
