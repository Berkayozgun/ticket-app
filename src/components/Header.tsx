import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

// Header component
export default function Header() {
  return (
    <div className="custom-header">
      {/* Brand section */}
      <div className="brand">
        <div className="brand-text">BUSIFY</div>
      </div>

      {/* Navigation links */}
      <div className="link-container">
        {/* Home link */}
        <Link to="/" className="nav-link active">
          Anasayfa
        </Link>

        {/* About Us link */}
        <Link to="#" className="nav-link active">
          Hakkımızda
        </Link>

        {/* Contact link */}
        <Link to="#" className="nav-link active">
          İletişim
        </Link>

        {/* FAQ link */}
        <Link to="#" className="nav-link active">
          S.S.S.
        </Link>

        {/* Inquiry link */}
        <Link to="/inquiry" className="nav-link active">
          Seferler
        </Link>
      </div>

      {/* Authentication links */}
      <div>
        {/* Login link */}
        <Link to="/login" className="nav-link-login">
          Giriş
        </Link>

        {/* Register link */}
        <Link to="/register" className="nav-link-register">
          Kayıt
        </Link>
      </div>
    </div>
  );
}
