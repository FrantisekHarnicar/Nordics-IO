<script>
import axios from 'axios'
import Card from "../components/card.vue"

export default {
    data(){
        return{
            searchInput: '',
            meals: '',
            ingredients: [],
            alfabet: ["A","B","C","D","E","F","G","H","I","J","K","L","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        }
    },
    beforeMount(){
        this.findByLetter("a")
    },
    methods: {
        ingredientArray(){
            if(this.meals == null) return
            this.ingredients = this.meals.map((items) =>{
                let data = []
                for(let counter = 1; 
                items[`strIngredient${counter}`] !== "" &&
                items[`strIngredient${counter}`] !== " " &&
                items[`strIngredient${counter}`] !== null &&
                counter < 54; counter++){
                    data.push(items[`strIngredient${counter}`])
                }
                return data
            })
        },
        submit(){
            axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.searchInput)
            .then(
                response => {
                    this.meals = response.data.meals
                    this.ingredientArray()
                }
                )
            .catch(error => console.log(error))
        },
        findByLetter(letter){
            axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=' + letter.toLowerCase())
            .then(
                response => {
                    this.meals = response.data.meals
                    this.ingredientArray()
                }
                )
            .catch(error => console.log(error))
        }
    },
    components:{
        Card
    },
    

}


</script>


<template>
    <div>
        <!--Search bar-->
        <div class="flex items-center mx-auto max-w-3xl sm:px-6 lg:px-8 m-5">
            <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="search" v-model="searchInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search some food" required>
            </div>
            <button @click="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-gray-700 rounded-r-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </div>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-800 p-3 rounded-lg flex m-4 overflow-auto">
            <div v-for="letter in alfabet" >
                <button class="focus:ring focus:ring-gray-300 hover:text-white px-2 mx-1 hover:bg-gray-700 text-gray-300 text-lg font-medium rounded-md"
                    @click="findByLetter(letter)">{{ letter }}
                </button>
            </div>
        </div>
        <!--Cards-->
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
            <div v-for="(meal, index) in meals" :key="meal">
                <Card
                :id="meal.idMeal"
                :image="meal.strMealThumb"
                :name="meal.strMeal"
                :ingredients="ingredients[index]"
                />
            </div>
        </div>
        <div v-if="meals === null" class="text-center ">
            <h2 class="antialiased text-xl font-bold text-gray-700 mb-3 truncate">
                No food found
            </h2>
        </div>
    </div>
</template>