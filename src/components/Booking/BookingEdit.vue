<template>
    <form @submit="onSubmit" class="add-form has-text-left">
        <section>
            <b-field vertical label="Ticket Code">
                <b-input name="ticketCode" v-model="ticketCode" class="booking-input"></b-input>
            </b-field>

            <b-field vertical label="Movie Code">
                <b-input name="movieCode" v-model="movieCode" class="booking-input"></b-input>
            </b-field>

            <b-field vertical label="Movie Title">
                <b-input name="movietitle" v-model="movieTitle" class="booking-input"></b-input>
            </b-field>

            <b-field vertical label="Theater Number">
                <b-input name="theaterNumber" v-model="theaterNumber" class="booking-input"></b-input>
            </b-field>

            <b-field vertical label="Seat">
                <b-input name="seat" v-model="seat" class="booking-input"></b-input>
            </b-field>

            <b-field vertical label="Status">
                <b-input name="status" v-model="status" class="booking-input"></b-input>
            </b-field>

            <input v-show="!edit" type="submit" class="button" style="background-color: #90EE90; color: white;" value="Submit" />
        </section>
    </form>
</template>

<script>
const localhost = 'https://localhost:44370/api/Booking'

export default {
    name: 'BookingEdit',
    props: {
        bookingData: Object
    },
    data() {
        return {
            ticketCode : '',
            movieCode: '',
            movieTitle: '',
            theaterNumber: '',
            seat: '',
            status: '',
            approve: false,
            edit: false
        }
    },
    methods : {
        onSubmit(e) {
            e.preventDefault()

            if (!this.ticketCode || 
                !this.movieCode ||
                !this.movieTitle ||
                !this.theaterNumber ||
                !this.seat ||
                !this.status
            ) {
                alert('please fill the blank field')
                return
            }

            const newBooking = {
                TicketCode: this.ticketCode,
                MovieCode: this.movieCode,
                MovieTitle: this.movieTitle,
                TheaterNumber : parseInt(this.theaterNumber),
                Seat: this.seat,
                Status : this.status,
            }

            if (this.edit) {
                this.editBooking(newBooking)
            } else {
                
            }
        },
        async addBooking(obj) {
            const res = await fetch(localhost + '/' + 'Create', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(obj)
            })
            
            const data = await res.json()
            location.reload()
        }
    },
    watch: {
        bookingData: function(val, oldVal) {
            if (val === undefined || val == null) {
                this.ticketCode = ''
                this.movieCode = ''
                this.movieTitle = ''
                this.seat = ''
                this.theaterNumber = ''
                this.status = ''
                this.edit = false
                return
            } else {
                this.ticketCode = val.ticketCode
                this.movieCode = val.movieCode
                this.movieTitle = val.movieTitle
                this.seat = val.seat
                this.theaterNumber = val.theaterNumber
                this.status = val.status
                this.edit = true
            }
        }
    }
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
  margin-left: 0.5cm;
  margin-right: 1cm;
}

.booking-input {
    width: 50%;
}
</style>