<template>
    <form @submit="onSubmit" class="add-form has-text-left">
        <section>
            <b-field vertical label="Title">
                <b-input name="title" v-model="title" expanded></b-input>
            </b-field>

            <b-field vertical label="Author">
                <b-input name="author" v-model="author" expanded></b-input>
            </b-field>

            <b-field vertical label="Movie Code">
                <b-input name="movieCode" v-model="movieCode" expanded></b-input>
            </b-field>

            <input type="submit" class="button" style="background-color: #90EE90; color: white;" value="Submit" />
        </section>
    </form>
</template>

<script>    
const localhostMovieService = 'https://localhost:5001/api/Movie'
export default {
    name:  'MovieEdit',
    props: {
        movieData: Object
    },
    data() {
        return {
            title : '',
            author: '',
            movieCode: '',
            edit: false
        }
    },
    methods : {
        onSubmit(e) {
            e.preventDefault()

            if (!this.title || !this.author || !this.movieCode) {
                alert('please fill the blank field')
                return
            }

            const newMovie = {
                Title : this.title,
                Author : this.author,
                MovieCode : this.movieCode
            }

            if (this.edit) {
                this.editMovie(newMovie)
            } else {
                this.addMovie(newMovie)
            }
        },
        async addMovie(obj) {
            const res = await fetch(localhostMovieService + '/' + 'Create', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(obj)
            })
            
            const data = await res.json()
            location.reload()
        },
        async editMovie(obj) {
            const res = await fetch(localhostMovieService + '/' + 'Update', {
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
                this.title = ''
                this.author = ''
                this.movieCode = ''
                this.edit = false
                return
            } else {
                this.title = val.title
                this.author = val.author
                this.movieCode = val.movieCode
                this.edit = true
            }
        }
    }
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>