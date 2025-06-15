import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { getAllInvoices } from '../service/InvoiceService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../Utils/formatInvoiceData';
import { useAuth } from '@clerk/clerk-react';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const {
    baseURL,
    setInvoiceData,
    setTemplate,
    setInvoiceTitle,
    initialInvoiceData
  } = useContext(AppContext);
  const navigate = useNavigate();
  const{getToken}= useAuth();
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token=await getToken();
        const response = await getAllInvoices(baseURL,token);
        setInvoices(response.data.data);
      } catch (error) {
        toast.error("Sorry, failed to load invoices");
        console.error(error);
      }
    };

    fetchInvoices();
  }, [baseURL]);

  const handleAddInvoice = () => {
       setInvoiceTitle("New Invoice")
       setTemplate("template1")
       setInvoiceData(initialInvoiceData)
       navigate("/generate")
  };

const handleViewClick = (invoice) => {
  const flattenedInvoice = {
    ...invoice,
    companyName: invoice.company?.companyName || '',
    companyPhone: invoice.company?.companyPhone || '',
    companyAddress: invoice.company?.companyAddress || '',
    companyLogo: invoice.company?.companyLogo || '',
  };

  setInvoiceData(flattenedInvoice);
  setTemplate(invoice.template || "template1");
  setInvoiceTitle(invoice.title || "New Invoice");
  navigate("/preview");
};


  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header and Add Invoice Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">All Invoices</h2>
        </div>

        {/* Invoice Cards */}
        <div className="row">
          {/* Add New Invoice Card */}
          <div className="col-md-4 mb-4">
            <div
              className="card text-center h-100 border border-secondary border-2 bg-white"
              role="button"
              onClick={handleAddInvoice}
              style={{ transition: 'transform 0.3s, background-color 0.3s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <h1 className="display-4 text-muted">+</h1>
                <p className="fw-semibold mb-0">Add New Invoice</p>
              </div>
            </div>
          </div>

          {/* Render Existing Invoices */}
          {invoices.length === 0 ? (
            <div className="text-center">No invoices found.</div>
          ) : (
            invoices.map((invoice) => (
              <div className="col-md-4 mb-4" key={invoice.id}>
                <div
                  className="card h-100 bg-white"
                  role="button"
                  onClick={() => handleViewClick(invoice)}
                  style={{ transition: 'transform 0.3s, background-color 0.3s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <div className="border rounded card-body">
                    {invoice.thumbnailUrl && (
                      <img
                        src={invoice.thumbnailUrl}
                        className="card-img-bottom img-fluid mb-2"
                        alt="Invoice Thumbnail"
                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <p className="card-text mb-1"><strong>Title:</strong> {invoice?.title}</p>
                    <p className="card-text mb-1"><strong>Date:</strong> {formatDate(invoice?.invoice?.invoiceDate)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
