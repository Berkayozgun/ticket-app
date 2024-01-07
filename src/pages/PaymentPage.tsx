import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPaymentInfo, setLoading, setError } from "../slices/paymentSlice";
import "../styles/PaymentPage.css";
import Layout from "../components/Layout";

// PaymentPage component
const PaymentPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentInfo = useSelector((state: any) => state.payment.paymentInfo); // Get payment info from redux store
  const isLoading = useSelector((state: any) => state.payment.isLoading);
  const error = useSelector((state: any) => state.payment.error);

  const [cardNumber, setCardNumber] = useState<string>(""); // Declare cardNumber state variable
  const [expiryDate, setExpiryDate] = useState<string>(""); // Declare expiryDate state variable
  const [cvc, setCvc] = useState<string>(""); // Declare cvc state variable

  const isCardNumberValid = /^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber.trim()); // Check if card number is valid
  const isExpiryDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.trim()); // Check if expiry date is valid
  const isCvcValid = /^\d{3}$/.test(cvc.trim()); // Check if cvc is valid

  // Handle card number input change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = e.target.value.replace(/\D/g, "");
    const groupedNumber = formattedNumber.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(groupedNumber);
  };

  // Handle expiry date input change
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{0,4})/, "$1/$2")
      .substring(0, 5);
    setExpiryDate(formattedDate);
  };

  // Handle cvc input change
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCvc = e.target.value.replace(/\D/g, "").substring(0, 3);
    setCvc(formattedCvc);
  };

  // Render card number error message
  const renderCardNumberError = () => {
    if (!isCardNumberValid) {
      return <span id="cardNumberError">Geçersiz kart numarası</span>;
    }
    return null;
  };

  // Render expiry date error message
  const renderExpiryDateError = () => {
    if (!isExpiryDateValid) {
      return <span id="expiryDateError">Geçersiz son kullanma tarihi</span>;
    }
    return null;
  };

  // Render cvc error message
  const renderCvcError = () => {
    if (!isCvcValid) {
      return <span id="cvcError">Geçersiz CVC</span>;
    }
    return null;
  };

  // Check if form is valid
  const isFormValid = () =>
    isCardNumberValid && isExpiryDateValid && isCvcValid;

  // Handle payment if form is valid
  const handlePayment = async () => {
    try {
      dispatch(setLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate payment process about 2 seconds

      dispatch(setLoading(false));
      dispatch(setError(null));

      dispatch(
        setPaymentInfo({
          ...paymentInfo,
          isPaid: true,
        })
      );

      alert("Ödeme Başarılı");
      navigate("/");
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setError(
          "Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
        )
      );
    }
  };

  return (
    <Layout>
      <div className="payment-container">
        {" "}
        {/* payment form */}
        <h2>Ödeme Sayfası</h2>
        <div>Alınan biletler :</div>
        <div className="ticket-list">
          <div className="ticket">
            <div className="ticket__title">trip.seatNumber</div>{" "}
            {/* ticket that user picked in previous page, but not actively changing rn will be done with redux*/}
            <div className="ticket_departure">trip.departure</div>
            <div className="ticket_destination">trip.destination</div>
            <div className="ticket__price">trip.price</div>
          </div>
        </div>
        <div className="credit-card-form">
          {" "}
          {/* credit card form */}
          <div className="form-group">
            <label htmlFor="cardNumber" className="label">
              Kart Numarası:
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9101 1121"
              maxLength={19}
              className="input"
              aria-describedby="cardNumberError"
              aria-label="Card Number"
            />
            {renderCardNumberError()}
          </div>
          <div className="form-group">
            {" "}
            {/* expiry date input */}
            <label htmlFor="expiryDate" className="label">
              Son Kullanma Tarihi:
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              maxLength={5}
              className="input"
              aria-describedby="expiryDateError"
              aria-label="Expiry Date"
            />
            {renderExpiryDateError()}
          </div>
          <div className="form-group">
            {" "}
            {/* cvc input */}
            <label htmlFor="cvc" className="label">
              CVC:
            </label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              value={cvc}
              onChange={handleCvcChange}
              placeholder="123"
              maxLength={3}
              className="input"
              aria-describedby="cvcError"
              aria-label="CVC"
            />
            {renderCvcError()}
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          type="button"
          onClick={handlePayment}
          disabled={isLoading || !isFormValid()} // disable button if form is not valid or payment is processing
        >
          {isLoading ? "Ödeme İşleniyor..." : "Ödeme Yap"}{" "}
          {/* change button text according to payment process */}
        </button>
      </div>
    </Layout>
  );
};

export default PaymentPage;
