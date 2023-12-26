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

// const agreements: Agreement[] = [
//   {
//     title: 'Acceptance of Terms',
//     statement:
//       'Users must explicitly agree to abide by the terms and conditions of the forum when registering or using the platform.'
//   },
//   {
//     title: 'Jurisdiction and Governing Law',
//     statement:
//       'This forum is governed by the laws of [specific Australian state/territory]. Any disputes will be subject to the exclusive jurisdiction of the courts of this state/territory.'
//   },
//   {
//     title: 'Compliance with Local Laws',
//     statement:
//       'Users are responsible for ensuring their posts and actions on the forum comply with the laws and regulations of their country of residence and the forum’s operating jurisdiction.'
//   },
//   {
//     title: 'Respectful Conduct',
//     statement:
//       'Users agree to engage in respectful and courteous discussions, refraining from personal attacks, bullying, or any behavior that could be considered offensive or harmful.'
//   },
//   {
//     title: 'User-Generated Content and Platform Role',
//     statement:
//       'Users are solely responsible for their content. They grant the forum a non-exclusive license to use their content. The forum is a platform provider and not a publisher of user content.'
//   },
//   {
//     title: 'Moderation and Removal',
//     statement:
//       "The forum reserves the right to moderate and remove content that violates guidelines or laws without notice. Users agree not to hold the forum liable for content removal."
//   },
//   {
//     title: 'Intellectual Property',
//     statement:
//       'Users must not post content that infringes upon intellectual property rights of others and warrant that they have the right to post their content.'
//   },
//   {
//     title: 'Personal Information and Privacy',
//     statement:
//       'Users must not share personal information and must comply with privacy laws. The forum adheres to the Australian Privacy Principles and relevant international data protection laws.'
//   },
//   {
//     title: 'Age Restrictions',
//     statement:
//       'Users confirm they are of legal age or have parental consent to use the forum.'
//   },
//   {
//     title: 'Indemnity',
//     statement:
//       'Users indemnify the forum and its affiliates from claims arising from their use or content violations.'
//   },
//   {
//     title: 'No Legal Advice',
//     statement:
//       'Information on the forum is not legal advice. Users should seek professional counsel for legal matters.'
//   },
//   {
//     title: 'Limitation of Liability',
//     statement:
//       'The forum’s liability is limited to the fullest extent permitted by law, and liability for indirect damages is excluded.'
//   },
//   {
//     title: 'Prohibition of Illegal Activity',
//     statement:
//       'Users must not engage in illegal activities on the forum. Such activities will lead to account termination and potential legal action.'
//   },
//   {
//     title: 'Reporting Mechanism',
//     statement:
//       'Users can report illegal or infringing content. The forum will respond appropriately to such reports.'
//   },
//   {
//     title: 'Termination and Suspension',
//     statement:
//       'Accounts may be suspended or terminated for violating terms, with due process.'
//   },
//   {
//     title: 'Notification of Security Breaches',
//     statement:
//       'Users will be notified in the event of a security breach affecting their data.'
//   },
//   {
//     title: 'Changes to Agreement',
//     statement:
//       'The forum may modify the agreement at any time, with continued use signifying acceptance.'
//   },
//   {
//     title: 'Force Majeure',
//     statement:
//       'Neither party is liable for failure to perform obligations due to circumstances beyond their control.'
//   },
//   {
//     title: 'Arbitration Clause',
//     statement:
//       'Disputes may be resolved through arbitration in accordance with [specific arbitration rules], at the discretion of the forum.'
//   }
// ];

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

  //   Explicit Jurisdiction and Governing Law:

  // Add a clause specifying that any disputes will be governed by Australian law and that the courts of a specific Australian state or territory will have exclusive jurisdiction. This is crucial for international platforms.
  // Clarification of Service Provider Role:

  // Include a statement clarifying that the forum acts as a platform provider and is not the publisher of user-generated content. This helps in delineating responsibility for content.
  // Disclaimer of Liability for Third-Party Links:

  // If users can post links, include a disclaimer stating that the forum is not responsible for the content of external sites.
  // Limitation of Liability:

  // Clearly state the limits of your liability, including any limitations on the types of damages for which you can be held responsible and a cap on potential damages if permissible under Australian law.
  // Prohibition of Illegal Activity:

  // Explicitly state that users must not use the platform for any illegal activities, and clarify that any such use will result in immediate termination of access and potential legal action.
  // Data Protection and Privacy:

  // Ensure you have a robust privacy policy that complies with the Australian Privacy Principles (APPs) and any relevant international data protection laws (like GDPR if applicable).
  // Reporting and Response Mechanism:

  // Include a mechanism for users to report illegal or infringing content and outline your process for responding to these reports.
  // User Responsibilities and Warranties:

  // Users should warrant that they have the right to post their content and that such content does not infringe on any third-party rights.
  // Force Majeure:

  // Include a force majeure clause absolving either party from liability or obligation in the event of circumstances beyond their control.
  // Termination and Suspension of Accounts:

  // Outline the conditions under which a user’s account can be suspended or terminated and the process for doing so.
  // Notification of Security Breaches:

  // Commit to notifying users in the event of a security breach that may impact their data.
  // Arbitration Clause (if applicable):

  // Consider adding an arbitration clause as an alternative dispute resolution mechanism.
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
