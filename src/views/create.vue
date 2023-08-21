<script setup lang="ts">
import { ref, type Ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAppStore } from '@/stores/app';
import { useToast } from "vue-toastification";
const toast = useToast();
const app = useAppStore();
import { useRouter } from 'vue-router';
const router = useRouter();
const subject = ref("");
const body = ref("");

async function addPost(event: any) {
  try {
    event.preventDefault();
    const response = await fetch(app.serverURL + '/post/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subject.value, body: body.value
      })
    });
    console.log(response);
    switch (response.status) {
      case 200:
        router.push({ name: 'root' });
        break;
      case 401:
        app.reset();
        break;
      case 404:
        router.push({ path: '/404', });
        break;
      case 500:
        toast.error("Something went wrong.", { color: 'error' });
        break;
      default:
        router.push({ path: '/', });
        break;
    }
  } catch (e) {
    console.log(e);
  }
}






</script>
<template>
  <div class="w-full p-2">
    <form class="grid" @submit="">
      <label for="title" class="text-white block h-0"> Subject </label>
      <input type="text" name="subject" placeholder="Subject" class="bg-darker p-2 text-white mb-2 h-[36px]"
        v-model="subject" />
      <label for="body" class="text-white block h-0">Content</label>
      <textarea name="body" rows="15" class="bg-darker p-2 mb-2 text-dark-lighter" placeholder="Body"
        v-model="body"></textarea>
      <div class="grid justify-end">
        <button @click="addPost"
          class="flex-none grid h-[36px] items-center text-info font-semibold border border-info disabled:pointer-events-none disabled:text-dark-lighter rounded-sm px-2 hover:bg-info hover:bg-opacity-5">POST</button>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
