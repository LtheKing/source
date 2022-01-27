<template>
    <div class="container">
        <h1>{{ title }}</h1>
        
        <div v-show="showEditForm">
            <MovieEdit :movieData="this.selected" />
        </div>

        <MovieButton @show-edit-form="toggleEditForm"
                     @delete-movie="deleteMovie"
                     :selected="this.selected"
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
    </div>
</template>

<script>
const movieService = 'https://localhost:5001/api/Movie/'
import MovieButton from './MovieButton.vue'
import MovieEdit from './MovieEdit.vue'

export default {
    name: 'MovieIndex',
    components :{
        MovieButton,
        MovieEdit
    },
    props: {
        title: String,
        dataMovie: Object
    },
    data() {
            const data = []
            return {
                data,
                showEditForm: false,
                selected: data[1],
                columns: [
                    {
                        field: 'title',
                        label: 'Movie Title',
                        centered: true
                    },
                    {
                        field: 'author',
                        label: 'Author',
                        centered: true
                    },
                    {
                        field: 'movieCode',
                        label: 'Movie Code',
                        centered: true
                    }
                ]
            }
        },
    methods: {
        async getData() {
            const res = await fetch(movieService + 'GetAll', {method: 'POST'})
            const data = await res.json()
            return data.data
        },
        toggleEditForm() {
            this.showEditForm = !this.showEditForm
        },
        async deleteMovie() {
            if (this.selected === undefined || this.selected == null) {
                alert('Please Select Data First !')
                return
            }

            const obj = {
                MovieCode: this.selected.movieCode
            }

            const res = await fetch(movieService + 'Delete', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(obj)
            })

            const data = await res.json()
            console.log(data);
            location.reload()
        }
    },
    async created() {
        this.data = await this.getData()
        this.$emit('get-data-movie', this.data);
    }
}

</script>

<style scoped>
    .btnTable {
        font: bold 11px Arial;
        text-decoration: none;
        background-color: #EEEEEE;
        color: #333333;
        padding: 2px 6px 2px 6px;
        border-top: 1px solid #CCCCCC;
        border-right: 1px solid #333333;
        border-bottom: 1px solid #333333;
        border-left: 1px solid #CCCCCC;
    }
</style>