<script>
    import { useRoute } from 'vue-router'
    import axios from 'axios'

    export default{
        setup(){
            
        },
        data(){
            return{
                route: useRoute(),
                meal: '',
                ingredients: [],
                measure: [],
                link: '',
                favouriteMeal: JSON.parse(localStorage.getItem("favourite")),
                cart: JSON.parse(localStorage.getItem("cart"))
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
                    //this.text = this.addBRToText(response.data.meals[0].strInstructions)
                    console.log(this.ingredients)
                    console.log(this.measure)

                }
                )
            .catch(error => console.log(error))
        },
        methods: {
            ingredientArray(type, res){
                let data = []
                for(let counter = 1; res[`${type}${counter}`] !== "" && res[`${type}${counter}`] !== " " && res[`${type}${counter}`] !== null; counter++){
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
                //console.log(JSON.stringify(this.favouriteMeal))
                //localStorage.clear()
                const favourite = 
                    {
                        id: this.meal.idMeal,
                        name: this.meal.strMeal,
                        image: this.meal.strMealThumb,
                        ingredients: this.ingredients
                    }
                
                this.favouriteMeal.push(favourite)
                localStorage.setItem("favourite", JSON.stringify(this.favouriteMeal));
                console.log(favourite)
                console.log(this.favouriteMeal)
            },
            deleteFromLocalstorage(key, data){
                let index = data.findIndex(item => item.id === this.meal.idMeal)
                if(index === -1)return
                data.splice(index,1)
                localStorage.setItem(key, JSON.stringify(data));
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
    <div class="container-meal">
        <h1 class="text-5xl leading-normal mt-0 mb-2 text-stone-800 flex justify-center items-center">
            {{meal.strMeal}}
        </h1>
        <button @click="addFavourite">Favourit</button>
        <button @click="deleteFromLocalstorage('favourite', this.favouriteMeal)">DeleteFavourit</button>
        <button>Print</button>
        <button @click="addToCart">Add to cart</button>
        <button @click="deleteFromLocalstorage('cart', this.cart)">Delete form cart</button>
        <div class="meal-img-ingredient">
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