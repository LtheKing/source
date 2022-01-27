<template>
    <b-navbar>
        <template #start>
            <b-navbar-item href="#" @click="$emit('showMovie')">
                Movie
            </b-navbar-item>

            <b-navbar-item href="#" @click="$emit('showTheater')">
                Theater
            </b-navbar-item>

            <b-navbar-item href="#" @click="$emit('showBooking')">
                Booking
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        test() {
            console.log('nav button clicked')
        }
    },
    emits:['showMovie', 'showTheater', 'showBooking']
}
</script>