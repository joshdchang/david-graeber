<!-- get data from Directus -->
<script setup>

  const { home, content_blocks } = await useNuxtApp().$api(['home', 'content_blocks'])

  let email = ref('')
  let invalid = ref(false)
  let submitted = ref(false)
  let failure = ref(false)
  let success = ref(false)

  async function submit() {
    if (email.value && email.value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
      submitted.value = true
      let res = await $fetch('https://script.google.com/macros/s/AKfycbxRJF0mP17mPbk-fWRQKa4KYsUaiyTsDEAwC3wNzpYezvO0zDx6nCFt8wLKGtSvLYfG/exec?email=' + email.value)
      if (res === 'success') {
        success.value = true
      } else {
        failure.value = true
      }
    } else {
      invalid.value = true
    }
  }

  useNuxtApp().$scrollTop()
</script>

<!-- component -->
<template>
  <div>

    <Head>
      <Title>David C. Graeber</Title>
    </Head>

    <div>
      <!-- banner -->
      <section class="h-screen main"
        :style="{ backgroundImage: 'url(' + $directus + '/assets/' + home.banner + ')' }">
      </section>

      <!-- overlay -->
      <div class="main-overlay absolute bottom-0 left-0 right-0 h-80"></div>

      <!-- banner text -->
      <section
        class="text-white text-center absolute bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-12 sm:left-16 md:left-20 lg:left-24 right-12 sm:right-16 md:right-20 lg:right-24">
        <p class="serif front-text text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
          {{ home.banner_text }}
        </p>
      </section>

      <!-- content -->
      <section class="w-full py-14 sm:py-20 md:py-26 lg:py-32 bg-gray-100">
        <div class="px-6 sm:px-10 mx-auto max-w-7xl">

          <!-- header -->
          <div class="px-2 sm:px-4 md:px-8 lg:px-0 lg:text-center pb-14 sm:pb-20 md:pb-26 lg:pb-32">
            <DynamicText :content="home.content_title" theme="theme-mixed"></DynamicText>
          </div>

          <!-- content blocks -->
          <div class="grid overflow-hidden rounded lg:rounded-xl content-block-container">
            <div v-for="(block, index) in content_blocks" class="grid items-center lg:grid-cols-2">
              <template v-if="index % 2 === 0">
                <div
                  class="flex flex-col items-start justify-center h-full py-10 pl-10 pr-10 sm:py-14 sm:pl-14 sm:pr-14 md:py-16 md:pl-16 md:pr-16 bg-white">
                  <DynamicText :content="block.content"></DynamicText>
                </div>
                <div class="overflow-hidden">
                  <TheImage :asset="block.image" class="object-cover w-full" alt="" />
                </div>
              </template>
              <template v-if="index % 2 === 1">
                <div class="order-last overflow-hidden lg:order-first">
                  <TheImage :asset="block.image" class="object-cover w-full" alt="" />
                </div>
                <div
                  class="flex flex-col items-start justify-center h-full py-10 pl-10 pr-10 sm:py-14 sm:pl-14 sm:pr-14 md:py-16 md:pl-16 md:pr-16 bg-white">
                  <DynamicText :content="block.content"></DynamicText>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>

      <!-- newsletter -->
      <section v-if="home.enable_newsletter" class="py-12 sm:py-20 md:py-30 lg:py-36 bg-white mb-5">
        <div class="max-w-3xl px-10 mx-auto xl:px-5">
          <div class="flex flex-col justify-center space-y-8">
            <DynamicText :content="home.newsletter_title"></DynamicText>
            <div v-if="!submitted" class="flex flex-col w-full mx-auto space-y-5 md:space-y-0 md:space-x-5 md:flex-row">
              <input
                v-model="email"
                type="text"
                class="sans-serif flex-1 w-full px-5 py-3 sm:py-5 text-lg sm:text-xl md:text-2xl bg-gray-200 border border-gray-300 rounded-lg focus:ring-4 focus:border-blue-600 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none"
                placeholder="Email Address">
              <button @click="submit()"
                class="button uppercase sans-serif flex-shrink-0 px-10 py-3 sm:py-5 text-lg sm:text-xl md:text-2xl font-medium text-center text-white bg-blue-600 hover:bg-blue-500 rounded-lg outline-none active:bg-blue-700 ring-blue-300 transition duration-100">
                Sign Up
              </button>
            </div>
            <div v-else>
              <DynamicText>
                <p v-if="success" class="text-green-600">Success!</p>
                <p v-else-if="failure" class="text-red-600">Oh no! Sign up failed.</p>
                <p v-else class="text-blue-600">Submitting...</p>
              </DynamicText>
            </div>
            <DynamicText v-if="invalid">
              <p class="text-blue-600">Please enter a valid email address.</p>
            </DynamicText>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<!-- non-Tailwind css -->
<style scoped>
  .main {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(0.8);
  }

  .main-overlay {
    background-image: linear-gradient(rgba(29, 28, 35, 0), rgba(19, 21, 45, 0.462));
    height: 38vh;
  }

  .front-text {
    line-height: 1.4;
  }

  .button {
    letter-spacing: 0.12rem;
  }
  .content-block-container {
    @apply bg-gray-200;
  }
</style>