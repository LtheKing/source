<template>
    <section class="container">
        <div v-show="showEditForm">
            <BookingEdit :bookingData="this.selected"/>
        </div>

        <h1>Booking List</h1>    
        <BookingButton  
            @show-edit-form="toggleEditForm"
            @cancel-booking="cancelBooking"
            :color="showEditForm ? 'white' : 'yellow'"
            :text="showEditForm ? 'Close' : 'Edit  / Add'"
        />
        <b-field>
            <b-button label="Clear selected"
                type="is-danger is-light"
                icon-left="close"
                :disabled="!selected"
                @click="selected = null"/>
        </b-field>

        <b-table
            :data="data"
            :columns="columns"
            :selected.sync="selected"
            focusable>
        </b-table>
    </section>
</template>

<script>
const localhost = 'https://localhost:44370/api/ticket/'
const bookingUrl= 'https://localhost:44370/api/Booking/'

import BookingButton from './BookingButton.vue'
import BookingEdit from './BookingEdit.vue'

export default {
    name: 'BookingHome',
    components: {
        BookingButton,
        BookingEdit
    },
    data() {
            const data = []
            return {
                data,
                showEditForm: false,
                selected: data[1],
                columns: [
                    {
                        field: 'ticketCode',
                        label: 'Ticket Code',
                        centered: true
                    },
                    {
                        field: 'movieCode',
                        label: 'Movie Code',
                        centered: true
                    },
                    {
                        field: 'movieTitle',
                        label: 'Movie Title',
                        centered: true
                    },
                    {
                        field: 'theaterNumber',
                        label: 'Theater Number',
                        centered: true
                    },
                    {
                        field: 'seat',
                        label: 'Seat',
                        centered: true
                    },
                    {
                        field: 'status',
                        label: 'Status',
                        centered: true
                    },
                ]
            }
        },
    methods: {
        async getData() {
            const res = await fetch(localhost + 'GetAll', {method: 'POST'})
            const data = await res.json()
            return data.data
        },
        toggleEditForm() {
            this.showEditForm = !this.showEditForm
        },
        async cancelBooking() {
            if (this.selected === undefined || this.selected == null) {
                alert('Please Select Data First !')
                return
            }

            const obj = {
                TicketCode: this.selected.ticketCode
            }

            const res = await fetch(bookingUrl + 'Cancel', {
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
    async created() {
        this.data = await this.getData()
    }
}
</script>
