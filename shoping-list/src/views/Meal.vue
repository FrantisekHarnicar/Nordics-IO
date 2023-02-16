<script>
    import { useRoute } from 'vue-router';
    import {ref, onBeforeMount} from 'vue'

    const car = ref(null)
    const route = useRoute()
    const {id} = route.params

    onBeforeMount(() => {
        // porovnanie id
    })
</script>

<template>

</template>