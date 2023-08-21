<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Nav from '@/components/Nav.vue';
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';

const router = useRouter();
const appStore = useAppStore();

onMounted(async () => {

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
