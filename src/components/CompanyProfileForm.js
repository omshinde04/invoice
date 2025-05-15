// src/components/CompanyProfileForm.js
import React, { useState, useEffect } from 'react';

function CompanyProfileForm({ onSave, initialData, onClose }) {
  const [companyName, setCompanyName] = useState(initialData?.name || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [mobileNumber, setMobileNumber] = useState(initialData?.mobile_no || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [website, setWebsite] = useState(initialData?.website || '');
  const [gstin, setGstin] = useState(initialData?.gstin || '');
  const [bankAccountName, setBankAccountName] = useState(initialData?.bankAccountName || '');
  const [bankName, setBankName] = useState(initialData?.bankName || '');
  const [bankAccountNumber, setBankAccountNumber] = useState(initialData?.bankAccountNumber || '');
  const [ifscCode, setIfscCode] = useState(initialData?.ifscCode || '');
  const [branchName, setBranchName] = useState(initialData?.branchName || '');
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || null); // For preview (if you still want to display an existing logo)

  useEffect(() => {
    if (initialData?.logoUrl) {
      setLogoUrl(initialData.logoUrl);
    }
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const companyData = {
      name: companyName,
      address: address,
      mobile_no: mobileNumber,
      email: email,
      website: website,
      gstin: gstin,
      bankAccountName: bankAccountName,
      bankName: bankName,
      bankAccountNumber: bankAccountNumber,
      ifscCode: ifscCode,
      branchName: branchName,
      logoUrl: logoUrl, // Include logoUrl in the data to be saved (even if not changed here)
    };
    onSave(companyData);
  };

  const handleCancel = () => {
    console.log("CompanyProfileForm - handleCancel called");
    console.log("CompanyProfileForm - onClose prop:", onClose);
    if (typeof onClose === 'function') {
      onClose(); // Only call onClose if it's a function
    } else {
      console.error("CompanyProfileForm - onClose is not a function!");
      // You might want to add fallback behavior here if needed
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Company Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
          <input type="text" id="companyName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
          <input type="tel" id="mobileNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </div>
        <div className="mb-4 col-span-full">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <textarea id="address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">Website</label>
          <input type="url" id="website" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="gstin" className="block text-gray-700 text-sm font-bold mb-2">GSTIN</label>
          <input type="text" id="gstin" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={gstin} onChange={(e) => setGstin(e.target.value)} />
        </div>

        {/* Bank Details Section */}
        <div className="col-span-full mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="bankAccountName" className="block text-gray-700 text-sm font-bold mb-2">Account Name</label>
              <input type="text" id="bankAccountName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="bankName" className="block text-gray-700 text-sm font-bold mb-2">Bank Name</label>
              <input type="text" id="bankName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={bankName} onChange={(e) => setBankName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="bankAccountNumber" className="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
              <input type="text" id="bankAccountNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="ifscCode" className="block text-gray-700 text-sm font-bold mb-2">IFSC Code</label>
              <input type="text" id="ifscCode" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="branchName" className="block text-gray-700 text-sm font-bold mb-2">Branch Name</label>
              <input type="text" id="branchName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={branchName} onChange={(e) => setBranchName(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="col-span-full flex justify-end gap-2 mt-4">
          <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyProfileForm;