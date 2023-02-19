<script>
    import { useRoute } from 'vue-router'
    import axios from 'axios'
    import print from 'vue3-print-nb'

    export default{
        directives: {
        print   
        },
        data(){
            return{
                route: useRoute(),
                meal: '',
                ingredients: [],
                measure: [],
                link: '',
                favouriteMeal: JSON.parse(localStorage.getItem("favourite")),
                cart: JSON.parse(localStorage.getItem("cart")),
                isMealFavourite: false
                //text: ''
            }
        },
        beforeMount(){
            console.log(this.route.params)
            axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.route.params.id)
            .then(
                response => {
                    console.log(response.data.meals)
                    this.meal = response.data.meals[0]
                    this.ingredients = this.ingredientArray("strIngredient", response.data.meals[0])
                    this.measure = this.ingredientArray("strMeasure", response.data.meals[0])
                    this.link = this.repairLink(response.data.meals[0].strYoutube)
                }
                )
            .catch(error => console.log(error))

            let index = this.favouriteMeal.findIndex(item => item.id === this.route.params.id)
            if(index === -1){
                this.isMealFavourite = false
            }else{
                this.isMealFavourite = true
            }
        },
        methods: {
            ingredientArray(type, res){
                let data = []
                for(let counter = 1; res[`${type}${counter}`] !== "" && res[`${type}${counter}`] !== " " && res[`${type}${counter}`] !== null && counter < 54; counter++){
                    data.push(res[`${type}${counter}`])
                }
                return data
            },
            repairLink(link){
                return link.replace("watch?v=","embed/")
            },
            /*addBRToText(text){
                return text.replace("\r\n\r\n","")
            }*/
            addFavourite(){
                if(this.favouriteMeal === null){
                    this.favouriteMeal = []
                }
                const favourite = 
                    {
                        id: this.meal.idMeal,
                        name: this.meal.strMeal,
                        image: this.meal.strMealThumb,
                        ingredients: this.ingredients
                    }
                this.favouriteMeal.push(favourite)
                localStorage.setItem("favourite", JSON.stringify(this.favouriteMeal));
                this.isMealFavourite = true
            },
            deleteFromLocalstorage(key, data){
                let index = data.findIndex(item => item.id === this.meal.idMeal)
                if(index === -1)return
                data.splice(index,1)
                localStorage.setItem(key, JSON.stringify(data));
                if(key === "favourite"){
                    this.isMealFavourite = false
                }
            },
            addToCart(){
                if(this.cart === null){
                    this.cart = []
                }
                const cartToAdd = 
                    {
                        id: this.meal.idMeal,
                        name: this.meal.strMeal,
                        ingredients: this.ingredients
                    }
                this.cart.push(cartToAdd)
                localStorage.setItem("cart", JSON.stringify(this.cart));
            }
        },
        
        
    }
</script>

<template>
    <div class="mx-auto max-w-7xl bg-gray-50 rounded-2xl p-2">
        <h1 class=" px-6 text-5xl leading-normal mt-0 mb-2 text-stone-800 flex justify-center items-center">
            {{meal.strMeal}}
        </h1>
        
        <div class="meal-img-ingredient">
            <div class="buttons-box-meal">
    
                    <div v-if="!isMealFavourite">
                        <button @click="addFavourite">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            
                        </button>
                    </div>
                    <div v-if="isMealFavourite">
                        <button @click="deleteFromLocalstorage('favourite', this.favouriteMeal)">
                            <svg class="w-8 h-8 " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                    </div>
                <button v-print>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button @click="addToCart">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                </button>
                <!--<button @click="deleteFromLocalstorage('cart', this.cart)">Delete form cart</button>-->
            </div>
            <div class="position-img-meal flex justify-center items-center">
                <img class="img-meal rounded-lg" :src=meal.strMealThumb :alt=meal.strMeal />
            </div>
            <div class="ingredient-meal">
                <h4 class="text-3xl leading-normal mt-0 mb-2 text-zinc-800 flex justify-center items-center">
                    Ingredients
                </h4>
                <div class="ingredient-ul-meal">
                    <div class="ul-row-meal">
                        <ul v-for="item in ingredients" class="item-ul-meal">
                            <li><b>{{ item }}</b></li>
                        </ul>
                    </div>
                    <div class="ul-row-meal">
                        <ul v-for="item in measure" class="item-ul-meal">
                            <li>{{ item }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="text-4xl leading-normal mt-0 mb-2 text-stone-800 flex justify-center items-center">
            Instruction
        </h3>
        <div class="text-meal">
            {{ meal.strInstructions }}
        </div>
        <div class="video-meal " >
            <iframe width="60%" height="345" :src=link>
            </iframe>
        </div>
    </div>
</template>