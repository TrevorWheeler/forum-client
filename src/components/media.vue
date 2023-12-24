<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useAppStore } from '@/stores/app';
const app = useAppStore();
import { useValidate } from '@/utils/validate'
import { useToast } from "vue-toastification";
const toast = useToast();
import { useRoute, useRouter } from 'vue-router';
import { type PostReply, postReplySchema } from '@/interfaces/Post'
const validatePostReply = useValidate(postReplySchema)
const router = useRouter();
const route = useRoute();
const body = ref("");




</script>

<template>
  <div class="w-full p-2">

  </div>
</template>
<style scoped></style>
