<script>
import print from 'vue3-print-nb'

export default {
  data(){
    return{
        cart: JSON.parse(localStorage.getItem("cart"))
    }
  },
  methods:{
    deleteIngredients(inFood, index){
        console.log(this.cart[inFood].ingredients)
        this.cart[inFood].ingredients.splice(index,1)
        localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    deleteItem(index){
        this.cart.splice(index,1)
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  },
  directives: {
        print
    }

}
</script>


<template>
    <div>
        <div v-for="(food, inFood) in cart" :key="food">
            <div class="flex items-center justify-between">
                <h2 class="text-3xl leading-normal mt-0 mb-2 text-zinc-800">{{ food.name }}</h2>
                <button @click="deleteItem(inFood)" class="flex-no-shrink bg-red-500 px-3 ml-4 py-1 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Delete meal</button>
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
                            <button @click="deleteIngredients(inFood, index)" class="flex-no-shrink bg-red-500 px-3 ml-4 py-1 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                                Delete
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