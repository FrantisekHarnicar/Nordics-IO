<script>
import print from 'vue3-print-nb'
import { useStore } from '../stores/store'


export default {
  data(){
    return{
        /*cart: JSON.parse(localStorage.getItem("cart")),*/
        cartStore: useStore()
    }
  },
  directives: {
        print
    }

}
</script>



<template>
    <div>
        <div v-for="(food, inFood) in cartStore.cart" :key="food">
            <div class="flex items-center justify-between">
                <h2 class="text-3xl leading-normal mt-0 mb-2 text-zinc-800">{{ food.name }}</h2>
                <button @click="cartStore.deleteItem(inFood)" class="flex-no-shrink bg-red-500 px-3 ml-4 py-1 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Delete meal</button>
            </div>
            <div class="bg-white shadow-md hover:shodow-lg rounded-2xl meal-ingredients-cart xl:columns-5 lg:columns-4 md:columns-3 sm:columns-2 columns-1 gap-8 ">
                <div v-for="(item, index) in food.ingredients" :key="item">
                    <div class="p-3 bg-white shadow-md hover:shodow-lg rounded-2xl mb-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex flex-col ml-3">
                                    <div class="font-medium leading-none">{{ item }}</div>
                                </div>
                            </div>
                            <button @click="cartStore.deleteIngredients(inFood, index)" class="flex-no-shrink bg-red-500 px-3 ml-4 py-1 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div>
            <button class="flex-no-shrink bg-blue-500 px-4 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full m-5" v-print>Print shoping list</button>
        </div>
    </div>
</template>