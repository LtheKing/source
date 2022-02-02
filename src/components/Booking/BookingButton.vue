<template>
    <section>
        <b-field>
            <button class="button btn-Edit" :style="{background: color}" @click="$emit('show-edit-form')">
                {{ text }}
            </button>

            <b-button class="button btn-Delete" type="is-danger" @click="$emit('cancel-booking')">
                Cancel
            </b-button>

            <button class="button btn-Approve" :style="{background: colorApprove}" @click="$emit('approve-booking')">
                {{textApprove}}
            </button>

        </b-field>    
    </section>    
</template>

<script>
    export default {
        name: 'BookingButton',
        props: {
            color: String,
            colorApprove: String,
            text: String,
            textApprove: String
        }
    }
</script>

<style scoped>
    .btn-Edit{
        margin-left: 0.5cm;
        margin-right: 0.5cm;
    }

    .btn-Approve {
        margin-left: 0.5cm;
    }
</style>