import React from 'react';
import { ArrowRight } from 'react-bootstrap-icons';

const steps = [
  {
    step: 'Step 1',
    title: 'Enter Details',
    description: 'Begin by entering essential information such as your company name, client details, invoice date, due date, and itemized billing data. Our form is simple and guides you through each required field.',
    bgColor: '#f8d7da',
  },
  {
    step: 'Step 2',
    title: 'Choose Template',
    description: 'Select from a wide range of beautifully crafted invoice templates designed to suit different business styles. Customize colors, logos, and layout to match your brand identity perfectly.',
    bgColor: '#d1ecf1',
  },
  {
    step: 'Step 3',
    title: 'Preview Invoice',
    description: 'Before finalizing, preview the complete invoice layout to ensure accuracy in details and formatting. Make quick edits if needed and check how it will appear to your client.',
    bgColor: '#d4edda',
  },
  {
    step: 'Step 4',
    title: 'Download & Save',
    description: 'Once satisfied, download your invoice instantly in high-quality PDF format. Save it securely or send it directly to your client through email or messaging platforms.',
    bgColor: '#fff3cd',
  },
];

const Cards = () => {
  return (
    <div className="container-fluid px-3 py-5 text-center">
      <h2 className="fw-bold mb-5 fs-2">Get Started in 4 Simple Steps</h2>
      <div className="row g-4 align-items-center justify-content-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="col-md-6 col-lg-2">
              <div
                className="card h-100 border-0"
                style={{
                  backgroundColor: step.bgColor,
                  width: '100%',
                  minHeight: '280px',
                  padding: '20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="card-body p-2">
                 <h4 className="text-uppercase fw-bolder fs-4 mb-2">{step.step}</h4>
<h5 className="fw-semibold fs-5 mb-2 text-dark">{step.title}</h5>
<p className="text-muted fs-6 mb-0">{step.description}</p>
                </div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="col-auto d-none d-lg-block">
                <ArrowRight size={32} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Cards;
