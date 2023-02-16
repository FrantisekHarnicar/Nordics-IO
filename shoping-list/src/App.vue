<!--<script setup>
  import {RouterView, RouterLink} from "vue-router"
  import {ref} from "vue"
</script>

<template>
  <main class="container">
    <div class="nav-bar">
        <RouterLink active-class="active" to="/">Search</RouterLink>
        <RouterLink active-class="active" to="/cart">Cart</RouterLink>
        <RouterLink active-class="active" to="/favourite">Favourite</RouterLink>
    </div>
    <div>
      <RouterView />
    </div>
    
  </main>
</template>

-->

<script setup>
import {RouterView, RouterLink} from "vue-router"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon,  XMarkIcon } from '@heroicons/vue/24/outline'

</script>

<template>
  <main>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden" src="./assets/icon-food.png" alt="Food-List" />
            <img class="hidden h-8 w-auto lg:block" src="./assets/icon-food.png" alt="Food-List" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white, px-3 py-2 rounded-md text-sm font-medium" to="/">Search</RouterLink>
              <RouterLink active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white, px-3 py-2 rounded-md text-sm font-medium" to="/cart">Cart</RouterLink>
              <RouterLink active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white, px-3 py-2 rounded-md text-sm font-medium" to="/favourite">Favourite</RouterLink>
          </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton >
          <RouterLink active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white, block px-3 py-2 rounded-md text-base font-medium" to="/">Search</RouterLink>
          <RouterLink active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white, block px-3 py-2 rounded-md text-base font-medium" to="/cart">Cart</RouterLink>
          <RouterLink active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white, block px-3 py-2 rounded-md text-base font-medium" to="/favourite">Favourite</RouterLink>
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <div>
    <RouterView class="view-body"/>
  </div>
</main>
</template>

