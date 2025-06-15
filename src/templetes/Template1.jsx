import React from 'react';

const Template1 = ({ data }) => {
  const wrapText = (text, length = 30) => {
    if (!text) return ['N/A'];
    const regex = new RegExp(`.{1,${length}}`, 'g');
    return text.match(regex);
  };
  console.log("doootaaaa", data);

  const styles = {
    greyHeader: {
    
      backgroundColor: '#e0e0e0',
      color: '#000',
      fontWeight: 'bold',
      padding: '8px'
    },
    greyFooter: {
      backgroundColor: '#f0f0f0',
      color: '#333',
      padding: '8px'
    }
  };

  const numberToWords = (num) => {
    const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
      'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? '-' + a[n % 10] : '');
      if (n < 1000) return a[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + inWords(n % 100) : '');
      if (n < 100000) return inWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + inWords(n % 1000) : '');
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' lakh' + (n % 100000 ? ' ' + inWords(n % 100000) : '');
      return inWords(Math.floor(n / 10000000)) + ' crore' + (n % 10000000 ? ' ' + inWords(n % 10000000) : '');
    };

    const number = parseInt(num, 10);
    if (isNaN(number)) return 'Invalid amount';
    if (number === 0) return 'Zero rupees only';
    return inWords(number).replace(/\b\w/g, c => c.toUpperCase()) + ' rupees only';
  };

  return (
    <div className="container my-4 ">

      <div style={styles.greyHeader} className="text-center mb-4 border border-dark p-3 ">
        <div className="border rounded p-4">


          <h2 className="fw-bold mb-3" style={{ marginLeft: '-6%' }}>Tax Invoice</h2>

          <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap">
            <div className="ms-5 " style={{ width: '120px', height: '120px' }}>
              <img
                src={data.companyLogo}
                alt="Company Logo"
                className="img-fluid "
                style={{ width: '100%', height: '100%', objectFit: 'fill' }}
              />
            </div>

            <div className="flex-grow-1 text-center px-3" style={{ minWidth: '250px' }}>
              <h4 className="mb-2">{data.companyName || "Company Name"}</h4>
              <p className="mb-0">{data.companyAddress || "Company Address"}</p>
            </div>

            <div className="text-start" style={{ minWidth: '250px', whiteSpace: 'nowrap' }}>
              <p className="mb-1">Phone: {data.companyPhone || "N/A"}</p>
              <p className="mb-1">GSTIN: {data.gstin || "N/A"}</p>
              <p className="mb-1">PAN No.: {data.pan || "N/A"}</p>
              <p className="mb-1">Ewaybill: {data.ewayBill || "N/A"}</p>
              <p className="mb-1">E-Invoice: {data.eInvoice || "N/A"}</p>
              <p className="mb-1">Vehicle No.: {data.vehicleNumber || "N/A"}</p>
            </div>
          </div>

        <div className="container-fluid">
  <div className="d-flex justify-content-between mb-4 flex-wrap gap-3">
    
    {/* Bill To */}
    <div className="border border-dark p-3" style={{ flex: '1 1 30%', minWidth: '280px' }}>
      <h5 className="fw-bold mb-2 border-bottom pb-1 text-start">Bill To</h5>
      <p className="mb-1 text-start">Name: {data.billTo?.name || "N/A"}</p>
      <p className="mb-1 text-start">Phone: {data.billTo?.phone || "N/A"}</p>
      <p className="mb-1 text-start">Address: {wrapText(data.billTo?.address)[0]}</p>
      {wrapText(data.billTo?.address).slice(1).map((line, index) => (
        <p className="mb-1 text-start" key={index} style={{ paddingLeft: "70px" }}>{line}</p>
      ))}
      <p className="mb-1 text-start">GSTIN: {data.billTo?.gstin || "N/A"}</p>
    </div>

    {/* Ship To */}
    <div className="border border-dark p-3" style={{ flex: '1 1 30%', minWidth: '280px' }}>
      <h5 className="fw-bold mb-2 border-bottom pb-1 text-start">Ship To</h5>
      <p className="mb-1 text-start">Name: {data.shipTo?.name || "N/A"}</p>
      <p className="mb-1 text-start">Phone: {data.shipTo?.phone || "N/A"}</p>
      <p className="mb-1 text-start">Address: {wrapText(data.shipTo?.address)[0]}</p>
      {wrapText(data.shipTo?.address).slice(1).map((line, index) => (
        <p className="mb-1 text-start" key={index} style={{ paddingLeft: "70px" }}>{line}</p>
      ))}
    </div>

    {/* Invoice Details */}
    <div className="border border-dark p-3" style={{ flex: '1 1 30%', minWidth: '280px' }}>
      <h5 className="fw-bold mb-2 border-bottom pb-1 text-start">Invoice Details</h5>
      <p className="mb-1 text-start"><strong>Invoice No.:</strong> {data.invoice?.invoiceNumber || "N/A"}</p>
      <p className="mb-1 text-start"><strong>Date:</strong> {data.invoice?.invoiceDate || "N/A"}</p>
      <p className="mb-1 text-start"><strong>Payment Due Date:</strong> {data.paymentDueDate || "N/A"}</p>
    </div>
    
  </div>
</div>



          <div className="p-3 mb-4">
            <h5 className="fw-bold mb-3 text-start">Item Details</h5>
            <div className="table-responsive ">
              <div className='border border-dark '>
                  <table className="table table-bordered mb-0 ">
                <thead style={{ backgroundColor: '#e0e0e0' }} className="text-center">
                  <tr>
                    <th>S.No</th>
                    <th>Description</th>
                    <th>HSN Code</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>CGST (%)</th>
                    <th>CGST Amt</th>
                    <th>SGST (%)</th>
                    <th>SGST Amt</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items?.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td className="text-start">{item.description}</td>
                      <td>{item.hsnCode}</td>
                      <td>{item.qty}</td>
                      <td>{item.unit}</td>
                      <td>{item.price}</td>
                      <td>{item.discount}</td>
                      <td>{item.cgstRate}</td>
                      <td>{item.cgstAmount}</td>
                      <td>{item.sgstRate}</td>
                      <td>{item.sgstAmount}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td colSpan="11" className="text-end fw-bold">Total Amount (₹):</td>
                    <td className="text-center fw-bold">{data.totalAmount || "0.00"}</td>
                  </tr>
                  <tr>
                    <td colSpan="12" className="text-start fw-bold">
                      Amount: {numberToWords(data.totalAmount || 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              </div>
            
            </div>
          </div>

          <div className="p-3 mb-4">
            <h5 className="fw-bold mb-3 text-start">Tax Summary</h5>
            <div className="table-responsive">
              <div className='border border-dark '>
 <table className="table table-bordered mb-0">
                <thead style={{ backgroundColor: '#e0e0e0' }}>
                  <tr>
                    <th className="text-center">Tax Rate (%)</th>
                    <th className="text-center">Taxable Amount (₹)</th>
                    <th className="text-center">CGST (₹)</th>
                    <th className="text-center">SGST (₹)</th>
                    <th className="text-center">Total Tax (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.taxSummary?.map((tax, index) => (
                    <tr key={index}>
                      <td className="text-center">{tax.rate}</td>
                      <td className="text-center">{tax.taxableAmount}</td>
                      <td className="text-center">{tax.cgstAmount}</td>
                      <td className="text-center">{tax.sgstAmount}</td>
                      <td className="text-center">{tax.totalTax}</td>
                    </tr>
                  ))}
                  <tr className="fw-bold">
                    <td className="text-center">Total Tax</td>
                    <td className="text-center">
                      {data.taxSummary?.reduce((sum, t) => sum + Number(t.taxableAmount || 0), 0).toFixed(2)}
                    </td>
                    <td className="text-center">
                      {data.taxSummary?.reduce((sum, t) => sum + Number(t.cgstAmount || 0), 0).toFixed(2)}
                    </td>
                    <td className="text-center">
                      {data.taxSummary?.reduce((sum, t) => sum + Number(t.sgstAmount || 0), 0).toFixed(2)}
                    </td>
                    <td className="text-center">
                      {data.taxSummary?.reduce((sum, t) => sum + Number(t.totalTax || 0), 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
             
            </div>
          </div>

          <div className="p-3 mb-4">
            <h5 className="fw-bold mb-3 text-start">Bank Details</h5>
            <div className="d-flex justify-content-between flex-wrap">
              <p className="mb-1 me-3"><strong>Bank Name:</strong> {data.bankDetails?.bankName || "N/A"}</p>
              <p className="mb-1 me-3"><strong>Account Number:</strong> {data.bankDetails?.accountNumber || "N/A"}</p>
              <p className="mb-1"><strong>IFSC Code:</strong> {data.bankDetails?.ifscCode || "N/A"}</p>
            </div>
          </div>

          <div className="p-3 d-flex justify-content-between flex-wrap text-start">
            <div className="flex-fill pe-3 border" style={{ minWidth: '200px' }}>
              <div className='p-2'>
                <h5 className="fw-bold mb-3">Terms & Conditions</h5>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  1. Payment due within 15 days.{"\n"}
                  2. Warranty void if seal is broken.{"\n"}
                  3. Goods once sold will not be taken back.{"\n"}
                  4. Subject to XYZ jurisdiction only.
                </div>
              </div>
            </div>

            <div className="flex-fill text-center py-4 border" style={{ minWidth: '200px' }}>
              <p className="fw-bold">Receiver's Signature</p>
              <div style={{ borderBottom: '1px solid #000', width: '60%', margin: '0 auto' }}></div>
            </div>

            <div className="flex-fill ps-3 d-flex flex-column align-items-end justify-content-end text-end border" style={{ minWidth: '200px' }}>
              <div className='p-2 m-2'>
                <p className="fw-bold mb-2">For {data.companyName || "Company"}</p>
                <p className="mt-5">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Template1;
