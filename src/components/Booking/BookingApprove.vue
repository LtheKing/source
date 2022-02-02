<template>
  <form @submit="onSubmit" class="add-form has-text-left">
    <section>
      <b-field vertical label="Ticket Code">
        <b-input
          name="ticketCode"
          v-model="ticketCode"
          class="booking-input"
        ></b-input>
      </b-field>

      <b-field>
        <b-dropdown
          aria-role="list"
          v-model="theaterNumber"
          name="theater"
          id="theater_input"
        >
          <template #trigger="{ active }">
            <b-button
              label="Theater"
              type="is-primary"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            />
          </template>

          <b-dropdown-item
            aria-role="listitem"
            v-for="option in theaters"
            :key="option.theaterNumber"
            :value="option.theaterNumber"
            >{{ option.theaterNumber }}</b-dropdown-item
          >
        </b-dropdown>
      </b-field>

      <b-field vertical label="Seat">
        <b-input
          name="theaterNumber"
          v-model="seat"
          class="booking-input"
        ></b-input>
      </b-field>

       <b-field>
        <b-dropdown
          aria-role="list"
          v-model="status"
          name="status"
          id="status_input"
        >
          <template #trigger="{ active }">
            <b-button
              label="Status"
              type="is-warning"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            />
          </template>

          <b-dropdown-item
            aria-role="listitem"
            v-for="option in optionsStatus"
            :key="option"
            :value="option"
            >{{ option }}</b-dropdown-item
          >
        </b-dropdown>
      </b-field>

      <input
        type="submit"
        class="button"
        style="background-color: #90ee90; color: white"
        value="Submit"
      />
    </section>
  </form>
</template>

<script>
const localhost = "https://localhost:44397/api/Approval/Execution";

export default {
  name: "BookingApprove",
  props: {
    bookingData: Object,
  },
  data() {
    return {
      ticketCode: "",
      theaterNumber: "",
      seat: "",
      status: "",
      theaters: [],
      optionsStatus: ["Entry", "Booked", "Cancelled"],
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      const newMovie = {
        TicketCode: this.ticketCode,
        TheaterNumber: parseInt(this.theaterNumber),
        Seat: this.seat,
        Status: this.status,
      };

      this.addTheater(newMovie);
    },
    async addTheater(obj) {
      const res = await fetch(localhost, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await res.json();
      location.reload();
    },
    async getTheaters() {
      const movieService = "https://localhost:5001/api/Theater/";

      let cekAxios = this.$axios
        .post(movieService + "GetAll")
        .then(function (response) {
          return response.data.data;
        });

      return cekAxios;
    },
  },
  async created() {
      this.theaters = await this.getTheaters()
  },
  watch: {
    bookingData: function (val, oldVal) {
      if (val === undefined || val == null) {
        this.ticketCode = "";
        this.theaterNumber = "";
        this.status = "";
        this.edit = false;
        return;
      } else {
        this.ticketCode = val.ticketCode;
        this.theaterNumber = val.theaterNumber;
        this.status = val.status;
        this.edit = true;
      }
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
  margin-left: 0.5cm;
  margin-right: 1cm;
}

.booking-input {
  width: 50%;
}
</style>