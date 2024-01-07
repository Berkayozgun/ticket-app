import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/TripDetailsPage.css";
import { fetchTripById } from "../slices/tripSlice";
import SeatSVG from "../components/SeatSVG";
import Layout from "../components/Layout";

interface Passenger {
  // Passenger interface
  id: number;
  seatNumber: number;
  gender: "male" | "female";
}

interface TripDetailsPageParams {
  // TripDetailsPageParams interface
  tripId: string;
}

// TripDetailsPage component
const TripDetailsPage: React.FC<TripDetailsPageParams> = () => {
  const { tripId } = useParams<TripDetailsPageParams>();
  const userGender = useSelector((state: any) => state.user.user?.gender);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trip = useSelector((state: any) => state.trip.currentTrip);
  const seatPrice = useSelector((state: any) => state.trip.currentTrip?.price);
  const currentUserGender = useSelector(
    (state: any) => state.user.user?.gender
  );

  const loading = useSelector((state: any) => state.trip.loading);
  const [totalSeats, setTotalSeats] = React.useState<number>(0);
  const [selectedSeats, setSelectedSeats] = React.useState<number[]>([]);
  const [passengers, setPassengers] = React.useState<Passenger[]>([]);
  const [seatStatus, setSeatStatus] = React.useState<
    { isOccupied: boolean; gender: "male" | "female" }[]
  >([]);

  useEffect(() => {
    console.log("Current User Gender:", currentUserGender);
    dispatch(fetchTripById(tripId));
  }, [dispatch, tripId, currentUserGender]);

  useEffect(() => {
    // Update taken seats randomly when trip changes
    if (trip) {
      const randomStatus = Array(trip.availableSeats)
        .fill(null)
        .map(() => ({
          isOccupied: Math.random() < 0.5,
          gender: Math.random() < 0.5 ? "male" : "female",
        }));
      // check randomized seats
      console.log("Randomized Seats:", randomStatus);
      setSeatStatus(randomStatus);
      setTotalSeats(trip.availableSeats);
    }
  }, [trip]);

  // Handle seat click
  const handleSeatClick = (seatNumber: number) => {
    const { isOccupied } = seatStatus[seatNumber - 1];

    console.log("Seat Number:", seatNumber);

    if (!userGender) {
      // Check if user is logged in
      alert("Koltuk seçebilmek için giriş yapmalısınız.");
      navigate("/login");
      return;
    }

    // Check if seat is occupied
    if (isOccupied) {
      alert("Bu koltuk zaten satın alındı.");
    } else {
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        setPassengers(
          passengers.filter((passenger) => passenger.seatNumber !== seatNumber)
        );

        // Update the gender of the seat to default when unselected by user
        const updatedSeatStatus = [...seatStatus];
        updatedSeatStatus[seatNumber - 1].gender = userGender
          ? userGender
          : "default";
        setSeatStatus(updatedSeatStatus);
      } else {
        // Check if user has already selected 5 seats or not, if not, add the seat to selectedSeats
        if (selectedSeats.length < 5) {
          const seatGender = userGender;

          setSelectedSeats([...selectedSeats, seatNumber]);
          setPassengers([
            ...passengers,
            { id: passengers.length + 1, seatNumber, gender: seatGender },
          ]);

          // Update the gender of the seat
          const updatedSeatStatus = [...seatStatus];
          updatedSeatStatus[seatNumber - 1].gender = seatGender;
          setSeatStatus(updatedSeatStatus);
        } else {
          alert("En fazla 5 koltuk seçebilirsiniz.");
        }
      }
    }
  };

  // Handle payment redirect when user clicks on payment button
  const handlePaymentRedirect = () => {
    navigate("/payment");
  };

  // Get seat class name
  const getSeatClassName = (seatNumber: number, part: string) => {
    const { isOccupied, gender } = seatStatus[seatNumber - 1];
    const isSelected = selectedSeats.includes(seatNumber);
    const selectedClass = isSelected ? "selected" : "";

    // Check if seat is occupied
    const seatColor = isSelected
      ? userGender === "female"
        ? "female"
        : "male"
      : "";

    return `seat ${seatColor} ${
      isOccupied ? "occupied" : ""
    } ${part} ${selectedClass}`;
  };

  // Render seats
  const renderSeats = () => {
    const seats = [];
    const limit = totalSeats; // total number of seats
    const itemsPerRow = Math.ceil(limit / 2); // number of seats per row

    seats.push(
      // push seats to seats array
      <div className="seating-plan" key="seating-plan">
        <div className="seat-container1">
          {Array.from({ length: itemsPerRow }, (_, index) => {
            const seatNumber = index + 1;
            const seatClassName = getSeatClassName(seatNumber, "first-part");

            const { isOccupied, gender } = seatStatus[seatNumber - 1];
            const isSelected = selectedSeats.includes(seatNumber);
            const userGenderClass = isSelected
              ? `${userGender}-selected`
              : "female";
            const seatClass = `seat ${userGenderClass} ${
              isOccupied ? "occupied" : "female"
            } ${gender}-selected ${seatClassName}`;

            return (
              <div
                key={seatNumber}
                className={seatClass}
                onClick={() => handleSeatClick(seatNumber)}
              >
                <SeatSVG className="seat" /> {/* seat svg */}
                {seatNumber}
              </div>
            );
          })}
        </div>

        <div className="seat-container2">
          {Array.from({ length: limit - itemsPerRow }, (_, index) => {
            const seatNumber = itemsPerRow + index + 1;
            const seatClassName = getSeatClassName(seatNumber, "second-part");

            const { isOccupied, gender } = seatStatus[seatNumber - 1];
            const isSelected = selectedSeats.includes(seatNumber);
            const userGenderClass = isSelected
              ? `${userGender}-selected`
              : "female";
            const seatClass = `seat ${userGenderClass} ${
              isOccupied ? "occupied" : "female"
            } ${gender}-selected ${seatClassName}`;

            return (
              <div
                key={seatNumber}
                className={seatClass}
                onClick={() => handleSeatClick(seatNumber)}
              >
                <SeatSVG className="seat" />
                {seatNumber}
              </div>
            );
          })}
        </div>
      </div>
    );

    return seats;
  };

  // Calculate total price of the selected seats
  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  return (
    <Layout>
      <div className="trip-details-container">
        {loading && <p>Loading...</p>}
        {!loading && trip && (
          <>
            <h2 className="tripdetails-header">Sefer Detayları</h2>
            <p className="dep-des">
              {trip.departure} &#8594; {trip.destination}
            </p>
            <p>
              Tarih: {trip.date} &nbsp; &nbsp; &nbsp; Toplam Koltuk Sayısı:{" "}
              {trip.availableSeats} &nbsp; &nbsp; &nbsp; Bilet Fiyatı :{" "}
              {trip.price} TL
            </p>

            <div className="seating-plan">{renderSeats()}</div>
            <div className="selected-seats">
              <h3>Seçilen Koltuklar</h3>
              <ul>
                {passengers.map((passenger) => (
                  <div
                    key={passenger.id}
                    className={`chip ${
                      passenger.gender === "female" ? "female" : "male" // chip color change decision by gender
                    }`}
                  >
                    {passenger.seatNumber} -{" "}
                    {passenger.gender === "male" ? "Erkek" : "Kadın"}
                  </div>
                ))}
              </ul>
            </div>
            <div className="total-price">
              <h3>Toplam Fiyat: {calculateTotalPrice()} TL</h3>
            </div>

            <div className="goBack">
              {" "}
              {/* go back button */}
              <Link className="goBackText" to="/inquiry">
                Geri Dön
              </Link>
            </div>

            {/* payment button */}
            <button className="goPaymentButton" onClick={handlePaymentRedirect}>
              Ödemeye Git
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default TripDetailsPage;
