import React, { useContext, useEffect, useRef, useState } from 'react';
import { templates } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import './Preview.css';
import PDF from './PDF';
import { deleteInvoice, saveInvoice } from '../service/InvoiceService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import uploadInvoiceThumbnail from '../service/cloudinaryService';
import { generatePdfFromElement } from '../service/pdf';
import { sendInvoice } from '../service/InvoiceService';
import { useAuth, useUser } from '@clerk/clerk-react';

const Preview = () => {
  const { template, setTemplate, invoiceData, baseURL } = useContext(AppContext);
  const previewRef = useRef();
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [email, setEmail] = useState("");
  const {getToken}=useAuth();


 

  const navigate = useNavigate();
  const {user}=useUser();


  
  const handleDownloadPdf = async () => {
    try {
      setDownloadLoading(true);
      
      await generatePdfFromElement(previewRef, `${invoiceData?.title || "invoice"}_${Date.now()}.pdf`, true);
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("PDF generation failed", error);
      toast.error("Failed to generate PDF");
    } finally {
      setDownloadLoading(false);
    }
  };

  

   useEffect(()=>{
    if(!invoiceData || !invoiceData.items?.length){
      toast.error("Invoice data is empty");
      navigate("/dashboard");
    }
  },[invoiceData,navigate])

  
  const handleDeleteInvoice = async () => {
    try {
      setLoading(true);
      const token=await getToken();
      await deleteInvoice(baseURL, invoiceData.id,token);
      toast.success("Invoice deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete invoice");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveandExit = async () => {
    try {
      setLoading(true);
      const respo = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
        scrollY: -window.scrollY
      });

      const imageData = respo.toDataURL("image/png");
      const thumbnailUrl = await uploadInvoiceThumbnail(imageData);

      const payload = {

        ...invoiceData,
        company: {
          companyName: invoiceData.companyName,
          companyAddress: invoiceData.companyAddress,
          companyPhone: invoiceData.companyPhone,
          companyLogo: invoiceData.companyLogo
        },
        template: template,
        thumbnailUrl: thumbnailUrl,
        clerkId:user.id
      };
      console.log("payload", payload);
       
     const token=await getToken();
      const response = await saveInvoice(baseURL, payload,token);
      if (response.status === 200) {
        toast.success("Invoice Added Successfully");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save invoice");
    } finally {
      setLoading(false);
    }
  };
  const handleSendInvoice = async () => {
    try {
      setLoading(true);

      // Generate the PDF in memory as Blob (NO download)
      const blob = await generatePdfFromElement(previewRef);

      // Convert blob to File for FormData
      const file = new File([blob], `invoice_${Date.now()}.pdf`, { type: 'application/pdf' });

      // Prepare FormData for backend
      const formData = new FormData();
      formData.append('email', email); // 👈 must match @RequestParam
      formData.append('file', file);   // 👈 must match @RequestParam
      const token=await getToken();
      await sendInvoice(baseURL, formData,token);
      toast.success("Invoice sent successfully");
      setShowModel(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send invoice");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="container py-5 text-center">
      <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
        {invoiceData?.id && (
          <button className="btn btn-outline-danger fw-semibold px-4" onClick={handleDeleteInvoice} disabled={loading}>
            Delete Invoice
          </button>
        )}
        <button className="btn btn-outline-secondary fw-semibold px-4" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        <button className="btn btn-outline-primary fw-semibold px-4" onClick={() => setShowModel(true)}>Send Email</button>
        <button
          className="btn btn-outline-success fw-semibold px-4 d-flex align-items-center justify-content-center gap-2"
          onClick={handleDownloadPdf}
          disabled={downloadLoading}
        >
          {downloadLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Downloading...
            </>
          ) : (
            "Download PDF"
          )}
        </button>
        <button
          className="btn btn-dark fw-semibold px-4 d-flex align-items-center justify-content-center gap-2"
          onClick={handleSaveandExit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            "Save and Exit"
          )}
        </button>
      </div>

      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {templates.map((temp) => (
          <button
            key={temp.id}
            className={`btn rounded-pill px-4 py-2 fw-semibold template-btn ${template === temp.id ? 'selected-template' : ''}`}
            onClick={() => setTemplate(temp.id)}
          >
            {temp.name}
          </button>
        ))}
      </div>

      <div ref={previewRef} className="mt-5">
        <PDF invoiceData={invoiceData} template={template} />
      </div>

      {showModel && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Invoice via Email</h5>
                <button type="button" className="close" onClick={() => setShowModel(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="email"
                  placeholder="Enter recipient's email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModel(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSendInvoice} disabled={loading}>
                  {loading ? "Sending..." : "Send Invoice"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
