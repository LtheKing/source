<template>
    <form @submit="onSubmit" class="add-form has-text-left">
        <section>
                <b-field vertical label="Theater Number">
                    <b-input name="theaterNumber" v-model="theaterNumber" class="theater-input"></b-input>
                </b-field>

                <b-field vertical label="Status">
                    <b-input name="status" v-model="status" class="theater-input"></b-input>
                </b-field>

                <input type="submit" class="button" style="background-color: #90EE90; color: white;" value="Submit" />
        </section>
    </form>
</template>

<script>
const localhost = 'https://localhost:5001/api/Theater'
export default {
    name : 'TheaterEdit',
    props: {
        movieData: Object
    },
    data() {
        return {
            theaterNumber : '',
            status: '',
            edit: false
        }
    },
    methods : {
        onSubmit(e) {
            e.preventDefault()

            if (!this.theaterNumber || !this.status) {
                alert('please fill the blank field')
                return
            }

            const newMovie = {
                TheaterNumber : parseInt(this.theaterNumber),
                Status : this.status,
            }

            if (this.edit) {
                this.editTheater(newMovie)
            } else {
                this.addTheater(newMovie)
            }
        },
        async addTheater(obj) {
            const res = await fetch(localhost + '/' + 'Create', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(obj)
            })
            
            const data = await res.json()
            location.reload()
        },
        async editTheater(obj) {
            const res = await fetch(localhost + '/' + 'Update', {
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
        movieData: function(val, oldVal) {
            if (val === undefined || val == null) {
                this.theaterNumber = ''
                this.status = ''
                this.edit = false
                return
            } else {
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
  margin-left: 13cm;
  margin-right: 1cm;
}

.theater-input {
    width: 50%;
}
</style>