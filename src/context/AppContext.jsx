import React, { createContext, useState } from 'react';
export const AppContext = createContext();



const initialInvoiceData = {
    companyName: '',
    companyPhone: '',
    companyAddress: '',
    companyLogo: '', // for logo upload

    billTo: {
        name: '',
        phone: '',
        address: '',
    },

    shipTo: {
        name: '',
        phone: '',
        address: '',
    },
    invoice: {
        invoiceNumber: '',
        invoiceDate: '',
       
    },

     paymentDueDate: '',
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
            amount: '',
        },
    ],


    totalAmount: '',

    bankDetails: {
        bankName: '',
        accountNumber: '',
        ifscCode: '',
    },

    notes: `1. Payment due within 15 days.\n2. Warranty void if seal is broken.\n3. Goods once sold will not be taken back.\n4. Subject to XYZ jurisdiction only.`
    ,
    taxSummary: [
        {
            rate: '',
            taxableAmount: '',
            cgstAmount: '',
            sgstAmount: '',
            totalTax: '',
        },
    ],
    gstin: '',
    pan: '',
    vehicleNumber: '',
    ewayBill:'',
    eInvoice:''
}


const baseURL="http://localhost:8080/api"
export const AppContextProvider = ({ children }) => {
    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [template, setTemplate] = useState("template1");
    const contextValue = {
        invoiceTitle,
        setInvoiceTitle,

        template,
        setTemplate,

        invoiceData,
        setInvoiceData,

        initialInvoiceData,
        baseURL

    }
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}