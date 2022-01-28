<template>
    <section>
        <b-field>
            <button class="button btn-Edit" :style="{background: color}" @click="$emit('show-edit-form')">
                {{ text }}
            </button>

            <b-button class="button btn-Delete" type="is-danger" @click="$emit('cancel-booking')">
                Cancel
            </b-button>

            <b-button class="button btn-Approve" type="is-success" @click="$emit('approve-booking')">
                Approve
            </b-button>

        </b-field>    
    </section>    
</template>

<script>
    export default {
        name: 'BookingButton',
        props: {
            color: String,
            text: String
        }
    }
</script>

<style scoped>
    .btn-Edit{
        margin-left: 0.5cm;
        margin-right: 0.5cm;
    }
</style>