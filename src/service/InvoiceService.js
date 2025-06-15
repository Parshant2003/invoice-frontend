import axios from "axios";

// Save a new invoice
export const saveInvoice = (baseURL, payload, token) => {
  return axios.post(`${baseURL}/invoices`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Fetch all invoices (requires auth)
export const getAllInvoices = (baseURL, token) => {
  return axios.get(`${baseURL}/invoices/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete an invoice by ID (requires auth)
export const deleteInvoice = (baseURL, id, token) => {
  return axios.delete(`${baseURL}/invoices/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Send invoice via email (requires auth + form data)
export const sendInvoice = (baseURL, formData, token) => {
  return axios.post(`${baseURL}/invoices/sendinvoice`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
