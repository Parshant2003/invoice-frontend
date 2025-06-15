import React from 'react';
import { ArrowRight, Instagram, Twitter, Youtube } from 'react-bootstrap-icons';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className="bg-light text-center py-5 mb-0">
      <h2 className="fw-bold mb-3">Ready to Streamline your Invoice?</h2>
      <p className="mb-4 fs-6">
        Start generating professional invoices effortlessly and get paid faster with QuickInvoice.
      </p>
      <button className="btn btn-white text-black border border-dark px-4 py-2 rounded-pill d-flex align-items-center justify-content-center mx-auto btn-hover-black">
        Start Generating Invoice Now
        <ArrowRight size={20} className="ms-2" />
      </button>
      <p className="pt-2 mt-1">This will load to invoice generate interface</p>

      {/* Footer Bottom Section */}
      <div className="bg-dark text-white py-4 mt-5">
        <div className="container d-flex flex-column align-items-center justify-content-center">
          <img src={assets.logo} alt="QuickInvoice Logo" width={50} height={50} />
          <div className="d-flex gap-3 mt-3">
            <a href="#" className="text-white fs-5"><Instagram /></a>
            <a href="#" className="text-white fs-5"><Twitter /></a>
            <a href="#" className="text-white fs-5"><Youtube /></a>
          </div>
          <p className="mt-3 mb-0">&copy; {new Date().getFullYear()} QuickInvoice. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .btn-hover-black:hover {
          background-color: black !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Footer;
