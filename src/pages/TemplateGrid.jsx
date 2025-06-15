import React from 'react';
import { templates } from '../assets/assets';

const TemplateGrid = ({ onTemplateClick }) => {
  return (
<div
  className="container py-5"
  style={{
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '20px'
  }}
>
  <h4 className="fw-bold mb-4 text-black pb-2 text-center">Choose a Template</h4>

  <div className="row g-1">
    {templates.map((template, index) => (
      <div className="col-md-4 col-sm-6" key={index} style={{ padding: '4px' }}>
        <div
          className="card h-100 shadow-sm"
          onClick={() => onTemplateClick(template.id)}
          style={{
            cursor: 'pointer',
            height: '400px',
            width: '100%',
            border: '1px solid #ccc',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.1)';
          }}
        >
          <img
            src={template.image}
            alt={template.name}
            className="card-img-top"
            style={{
              height: '250px',
              width: '100%',
              objectFit: 'cover'
            }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title text-center text-black">{template.name}</h5>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



  );
};

export default TemplateGrid;
