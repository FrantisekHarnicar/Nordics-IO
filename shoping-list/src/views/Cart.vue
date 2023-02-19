<script>
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
    }
  }

}
</script>

<template>
    <div>
        <div>
            <div v-for="(food, inFood) in cart" :key="food">
                <h2 class="text-3xl leading-normal mt-0 mb-2 text-zinc-800">{{ food.name }}</h2>
                <div class="bg-white shadow-md hover:shodow-lg rounded-2xl meal-ingredients-cart xl:columns-5 lg:columns-4 md:columns-3 sm:columns-2 columns-1 gap-8 ">
                    <div v-for="(item, index) in food.ingredients" :key="item">
                        <div class="p-3 bg-white shadow-md hover:shodow-lg rounded-2xl mb-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <div class="flex flex-col ml-3">
                                        <div class="font-medium leading-none">{{ item }}</div>
                                    </div>
                                </div>
                                <button @click="deleteIngredients(inFood, index)" class="flex-no-shrink bg-red-500 px-3 ml-4 py-1 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Delete</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>