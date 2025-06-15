import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const MenuBar = () => {
  const { openSignIn } = useClerk();
  const { setInvoiceData, setTemplate, setInvoiceTitle, initialInvoiceData } = useContext(AppContext);
  const  navigate  = useNavigate();
  const openLogin = () => {
    openSignIn();
  };

  const handleGenerate = () => {
    setInvoiceData(initialInvoiceData);
    setTemplate("template1");
    setInvoiceTitle("New Invoice");
    navigate("/generate");

  }
  return (
    <nav className="navbar navbar-expand-md bg-white ">
      <div className="container py-2">
        {/* Logo */}
        <Logo />

        {/* Burger Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Dropdown Menu */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-medium text-dark">
                Home
              </Link>
            </li>
            <SignedIn>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link fw-medium text-dark">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-dark" onClick={handleGenerate}>Generate</button>

              </li>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <li className="nav-item">
                <button className="btn btn-dark text-white" onClick={openLogin}>Login / Signup</button>
              </li>

            </SignedOut>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
