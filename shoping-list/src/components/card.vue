<script>
    import { useStore } from '../stores/store'
    import { useRouter } from 'vue-router';
    import HeartIcon from './heartIcon.vue'
    import LoadingImage from './loadingImage.vue'

    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                store: useStore(),
                router: useRouter(),
                isMealFavourite: false,
                loading: true
            }
        },
        beforeMount(){
            if(this.store.favourite == null) return
            let index = this.store.favourite.findIndex(item => item.id === this.id)
            if(index === -1){
                this.isMealFavourite = false
            }else{
                this.isMealFavourite = true
            }
        },
        mounted() {
            this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            })
            this.loading = !this.loading
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
        },
        props: {
            id: String,
            image: String,
            name: String,
            ingredients: {}
        },
        methods: {
            onResize() {
            this.windowWidth = window.innerWidth
            },
            addFavourite(){
                this.store.addFavourite(
                    this.id,
                    this.name,
                    this.image,
                    this.ingredients
                    )
                this.isMealFavourite = true
            },
            deleteFromFavourite(){
                this.store.deleteFromFavourite(this.id)
                this.isMealFavourite = false
            },
        },
        components:{
            HeartIcon,
            LoadingImage
        }
    }
</script>

<template>
    <div class="relative">
        
        <div @click="router.push(`/meal/${id}`)"  class=" cursor-pointer rounded-lg border md:shadow w-full overflow-hidden mb-5 bg-white shadow-md hover:shadow-lg">
            <div v-if="loading">
                <LoadingImage/>
            </div>
            <div v-else>
                <div v-if="windowWidth >= 1024">
                    <div class="overflow-hidden  aspect-video bg-red-400 cursor-pointer relative group">
                        <div class="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/100 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                            <div class="transform-gpu  p-4 space-y-1 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                                <div class="font-bold">Ingredients</div>
                                <div class="opacity-90">
                                    <div class="text-sm font-semibold columns-2">
                                        <div v-for="item in ingredients">
                                            <div >
                                                {{ item }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img
                            class="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                            :src="image" :alt="name" />
                    </div>
                </div>
                <div v-if="windowWidth < 1024">
                    <img
                    :src="image" :alt="name" />
                </div>
            </div>
            <div class="px-4 py-4">
                <h3 class="antialiased text-xl font-bold text-gray-900 mb-3 truncate">
                {{ name }}
                </h3>
                <div v-if="windowWidth < 1024">
                    <div class="text-sm font-semibold text-gray-500 columns-2">
                        <div v-for="item in ingredients">
                            <div class="mr-5">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="absolute top-3 right-3">
            <HeartIcon :isMealFavourite="isMealFavourite" 
            @addFavourite="addFavourite"
            @deleteFromFavourite="deleteFromFavourite"
            />
        </div>
    </div>
</template>