import React, { useState } from 'react';

function CustomerInfoForm({ onSave, initialData, onClose }) {
  const [name, setName] = useState(initialData?.name || '');
  const [mobileNo, setMobileNo] = useState(initialData?.mobileNo || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [gstin, setGstin] = useState(initialData?.gstin || '');
  const [invoiceNo, setInvoiceNo] = useState(initialData?.invoiceNo || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [placeOfSupply, setPlaceOfSupply] = useState(initialData?.placeOfSupply || '');

  const [nameError, setNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [invoiceNoError, setInvoiceNoError] = useState('');
  const [dateError, setDateError] = useState('');
  const [placeOfSupplyError, setPlaceOfSupplyError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required!');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!mobileNo.trim() || mobileNo.length !== 10 || !/^\d+$/.test(mobileNo)) {
      setMobileNoError('Mobile number must be 10 digits!');
      isValid = false;
    } else {
      setMobileNoError('');
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Valid email is required!');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!address.trim()) {
      setAddressError('Address is required!');
      isValid = false;
    } else {
      setAddressError('');
    }

    if (!invoiceNo.trim()) {
      setInvoiceNoError('Invoice number is required!');
      isValid = false;
    } else {
      setInvoiceNoError('');
    }

    if (!date) {
      setDateError('Date is required!');
      isValid = false;
    } else {
      setDateError('');
    }

    if (!placeOfSupply.trim()) {
      setPlaceOfSupplyError('Place of Supply is required!');
      isValid = false;
    } else {
      setPlaceOfSupplyError('');
    }

    if (isValid) {
      const customerData = {
        name: name,
        mobileNo: mobileNo,
        email: email,
        address: address,
        gstin: gstin,
        invoiceNo: invoiceNo,
        date: date,
        placeOfSupply: placeOfSupply,
      };
      onSave(customerData);
    }
  };

  const handleCancel = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error("CustomerInfoForm - onClose is not a function!");
      // Optionally add fallback behavior here
    }
  };

  return (
    <section className="bg-white p-4 w-full mt-2 rounded-lg shadow-md">
      <h2 className="text-blue-600 text-2xl font-bold mb-4 text-center">Customer Details</h2>
      <form id="customer-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name:</label>
          <input id="name" type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" value={name} onChange={(e) => setName(e.target.value)} />
          <small id="name-error" className={`text-red-500 text-sm ${nameError ? '' : 'hidden'}`}>{nameError}</small>
        </div>
        {/* Mobile Number */}
        <div>
          <label htmlFor="mob-no" className="block text-gray-700 font-semibold mb-1">Mob No.:</label>
          <input id="mob-no" type="tel" maxLength="10" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
          <small id="mob-error" className={`text-red-500 text-sm ${mobileNoError ? '' : 'hidden'}`}>{mobileNoError}</small>
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">E-mail:</label>
          <input id="email" type="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" value={email} onChange={(e) => setEmail(e.target.value)} />
          <small id="email-error" className={`text-red-500 text-sm ${emailError ? '' : 'hidden'}`}>{emailError}</small>
        </div>
        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-1">Address:</label>
          <input id="address" type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" value={address} onChange={(e) => setAddress(e.target.value)} />
          <small id="address-error" className={`text-red-500 text-sm ${addressError ? '' : 'hidden'}`}>{addressError}</small>
        </div>
        {/* GSTIN */}
        <div>
          <label htmlFor="customer-gstin" className="block text-gray-700 font-semibold mb-1">Customer GSTIN:</label>
          <input id="customer-gstin" type="text" maxLength="15" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" value={gstin} onChange={(e) => setGstin(e.target.value)} />
          {/* No error message for GSTIN as it's optional in your HTML */}
        </div>
        {/* Invoice Number */}
        <div>
          <label htmlFor="invoice-no" className="block text-gray-700 font-semibold mb-1">Invoice No.:</label>
          <input id="invoice-no" type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
          <small id="invoice-error" className={`text-red-500 text-sm ${invoiceNoError ? '' : 'hidden'}`}>{invoiceNoError}</small>
        </div>
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-gray-700 font-semibold mb-1">Date:</label>
          <input id="date" type="date" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" value={date} onChange={(e) => setDate(e.target.value)} />
          <small id="date-error" className={`text-red-500 text-sm ${dateError ? '' : 'hidden'}`}>{dateError}</small>
        </div>
        {/* Place of Supply */}
        <div>
          <label htmlFor="place-of-supply" className="block text-gray-700 font-semibold mb-1">Place of Supply:</label>
          <input id="place-of-supply" type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" value={placeOfSupply} onChange={(e) => setPlaceOfSupply(e.target.value)} />
          <small id="place-error" className={`text-red-500 text-sm ${placeOfSupplyError ? '' : 'hidden'}`}>{placeOfSupplyError}</small>
        </div>
        {/* Buttons */}
        <div className="col-span-full flex justify-center mt-6 gap-4">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
            onClick={handleSubmit} // Ensure handleSubmit is correctly attached
          >
            Save Customer Info
          </button>
        </div>
      </form>
    </section>
  );
}

export default CustomerInfoForm;