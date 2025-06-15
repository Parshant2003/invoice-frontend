import React, { forwardRef } from 'react';
import { formatInvoiceData } from '../Utils/formatInvoiceData';
import { templateComponent } from '../templetes/template';

const PDF = forwardRef(({ invoiceData, template }, ref) => {
  const data = formatInvoiceData(invoiceData);
  const SelectedTemplate = templateComponent[template] || templateComponent["template1"];

  return (
    <div ref={ref}>
      <SelectedTemplate data={data} />
    </div>
  );
});

export default PDF;
