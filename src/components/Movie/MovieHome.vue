<template>
  <div class="container">
    <MovieIndex ref="movieIndex"/>

    <div class="pagenumbers" id="pagination"></div>
  </div>
</template>

<script>
const pagination_element = document.getElementById("pagination");

import MovieIndex from "./MovieIndex.vue";
export default {
  name: "MovieHome",
  components: {
    MovieIndex,
  },
  props: {
    title: String,
  },
  data() {
    return {
      showEditForm: false,
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
</style>