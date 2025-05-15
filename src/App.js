import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import InvoiceHeader from './components/InvoiceHeader';
import CompanyProfileForm from './components/CompanyProfileForm';
import CustomerInfoForm from './components/CustomerInfoForm';
import InvoiceItems from './components/InvoiceItems';
// import TaxInformation from './components/TaxInformation'; // We might not need this anymore in its original form
import InvoiceSummary from './components/InvoiceSummary';
import BankDetails from './components/BankDetails';
import { useNavigate } from 'react-router-dom';

function App() {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Your Company Name',
    address: 'Your Company Address, City, State, Pincode',
    mobile_no: '1234567890',
    email: '[email address removed]',
    website: 'www.yourwebsite.com',
    gstin: 'XXXXXXXXXXXXXXX',
    bankAccountName: 'Your Bank Account Name',
    bankName: 'Your Bank Name',
    bankAccountNumber: 'Your Account Number',
    ifscCode: 'Your IFSC Code',
    branchName: 'Your Branch Name',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});
  const [isEditingCustomerInfo, setIsEditingCustomerInfo] = useState(true);
  const [invoiceItems, setInvoiceItems] = useState([]);
  // We no longer need these individual tax rate and amount states at the App level
  // const [cgstRate, setCgstRate] = useState('');
  // const [sgstRate, setSgstRate] = useState('');
  // const [igstRate, setIgstRate] = useState('');
  // const [totalCgstAmount, setTotalCgstAmount] = useState(0);
  // const [totalSgstAmount, setTotalSgstAmount] = useState(0);
  // const [totalIgstAmount, setTotalIgstAmount] = useState(0);
  const navigate = useNavigate();

  const handleSaveProfile = (newCompanyData) => {
    setCompanyInfo({ ...newCompanyData });
    setIsEditingProfile(false);
  };

  const handleSaveCustomerInfo = (newCustomerData) => {
    setCustomerInfo(newCustomerData);
    setIsEditingCustomerInfo(false);
  };

  const handleInvoiceItemsSubmit = (itemsData) => {
    console.log('Invoice Items Data in App:', itemsData);
    setInvoiceItems(itemsData);
  };

  // The TaxInformation component's logic is now within InvoiceItems
  // const handleTaxChange = useCallback((taxAmounts) => {
  //   console.log('Tax Amounts received in App:', taxAmounts);
  //   setTotalCgstAmount(taxAmounts.totalCgst);
  //   setTotalSgstAmount(taxAmounts.totalSgst);
  //   setTotalIgstAmount(taxAmounts.totalIgst);
  //   setCgstRate(taxAmounts.cgstRate);
  //   setSgstRate(taxAmounts.sgstRate);
  //   setIgstRate(taxAmounts.igstRate);
  // }, []);

  const calculateGrandTotalBeforeTax = useCallback(() => {
    return invoiceItems.reduce((total, item) => total + (parseFloat(item.totalSale) || 0), 0);
  }, [invoiceItems]);

  const calculateTotalCgstAmount = useCallback(() => {
    return invoiceItems.reduce((total, item) => total + (parseFloat(item.cgstAmount) || 0), 0);
  }, [invoiceItems]);

  const calculateTotalSgstAmount = useCallback(() => {
    return invoiceItems.reduce((total, item) => total + (parseFloat(item.sgstAmount) || 0), 0);
  }, [invoiceItems]);

  const calculateTotalIgstAmount = useCallback(() => {
    return invoiceItems.reduce((total, item) => total + (parseFloat(item.igstAmount) || 0), 0);
  }, [invoiceItems]);

  const handleGenerateInvoice = () => {
    console.log('Invoice Items before navigation:', invoiceItems);
    console.log('Total CGST Amount before navigation:', calculateTotalCgstAmount());
    console.log('Total SGST Amount before navigation:', calculateTotalSgstAmount());
    console.log('Total IGST Amount before navigation:', calculateTotalIgstAmount());
    console.log('Grand Total before tax before navigation:', calculateGrandTotalBeforeTax());

    navigate('/invoice', {
      state: {
        company: companyInfo,
        customer: customerInfo,
        items: invoiceItems,
        taxSummary: {
          // We can calculate these on the invoice display page as well,
          // or pass the item-wise details and calculate there.
          // For now, let's pass the totals.
          cgstAmount: calculateTotalCgstAmount(),
          sgstAmount: calculateTotalSgstAmount(),
          igstAmount: calculateTotalIgstAmount(),
        },
        totalAmount: {
          subtotal: calculateGrandTotalBeforeTax(),
          grandTotal: invoiceItems.reduce((total, item) => total + (parseFloat(item.totalAmountIncludingTax) || 0), 0),
        },
      },
    });
  };

  return (
    <div>
      {!isEditingProfile ? (
        <InvoiceHeader company={companyInfo} />
      ) : (
        <div className="p-6">
          {console.log("App.js - isEditingProfile:", isEditingProfile)}
          <CompanyProfileForm
            onSave={handleSaveProfile}
            initialData={companyInfo}
            onClose={() => setIsEditingProfile(false)}
          />
        </div>
      )}

      {!isEditingProfile && (
        <div className="p-6 mt-4">
          <button
            onClick={() => setIsEditingProfile(true)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit Company Profile
          </button>
        </div>
      )}

      {isEditingCustomerInfo ? (
        <div className="p-6">
          <CustomerInfoForm
            onSave={handleSaveCustomerInfo}
            initialData={customerInfo}
            onClose={() => setIsEditingCustomerInfo(false)}
          />
        </div>
      ) : (
        <div className="p-6 mt-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Customer Details</h2>
          <p>Name: {customerInfo.name || 'N/A'}</p>
          <p>Mobile No.: {customerInfo.mobileNo || 'N/A'}</p>
          <p>Email: {customerInfo.email || 'N/A'}</p>
          <p>Address: {customerInfo.address || 'N/A'}</p>
          {customerInfo.gstin && <p>GSTIN: {customerInfo.gstin}</p>}
          <p>Invoice No.: {customerInfo.invoiceNo || 'N/A'}</p>
          <p>Date: {customerInfo.date || 'N/A'}</p>
          <p>Place of Supply: {customerInfo.placeOfSupply || 'N/A'}</p>
          <button
            onClick={() => setIsEditingCustomerInfo(true)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Edit Customer Info
          </button>
        </div>
      )}

      <InvoiceItems onItemsSubmit={handleInvoiceItemsSubmit} />

      {/* We might not need TaxInformation in its original form anymore */}
      {/* <TaxInformation
        grandTotal={calculateGrandTotalBeforeTax()}
        onTaxChange={handleTaxChange}
      /> */}

      <InvoiceSummary
        grandTotal={calculateGrandTotalBeforeTax()}
        totalCgstAmount={calculateTotalCgstAmount()}
        totalSgstAmount={calculateTotalSgstAmount()}
        totalIgstAmount={calculateTotalIgstAmount()}
      />

      <BankDetails company={companyInfo} />

      <div className="p-6 mt-4">
        <button
          onClick={handleGenerateInvoice}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate & Download Invoice
        </button>
      </div>
    </div>
  );
}

export default App;