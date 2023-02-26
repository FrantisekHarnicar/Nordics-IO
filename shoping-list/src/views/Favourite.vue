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
    <div class="xl:columns-4 lg:columns-3 md:columns-2 sm:columns-1 gap-4">
        <Card v-for="meal in store.favourite" :key="meal"
        :id="meal.id"
        :image="meal.image"
        :name="meal.name"
        :ingredients="meal.ingredients"
        />
    </div>
</template>
