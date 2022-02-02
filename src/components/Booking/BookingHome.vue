<template>
  <section class="container">
    <div v-show="showEditForm">
      <BookingEdit :bookingData="this.selected" />
    </div>

    <div v-show="showApproveForm">
      <BookingApprove :bookingData="this.selected" />
    </div>

    <h1>Booking List</h1>
    <BookingButton
      @show-edit-form="toggleEditForm"
      @approve-booking="toggleApproveForm"
      @cancel-booking="cancelBooking"
      :color="showEditForm ? 'white' : 'yellow'"
      :colorApprove="showApproveForm ? 'white' : '#90EE90'"
      :text="showEditForm ? 'Close' : 'Edit  / Add'"
      :textApprove="showApproveForm ? 'Close' : 'Approval'"
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

    <div class="pagenumbersBooking" id="paginationBooking"></div>

  </section>
</template>

<script>
const localhost = "https://localhost:44370/api/ticket/";
const bookingUrl = "https://localhost:44370/api/Booking/";

let current_page = 1;
let rows = 5;

import BookingButton from "./BookingButton.vue";
import BookingEdit from "./BookingEdit.vue";
import BookingApprove from "./BookingApprove.vue";

export default {
  name: "BookingHome",
  components: {
    BookingButton,
    BookingEdit,
    BookingApprove,
  },
  data() {
    const data = [];
    return {
      data,
      showEditForm: false,
      showApproveForm: false,
      selected: data[1],
      columns: [
        {
          field: "ticketCode",
          label: "Ticket Code",
          centered: true,
        },
        {
          field: "movieCode",
          label: "Movie Code",
          centered: true,
        },
        {
          field: "movieTitle",
          label: "Movie Title",
          centered: true,
        },
        {
          field: "theaterNumber",
          label: "Theater Number",
          centered: true,
        },
        {
          field: "seat",
          label: "Seat",
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
    toggleApproveForm() {
      this.showApproveForm = !this.showApproveForm;
    },
    async cancelBooking() {
      if (this.selected === undefined || this.selected == null) {
        alert("Please Select Data First !");
        return;
      }

      const obj = {
        TicketCode: this.selected.ticketCode,
      };

      const res = await fetch(bookingUrl + "Cancel", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await res.json();
      location.reload();
    },
    SetupPaginationBooking(items, wrapper, rows_per_page) {
      //   wrapper.innerHTML = "";
      // debugger;
      let page_count = Math.ceil(items.length / rows_per_page);
      for (let i = 1; i < page_count + 1; i++) {
        let btn = this.PaginationButtonBooking(i, items);
        wrapper.appendChild(btn);
      }
    },
    PaginationButtonBooking(page, items) {
      let button = document.createElement("button");
      button.innerText = page;

      if (current_page == page) button.classList.add("active");

      button.addEventListener("click", function () {
        current_page = page;
        // DisplayList(JSON.parse(localStorage.movieData), rows, page);
        DisplayList(localStorage.bookingData, rows, page);
        // console.log(this.parentElement.parentElement.data)

        let current_btn = document.querySelector(".pagenumbersBooking button.active");
        current_btn.classList.remove("active");

        button.classList.add("active");
      });

      return button;
    },
  },
  async created() {
    let bookingToDisplay = await this.getData();
    this.data = bookingToDisplay.slice(0,5)

    localStorage.setItem("bookingData", JSON.stringify(bookingToDisplay));

    var a = bookingToDisplay;
    var b = document.getElementById("paginationBooking");
    var c = 5;

    this.SetupPaginationBooking(a, b, c);
  },
  mounted() {
    window.addEventListener("localStorageBookingDisplay", (event) => {
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

  localStorage.setItem("bookingDataPagination", JSON.stringify(paginatedItems));

  window.dispatchEvent(
    new CustomEvent("localStorageBookingDisplay", {
      detail: {
        storage: localStorage.getItem("bookingDataPagination"),
      },
    })
  );
}
</script>

<style scoped>
.pagenumbersBooking {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 1cm;
  margin-top: 0.5cm;
}
</style>
