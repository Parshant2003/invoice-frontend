import { Currency } from "lucide-react";


export const formatInvoiceData = (invoiceData = {}) => {
  const {
    companyName = '',
    companyPhone = '',
    companyAddress = '',
    companyLogo = '',

    billTo = {
      name: '',
      address: '',
      phone: '',
      gstin: ''
    },

    shipTo = {
      name: '',
      address: '',
      phone: '',
      gstin: ''
    },

    invoice = {
      number: '',
      date: '',
      dueDate: ''
    },

    items = [
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
        amount: '',
      }

    ],

    totalAmount = '',

    bankDetails = {
      accountNumber: '',
      ifsc: '',
      bankName: '',
      upi: ''
    },

    notes = '',

    taxSummary= [
      {
        rate: '',
        taxableAmount: '',
        cgstAmount: '',
        sgstAmount: '',
        totalTax: '',
      }
    ],
    gstin = '',
    pan = '',
    vehicleNumber = '',
    ewayBill='',
    eInvoice=''

  } = invoiceData;

  const currency = "₹"

  return {
    companyName,
    companyPhone,
    companyAddress,
    companyLogo,
    billTo,
    shipTo,
    invoice,
    items,
    totalAmount,
    bankDetails,
    notes,
    taxSummary,
    gstin,
    pan,
    vehicleNumber,
    currency,
    ewayBill,
    eInvoice
  };
};

export const formatDate=(DateString)=>{
  if(!DateString){
    return "N/A";
  }
  const date=new Date(DateString);
 return  date.toLocaleDateString("en-GB",{
    day:"2-digit",
    month:"short",
    year:"numeric"

  })

}
