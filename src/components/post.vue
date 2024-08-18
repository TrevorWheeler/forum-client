<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useAppStore } from '@/stores/app';
const app = useAppStore();
import { useValidate } from '@/utils/validate'
import { useToast } from "vue-toastification";
const toast = useToast();
import { useRoute, useRouter } from 'vue-router';
import { type PostReply, postReplySchema, type Post } from '@/interfaces/Post'
import { MediaState, MediaType } from '@/interfaces/Media';
import ImageUrl from '@/components/image/image_url.vue'
import VideoUrl from '@/components/video/video_url.vue'
import XUrl from '@/components/x/x_url.vue'
import useHttp from '@/utils/http';
const validatePostReply = useValidate(postReplySchema)
const http = useHttp()
const router = useRouter();
const route = useRoute();

const mediaState: Ref<MediaState> = ref(MediaState.LOADING)

interface IProps {
  post: Post,

}
const props = withDefaults(defineProps<IProps>(), {
  post: () => ({
    _id: "",
    num: -1,
    subject: "",
    userId: "",
    username: "",
    ref: "",
    body: "",
    media: MediaType.LINK,
    url: ""
  })
});



function onLoad() {
  mediaState.value = MediaState.OK
}

function onError() {
  mediaState.value = MediaState.ERROR
}


function initMediaState(mediaType: MediaType) {
  switch (mediaType) {
    case MediaType.X:
      setTimeout(() => {
        mediaState.value = MediaState.OK;
      }, 400);
      break;
  }
}


onMounted(() => {
  initMediaState(props.post.media)
})

function getDate(_id: string): String {
  const timestamp = _id.toString().substring(0, 8)
  return new Date(parseInt(timestamp, 16) * 1000).toLocaleString();
}

</script>

<template>
  <div class="w-full mb-2">

    <div class="media mb-2">
      <Image v-if="props.post.media === MediaType.IMAGE" :imageSource="props.post.url" @error="onError" @load="onLoad"
        :mediaState="mediaState" />
      <Video v-if="props.post.media === MediaType.YOUTUBE" :imageSource="props.post.url" :mediaState="mediaState"
        @error="onError" @load="onLoad" />
      <X v-if="props.post.media === MediaType.X" :imageSource="props.post.url" :mediaState="mediaState" @error="onError"
        @load="onLoad" />
    </div>

    <div v-if="props.post.subject">
      <div class="text-dark-lighter font-bold pl-1"> {{ props.post.subject
      }} </div>
      <hr class="w-full h-[1px] mb-2 bg-dark-light border-0 rounded">
    </div>



    <div class="p-2  bg-dark-light p-1 text-white rounded-sm">
      <div class="header flex justify-between">

        <div class="whitespace-nowrap text-sm font-thin leading-3 mb-1"> {{ props.post.username
        }}</div>
        <div class="whitespace-nowrap text-sm font-thin leading-3 mb-1">{{
          getDate(props.post._id) }}</div>
      </div>
      <div class="leading-4">{{ props.post.body }}</div>
    </div>
  </div>
</template>
<style scoped></style>
