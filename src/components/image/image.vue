<script setup lang="ts">
// import { v4 as uuidv4 } from 'uuid';
// const imageId: string = uuidv4().replace(/-/g, '');
import { onMounted, ref, type Ref, computed, watch } from 'vue';

import { MediaState } from '@/interfaces/Media'


const emit = defineEmits(['error', 'load'])

interface IProps {
  imageSource: string,
  mediaState: MediaState
}
const props = withDefaults(defineProps<IProps>(), {
  imageSource: "",
  mediaState: MediaState.LOADING
});

</script>
<template>
  <div>
    <img :src="props.imageSource" @error="emit('error')" @load="emit('load')" alt="Image sourced from Url"
      class="bg-darker" :class="{ 'hide-image': props.mediaState !== MediaState.OK }" loading="lazy" />
    <div v-if="props.mediaState === MediaState.LOADING" class="card bg-darker">
      <div class="loading-animation "></div>
    </div>
    <div class="card  bg-dark-light"
      v-if="props.mediaState === MediaState.ERROR || props.mediaState === MediaState.EMPTY">
      <svg class="fill-dark-lighter" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100">
        <path
          d="m770-302-60-62q40-11 65-42.5t25-73.5q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 57-29.5 105T770-302ZM634-440l-80-80h86v80h-6ZM792-56 56-792l56-56 736 736-56 56ZM440-280H280q-83 0-141.5-58.5T80-480q0-69 42-123t108-71l74 74h-24q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h65l79 80H320Z" />
      </svg>
    </div>
  </div>
</template>
<style scoped>
img {
  /* width: auto; */

  max-width: 640px;
  max-height: 360px;

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
