<template>
    <section class="container">

        <div v-show="showEditForm">
            <TheaterEdit :movieData="this.selected"/>
        </div>

        <h1>Theater List</h1>  
        <TheaterAddEditButton  
            @show-edit-form="toggleEditForm"
            @delete-theater="deleteTheater"
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
const localhost = 'https://localhost:5001/api/Theater/'

import TheaterAddEditButton from  './TheaterAddEditButton.vue'
import TheaterEdit from  './TheaterEdit.vue'

export default {
    name: 'TheaterHome',
    components: {
        TheaterAddEditButton,
        TheaterEdit
    },
    data(){
        const data = []
            return {
                data,
                showEditForm: false,
                selected: data[1],
                columns: [
                    {
                        field: 'theaterNumber',
                        label: 'Theater Number',
                        centered: true
                    },
                    {
                        field: 'status',
                        label: 'Status',
                        centered: true
                    }
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
        async deleteTheater() {
            if (this.selected === undefined || this.selected == null) {
                alert('Please Select Data First !')
                return
            }

            const obj = {
                TheaterNumber: this.selected.theaterNumber
            }

            const res = await fetch(localhost + 'Delete', {
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