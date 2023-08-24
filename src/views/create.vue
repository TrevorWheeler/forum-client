<script setup lang="ts">
import { ref, type Ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const app = useAppStore();
const toast = useToast();
const router = useRouter();

const subject = ref("");


const body = ref("");


function validateSubject(): string | null {
  if (subject.value.trim().length === 0) {
    return "Subject required.";
  } else if (subject.value.trim().length > 100) {
    return "Subject cannot exceed 100 characters.";
  } else {
    return null;
  }
}


function validateBody(): string | null {
  if (body.value.trim().length === 0) {
    return "body required.";
  } else {
    return null;
  }
}




async function addPost(event: any) {
  try {
    event.preventDefault();


    const subjectError = validateSubject();
    const bodyError = validateBody();
    console.log(bodyError);
    console.log(subjectError ?? (() => bodyError));

    if (subjectError || bodyError) {


      toast.error(subjectError ?? bodyError, { color: 'error' });
      return;
    }
    const response = await fetch(app.serverURL + '/post/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subject.value, body: body.value
      })
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
    app.reset();
  }
}






</script>
<template>
  <div class="w-full p-2">
    <form class="grid" @submit="">
      <label for="title" class="text-white block h-0"> Subject </label>
      <input type="text" name="subject" placeholder="Subject" class="bg-darker p-2 text-white mb-2 h-[36px]"
        v-model="subject" />
      <label for="body" class="text-white block h-0">Content</label>
      <textarea name="body" rows="15" class="bg-darker p-2 mb-2 text-dark-lighter" placeholder="Body"
        v-model="body"></textarea>
      <div class="grid justify-end">
        <button @click="addPost"
          class="flex-none grid h-[36px] items-center text-info font-semibold border border-info disabled:pointer-events-none disabled:text-dark-lighter rounded-sm px-2 hover:bg-info hover:bg-opacity-5">POST</button>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
