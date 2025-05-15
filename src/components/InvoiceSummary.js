import React from 'react';

function InvoiceSummary({ grandTotal, totalCgstAmount, totalSgstAmount, totalIgstAmount }) {
  return (
    <section className="bg-white p-4 mt-2 rounded-lg shadow-md">
      <h2 className="text-blue-600 text-2xl font-bold mb-4 text-center">Summary and Amount</h2>
      <div className="overflow-x-auto">
        <table id="summary-table" className="w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Description</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-right">Amount (Rs)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 text-gray-700">Invoice Value (Subtotal)</td>
              <td id="invoice-value" className="border border-gray-300 p-2 text-gray-700 text-right">{parseFloat(grandTotal - (totalCgstAmount + totalSgstAmount + totalIgstAmount) || 0).toFixed(2)}</td>
            </tr>
            {parseFloat(totalCgstAmount || 0) > 0 && (
              <tr>
                <td className="border border-gray-300 p-2 text-gray-700">Total CGST</td>
                <td id="total-cgst" className="border border-gray-300 p-2 text-gray-700 text-right">{parseFloat(totalCgstAmount || 0).toFixed(2)}</td>
              </tr>
            )}
            {parseFloat(totalSgstAmount || 0) > 0 && (
              <tr>
                <td className="border border-gray-300 p-2 text-gray-700">Total SGST</td>
                <td id="total-sgst" className="border border-gray-300 p-2 text-gray-700 text-right">{parseFloat(totalSgstAmount || 0).toFixed(2)}</td>
              </tr>
            )}
            {parseFloat(totalIgstAmount || 0) > 0 && (
              <tr>
                <td className="border border-gray-300 p-2 text-gray-700">Total IGST</td>
                <td id="total-igst" className="border border-gray-300 p-2 text-gray-700 text-right">{parseFloat(totalIgstAmount || 0).toFixed(2)}</td>
              </tr>
            )}
            <tr className="bg-blue-100 font-bold">
              <td className="border border-gray-300 p-2 text-gray-700 text-right">Grand Total (Rs)</td>
              <td id="grand-total-summary" className="border border-gray-300 p-2 text-gray-700 text-right">
                {parseFloat(grandTotal || 0).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default InvoiceSummary;