<!-- get data from Directus -->
<script setup>

  const { data: resources, pending: p1 } = await useFetch('/api/resources')
  const { data: resource_blocks, pending: p2 } = await useFetch('/api/resource_blocks')
  const { data: faq_blocks, pending: p3 } = await useFetch('/api/faq_blocks')

  let email = ref('')
  let name = ref('')
  let subject = ref('')
  let message = ref('')
  let invalid = ref(false)
  let submitted = ref(false)
  let failure = ref(false)
  let success = ref(false)

  async function submit() {
    if (email.value && name.value && subject.value && message.value && email.value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
      submitted.value = true
      let url = 'https://script.google.com/macros/s/AKfycbwvK1-oqZhkLzr1wUp5r54OxmNHirVFcKrXOn_4mPK-kBsh5T5bBCxolTgOdPZkp26T/exec'
      let res = await $fetch(`${url.value}?name=${name.value}&subject=${subject.value}&replyto=${email.value}&message=${message.value}`)
      if (res === 'success') {
        success.value = true
      } else {
        failure.value = true
      }
    } else {
      invalid.value = true
    }
  }

  if (typeof window.scrollTo === 'function') {
    window.scrollTo(0, 0)
  }
</script>

<!-- page -->
<template>

  <div v-if="!p1 & !p2 & !p3">

    <Head>
      <Title>{{resources.data.title}} - David C. Graeber</Title>
    </Head>

    <PageTop :heading="resources.data.title" :image="resources.data.banner"></PageTop>

    <!-- resources section -->
    <section
      class="mb-5 box-border relative w-full text-gray-700 bg-white border-0 border-gray-200 border-solid py-10 sm:py-16 md:py-22 lg:py-28">
      <!-- header -->
      <div v-if="resources.data.resources_title"
        class="px-8 sm:px-12 mx-auto md:px-8 lg:px-0 md:text-center pb-10 sm:pb-14 md:pb-18 lg:pb-24">
        <DynamicText :content="resources.data.resources_title"></DynamicText>
      </div>
      <div
        class="box-border flex flex-col items-center px-6 sm:px-8 mx-auto border-solid max-w-7xl xl:px-16 md:items-stretch md:justify-center">
        <div class="z-10 grid gap-5 md:grid-cols-6 lg:grid-cols-9">
          <!-- Feature 1 -->
          <div v-for="block of resource_blocks.data" class="col-span-3 text-gray-700 bg-gray-100 rounded">
            <div
              class="box-border flex flex-col items-start h-full px-2 py-8 mx-4 text-center border-solid sm:flex-row sm:items-start sm:text-left">
              <div class="text-gray-700 border border-gray-200 rounded-full" style="padding: 0.8rem; padding-bottom: 0.4rem;">
                <span class="material-symbols-outlined">
                  {{ block.icon }}
                </span>
              </div>
              <div class="my-4 text-left text-gray-700 border-0 border-gray-200 sm:my-2 sm:ml-4">
                <DynamicText :content="block.content" theme="theme-sans"></DynamicText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="relative w-full py-10 sm:py-18 md:py-26 lg:py-32 bg-gray-800 mb-5">
      <div class="max-w-6xl px-8 sm:px-12 mx-auto">
        <h3 class="mt-1 mb-10 text-3xl font-bold text-left text-gray-100 sm:text-4xl md:text-5xl serif">Frequently Asked Questions</h3>

        <div v-for="block of faq_blocks.data"
          class="flex flex-col w-full py-6 mx-auto mt-4 sm:mt-10 border-t border-gray-700 md:grid md:grid-flow-col sm:py-8">
          <h3 class="mb-2 mr-10 text-lg font-medium text-gray-200 md:mb-0 sm:text-xl md:text-lg w-72">{{ block.question }}</h3>
          <p class="text-base text-gray-400 sm:text-lg md:text-normal">{{ block.answer }}</p>
        </div>
      </div>
    </section>

    <!-- contact form -->
    <div class="bg-white py-5 sm:py-16 md:py-24 lg:py-28">
      <div class="px-6 sm:px-10 mx-auto max-w-7xl md:px-16 mb-10">
        <div class="max-w-3xl mx-auto mb-10 md:mb-16">
          <DynamicText :content="resources.data.contact_title"></DynamicText>
        </div>
        <section class="grid max-w-3xl gap-4 mx-auto" v-if="!submitted">
          <div>
            <label for="name" class="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Name</label>
            <input name="name" v-model="name"
              class="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300">
          </div>

          <div>
            <label for="email" class="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Email</label>
            <input name="email" v-model="email"
              class="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300">
          </div>

          <div>
            <label for="subject" class="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Subject</label>
            <input name="subject" v-model="subject"
              class="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300">
          </div>

          <div>
            <label for="message" class="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Message</label>
            <textarea name="message" v-model="message"
              class="w-full h-64 px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300"></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button @click="submit()"
              class="inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-blue-600 rounded-md outline-none hover:bg-blue-500 active:bg-blue-700 ring-blue-300 md:text-base">
              Send Message
            </button>
          </div>
          <DynamicText v-if="invalid">
            <p class="text-blue-600">One or more fields are empty or invalid.</p>
          </DynamicText>
        </section>
        <p v-else class="max-w-3xl mx-auto mt-5 text-xs text-gray-400">
          <DynamicText>
            <p v-if="success" class="text-green-600">Success!</p>
            <p v-else-if="failure" class="text-red-600">Oh no! Message failed.</p>
            <p v-else class="text-blue-600">Submitting...</p>
          </DynamicText>
        </p>
      </div>
    </div>
  </div>
</template>