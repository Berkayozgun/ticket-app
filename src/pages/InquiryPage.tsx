import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "../slices/tripSlice";
import "../styles/InquiryPage.css";
import Layout from "../components/Layout";

// InquiryPage component
const InquiryPage: React.FC = () => {
  const dispatch = useDispatch();

  // Get trips data from redux store
  const trips = useSelector((state) => {
    return state.trip.trips || [];
  });
  const loading = useSelector((state) => state.trip.loading);

  // Fetch trips data
  useEffect(() => {
    dispatch(fetchTrips()).catch((error) => {
      console.error("Error fetching trips:", error);
    });
  }, [dispatch]);

  return (
    <Layout>
      {/* inquiry results trip list */}
      <div className="inquiry-container">
        <h2 className="inquiry-title">Sefer Sorgulama Sonuçları</h2>

        {loading ? ( // Show loading message if data is loading
          <p className="loading-message">Veriler yükleniyor...</p>
        ) : trips && trips.length > 0 ? (
          // Show trips list if data is available
          <ul className="trip-list">
            {trips.map((trip) => (
              // trip details card
              <li key={trip._id} className="trip-item">
                <div className="trip-info">
                  <strong className="info-label">Sefer Adı:</strong>{" "}
                  {trip.departure} - {trip.destination}
                </div>
                <div className="seat-info">
                  <strong className="info-label">Kalan Koltuk:</strong>{" "}
                  {trip.availableSeats}
                </div>
                <div className="date-info">
                  <strong className="info-label">Tarih:</strong> {trip.date}
                </div>
                <Link to={`/trip-details/${trip._id}`} className="details-link">
                  Detaylar
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          // Show no trip message if data is empty
          <p className="no-trip-message">Uygun Sefer Bulunamadı.</p>
        )}
      </div>
    </Layout>
  );
};

export default InquiryPage;
