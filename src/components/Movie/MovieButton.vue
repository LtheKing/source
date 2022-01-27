<template>
    <div class="container">
        <b-field>
            <button class="button btn-Edit" :style="{background: color}" @click="openEditForm">
                {{ text }}
            </button>

            <b-button class="button btn-Delete" type="is-danger" @click="$emit('delete-movie')">
                Delete
            </b-button>

        </b-field>
    </div>
</template>

<script>

    export default {
        name: 'MovieButton',
        props: {
            color: String,
            text: String,
        },
        methods: {
            openEditForm() {
                this.$emit('show-edit-form')
            },
        }
    }

</script>

<style scoped>
    .container {
        margin-top: 1cm;
        margin-bottom: 1cm;
    }

    .btn-Edit {
        margin-right:0.5cm;
        margin-left:0.5cm;
    }

    .btn-Delete {
        margin-right: 28cm;
    }
</style>