<script>
    import { useRoute } from 'vue-router'
    import { useStore } from '../stores/store'
    import axios from 'axios'
    import print from 'vue3-print-nb'
    import HeartIcon from '../components/heartIcon.vue'
    import CartIcon from '../components/cartIcon.vue'
    
    export default{
        directives: {
        print
        },
        data(){
            return{
                windowWidth: window.innerWidth,
                route: useRoute(),
                meal: '',
                ingredients: [],
                measure: [],
                link: '',
                favouriteMeal: JSON.parse(localStorage.getItem("favourite")),
                isMealFavourite: false,
                store: useStore(),
                isMealOnCart: false
            }
        },
        beforeMount(){
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
            this.isMealFavourite = this.findAndSet(this.favouriteMeal)
            this.isMealOnCart = this.findAndSet(this.store.cart)
        },
        mounted() {
            this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
        },
        methods: {
            onResize() {
            this.windowWidth = window.innerWidth
            },
            findAndSet(data){
                let index = data.findIndex(item => item.id === this.route.params.id)
                if(index === -1)return false
                return true
            },
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
            addFavourite(){
                this.store.addFavourite(
                    this.meal.idMeal,
                    this.meal.strMeal,
                    this.meal.strMealThumb,
                    this.ingredients
                    )
                this.isMealFavourite = true
            },
            deleteFromFavourite(){
                this.store.deleteFromFavourite(this.meal.idMeal)
                this.isMealFavourite = false
            },
            addToCart(){
                this.store.addToCart(this.meal.idMeal, this.meal.strMeal, this.ingredients)
                this.isMealOnCart = true
            },
            deleteFromCart(){
                this.store.deleteFromCart(this.meal.idMeal)
                this.isMealOnCart = false
            }
        },
        components:{
            HeartIcon,
            CartIcon
        }
    }
</script>

<template>
    <div class="bg-white">
        <!--Mobile version-->
        <div v-if="windowWidth < 1360" class="flex justify-center bg-gray-800">
            <div class="bg-gray-800 p-2 border-2 border-gray-800 hover:border-white">
                <HeartIcon 
                    :isMealFavourite="isMealFavourite" 
                    @addFavourite="addFavourite"
                    @deleteFromFavourite="deleteFromFavourite"
                />
            </div>
            <button v-print  class="bg-gray-800 p-2 border-2 border-gray-800 hover:border-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " fill="white" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z" clip-rule="evenodd" />
                </svg>
            </button>
            <div class="bg-gray-800 p-2 border-2 border-gray-800 hover:border-white">
                <CartIcon
                    :isMealOnCart="isMealOnCart"
                    @addToCart="addToCart"
                    @deleteFromCart="deleteFromCart"
                />
            </div>
        </div>
        <h1 class=" px-6 text-5xl leading-normal pt-2 mb-2 text-stone-800 text-center font-semibold">
            {{meal.strMeal}}
        </h1>
        <div class="meal-img-ingredient">
            <!--Desktop version-->
            <div v-if="windowWidth >= 1360" class="buttons-box-meal">
                <div class="bg-gray-800 p-2 border-2 border-gray-800 hover:border-white">
                    <HeartIcon 
                        :isMealFavourite="isMealFavourite" 
                        @addFavourite="addFavourite"
                        @deleteFromFavourite="deleteFromFavourite"
                    />
                </div>
                <button v-print="'#instruction'"  class="bg-gray-800 p-2 border-2 border-gray-800 hover:border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " fill="white" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div class="bg-gray-800 p-2 border-2 border-gray-800 hover:border-white">
                    <CartIcon
                        :isMealOnCart="isMealOnCart"
                        @addToCart="addToCart"
                        @deleteFromCart="deleteFromCart"
                    />
                </div>
            </div>
            <div class="m-5">
                <img class="object-cover h-96 w-96 rounded-lg" :src=meal.strMealThumb :alt=meal.strMeal />
            </div>
            <div class="flex justify-center flex-col bg-gray-100 rounded-xl m-5  w-96 p-3">
                <h4 class="text-3xl font-semibold mt-0 mb-2 text-zinc-800 text-center">
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
        <div id="instruction">
        <h3 class="text-4xl mt-0 mb-2 text-stone-800 text-center font-semibold" >
            Instruction
        </h3>
        <div class="text-meal text-gray-500" >
            {{ meal.strInstructions }}
        </div>
        </div>
        <div v-if="link !== null"  >
            <iframe  class="aspect-video aspect-[16/9] text-meal" :src=link>
            </iframe>
        </div>
    </div>
</template>