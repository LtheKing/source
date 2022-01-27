<template>
    <div class="container">
        <MovieIndex />
    </div>
</template>

<script>
import MovieIndex from './MovieIndex.vue'

export default {
    name: 'MovieHome',
    components: {
        MovieIndex
    },
    props: {
        title: String,
    },    
    data() {
        return{
            showEditForm: false,
        }
    },
    methods: {
        addOrEditMovie(obj) {
            console.log(obj)
        }
    }
}

</script>

<style scoped>
   
</style>