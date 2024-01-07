import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import "../styles/LoginPage.css";
import AuthService from "../services/auth.service";
import Layout from "../components/Layout";

// LoginPage component
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get user data from redux store
  const [email, setEmail] = useState(""); // Declare email state variable
  const [password, setPassword] = useState(""); // Declare password state variable
  const [error, setError] = useState<string | null>(null);

  // Handle login button click
  const handleLogin = async () => {
    try {
      // Call login service with email and password
      const response = await AuthService.login(email, password);
      console.log("Response : ", response);

      // Check if login is successful
      if (response.success) {
        const response = await AuthService.getUser(email);
        console.log("User Response data: ", response);
        dispatch(setUser(response));
      }
      alert("Giriş başarılı.");
      navigate("/");
    } catch (error) {
      // Handle login failure
      console.error("Login Failed:", error.message);
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      navigate("/login");
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  // Handle register button click
  const navigateRegister = () => {
    navigate("/register");
  };

  return (
    <Layout>
      {/* login form */}
      <div className="login-container">
        <div className="login-card">
          <h2>Giriş Yap</h2>
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label htmlFor="email" className="label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="email-input"
                value={email}
                placeholder="example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="label">
                Şifre:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="pw-input"
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Show error message if error exists */}
            <button
              type="button"
              onClick={handleLogin}
              className="login-button"
            >
              Giriş
            </button>
            <button
              type="button"
              onClick={navigateRegister}
              className="have-account-button"
            >
              Hesabın yok mu? Kayıt Ol
            </button>
          </form>

          <div className="login-footer">
            <Link to="#" className="forgot-password-link">
              Şifremi Unuttum
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
