<script setup lang="ts">
import { ref, type Ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast();
import { useAppStore } from '@/stores/app';
const app = useAppStore();
import router from '@/router';
import useHttp from '@/utils/http';

const { get } = useHttp()

onMounted(async () => {
  await getPosts();
});
async function getPosts() {
  try {
    app.posts = await get('post')
  } catch (e) {
    console.log(e);
    app.reset();
  }
}
async function getPost(id: string) {
  try {
    router.push({ name: 'post', params: { id } });
  } catch (e) {
    console.log(e);
    localStorage.removeItem('token');
    router.push('/');
  }
}
function getDate(_id: string) {
  const timestamp = parseInt(_id.substring(0, 8), 16);
  const date = new Date(timestamp * 1000).toLocaleString('en-AU', {
    day: 'numeric', month:
      'long'
    , year: 'numeric'
  });;
  return date;
}
</script>

<template>
  <div class="w-full">
    <div v-if="app.posts" v-for="(row, i) of app.posts">
      <div @click="getPost(row._id)"
        class="grid grid-cols-2 w-full items-center h-[36px] text-dark-lighter text-sm font-medium border-b border-dark-light px-3 hover:bg-darker hover:text-info cursor-pointer">
        <div class="whitespace-nowrap lg:pl-[16px]">{{ row.subject }}</div>
        <div class="whitespace-nowrap flex justify-end">{{ row.username }}</div>
      </div>
    </div>
    <div v-if="!app.posts"
      class="post-container grid grid-cols-1 gap-4 text-white text-sm  font-medium border-b border-dark-lighter">
      <div class="whitespace-nowrap px-6 py-2">No Posts Available</div>
    </div>
  </div>
</template>
<style scoped></style>
