<script setup lang="ts">
import { onMounted, ref, type Ref, computed, nextTick } from 'vue';
import { MediaState } from '@/interfaces/Media'
import image from '@/utils/image';

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
  imageSource.value = input.value
  if (!imageSource.value) {
    emit('update:mediaState', MediaState.EMPTY)
  } else {
    emit('update:mediaState', MediaState.LOADING)
  }

  // if (debounceTimer.value !== null) {
  //   clearTimeout(debounceTimer.value);
  // }
  // debounceTimer.value = setTimeout(async () => {
  //   // const input = e.target as HTMLInputElement;
  //   // validateAndSetImage(input.value)
  // }, 500);
}

async function validateAndSetImage(url: string) {
  // emit('update:mediaState', MediaState.LOADING)
  // await nextTick()
  const isValid = await validateImageUrl(url);
  if (isValid) {
    emit('update:mediaState', MediaState.OK)
    imageSource.value = url
    emit('update:url', url);
  } else {
    onError()
  }
}

async function validateImageUrl(url: string) {
  try {
    console.log("HIT")
    const res = await fetch(url);
    const buff = await res.blob();
    return buff.type.startsWith('image/');
  } catch (e) {
    console.error(e);
    return false;
  }
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
    <label for="image" class="text-white block h-0"> Please add image via URL </label>
    <input type="text" name="image" placeholder="Please add image via URL" @input="onInput"
      class="bg-darker p-2 text-white mb-2 h-[36px]" />
    <Image :imageSource="imageSource" @error="onError" @load="onLoad" :mediaState="mediaState" />
  </div>
</template>
<style scoped></style>
