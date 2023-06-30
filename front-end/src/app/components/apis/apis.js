import axios from "./endpoint";

export default {
  fetchDetails() {
    return axios.get("/sanctum/csrf-cookie");
  },
  registerUser(data) {
    return axios.post("/api/register", data);
  },
  userLogin(data) {
    return axios.post("/api/login", data);
  },
  userLogout() {
    return axios.post("api/logout");
  },
  createAnEvent(data) {
    return axios.post("/api/create-event", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  complianceRegistration(data) {
    return axios.post("/api/compliance-registration", data);
  },
  fetchEvents() {
    return axios.get("/api/fetch-events");
  },
  fetchAllEvents() {
    return axios.get("/api/fetch-all-events");
  },
  makeReservation(data) {
    return axios.post("/api/make-reservation", data);
  },
  fetchTickets(){
    return axios.get("/api/fetch-tickets");
  }
};
// , {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
