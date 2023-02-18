<script>
import {useRouter} from "vue-router"
import axios from 'axios'
import {ref} from "vue"
import Card from "../components/card.vue"


export default {
    data(){
        return{
            searchInput: '',
            meals: '',
            idMeal: '',
            nameMeal: '',
            instruction: '',
            measure: '',
            image: '',
            video: '',
            ingredients: [],
        }
    },
  methods: {
    ingredientArray: function(){
        this.ingredients = this.meals.map((items) =>{
            let data = []
            for(let counter = 1; items[`strIngredient${counter}`] !== ""; counter++){
                data.push(items[`strIngredient${counter}`])
            }
            return data
        })
        //console.log(this.meals)
    },
    submit(){
        console.log(this.searchInput)
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.searchInput)
        .then(
            response => {
                console.log(response.data.meals)
                this.meals = response.data.meals
                this.ingredientArray()
                console.log(this.ingredients)

            }
            )
        .catch(error => console.log(error))
    },

  },
  components:{
    Card
  },

}


</script>

<template>
    <div>
        <!--Search bar-->
        <div class="flex items-center">
            <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="search" v-model="searchInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search some food" required>
            </div>
            <button @click="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-gray-700 rounded-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </div>
        <!--Cards-->
        <div class="cards">
            <div v-for="(meal, index) in meals" :key="meal">
                <Card 
                :id="meal.idMeal"
                :image="meal.strMealThumb"
                :name="meal.strMeal"
                :ingredients="ingredients[index]"
                />
            </div>
        </div>
    </div>
</template>