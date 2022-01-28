<template>
    <form @submit="onSubmit" class="add-form has-text-left">
        <section>
            <b-field vertical label="Ticket Code">
                <b-input name="ticketCode" v-model="ticketCode" class="booking-input"></b-input>
            </b-field>

            <b-field vertical label="Theater Number">
                <b-input name="theaterNumber" v-model="theaterNumber" class="booking-input"></b-input>
            </b-field>

            <b-field vertical label="Status">
                <b-input name="status" v-model="status" class="booking-input"></b-input>
            </b-field>

            <input type="submit" class="button" style="background-color: #90EE90; color: white;" value="Submit" />
        </section>
    </form>
</template>

<script>
export default {
    name: 'BookingApprove',
    data() {
        return {
            ticketCode: '',
            theaterNumber: '',
            status: ''
        }
    }
}
</script>