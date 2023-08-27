<script setup lang="ts">
import { ref, type Ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { type CreatePost, VCreatePost } from '@/utils/index';
import { z } from 'zod';
const app = useAppStore();
const toast = useToast();
const router = useRouter();

const post: Ref<CreatePost> = ref({
  subject: '', body: ''
});




function validate(): boolean {
  try {
    VCreatePost.parse(post.value);
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      toast.error(e.issues[0].message, { color: 'error' });
    }
    return false;
  }
}

async function addPost(event: any) {
  try {
    event.preventDefault();
    const isValid: boolean = validate();
    if (!isValid) {
      return;
    }
    const response = await fetch(app.serverURL + '/post/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post.value)
    });
    console.log(response);
    switch (response.status) {
      case 200:
        router.push({ name: 'root' });
        break;
      case 400:
        toast.error("Something went wrong.", { color: 'error' });
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
        app.reset();
        break;
    }
  } catch (e) {
    console.log(e);
    toast.error("Something went wrong.", { color: 'error' });
  }
}

</script>
<template>
  <div class="w-full p-2">
    <form class="grid" @submit="">
      <label for="title" class="text-white block h-0"> Subject </label>
      <input type="text" name="subject" placeholder="Subject" class="bg-darker p-2 text-white mb-2 h-[36px]"
        v-model="post.subject" />
      <label for="body" class="text-white block h-0">Content</label>
      <textarea name="body" rows="15" class="bg-darker p-2 mb-2 text-dark-lighter" placeholder="Body"
        v-model="post.body"></textarea>
      <div class="grid justify-end">
        <button @click="addPost"
          class="flex-none grid h-[36px] items-center text-info font-semibold border border-info disabled:pointer-events-none disabled:text-dark-lighter rounded-sm px-2 hover:bg-info hover:bg-opacity-5">POST</button>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
