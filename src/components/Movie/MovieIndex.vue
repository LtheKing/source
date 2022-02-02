<template>
  <div class="container" id="MovieIndex">
    <h1>{{ title }}</h1>

    <div v-show="showEditForm">
      <MovieEdit :movieData="this.selected" />
    </div>

    <MovieButton
      @show-edit-form="toggleEditForm"
      @delete-movie="deleteMovie"
      :selected="this.selected"
      :color="showEditForm ? 'white' : 'yellow'"
      :text="showEditForm ? 'Close' : 'Edit  / Add'"
    />

    <b-field>
      <b-button
        label="Clear selected"
        type="is-danger is-light"
        icon-left="close"
        :disabled="!selected"
        @click="selected = null"
      />
    </b-field>

    <b-table
      :data="data"
      :columns="columns"
      :selected.sync="selected"
      focusable
    >
    </b-table>

    <div class="pagenumbers" id="pagination"></div>
  </div>
</template>

<script>
const movieService = "https://localhost:5001/api/Movie/";
import MovieButton from "./MovieButton.vue";
import MovieEdit from "./MovieEdit.vue";

let current_page = 1;
let rows = 5;

export default {
  name: "MovieIndex",
  components: {
    MovieButton,
    MovieEdit,
  },
  props: {
    title: String,
    dataMovie: Object,
  },
  data() {
    const data = [];
    return {
      data,
      showEditForm: false,
      selected: data[1],
      columns: [
        {
          field: "title",
          label: "Movie Title",
          centered: true,
        },
        {
          field: "author",
          label: "Author",
          centered: true,
        },
        {
          field: "movieCode",
          label: "Movie Code",
          centered: true,
        },
      ],
    };
  },
  methods: {
    async getData() {
      // const res = await fetch(movieService + "GetAll", { method: "POST" });
      // const data = await res.json();
      // return data.data;

      let cekAxios = this.$axios
        .post(movieService + "GetAll")
        .then(function (response) {
          return response.data.data;
        });
      
      return cekAxios
    },
    toggleEditForm() {
      this.showEditForm = !this.showEditForm;
    },
    async deleteMovie() {
      if (this.selected === undefined || this.selected == null) {
        alert("Please Select Data First !");
        return;
      }

      const obj = {
        MovieCode: this.selected.movieCode,
      };

      const res = await fetch(movieService + "Delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await res.json();
      console.log(data);
      location.reload();
    },
    SetupPagination(items, wrapper, rows_per_page) {
      //   wrapper.innerHTML = "";
      // debugger;
      let page_count = Math.ceil(items.length / rows_per_page);
      for (let i = 1; i < page_count + 1; i++) {
        let btn = this.PaginationButton(i, items);
        wrapper.appendChild(btn);
      }
    },
    PaginationButton(page, items) {
      let button = document.createElement("button");
      button.innerText = page;

      if (current_page == page) button.classList.add("active");

      button.addEventListener("click", function () {
        current_page = page;
        // DisplayList(JSON.parse(localStorage.movieData), rows, page);
        DisplayList(localStorage.movieData, rows, page);
        // console.log(this.parentElement.parentElement.data)

        let current_btn = document.querySelector(".pagenumbers button.active");
        current_btn.classList.remove("active");

        button.classList.add("active");
      });

      return button;
    },
  },
  async created() {
    let movieToDisplay = await this.getData();
    this.data = movieToDisplay.slice(0, 5);

    this.$emit("get-data-movie", movieToDisplay);
    // localStorage.clear();
    localStorage.setItem("movieData", JSON.stringify(movieToDisplay));

    var a = movieToDisplay;
    var b = document.getElementById("pagination");
    var c = 5;

    this.SetupPagination(a, b, c);

    window.dispatchEvent(
      new CustomEvent("localStorageChangedFirst", {
        detail: {
          storage: localStorage.getItem("movieData"),
        },
      })
    );
  },
  mounted() {
    window.addEventListener("localStorageChangedDisplay", (event) => {
      this.data = JSON.parse(event.detail.storage);
    });
  },
};

const DisplayList = function (items, rows_per_page, page) {
  page--;

  items = JSON.parse(items);
  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  localStorage.setItem("movieDataPagination", JSON.stringify(paginatedItems));

  window.dispatchEvent(
    new CustomEvent("localStorageChangedDisplay", {
      detail: {
        storage: localStorage.getItem("movieDataPagination"),
      },
    })
  );
};
</script>

<style scoped>
.btnTable {
  font: bold 11px Arial;
  text-decoration: none;
  background-color: #eeeeee;
  color: #333333;
  padding: 2px 6px 2px 6px;
  border-top: 1px solid #cccccc;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #cccccc;
}

.pagenumbers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 1cm;
  margin-top: 0.5cm;
}

.pagenumbers button {
  width: 50px;
  height: 50px;

  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;

  background-color: #44aaee;

  margin: 5px;
  transition: 0.4s;

  color: #fff;
  font-size: 18px;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}

.pagenumbers button:hover {
  background-color: #44eeaa;
}

.pagenumbers button.active {
  background-color: #44eeaa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.2);
}
</style>