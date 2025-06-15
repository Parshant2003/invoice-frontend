import React, { useContext, useState } from 'react';
import { Pencil } from 'react-bootstrap-icons';
import { AppContext } from '../context/AppContext';
import InvoiceForm from './InvoiceForm';
import TemplateGrid from './TemplateGrid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {

  const navigate=useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { invoiceTitle, setInvoiceTitle ,invoiceData,setInvoiceData, 
        setTemplate,
} = useContext(AppContext);


  const handleTitleEdit = () => {
    setIsEditing(true);
  };

  const handleTemplateClick=(id)=>{
      const hasInvalidItems=invoiceData.items.some(
        (items)=>!items.qty || !items.amount
      );
      if(hasInvalidItems){
        toast.error("Please enter qunatity and amount for all items")
        return ;
      }
      setTemplate(id);
      console.log("Tid-->",id);
      
      //navigate
      navigate("/preview")

  }

  const handleTitleChange = (e) => {
    setInvoiceTitle(e.target.value);
    setInvoiceData((prev)=>({
      ...prev,
      title:e.target.value
    }))
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  return (
  <div

>
  <div className="container py-5">
    {/* Editable Title Section */}
    <div
      className="rounded p-3 bg-light mb-4"
    style={{
            border: '1px ',
            boxShadow: '0 0 10px rgba(107, 211, 232, 0.94)'
          }}
    >
      <div className="d-flex align-items-center w-100">
        {isEditing ? (
          <input
            type="text"
            className="form-control form-control-sm border-info text-primary"
            value={invoiceTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <p className="me-2 mb-0 flex-grow-1 w-100 small text-success fw-semibold">
            {invoiceTitle || "Click the pencil icon to name your invoice"}
          </p>
        )}
        <button
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={handleTitleEdit}
        >
          <Pencil size={16} />
        </button>
      </div>
    </div>

    {/* Full-width Invoice Form Section */}
    <div className="row">
      <div className="col-12">
        <div
          className="rounded p-3 bg-white"
          style={{
            border: '1px ',
            boxShadow: '0 0 10px rgba(107, 211, 232, 0.94)'
          }}
        >
          <InvoiceForm />

        </div>
      </div>
    </div>

    <div>
      <TemplateGrid onTemplateClick={handleTemplateClick}/>
    </div>
  </div>
</div>

     );
};

export default MainPage;
