<script setup lang="ts">
import { onMounted, ref, type Ref, computed, watch } from 'vue';
import { useAppStore } from '@/stores/app';
const app = useAppStore();
import { useToast } from "vue-toastification";
import { MediaType, MediaState } from '@/interfaces/Media'
const toast = useToast();
const emit = defineEmits(['error', 'load'])
import Tweet from "vue-tweet";
interface IProps {
  imageSource: string,
  mediaState: MediaState
}
const props = withDefaults(defineProps<IProps>(), {
  imageSource: "",
  mediaState: MediaState.LOADING
});
const isHidingWhileLoading = ref(false);


watch(() => props.mediaState, (mediaState: MediaState) => {
  if (mediaState === MediaState.LOADING) {
    isHidingWhileLoading.value = true
  } else {
    isHidingWhileLoading.value = false;
  }
});


// If Tweet dependency is deprecated:
// onMounted(() => {
//   loadTwitterScript()
// });
// function loadTwitterScript() {
//   if (!(window as any).twttr) {
//     const script = document.createElement('script');
//     script.src = 'https://platform.twitter.com/widgets.js';
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       if ((window as any).twttr && (window as any).twttr.widgets) {
//         (window as any).twttr.widgets.load();
//       }
//     };
//   } else {
//     (window as any).twttr.widgets.load();
//   }
// }
//     <blockquote class="twitter-tweet">
//       <p lang="en" dir="ltr">At dawn from the gateway to Mars, the launch of Starship’s second flight test <a
//           href="https://t.co/ffKnsVKwG4">pic.twitter.com/ffKnsVKwG4</a></p>&mdash; SpaceX (@SpaceX) <a
//         href="https://twitter.com/SpaceX/status/1530240085807054848">December 7, 2023</a>
//     </blockquote>
</script>
<template>
  <div>
    <!-- 1732824684683784516 -->
    <Tweet tweet-id="1530240085807054848" theme="dark" />




    <!-- <YoutubePlayer :videoId="imageSource" @error="emit('error')" @ready="emit('load')"
      :class="{ 'hide-image': props.mediaState == MediaState.LOADING }" />
    <div v-if="props.mediaState === MediaState.LOADING" class="card bg-darker">
      <div class="loading-animation "></div>
    </div>
    <div class="card  bg-dark-light"
      v-if="props.mediaState === MediaState.ERROR || props.mediaState === MediaState.EMPTY">
      <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100">
        <path
          d="m770-302-60-62q40-11 65-42.5t25-73.5q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 57-29.5 105T770-302ZM634-440l-80-80h86v80h-6ZM792-56 56-792l56-56 736 736-56 56ZM440-280H280q-83 0-141.5-58.5T80-480q0-69 42-123t108-71l74 74h-24q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h65l79 80H320Z" />
      </svg>
    </div> -->
  </div>
</template>
<style scoped>
img {
  /* width: auto; */

  max-width: 400px;
  max-height: 225px;

  /* height: 600px; */
  /* aspect-ratio: auto 16/9; */

  /* width:100%;
    height:100%; */
  /* object-fit: cover;
  overflow: hidden;

  width: 400px;
  aspect-ratio: auto 16/9; */
  /* max-width: 100%;
  height: auto; */
  /* width: auto; */
  /* object-fit: contain; */
  /* width: 100%;
  height: 100%;
  object-fit: contain; */
}

.card {
  height: 360px;
  aspect-ratio: auto 16/9;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-animation {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #2a2a2a 8%, #3a3a3a 18%, #2a2a2a 33%);
  position: absolute;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

img.hide-image {
  opacity: 0;
  height: 0;
  width: 0;
}

img.error {
  border: 1px solid red;
  /* other error-specific styles */
}
</style>
