<script setup lang="ts">

import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useToast } from "vue-toastification";
const toast = useToast();
const app = useAppStore();
const router = useRouter();
const username: Ref<string> = ref("faker@faker.com");
const password: Ref<string> = ref("123");
const submit = async (event: any) => {
  try {
    event.preventDefault();
    const authenticationRequest = { username: username.value, password: password.value };
    const response = await fetch(app.serverURL + "/auth/signin", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(authenticationRequest)
    });
    switch (response.status) {
      case 200:
        const token = await response.text();
        localStorage.setItem("token", token);
        app.isAuthenticated = true;
        toast("Authenticated");
        router.push({ name: "root" });
        break;
      case 400:
        toast.error("Something went wrong.", { color: 'error' });
        break;
      case 401:
        localStorage.removeItem('token');
        router.push('/');
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
    toast.error("Something went wrong.", { color: 'error' });
    app.reset();
  }
};
</script>

<template>
  <div class="flex flex-row justify-center mt-2">
    <form class="w-full grid p-2 md:w-[350px]" @submit="submit">
      <p class="text-center text-white mb-2 lg:mb-3 leading-[32px]">AUTHENTICATE</p>
      <label for="username" class="text-white block h-0"> Username </label>
      <input type="text" label="username" class="bg-darker p-2 text-white mb-2 h-[36px]" placeholder="Username"
        v-model="username" />
      <label for="password" class="text-white block h-0"> Username </label>
      <input type="password" label="password" placeholder="Password" class="bg-darker p-2 text-white mb-2 h-[36px]"
        v-model="password" />
      <div class="grid">
        <button @click="submit"
          class="w-full block flex-none grid h-[36px] items-center text-info font-semibold border border-info disabled:pointer-events-none disabled:text-dark-lighter rounded-sm px-2 hover:bg-info hover:bg-opacity-5  text-center mb-2">
          LOGIN</button>
        <router-link to="/register"
          class="w-full block flex-none grid h-[36px] items-center text-info font-semibold border border-info disabled:pointer-events-none disabled:text-dark-lighter rounded-sm px-2 hover:bg-info hover:bg-opacity-5  text-center">
          REGISTER
        </router-link>
      </div>
    </form>
  </div>
</template>
