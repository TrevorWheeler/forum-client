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
const validatePostReply = useValidate(postReplySchema)
const http = useHttp()
const router = useRouter();
const route = useRoute();
const body = ref("");
const posts: Ref<any> = ref([]);
const mediaState: Ref<MediaState> = ref(MediaState.OK)
onMounted(async () => {
  await getPost();
});

async function getPost() {
  try {

    const response = await http.get('post/' + route.params.id)

    posts.value = response;
    // const response = await fetch(app.serverURL + '/post/' + route.params.id, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: null
    // });

  } catch (e) {
    console.log(e);
    toast.error("Something went wrong.", { color: 'error' });
    app.reset();
  }
}

async function addReply(event: any) {
  try {
    event.preventDefault();
    const postReply: PostReply = {
      ref: posts.value.length > 0 && posts.value[0]._id ? posts.value[0]._id : undefined,
      body: body.value
    }
    validatePostReply(postReply);


    const response = await http.post('post/' + route.params.id + '/add', postReply)

    posts.value.push(response)

  } catch (e: any) {
    console.error(e)
  }
}


</script>

<template>
  <div class="w-full p-2">
    <div v-for="(post, i) of posts">
      <Video v-if="post.media === MediaType.YOUTUBE" :imageSource="post.url" :mediaState="mediaState" class="mb-2" />
      <X v-if="post.media === MediaType.X" :imageSource="post.url" :mediaState="mediaState" />
      <div class="p-2 mb-2 bg-dark-light p-1 text-white rounded-sm">
        <div class="whitespace-nowrap text-sm font-thin leading-3 mb-1">{{ post.username }}</div>


        <!-- <ImageUrl v-if="post.media === MediaType.IMAGE" v-model:url="post.url" v-model:mediaState="mediaState"
        class="mb-2" />
      <XUrl v-if="post.media === MediaType.X" v-model:url="post.url" v-model:mediaState="mediaState" class="mb-2" />
      <VideoUrl v-if="post.media === MediaType.YOUTUBE" v-model:url="post.url" v-model:mediaState="mediaState"
        class="mb-2" /> -->

        <div class="leading-4">{{ post.body }}</div>
      </div>
    </div>




    <div class="w-full ">
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
