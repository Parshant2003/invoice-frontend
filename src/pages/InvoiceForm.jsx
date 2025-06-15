import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash } from 'react-bootstrap-icons';
import { assets } from '../assets/assets';

const InvoiceForm = () => {

  const {
    invoiceData,
    setInvoiceData,
  } = useContext(AppContext);

  // Initial state template
  const getInitialState = () => {
    const generateRandomPAN = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const digits = '0123456789';
      return (
        chars[Math.floor(Math.random() * 26)] +
        chars[Math.floor(Math.random() * 26)] +
        chars[Math.floor(Math.random() * 26)] +
        digits[Math.floor(Math.random() * 10)] +
        chars[Math.floor(Math.random() * 26)] +
        digits[Math.floor(Math.random() * 10)] +
        digits[Math.floor(Math.random() * 10)] +
        digits[Math.floor(Math.random() * 10)] +
        digits[Math.floor(Math.random() * 10)] +
        chars[Math.floor(Math.random() * 26)]
      );
    };

    const generateRandomGSTIN = (pan) => {
      const stateCode = Math.floor(10 + Math.random() * 27); // 10–36
      const entityCode = Math.floor(Math.random() * 10);
      const checkChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      return `${stateCode}${pan}${entityCode}Z${checkChar}`;
    };

    const generateVehicleNumber = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return (
        letters[Math.floor(Math.random() * 26)] +
        letters[Math.floor(Math.random() * 26)] +
        "-" +
        Math.floor(10 + Math.random() * 90) +
        "-" +
        Math.floor(1000 + Math.random() * 9000)
      );
    };

    const generateInvoiceNumber = () => {
      return `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    };

    const pan = generateRandomPAN();
    const gstin = generateRandomGSTIN(pan);
    const vehicle = generateVehicleNumber();
    const invoiceNumber = generateInvoiceNumber();
    const today = new Date().toISOString().split('T')[0];

    return {
      companyLogo: '',
      companyName: '',
      companyPhone: '',
      companyAddress: '',
      vehicleNumber: vehicle,
      gstin: gstin,
      pan: pan,
      billTo: {
        name: '',
        phone: '',
        address: ''
      },
      shipTo: {
        name: '',
        phone: '',
        address: ''
      },
      invoice: {
        invoiceNumber: invoiceNumber,
        invoiceDate: today
      },
      paymentDueDate: today,
      ewayBill: '',
      eInvoice: '',
      items: [
        {
          description: '',
          hsnCode: '',
          qty: '',
          unit: '',
          price: '',
          discount: '',
          cgstRate: '',
          cgstAmount: '',
          sgstRate: '',
          sgstAmount: '',
          amount: ''
        }
      ],
      taxSummary: [],
      totalAmount: '0.00',
      bankDetails: {
        bankName: '',
        accountNumber: '',
        ifscCode: ''
      },
      notes: ''
    };
  };

  // Reset to initial values when component mounts
  useEffect(() => {
    const initialData = getInitialState();
    setInvoiceData(initialData);
  }, []); // Empty dependency array means this runs only once when component mounts

  useEffect(() => {
    const grouped = {};
    let totalAmount = 0;

    invoiceData.items.forEach((item) => {
      const qty = parseFloat(item.qty || 0);
      const price = parseFloat(item.price || 0);
      const discount = parseFloat(item.discount || 0);
      const cgstRate = parseFloat(item.cgstRate || 0);
      const sgstRate = parseFloat(item.sgstRate || 0);
      const cgstAmount = parseFloat(item.cgstAmount || 0);
      const sgstAmount = parseFloat(item.sgstAmount || 0);
      const taxRate = cgstRate + sgstRate;

      const baseAmount = price * qty;
      const discountedAmount = baseAmount - (baseAmount * discount / 100);
      const totalTax = cgstAmount + sgstAmount;
      const itemAmount = discountedAmount + totalTax;

      // ✅ Add to total invoice amount
      totalAmount += itemAmount;

      // ✅ Group tax summary by tax rate
      if (!grouped[taxRate]) {
        grouped[taxRate] = {
          rate: taxRate,
          taxableAmount: 0,
          cgstAmount: 0,
          sgstAmount: 0,
          totalTax: 0,
        };
      }

      grouped[taxRate].taxableAmount += discountedAmount;
      grouped[taxRate].cgstAmount += cgstAmount;
      grouped[taxRate].sgstAmount += sgstAmount;
      grouped[taxRate].totalTax += totalTax;
    });

    const summaryArray = Object.values(grouped).map((tax) => ({
      ...tax,
      taxableAmount: tax.taxableAmount.toFixed(2),
      cgstAmount: tax.cgstAmount.toFixed(2),
      sgstAmount: tax.sgstAmount.toFixed(2),
      totalTax: tax.totalTax.toFixed(2),
    }));

    setInvoiceData((prev) => ({
      ...prev,
      taxSummary: summaryArray,
      totalAmount: totalAmount.toFixed(2),
    }));
  }, [invoiceData.items]);

  // Add a manual reset function if needed
  const resetForm = () => {
    const initialData = getInitialState();
    setInvoiceData(initialData);
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items,
      {
        description: '',
        hsnCode: '',
        qty: '',
        unit: '',
        price: '',
        discount: '',
        cgstRate: '',
        cgstAmount: '',
        sgstRate: '',
        sgstAmount: '',
        amount: ''
      }
      ]
    }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prev) => ({
          ...prev,
          companyLogo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (arg1, arg2, value) => {
    // For invoice items (arg1 is index)
    if (typeof arg1 === "number") {
      const updatedItems = [...invoiceData.items];
      updatedItems[arg1][arg2] = value;

      const qty = parseFloat(updatedItems[arg1].qty) || 0;
      const price = parseFloat(updatedItems[arg1].price) || 0;
      const discount = parseFloat(updatedItems[arg1].discount) || 0;
      const cgstRate = parseFloat(updatedItems[arg1].cgstRate) || 0;
      const sgstRate = parseFloat(updatedItems[arg1].sgstRate) || 0;

      const discountedPrice = price - (price * discount / 100);
      const cgstAmount = (discountedPrice * cgstRate / 100) * qty;
      const sgstAmount = (discountedPrice * sgstRate / 100) * qty;
      const amount = (discountedPrice * qty) + cgstAmount + sgstAmount;

      updatedItems[arg1].cgstAmount = cgstAmount.toFixed(2);
      updatedItems[arg1].sgstAmount = sgstAmount.toFixed(2);
      updatedItems[arg1].amount = amount.toFixed(2);

      setInvoiceData(prev => ({ ...prev, items: updatedItems }));
    }

    // For nested objects like billTo or shipTo
    else if (arg1 === "bankDetails") {
      setInvoiceData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [arg2]: value
        }
      }))
    }
    else if (arg1 === "billing" || arg1 === "shipping") {
      const section = arg1 === "billing" ? "billTo" : "shipTo";
      setInvoiceData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [arg2]: value
        }
      }));
    }
    else if (arg1 === "invoice") {
      setInvoiceData(prev => ({
        ...prev,
        invoice: {
          ...prev.invoice,
          [arg2]: value
        }
      }));
    }
    else {
      setInvoiceData(prev => ({
        ...prev,
        [arg1]: value
      }));
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({
      ...prev,
      items: updatedItems
    }));
  };

  return (
    <form className="container py-4 bg-light border rounded shadow-lg">

      {/* Reset Button (Optional) */}
      <div className="d-flex justify-content-end mb-3">
        <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
          Reset Form
        </button>
      </div>

      {/* === Section: Company Info === */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Company Information</div>
        <div className="card-body">
          <div className="row align-items-center mb-3">
            <div className="col-auto fw-semibold">Upload Company Logo:</div>
            <div className="col-auto">
              <input
                type="file"
                id="logo-upload"
                className="d-none"
                onChange={handleLogoUpload}
              />

              {!invoiceData.companyLogo ? (
                <label htmlFor="logo-upload" style={{ cursor: 'pointer' }}>
                  <img
                    src={assets.upload}
                    alt="Upload Placeholder"
                    style={{ width: '70px', height: '60px', objectFit: 'cover', padding: '1px' }}
                  />
                </label>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={invoiceData.companyLogo}
                    alt="Logo Preview"
                    style={{ height: '60px', objectFit: 'contain' }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger m-2"
                    onClick={() =>
                      setInvoiceData((prev) => ({ ...prev, companyLogo: '' }))
                    }
                  >
                    <Trash />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Company Name</label>
              <input
                className="form-control"
                placeholder="Company Name"
                value={invoiceData.companyName}
                onChange={(e) => handleInputChange("companyName", null, e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Phone</label>
              <input
                className="form-control"
                placeholder="Phone"
                value={invoiceData.companyPhone}
                onChange={(e) => handleInputChange("companyPhone", null, e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Address</label>
              <textarea
                className="form-control"
                placeholder="Address"
                rows="1"
                value={invoiceData.companyAddress}
                onChange={(e) => handleInputChange("companyAddress", null, e.target.value)}
              ></textarea>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Vehicle Number</label>
              <input
                className="form-control"
                placeholder="Vehicle Number"
                value={invoiceData.vehicleNumber}
                onChange={(e) => handleInputChange("vehicleNumber", null, e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">GSTIN Number</label>
              <input
                className="form-control"
                placeholder="GSTIN Number"
                value={invoiceData.gstin}
                onChange={(e) => handleInputChange("gstin", null, e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">PAN Number</label>
              <input
                className="form-control"
                placeholder="PAN Number"
                value={invoiceData.pan}
                onChange={(e) => handleInputChange("pan", null, e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Section: Billing & Shipping === */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Billing & Shipping</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Bill To</h6>
              <input
                className="form-control mb-2"
                placeholder="Name"
                value={invoiceData.billTo.name}
                onChange={(e) => handleInputChange("billing", "name", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="Phone"
                value={invoiceData.billTo.phone}
                onChange={(e) => handleInputChange("billing", "phone", e.target.value)}
              />
              <textarea
                className="form-control"
                placeholder="Address"
                rows="2"
                value={invoiceData.billTo.address}
                onChange={(e) => handleInputChange("billing", "address", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Ship To</h6>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="sameAsBilling"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInvoiceData((prev) => ({
                          ...prev,
                          shipTo: { ...prev.billTo },
                        }));
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor="sameAsBilling">
                    Same as Billing
                  </label>
                </div>
              </div>

              <input
                className="form-control mb-2"
                placeholder="Name"
                value={invoiceData.shipTo.name}
                onChange={(e) => handleInputChange("shipping", "name", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="Phone"
                value={invoiceData.shipTo.phone}
                onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
              />
              <textarea
                className="form-control"
                placeholder="Address"
                rows="2"
                value={invoiceData.shipTo.address}
                onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Section: Invoice Info === */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Invoice Information</div>
        <div className="card-body">
          <div className="row g-5">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Invoice Number</label>
              <input
                className="form-control"
                placeholder="Invoice Number"
                value={invoiceData.invoice.invoiceNumber}
                disabled
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Invoice Date</label>
              <input
                type="date"
                className="form-control"
                value={invoiceData.invoice.invoiceDate}
                onChange={(e) => handleInputChange('invoice', 'invoiceDate', e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Payment Due Date</label>
              <input
                type="date"
                className="form-control"
                value={invoiceData.paymentDueDate}
                onChange={(e) => handleInputChange('paymentDueDate', null, e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Eway Bill</label>
              <input
                className="form-control"
                placeholder="Eway Bill"
                value={invoiceData.totalAmount > 50000 ? invoiceData.ewayBill : ''}
                onChange={(e) => handleInputChange('ewayBill', null, e.target.value)}
                disabled={invoiceData.totalAmount <= 50000}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">E-Invoice</label>
              <input
                className="form-control"
                placeholder="Invoice Number"
                value={invoiceData.eInvoice}
                onChange={(e) => handleInputChange('eInvoice', null, e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Item */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Invoice Items</div>
        <div className="card-body px-0">
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center mb-0">
              <thead className="table-dark small">
                <tr>
                  <th>Description</th>
                  <th>HSN/SAC Code</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Disc (%)</th>
                  <th>CGST (%)</th>
                  <th>CGST Amt</th>
                  <th>SGST (%)</th>
                  <th>SGST Amt</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td><input className="form-control form-control-sm" value={item.description} onChange={e => handleInputChange(index, 'description', e.target.value)} /></td>
                    <td><input className="form-control form-control-sm" value={item.hsnCode} onChange={e => handleInputChange(index, 'hsnCode', e.target.value)} /></td>
                    <td><input type="number" className="form-control form-control-sm" value={item.qty} onChange={e => handleInputChange(index, 'qty', e.target.value)} /></td>
                    <td><input className="form-control form-control-sm" value={item.unit} onChange={e => handleInputChange(index, 'unit', e.target.value)} /></td>
                    <td><input type="number" className="form-control form-control-sm" value={item.price} onChange={e => handleInputChange(index, 'price', e.target.value)} /></td>
                    <td><input type="number" className="form-control form-control-sm" value={item.discount} onChange={e => handleInputChange(index, 'discount', e.target.value)} /></td>
                    <td><input type="number" className="form-control form-control-sm" value={item.cgstRate} onChange={e => handleInputChange(index, 'cgstRate', e.target.value)} /></td>
                    <td><input type="number" readOnly className="form-control form-control-sm" value={item.cgstAmount} /></td>
                    <td><input type="number" className="form-control form-control-sm" value={item.sgstRate} onChange={e => handleInputChange(index, 'sgstRate', e.target.value)} /></td>
                    <td><input type="number" readOnly className="form-control form-control-sm" value={item.sgstAmount} /></td>
                    <td><input type="number" readOnly className="form-control form-control-sm" value={item.amount} /></td>
                    <td>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveItem(index)} disabled={invoiceData.items.length <= 1}>
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ➕ Add Item Button */}
          <div className="mt-3 px-3">
            <button type="button" className="btn btn-sm btn-primary" onClick={addItem}>
              + Add Item
            </button>
          </div>

          {/* Total Amount */}
          <div className="mb-3 d-flex justify-content-between align-items-center mt-4 px-3">
            <label className="fw-bold mb-0">Total Amount</label>
            <div style={{ width: "250px" }}>
              <input
                type="text"
                className="form-control text-end"
                value={`Rs. ${invoiceData.totalAmount}`}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Total & Tax Summary === */}
      <div className="mb-4">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Tax Rate (%)</th>
              <th>Taxable Amount</th>
              <th>CGST Amount</th>
              <th>SGST Amount</th>
              <th>Total Tax</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.taxSummary.map((tax, index) => (
              <tr key={index}>
                <td>{tax.rate}%</td>
                <td>Rs. {tax.taxableAmount}</td>
                <td>Rs. {tax.cgstAmount}</td>
                <td>Rs. {tax.sgstAmount}</td>
                <td>Rs. {tax.totalTax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Bank Info === */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Bank Details</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Bank Name"
                value={invoiceData.bankDetails.bankName}
                onChange={(e) => handleInputChange('bankDetails', 'bankName', e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Account Number"
                value={invoiceData.bankDetails.accountNumber}
                onChange={(e) => handleInputChange('bankDetails', 'accountNumber', e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="IFSC Code"
                value={invoiceData.bankDetails.ifscCode}
                onChange={(e) => handleInputChange('bankDetails', 'ifscCode', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Notes === */}
      <div className="mb-4">
        <h5 className="fw-bold border-bottom pb-2 mb-3">Terms and Conditions</h5>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Enter Terms and Conditions...."
          value={invoiceData.notes}
          onChange={(e) => handleInputChange('notes', null, e.target.value)}
        ></textarea>
      </div>

    </form>
  );
};

export default InvoiceForm;