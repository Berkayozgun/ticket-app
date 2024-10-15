// Trip service for CRUD operations on trips.
import axios from "axios";

const API_URL = "http://localhost:3001/api/trips"; // API URL for trips service

export const getTrips = async () => {
  // Get trips function
  try {
    const response = await axios.get(API_URL); // Send get trips request to API
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Get trips error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error("Get trips error:", error);
      throw error;
    }
  }
};

export interface Trip {
  id?: string;
  departure: string;
  destination: string;
  date: string;
  seatsAvailable: number;
}

export const addTrip = async (newTrip: Trip) => {
  // Add trip function
  return axios.post(`${API_URL}/add`, newTrip); // Send add trip request to API
};

interface SeatStatusUpdate {
  tripId: string;
  seatNumber: number;
  status: string;
}

export const updateSeatStatus = async (updateData: SeatStatusUpdate) => {
  // Update seat status function
  return axios.post(`${API_URL}/updateSeatStatus`, updateData); // Send update seat status request to API
};

export const getTripById = async (tripId: string) => {
  // Get trip by id function
  return axios.get(`${API_URL}/${tripId}`); // Send get trip by id request to API
};

export const filterTrips = async (departure: string, destination: string) => {
  // Filter trips function
  return axios.get(
    // Send filter trips request to API
    `${API_URL}/filter?departure=${departure}&destination=${destination}` // Filter trips by departure and destination
  );
};

export default {
  getTrips,
  addTrip,
  updateSeatStatus,
  getTripById,
  filterTrips,
};
