import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../services/auth.service"; // Import the AuthService
import "../styles/RegisterPage.css";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

// RegisterPage component
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ad, setAd] = useState<string>("");
  const [soyad, setSoyad] = useState<string>("");
  const [tcNo, setTcNo] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [dob, setDob] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (date: Date | null) => {
    // Handle date change
    setDob(date);
  };

  const handleRegister = async () => {
    // Handle register
    try {
      if (!email || !password || !ad || !soyad || !tcNo || !gender || !dob) {
        // Check if any field is empty
        alert("Lütfen tüm alanları doldurunuz.");
        return;
      }

      const newUser = {
        // Create new user object
        email,
        password,
        ad,
        soyad,
        tcNo,
        gender,
        dob,
      };
      const response = await AuthService.register(
        // Register user
        newUser.email,
        newUser.password,
        newUser.ad,
        newUser.soyad,
        newUser.tcNo,
        newUser.gender,
        newUser.dob
      );
      console.log("Registration Successful:", response);
      alert("Kayıt başarılı.");

      // Reset form fields
      setEmail("");
      setPassword("");
      setAd("");
      setSoyad("");
      setTcNo("");
      setGender("male");
      setDob(null);
      setError(null);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Registration Failed:", error.message);
      } else {
        console.error("Registration Failed:", error);
      }
      setError("Kayıt başarısız.");
    }
  };

  const navigateLogin = () => {
    // Navigate to login page
    navigate("/login");
  };

  return (
    <Layout>
      <div className="register-container">
        {" "}
        {/* register form */}
        <div className="register-card">
          <h2>Register</h2>
          <form className="register-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              {" "}
              {/* email input */}
              <label htmlFor="email" className="label">
                E-posta Adresi:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {" "}
              {/* password input */}
              <label htmlFor="password" className="label">
                Şifre :
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input pw-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {" "}
              {/* name input */}
              <label htmlFor="ad" className="label">
                Ad:
              </label>
              <input
                type="text"
                id="ad"
                name="ad"
                className="input name-input"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {" "}
              {/* surname input */}
              <label htmlFor="soyad" className="label">
                Soyad:
              </label>
              <input
                type="text"
                id="soyad"
                name="soyad"
                className="input surname-input"
                value={soyad}
                onChange={(e) => setSoyad(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {" "}
              {/* tc no input */}
              <label htmlFor="tcNo" className="label">
                TC No:
              </label>
              <input
                type="text"
                id="tcNo"
                name="tcNo"
                className="input tcNo-input"
                value={tcNo}
                onChange={(e) => setTcNo(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {" "}
              {/* gender selection */}
              <label htmlFor="gender" className="label">
                Cinsiyet:
              </label>
              <select
                id="gender"
                name="gender"
                className="select gender-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
              </select>
            </div>

            <div className="input-group">
              {" "}
              {/* date of birth input */}
              <label htmlFor="dob" className="label">
                Doğum Tarihi:
              </label>
              <DatePicker
                id="dob"
                selected={dob}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="gg/aa/yyyy"
                className="input datepicker"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="buttons">
              {" "}
              {/* register and cancel buttons */}
              <button
                type="button"
                onClick={handleRegister}
                className="register-button"
              >
                Kayıt Ol
              </button>
              <button onClick={navigateLogin} className="cancel-button">
                Vazgeç
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
