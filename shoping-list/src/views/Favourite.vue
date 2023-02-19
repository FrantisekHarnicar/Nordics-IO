<script>
    import Card from "../components/card.vue"

    export default {
        data(){
            return{
                favourite: JSON.parse(localStorage.getItem("favourite")),
            }
        },
        components: {
            Card
        }
    }
</script>

<template>
    <div class="xl:columns-4 lg:columns-3 md:columns-2 sm:columns-1 gap-4">
        <Card v-for="meal in favourite" :key="meal"
        :id="meal.id"
        :image="meal.image"
        :name="meal.name"
        :ingredients="meal.ingredients"
        />
    </div>
</template>
