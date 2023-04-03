
import axios from "axios";
import store from "../store";
import { logOut } from "../state/auth/action";

// Create an instance of axios
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
     // 'authorization': currentState.auth.token == '' ? localStorage.getItem('token') : currentState.auth.token
  },
});

/*
  NOTE: intercept any error responses from the api
  and check if the token is no longer valid.
  ie. Token has expired or user is no longer
  authenticated.
  logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(logOut());
    }
    return Promise.reject(err);
  }
);

export default api;
