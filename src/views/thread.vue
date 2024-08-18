<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useAppStore } from '@/stores/app';
const app = useAppStore();
import { useValidate } from '@/utils/validate'
import { useToast } from "vue-toastification";
const toast = useToast();
import { useRoute, useRouter } from 'vue-router';
import { type PostReply, postReplySchema } from '@/interfaces/Post'
import { MediaState, MediaType } from '@/interfaces/Media';
import ImageUrl from '@/components/image/image_url.vue'
import VideoUrl from '@/components/video/video_url.vue'
import XUrl from '@/components/x/x_url.vue'
import useHttp from '@/utils/http';
import Post from '@/components/post.vue'
const validatePostReply = useValidate(postReplySchema)
const http = useHttp()
const router = useRouter();
const route = useRoute();
const body = ref("");
const posts: Ref<any> = ref([]);

onMounted(async () => {
  await getPost();
});

async function getPost() {
  try {
    if (!route.params.id) {
      throw new Error("Thread ID is not defined");
    }
    posts.value = await http.get('post/' + route.params.id)
  } catch (e: unknown) {
    console.log(e);
    toast.error("Something went wrong.", { color: 'error' });
    app.reset();
  }
}

async function addReply(event: Event) {
  try {
    event.preventDefault();
    const postReply: PostReply = {
      ref: posts.value.length > 0 && posts.value[0]._id ? posts.value[0]._id : undefined,
      body: body.value
    }
    validatePostReply(postReply);
    const response = await http.post('post/' + route.params.id + '/add', postReply)
    posts.value.push(response)


    body.value = "";
  } catch (e: unknown) {
    console.error(e)
  }
}


</script>

<template>
  <div class="w-full p-2">
    <div v-for="(post, i) of posts" :key="post._id">
      <Post :post="post" />
    </div>
    <div class="inline-flex items-center justify-center w-full">
      <hr class="w-[100%] h-1 my-6 bg-dark-light border-0 rounded ">
      <div class="absolute px-4 -translate-x-1/2 bg-dark left-1/2 ">
        <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path
            d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
        </svg>
      </div>
    </div>
    <div class="w-full">
      <form class="grid rounded-sm" @submit="addReply">
        <label for="body" class="text-white block h-0">Content</label>
        <textarea name="body" rows="10" class="bg-darker p-2 mb-2 text-dark-lighter" placeholder="Reply"
          v-model="body"></textarea>
        <div class="grid justify-end">
          <button type="submit"
            class="flex-none grid h-[36px] items-center text-info font-semibold border border-info disabled:pointer-events-none disabled:text-dark-lighter rounded-sm px-2 hover:bg-info hover:bg-opacity-5 min-w-[73px]">
            REPLY</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
/* svg {
  width: 25px;
  height: 100%;
} */
</style>
