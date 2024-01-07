import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import { getTrips } from "../services/trip.service";
import Layout from "../components/Layout";

// Create a custom hook to fetch data
const useFetchData = () => {
  // Declare your state variables and setters
  const [departures, setDepartures] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);

  // Fetch trips data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const trips = await getTrips();

        // Check if trips data is available
        if (trips && trips.length > 0) {
          const uniqueDepartures = Array.from(
            new Set(trips.map((trip) => trip.departure))
          );
          const uniqueDestinations = Array.from(
            new Set(trips.map((trip) => trip.destination))
          );

          setDepartures(uniqueDepartures);
          setDestinations(uniqueDestinations);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return { departures, destinations };
};

// HomePage component
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Call custom hook to fetch data
  const { departures, destinations } = useFetchData();
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");

  // Handle search button click
  const handleSearch = () => {
    if (!departure && !destination && !departureDate) {
      navigate("/inquiry");
    } else if (departure && destination) {
      const query = departureDate ? `&date=${departureDate}` : "";
      navigate(
        `/inquiry?departure=${departure}&destination=${destination}${query}`
      );
    } else {
      alert("Lütfen kalkış ve varış yerlerini seçin.");
    }
  };

  return (
    <Layout>
      <div className="home-container">
        <h2 className="trip-query">Sefer Sorgulama</h2>

        {/* departure selection dropdown*/}
        <div className="input-container">
          <label className="departure" htmlFor="departure">
            Kalkış Yeri :
          </label>
          <select
            id="departure"
            value={departure}
            className="departure-selections"
            onChange={(e) => setDeparture(e.target.value)}
          >
            <option className="departure-selections" value="">
              Seçiniz
            </option>
            {departures.map((departureOption) => (
              <option
                className="departure-selections"
                key={departureOption}
                value={departureOption}
              >
                {departureOption}
              </option>
            ))}
          </select>
        </div>

        {/* destination selection dropdown*/}
        <div className="input-container">
          <label className="destination" htmlFor="destination">
            Varış Yeri:
          </label>
          <select
            id="destination"
            value={destination}
            className="destination-selections"
            onChange={(e) => setDestination(e.target.value)}
          >
            <option className="destination-selections" value="">
              Seçiniz
            </option>
            {destinations.map((destinationOption) => (
              <option
                className="destination-selections"
                key={destinationOption}
                value={destinationOption}
              >
                {destinationOption}
              </option>
            ))}
          </select>
        </div>

        {/* departure datepicker input*/}
        <div className="input-container">
          <label className="departureDate" htmlFor="departureDate">
            Sefer Tarihi:
          </label>
          <input
            type="date"
            id="departureDate"
            className="departureDate-dateinput"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {/* search button*/}
        <button className="search-button" type="button" onClick={handleSearch}>
          Ara
        </button>
      </div>
    </Layout>
  );
};

export default HomePage;
