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
                link: ''
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
                    console.log(this.ingredients)
                    console.log(this.measure)

                }
                )
            .catch(error => console.log(error))
        },
        methods: {
            ingredientArray(type, res){
                let data = []
                for(let counter = 1; res[`${type}${counter}`] !== ""; counter++){
                    data.push(res[`${type}${counter}`])
                }
                return data
            },
            repairLink(link){
                return link.replace("watch?v=","embed/")
            }
        },
        
    }
</script>

<template>
    <div class="container-meal">
        <h1 class="text-6xl leading-normal mt-0 mb-2 text-stone-800 flex justify-center items-center">
            {{meal.strMeal}}
        </h1>
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
                            <li>{{ item }}</li>
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
        <div class="video-meal">
            <iframe width="620" height="345" :src=link>
            </iframe>
        </div>
    </div>
</template>