/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {

      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        console.log("Redirecting to home page...");
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log("Login failed for email:", email);
    console.log("Error details:", err.response); // Log the full error response
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });
    if ((res.data.status = "success")) {
      console.log("Logout successful");
      location.reload(true);
    }
  } catch (err) {
    console.log("Logout failed");
    showAlert("error", "Error logging out! Try again.");
  }
};
