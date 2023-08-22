<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useAppStore } from '@/stores/app';
const app = useAppStore();
import { useToast } from "vue-toastification";
const toast = useToast();
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const body = ref("");
const posts: Ref<any> = ref([]);
onMounted(async () => {
  await getPost();
});

async function getPost() {
  try {
    const response = await fetch(app.serverURL + '/post/' + route.params.id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: null
    });
    console.log(response);
    switch (response.status) {
      case 200:
        posts.value = await response.json();
        break;
      case 401:
        app.reset();
        break;
      case 404:
        router.push({ path: '/404', });
        break;
    }
  } catch (e) {
    console.log(e);
    toast.error("Something went wrong.", { color: 'error' });
    app.reset();
  }
}

async function addReply(event: any) {
  try {
    event.preventDefault();
    const response = await fetch(app.serverURL + '/post/' + posts.value[0]._id + '/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: posts.value[0]._id, body: body.value
      })
    });
    switch (response.status) {
      case 200:
        getPost();
        break;
      case 401:
        localStorage.removeItem('token');
        router.push('/agreement');
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
    <div v-for="(post, i) of posts" class="p-2 mb-2 bg-dark-light p-1 text-white rounded-sm">
      <div class="whitespace-nowrap text-sm font-thin leading-3 mb-1">{{ post.username }}</div>
      <div class="leading-4">{{ post.body }}</div>
    </div>
    <div class="w-full ">
      <form class="grid rounded-sm" @submit="">
        <label for="body" class="text-white block h-0">Content</label>
        <textarea name="body" rows="10" class="bg-darker p-2 mb-2 text-dark-lighter" placeholder="Reply"
          v-model="body"></textarea>
        <div class="grid justify-end">
          <button @click="addReply"
            class="flex-none grid h-[36px] items-center text-info font-semibold border border-info disabled:pointer-events-none disabled:text-dark-lighter rounded-sm px-2 hover:bg-info hover:bg-opacity-5 min-w-[73px]">
            REPLY</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
