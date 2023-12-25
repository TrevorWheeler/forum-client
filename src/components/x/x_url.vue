<script setup lang="ts">
import { onMounted, ref, type Ref, computed, nextTick } from 'vue';
import { MediaState } from '@/interfaces/Media'
// import image from '@/utils/image';

const emit = defineEmits(['update:url', 'update:mediaState'])
interface IProps {
  mediaState: MediaState
}
const props = withDefaults(defineProps<IProps>(), {
  mediaState: MediaState.EMPTY
});
const debounceTimer: Ref<any> = ref(null);
const imageSource: Ref<string> = ref('')


function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.value) {
    emit('update:mediaState', MediaState.EMPTY)
  } else {
    emit('update:mediaState', MediaState.LOADING)
    const youtubeId = youtubeParser(input.value)
    if (!youtubeId) {
      imageSource.value = ''
    }
    debounceTimer.value = setTimeout(async () => {
      if (youtubeId) {
        imageSource.value = youtubeId
        emit('update:mediaState', MediaState.OK)
        emit('update:url', youtubeId);
      } else {
        emit('update:mediaState', MediaState.ERROR)
        emit('update:url', '');
      }
    }, 1000);
  }
}

function youtubeParser(url: string) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

function onLoad() {
  console.log("LOADED")
  emit('update:mediaState', MediaState.OK)
  emit('update:url', imageSource.value);
}

function onError() {
  if (imageSource.value) {
    emit('update:mediaState', MediaState.ERROR)
  }
  emit('update:url', '');
}
</script>

<template>
  <div class="grid">
    <label for="x" class="text-white block h-0"> Please add X via URL </label>
    <input type="text" name="x" placeholder="Please add X via URL" @input="onInput"
      class="bg-darker p-2 text-white mb-2 h-[36px]" />
    <X :imageSource="imageSource" @error="onError" @load="onLoad" :mediaState="mediaState" />

  </div>
</template>
<style scoped></style>
