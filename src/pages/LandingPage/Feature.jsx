import React from 'react';

const features = [
  {
    title: 'Easy to fill invoice details',
    description:
      'QuickInvoice provides an intuitive form that makes it effortless to fill in client information, itemized billing, and due dates without confusion.',
    img: 'https://placehold.co/500x300?text=Feature+1',
    reverse: false,
    color: '#007bff', // Blue
  },
  {
    title: 'Beautiful dashboard',
    description:
      'Track your invoices, client details, and payment status from a centralized, visually appealing dashboard designed for clarity and productivity.',
    img: 'https://placehold.co/500x300?text=Feature+2',
    reverse: true,
    color: '#17a2b8', // Teal
  },
  {
    title: 'Invoice Preview with Action Buffers',
    description:
      'Preview your invoice before sending, with actionable buttons to edit, download, or send — ensuring accuracy and control at every step.',
    img: 'https://placehold.co/500x300?text=Feature+3',
    reverse: false,
    color: '#fd7e14', // Orange
  },
  {
    title: 'Send invoice instantly',
    description:
      'With just a click, send your invoice directly to clients via email or messaging apps — saving time and speeding up the payment process.',
    img: 'https://placehold.co/500x300?text=Feature+4',
    reverse: true,
    color: '#28a745', // Green
  },
];

const Feature = () => {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-5 fs-2" style={{ color: '#2c3e50' }}>
        Why do we use <span style={{ color: '#007bff' }}>QuickInvoice</span>??
      </h2>
      {features.map((feature, index) => (
        <div
          key={index}
          className={`row align-items-center mb-5 ${
            feature.reverse ? 'flex-row-reverse' : ''
          }`}
        >
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={feature.img}
              alt={feature.title}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h4 className="fw-bold mb-3" style={{ color: feature.color }}>{feature.title}</h4>
            <p className="text-muted fs-6">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;

