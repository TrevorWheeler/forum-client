<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface Agreement {
  title: string;
  statement: string;
}

const agreements: Agreement[] = [
  {
    title: 'Acceptance of Terms',
    statement:
      'Users must explicitly agree to abide by the terms and conditions of the forum when registering or using the platform.'
  },
  {
    title: 'Compliance with Local Laws',
    statement:
      'Users should acknowledge that they are solely responsible for ensuring their posts and actions on the forum comply with the laws and regulations of their country of residence.'
  },
  {
    title: 'Respectful Conduct',
    statement:
      'Users agree to engage in respectful and courteous discussions, refraining from personal attacks, bullying, or any behavior that could be considered offensive or harmful.'
  },
  {
    title: 'User-Generated Content',
    statement:
      'Users acknowledge that they are solely responsible for the content they post on the forum and grant the forum a non-exclusive license to use, reproduce, modify, and distribute their content within the forum.'
  },
  {
    title: 'Moderation and Removal',
    statement:
      "The forum reserves the right to moderate and remove any content that violates the forum's guidelines or any applicable laws without prior notice. Users agree not to hold the forum responsible for content removal."
  },
  {
    title: 'Intellectual Property',
    statement:
      'Users agree not to post any content that infringes upon the intellectual property rights of others, including copyrights, trademarks, or patents.'
  },
  {
    title: 'Personal Information',
    statement:
      'Users agree not to share personal information of themselves or others and to abide by relevant privacy laws when discussing personal details.'
  },
  {
    title: 'Age Restrictions',
    statement:
      'Users should agree that they are of legal age to use the forum, or if under the age of consent, have obtained appropriate parental or guardian consent.'
  },
  {
    title: 'Indemnity',
    statement:
      'Users agree to indemnify and hold the forum, its owners, administrators, and moderators harmless from any claims, losses, damages, liabilities, or expenses arising out of their use of the forum or violation of the user agreement.'
  },
  {
    title: 'No Legal Advice',
    statement:
      'Users acknowledge that any information shared on the forum is not legal advice, and they should seek professional legal counsel for any legal matters.'
  },
  {
    title: 'Changes to Agreement',
    statement:
      'Users acknowledge that the forum reserves the right to modify the user agreement at any time, and continued use of the forum constitutes acceptance of any modifications.'
  }
];

const agreement: Ref<boolean> = ref(false);

import { useAppStore } from '@/stores/app';

const app = useAppStore();
import { useRouter } from 'vue-router';
const router = useRouter();

async function accept(event: any) {
  event.preventDefault();
  await getUser();
}



async function getUser() {
  try {
    const userResponse = await fetch("http://localhost:3000/auth/user");
    const token = await userResponse.text();
    localStorage.setItem("token", token);
    app.username = app.getUsername();
    app.agreement = true;
    router.push('/');
  } catch (e) {
    console.log(e);
  }
}

</script>

<template>
  <div class="flex flex-row justify-center">
    <form class="text-white justify-center rounded bg-darker p-4 w-[650px]" @submit="accept">
      <h1 class="font-bold mb-2">Forum User Agreement:</h1>
      <ol>
        <li class="mb-2" v-for="(agreement, i) of agreements" :key="i">
          <p>
            <span class="text-gray-light text-info mr-1">{{ i + 1 }}.</span>
            <span class="font-bold">{{ agreement.title }}:</span> {{ agreement.statement }}
          </p>
        </li>
      </ol>
      <div class="mt-3">
        <input type="checkbox" name="agreement" value="agreement" class="mr-2 accent-info cursor-pointer"
          v-model="agreement" />
        <label for="agreement" class="font-bold">I have read and agree to abide by the forum's Terms of Use and
          acknowledge that I will comply with all applicable laws, both internationally and in my country of
          residence.</label>
        <div class="flex justify-end pt-5">
          <a href="https://www.google.com"
            class="mr-3 flex-none grid h-[36px] items-center text-error font-semibold border border-error rounded-sm px-2 hover:bg-error hover:bg-opacity-5">
            REJECT
          </a>
          <button :disabled="!agreement" type="submit"
            class="flex-none grid h-[36px] items-center text-info font-semibold border border-info rounded-sm px-2 hover:bg-info hover:bg-opacity-5 disabled:pointer-events-none disabled:text-dark-lighter disabled:border-dark-lighter">
            ACCEPT </button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
