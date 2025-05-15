import React from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePdfDocument from './InvoicePdfDocument'; // Import the PDF document component
import logo from '../assets/triot_solutions_logo.jpg'; // Ensure this path is correct

function InvoiceDisplay() {
  const location = useLocation();
  const { state } = location;

  const logoStyle = {
    width: '80px', // Adjust as needed
    height: '80px', // Adjust as needed
    objectFit: 'cover',
    marginBottom: '2px',
    borderRadius: '50%',
    border: '2px solid blue', // Adjust border size and color as needed
  };

  if (!state) {
    return <div className="text-red-500 font-bold">Error: No invoice data found.</div>;
  }

  // Log the entire items array
  console.log("Invoice Items Data:", state?.items);

  // Log the rate of the first item, if it exists
  if (state?.items && state?.items.length > 0) {
    console.log("Rate of the First Item:", state?.items[0]?.rate);
  }

  const tableHeaders = [
    'Sr. No.',
    'Item',
    'HSN/SAC',
    'Unit',
    'Rate',
    'Qty',
    'CGST %',
    'SGST %',
    'IGST %',
    'Total',
  ];

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg max-w-4xl mx-auto my-10 border border-gray-200">
      <div className="flex justify-between items-start border-b pb-6 mb-6">
        <div>
          <img src={state?.company?.logoUrl || logo} alt="Company Logo" style={logoStyle} />
          <h1 className="text-4xl font-extrabold text-indigo-700">{state?.company?.name || 'Your Company Name'}</h1>
          <p className="text-sm text-gray-500 mt-1">{state?.company?.address || 'Your Company Address'}</p>
          <p className="text-sm text-gray-500">Mobile: {state?.company?.mobile_no || 'N/A'}</p>
          <p className="text-sm text-gray-500">Email: {state?.company?.email || 'N/A'}</p>
          {state?.company?.gstin && <p className="text-sm text-gray-500">GSTIN: {state.company.gstin}</p>}
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-gray-600">Invoice #: <span className="font-bold">{state?.customer?.invoiceNo || 'N/A'}</span></p>
          <p className="text-sm text-gray-500">Date: {state?.customer?.date || 'N/A'}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-2">Bill To</h2>
        <div className="space-y-1 text-sm text-gray-600">
          <p>Name: {state?.customer?.name || 'N/A'}</p>
          <p>Address: {state?.customer?.address || 'N/A'}</p>
          <p>Mobile: {state?.customer?.mobileNo || 'N/A'}</p>
          <p>Email: {state?.customer?.email || 'N/A'}</p>
          {state?.customer?.gstin && <p>GSTIN: {state.customer.gstin}</p>}
          <p>Place of Supply: {state?.customer?.placeOfSupply || 'N/A'}</p>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              {tableHeaders.map((heading, i) => (
                <th key={i} className="px-4 py-2 border border-gray-300 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state?.items?.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-300">{item?.description || 'N/A'}</td>
                <td className="px-4 py-2 border border-gray-300">{item?.hsnSacCode || 'N/A'}</td>
                <td className="px-4 py-2 border border-gray-300">{item?.unit || 'N/A'}</td>
                <td className="px-4 py-2 border border-gray-300 text-right">₹{parseFloat(item?.rate || 0).toFixed(2)}</td>
                <td className="px-4 py-2 border border-gray-300 text-right">{item?.quantity || 'N/A'}</td>
                <td className="px-4 py-2 border border-gray-300 text-right">{item?.cgstRate || 'N/A'}%</td>
                <td className="px-4 py-2 border border-gray-300 text-right">{item?.sgstRate || 'N/A'}%</td>
                <td className="px-4 py-2 border border-gray-300 text-right">{item?.igstRate || 'N/A'}%</td>
                <td className="px-4 py-2 border border-gray-300 text-right">₹{parseFloat(item?.totalSale || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right space-y-2 mb-8">
        <p><span className="font-medium">Subtotal:</span> ₹{parseFloat(state?.totalAmount?.subtotal || 0).toFixed(2)}</p>
        {state?.taxSummary?.cgstAmount > 0 && (
          <p>CGST: ₹{parseFloat(state.taxSummary.cgstAmount || 0).toFixed(2)}</p>
        )}
        {state?.taxSummary?.sgstAmount > 0 && (
          <p>SGST: ₹{parseFloat(state.taxSummary.sgstAmount || 0).toFixed(2)}</p>
        )}
        {state?.taxSummary?.igstAmount > 0 && (
          <p>IGST: ₹{parseFloat(state.taxSummary.igstAmount || 0).toFixed(2)}</p>
        )}
        <p className="text-lg font-bold text-indigo-700">Grand Total: ₹{parseFloat(state?.totalAmount?.grandTotal || 0).toFixed(2)}</p>
      </div>

      <div className="border-t pt-4 text-sm text-gray-600">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Bank Details</h3>
        <p>Account Name: {state?.company?.bankAccountName || 'N/A'}</p>
        <p>Bank: {state?.company?.bankName || 'N/A'}</p>
        <p>Account No.: {state?.company?.bankAccountNumber || 'N/A'}</p>
        <p>IFSC: {state?.company?.ifscCode || 'N/A'}</p>
        <p>Branch: {state?.company?.branchName || 'N/A'}</p>
      </div>

      <div className="mt-10 flex justify-center">
        <PDFDownloadLink
          document={<InvoicePdfDocument state={state} />}
          fileName={`invoice-${state?.customer?.invoiceNo || 'INV'}.pdf`}
        >
          {({ loading }) => (loading ? (
            <button className="bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm cursor-wait">
              Generating PDF...
            </button>
          ) : (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-full shadow-sm transition duration-300">
              Download as PDF
            </button>
          ))}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default InvoiceDisplay;