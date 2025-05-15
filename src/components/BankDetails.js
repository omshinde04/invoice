// src/components/BankDetails.js
import React from 'react';

function BankDetails({ company }) {
  return (
    <section className="bg-white p-6 mt-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-blue-700 text-xl font-semibold mb-5 border-b pb-2">Payment Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <span className="font-semibold text-gray-800 mr-3">Account Name:</span>
          <span className="text-gray-900">{company.bankAccountName || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-800 mr-3">Bank Name:</span>
          <span className="text-gray-900">{company.bankName || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-800 mr-3">Account Number:</span>
          <span className="text-gray-900">{company.bankAccountNumber || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-800 mr-3">IFSC Code:</span>
          <span className="text-gray-900">{company.ifscCode || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-800 mr-3">Branch Name:</span>
          <span className="text-gray-900">{company.branchName || 'N/A'}</span>
        </div>
      </div>
      <div className="mt-5 pt-3 border-t text-gray-600 text-sm italic">
        Please ensure all payments are made to the account details specified above.
      </div>
    </section>
  );
}

export default BankDetails;