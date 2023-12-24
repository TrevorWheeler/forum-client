<script setup lang="ts">
import { ref, type Ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import MediaBar from '@/components/media_bar.vue'
import { useValidate } from '@/utils/validate'
import { type PostCreate, postCreateSchema } from '@/interfaces/Post'
const validatePostCreate = useValidate(postCreateSchema)
const app = useAppStore();
const toast = useToast();
const router = useRouter();
import useHttp from '@/utils/http';
import { MediaType } from '@/interfaces/Media';
const http = useHttp()

const media: Ref<MediaType> = ref(MediaType.LINK)
const url: Ref<string> = ref('')

const subject: Ref<string> = ref('')
const body: Ref<string> = ref('')



async function createPost(event: any) {
  try {
    event.preventDefault();
    const postCreate: PostCreate = {
      subject: subject.value,
      body: body.value,
      media: media.value
    }
    validatePostCreate(postCreate)
    const response = await http.post('post/add', postCreate)

    console.log(response)
    // router.push({ name: 'root' });
  } catch (e) {
    console.log(e);
  }
}

</script>
<template>
  <div class="w-full p-2">

    <form class="grid" @submit="createPost">
      <MediaBar v-model:mediaType="media" v-model:url="url" />
      <label for="subject" class="text-white block h-0"> Subject </label>
      <input type="text" name="subject" placeholder="Subject" class="bg-darker p-2 text-white mb-2 h-[36px]"
        v-model="subject" />


      <label for="body" class="text-white block h-0">Content</label>
      <textarea name="body" rows="15" class="bg-darker p-2 mb-2 text-dark-lighter" placeholder="Body"
        v-model="body"></textarea>
      <div class="grid justify-end">
        <button type="submit"
          class="flex-none grid h-[36px] items-center text-info font-semibold border border-info disabled:pointer-events-none disabled:text-dark-lighter rounded-sm px-2 hover:bg-info hover:bg-opacity-5">POST</button>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
