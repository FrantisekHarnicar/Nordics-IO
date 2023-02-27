<script>
    import Card from "../components/card.vue"
    import { useStore } from '../stores/store'


    export default {
        data(){
            return{
                store: useStore()
            }
        },
        components: {
            Card
        },
    }
</script>

<template>
    <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        <Card v-for="meal in store.favourite" :key="meal"
        :id="meal.id"
        :image="meal.image"
        :name="meal.name"
        :ingredients="meal.ingredients"
        />
    </div>
</template>
