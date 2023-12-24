<script setup lang="ts">
import { ref, type Ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { type CreatePost, VCreatePost } from '@/utils/index';

const app = useAppStore();
const toast = useToast();
const router = useRouter();
const post: Ref<CreatePost> = ref({
  subject: '', body: ''
});




// function validate(): boolean {
//   try {
//     VCreatePost.parse(post.value);
//     return true;
//   } catch (e) {
//     if (e instanceof z.ZodError) {
//       toast.error(e.issues[0].message, { color: 'error' });
//     }
//     return false;
//   }
// }

async function addPost(event: any) {
  try {
    event.preventDefault();
    // const isValid: boolean = validate();
    // if (!isValid) {
    //   return;
    // }
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

      <div class="flex bg-darker  w-full border-b border-dark-light  text-white text-sm font-bold h-[36px] items-center">
        <span class="text-dark-lighter block p-2">MEDIA</span>
        <button
          class="mr-2 hover:bg-dark-light flex-none rounded hover:bg-dark-light w-[25px] h-[25px] flex items-center justify-center">
          <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960"
            width="20">
            <path
              d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
          </svg>
        </button>

        <Tooltip message="Link to a url that is an image">
          <button
            class="mr-2 hover:bg-dark-light flex-none rounded hover:bg-dark-light w-[25px] h-[25px] flex items-center justify-center">
            <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960"
              width="20">
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
            </svg>
          </button>
        </Tooltip>
        <button
          class="mr-2 hover:bg-dark-light flex-none rounded hover:bg-dark-light w-[25px] h-[25px] flex items-center justify-center">
          <svg viewBox="0 0 511.6 511.6" width="14" height="14" fill="#FF0000">
            <path
              d="M511.3 213c-.1-10.3-1-23.3-2.4-39a354.4 354.4 0 0 0-6.1-42.1 66.4 66.4 0 0 0-19.9-35.1c-10.1-9.5-22-15-35.5-16.6-42.3-4.7-106.1-7.1-191.6-7.1-85.4 0-149.3 2.4-191.6 7.1a60.2 60.2 0 0 0-35.4 16.6 66.8 66.8 0 0 0-19.7 35.1A316 316 0 0 0 2.7 174a560.2 560.2 0 0 0-2.4 39 2430.9 2430.9 0 0 0 0 85.6 560 560 0 0 0 2.4 39c1.4 15.7 3.5 29.8 6.2 42.1a65.4 65.4 0 0 0 55.3 51.7c42.3 4.8 106.1 7.1 191.6 7.1s149.3-2.3 191.6-7.1c13.5-1.5 25.3-7 35.4-16.6a66.8 66.8 0 0 0 19.7-35c2.8-12.4 5-26.5 6.4-42.2 1.4-15.7 2.2-28.7 2.4-39a2450.8 2450.8 0 0 0 0-85.6zM357 271.2l-146.2 91.4a16.3 16.3 0 0 1-9.7 2.8c-2.9 0-5.8-.7-8.9-2.2a17 17 0 0 1-9.4-16V164.5a17 17 0 0 1 9.4-16 17.2 17.2 0 0 1 18.6.5L357 240.4c5.7 3.2 8.5 8.4 8.5 15.4s-2.8 12.2-8.5 15.4z" />
          </svg>
        </button>
        <button
          class="mr-2 hover:bg-dark-light flex-none rounded hover:bg-dark-light w-[25px] h-[25px] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="#1da1f2" width="22" height="22">
            <path class="cls-2"
              d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23" />
          </svg>
        </button>
      </div>
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
