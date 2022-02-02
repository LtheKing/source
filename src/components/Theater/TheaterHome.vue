<template>
  <section class="container">
    <div v-show="showEditForm">
      <TheaterEdit :movieData="this.selected" />
    </div>

    <h1>Theater List</h1>
    <TheaterAddEditButton
      @show-edit-form="toggleEditForm"
      @delete-theater="deleteTheater"
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

    <div class="pagenumbersTheater" id="paginationTheater"></div>
  </section>
</template>

<script>
const localhost = "https://localhost:5001/api/Theater/";
let current_page = 1;
let rows = 5;

import TheaterAddEditButton from "./TheaterAddEditButton.vue";
import TheaterEdit from "./TheaterEdit.vue";

export default {
  name: "TheaterHome",
  components: {
    TheaterAddEditButton,
    TheaterEdit,
  },

  data() {
    const data = [];
    return {
      data,
      showEditForm: false,
      selected: data[1],
      columns: [
        {
          field: "theaterNumber",
          label: "Theater Number",
          centered: true,
        },
        {
          field: "status",
          label: "Status",
          centered: true,
        },
      ],
    };
  },

  methods: {
    async getData() {
      const res = await fetch(localhost + "GetAll", { method: "POST" });
      const data = await res.json();
      return data.data;
    },
    toggleEditForm() {
      this.showEditForm = !this.showEditForm;
    },
    async deleteTheater() {
      if (this.selected === undefined || this.selected == null) {
        alert("Please Select Data First !");
        return;
      }

      const obj = {
        TheaterNumber: this.selected.theaterNumber,
      };

      const res = await fetch(localhost + "Delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await res.json();
      location.reload();
    },
    SetupPaginationTheater(items, wrapper, rows_per_page) {
      //   wrapper.innerHTML = "";
      // debugger;
      let page_count = Math.ceil(items.length / rows_per_page);
      for (let i = 1; i < page_count + 1; i++) {
        let btn = this.PaginationButtonTheater(i, items);
        wrapper.appendChild(btn);
      }
    },
    PaginationButtonTheater(page, items) {
      let button = document.createElement("button");
      button.innerText = page;

      if (current_page == page) button.classList.add("active");

      button.addEventListener("click", function () {
        current_page = page;
        // DisplayList(JSON.parse(localStorage.movieData), rows, page);
        DisplayList(localStorage.theaterData, rows, page);
        // console.log(this.parentElement.parentElement.data)

        let current_btn = document.querySelector(
          ".pagenumbersTheater button.active"
        );
        current_btn.classList.remove("active");

        button.classList.add("active");
      });

      return button;
    },
  },

  async created() {
    let theaterToDisplay = await this.getData();
    this.data = theaterToDisplay.slice(0,5)

    localStorage.setItem("theaterData", JSON.stringify(theaterToDisplay));

    var a = theaterToDisplay;
    var b = document.getElementById("paginationTheater");
    var c = 5;

    this.SetupPaginationTheater(a, b, c);
  },

  mounted() {
    window.addEventListener("localStorageTheaterDisplay", (event) => {
      this.data = JSON.parse(event.detail.storage)
    });
  }

};

const DisplayList = function (items, rows_per_page, page) {
  page--;

  items = JSON.parse(items);
  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  localStorage.setItem("theaterDataPagination", JSON.stringify(paginatedItems));

  window.dispatchEvent(
    new CustomEvent("localStorageTheaterDisplay", {
      detail: {
        storage: localStorage.getItem("theaterDataPagination"),
      },
    })
  );
}
</script>

<style scoped>
.pagenumbersTheater {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 1cm;
  margin-top: 0.5cm;
}
</style>