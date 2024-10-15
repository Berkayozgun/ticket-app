import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "../slices/tripSlice";
import "../styles/InquiryPage.css";
import Layout from "../components/Layout";
import { AppDispatch, RootState } from "../store";
import { Trip } from "../services/trip.service"; // Trip türü import edildi

// InquiryPage component
const InquiryPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // AppDispatch türü kullanıldı

  // Get trips data from redux store
  const trips = useSelector(
    (state: RootState) => (state.trip.trips as Trip[]) || []
  );
  const loading = useSelector((state: RootState) => state.trip.loading);

  // Fetch trips data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTrips()).unwrap();
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Layout>
      {/* inquiry results trip list */}
      <div className='inquiry-container'>
        <h2 className='inquiry-title'>Sefer Sorgulama Sonuçları</h2>

        {loading ? ( // Show loading message if data is loading
          <p className='loading-message'>Veriler yükleniyor...</p>
        ) : trips && trips.length > 0 ? (
          // Show trips list if data is available
          <ul className='trip-list'>
            {trips.map((trip) => (
              // trip details card
              <li key={trip.id} className='trip-item'>
                <div className='trip-info'>
                  <strong className='info-label'>Sefer Adı:</strong>{" "}
                  {trip.departure} - {trip.destination}
                </div>
                <div className='seat-info'>
                  <strong className='info-label'>Kalan Koltuk:</strong>{" "}
                  {trip.seatsAvailable}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='no-trips-message'>Sefer bulunamadı.</p>
        )}
      </div>
    </Layout>
  );
};

export default InquiryPage;
