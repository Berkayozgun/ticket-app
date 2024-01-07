// Authentication service for user login and registration.
import axios from "axios";

const API_URL = "http://localhost:3001/auth"; // API URL for authentication service

const AuthService = {
  // Authentication service object
  login: async (email: string, password: string) => {
    // Login function
    try {
      const response = await axios.post(`${API_URL}/login`, {
        // Send login request to API
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login Failed:", error.message);
      throw new Error("Login failed");
    }
  },
  register: async (
    // Register function
    email: string,
    password: string,
    ad: string,
    soyad: string,
    tcNo: string,
    gender: string,
    dob: Date
  ) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        // Send register request to API
        email,
        password,
        ad,
        soyad,
        tcNo,
        gender,
        dob,
      });
      return response.data;
    } catch (error) {
      console.error("Registration Failed:", error.message);
      throw new Error("Registration failed");
    }
  },
  logout: () => {
    // todo - implement logout function to remove token from local storage and redirect to login page
  },
  getUser: async (email: string) => {
    // Get user function
    try {
      const response = await axios.get(`${API_URL}/user/`, {
        // Send get user request to API
        params: { email },
      });
      console.log("User Email: ", response.data.email);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error.message);
      throw new Error("Get user failed");
    }
  },
};

export default AuthService;
