<template>
  <div id="app">
    <Header id="app_header"
        @showMovie="manageComp('movie')"
        @showTheater="manageComp('theater')"
        @showBooking="manageComp('booking')"
    />
    
    <MovieHome v-show="movieHomeShow"/>
    <TheaterHome v-show="theaterHomeshow" />
    <BookingHome v-show="bookingHomeShow" />
  </div>
</template>

<script>
import MovieHome from './components/Movie/MovieHome.vue'
import TheaterHome from './components/Theater/TheaterHome.vue'
import BookingHome from './components/Booking/BookingHome.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  data()  {
    return {
      movieHomeShow: false,
      theaterHomeshow: false,
      bookingHomeShow: false
    }
  },
  components: {
    MovieHome,
    BookingHome,
    TheaterHome,
    Header
  },
  methods: {
    manageComp(comp) {
      switch(comp) {
        case 'movie':
            this.movieHomeShow = true
            this.theaterHomeshow = false
            this.bookingHomeshow = false
          break
        
        case 'theater':
            this.theaterHomeshow = true
            this.movieHomeShow = false
            this.bookingHomeShow = false
          break

        case 'booking':
            this.bookingHomeShow = true
            this.theaterHomeshow = false
            this.movieHomeShow = false
          break 

        default:
            
          break
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

#app_header {
  margin-left: 1cm
}
</style>
