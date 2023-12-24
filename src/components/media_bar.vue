<script setup lang="ts">
import { onMounted, ref, type Ref, computed } from 'vue';
import { useAppStore } from '@/stores/app';
const app = useAppStore();
import { useToast } from "vue-toastification";
import { MediaType } from '@/interfaces/Media'
const toast = useToast();
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();


const debounceTimer: Ref<any> = ref(null);
const isValid: Ref<boolean> = ref(false)
const youtube: Ref<any> = ref(null)
const emit = defineEmits(['update:mediaType', 'update:url'])
const youtubeEndpoint: Ref<string> = ref('')

interface IProps {
  mediaType: MediaType;
  url: string
}
const props = withDefaults(defineProps<IProps>(), {
  mediaType: MediaType.LINK,
  url: ""
});

function setMediaType(mediaType: MediaType) {

  emit('update:mediaType', mediaType)
}

function youtubeParser(url: string) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

function twitterParser(url: string) {
  const regExp = /(^|[^'"])(https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+))/
  const match = url.match(regExp)
  return match && match[4] ? match[4] : false
}




function onInputImage(e: any) {
  emit('update:url', e.target.value);

  if (debounceTimer.value !== null) {
    clearTimeout(debounceTimer.value);
  }
  debounceTimer.value = setTimeout(async () => {
    isValid.value = await validateImageUrl(e.target.value)
  }, 500);
}

async function validateImageUrl(url: string) {

  try {
    const res = await fetch(url)
    console.log(res)
    const buff = await res.blob()
    return buff.type.startsWith('image/')
  } catch (e) {
    console.log(e)
    return false
  }
}

function onInputYoutube(e: any) {

  const youtubeId = youtubeParser(e.target.value)
  console.log("#########")
  console.log(youtubeId)

  if (youtubeId) {
    isValid.value = true
    emit('update:url', youtubeId);
    emit('update:url', e.target.value);
  }



}


function onReady() {
  console.log("onReady event")
}


function onYotubeError(e: any) {
  emit('update:url', "");
}



</script>

<template>
  <div>
    <div class="flex bg-darker w-full  border-dark-light text-white text-sm font-bold h-[36px] items-center mb-2">
      <span class="text-dark-lighter block p-2">MEDIA</span>
      <button @click="setMediaType(MediaType.LINK)" type="button"
        class="mr-2 hover:bg-dark-light flex-none rounded hover:bg-dark-light w-[25px] h-[25px] flex items-center justify-center"
        :class="[{ 'bg-dark-light': props.mediaType == MediaType.LINK }]">
        <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
          <path
            d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
        </svg>
      </button>

      <Tooltip message="Add image via URL">
        <button type="button" @click="setMediaType(MediaType.IMAGE)"
          class="mr-2 hover:bg-dark-light flex-none rounded hover:bg-dark-light w-[25px] h-[25px] flex items-center justify-center"
          :class="[{ 'bg-dark-light': props.mediaType == MediaType.IMAGE }]">
          <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960"
            width="20">
            <path
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
          </svg>
        </button>
      </Tooltip>
      <button type="button" @click="setMediaType(MediaType.YOUTUBE)"
        class="mr-2 hover:bg-dark-light flex-none rounded hover:bg-dark-light w-[25px] h-[25px] flex items-center justify-center"
        :class="[{ 'bg-dark-light': props.mediaType == MediaType.YOUTUBE }]">
        <svg viewBox="0 0 511.6 511.6" width="18" height="18" fill="#FF0000">
          <path
            d="M511.3 213c-.1-10.3-1-23.3-2.4-39a354.4 354.4 0 0 0-6.1-42.1 66.4 66.4 0 0 0-19.9-35.1c-10.1-9.5-22-15-35.5-16.6-42.3-4.7-106.1-7.1-191.6-7.1-85.4 0-149.3 2.4-191.6 7.1a60.2 60.2 0 0 0-35.4 16.6 66.8 66.8 0 0 0-19.7 35.1A316 316 0 0 0 2.7 174a560.2 560.2 0 0 0-2.4 39 2430.9 2430.9 0 0 0 0 85.6 560 560 0 0 0 2.4 39c1.4 15.7 3.5 29.8 6.2 42.1a65.4 65.4 0 0 0 55.3 51.7c42.3 4.8 106.1 7.1 191.6 7.1s149.3-2.3 191.6-7.1c13.5-1.5 25.3-7 35.4-16.6a66.8 66.8 0 0 0 19.7-35c2.8-12.4 5-26.5 6.4-42.2 1.4-15.7 2.2-28.7 2.4-39a2450.8 2450.8 0 0 0 0-85.6zM357 271.2l-146.2 91.4a16.3 16.3 0 0 1-9.7 2.8c-2.9 0-5.8-.7-8.9-2.2a17 17 0 0 1-9.4-16V164.5a17 17 0 0 1 9.4-16 17.2 17.2 0 0 1 18.6.5L357 240.4c5.7 3.2 8.5 8.4 8.5 15.4s-2.8 12.2-8.5 15.4z" />
        </svg>
      </button>
      <button type="button" @click="setMediaType(MediaType.X)"
        class="mr-2 hover:bg-dark-light flex-none rounded hover:bg-dark-light w-[25px] h-[25px] flex items-center justify-center"
        :class="[{ 'bg-dark-light': props.mediaType == MediaType.X }]">

        <svg fill-rule="evenodd" clip-rule="evenodd" width="20" height="20" viewBox="0 0 512 509.64">
          <rect width="512" height="509.64" rx="115.61" ry="115.61" />
          <path fill="#fff" fill-rule="nonzero"
            d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04zm-12.68 191.31h20.02l-129.2-170.82H180.4l130.66 170.82z" />
        </svg>
      </button>
    </div>
    <div class="grid" v-if="mediaType === MediaType.LINK">
      <label for="article" class="text-white block h-0"> Please add article via URL </label>
      <input type="text" name="article" placeholder="Please add article via URL"
        class="bg-darker p-2 text-white mb-2 h-[36px]" />
    </div>

    <div class="grid mb-2" v-if="mediaType === MediaType.IMAGE">
      <label for="image" class="text-white block h-0"> Please add image via URL </label>
      <input type="text" name="image" placeholder="Please add image via URL" @input="onInputImage"
        class="bg-darker p-2 text-white mb-2 h-[36px]" />
      <img v-if="isValid" :src="props.url" />
      <div v-if="!isValid" class="w-[500px] h-[281px] bg-dark-light flex flex-col justify-center items-center">
        <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960"
          width="100">
          <path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
        </svg>
        <span class="block text-dark-lighter text-7xl pb-3">404</span>
      </div>
    </div>

    <div class="grid mb-2" v-if="mediaType === MediaType.YOUTUBE">
      <label for="image" class="text-white block h-0"> Please add youtube via URL </label>
      <input type="text" name="image" placeholder="Please add image via URL" v-model="youtubeEndpoint"
        @input="onInputYoutube" class="bg-darker p-2 text-white mb-2 h-[36px]" />

      <div v-if="isValid">
        <YouTube :src="'www.youtube.com/watch?v=' + url" @ready="onReady" @error="onYotubeError" ref="youtube" />
      </div>
      <!-- www.youtube.com/watch?v=bTqVqk7FSmY -->

      <!-- <div v-if="!isValid" class="w-[500px] h-[281px] bg-dark-light flex flex-col justify-center items-center">
        <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960"
          width="100">
          <path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
        </svg>
        <span class="block text-dark-lighter text-7xl pb-3">404</span>
      </div> -->
    </div>
  </div>
</template>
<style scoped>
img {
  width: auto;
}
</style>
