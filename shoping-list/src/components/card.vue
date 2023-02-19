<script setup>
    import { useRouter } from 'vue-router';
    defineProps({
        id: String,
        image: String,
        name: String,
        ingredients: {}
    })
    const router = useRouter()
</script>

<template>
    <div  @click="router.push(`/meal/${id}`)" class="rounded border md:shadow w-full md:w-64 overflow-hidden">
        <div>
            <img :src="image" :alt="name" />
        </div>
        <div class="px-4 py-4">
            <h3 class="font-semibold text-gray-900 mb-2 truncate">
            {{ name }}
            </h3>

            <div v-for="item in ingredients"  class="text-sm text-gray-800">
                {{ item }}
            </div>

            <div class="text-right mt-2">
            <a href="#" class="py-2 text-indigo-600 text-xs uppercase hover:underline">Read More <span>&rarr;</span></a>
            </div>
        </div>
    </div>
</template>