import React from 'react';
import './LandingPage.css'; // optional for custom styles
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Cards from './Cards';
import Feature from './Feature';
import Footer from './Fotter';

const LandingPage = () => {
  return (
    <>
      <div className="landing-page d-flex align-items-center justify-content-center bg-light text-center">
        <div className="container py-5 mt-5">
          <div
            className="d-flex justify-content-center pb-4"
            style={{ gap: '90px' }} // Adjust value here
          >
            <img src={assets.logo} alt="Logo" style={{ width: '150px', height: '150px' }} />
            <img src={assets.logo} alt="Logo" style={{ width: '150px', height: '150px' }} />
            <img src={assets.logo} alt="Logo" style={{ width: '150px', height: '150px' }} />
          </div>


          <h1 className="display-4 fw-bold mb-3">Welcome to Smart Invoice Generator</h1>
          <p className="lead mb-4">
            Simplify your billing process with our easy-to-use invoice generator.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/generate">
              <button className="btn btn-dark btn-lg">Generate Your First Invoice</button>
            </Link>
            <Link to="/learn">
              <button className="btn btn-outline-dark btn-lg">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      <Cards />
      <Feature />
      <Footer />

    </>

  );
};

export default LandingPage;
