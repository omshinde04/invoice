import React, { useState, useEffect, useCallback } from 'react';

function TaxInformation({ grandTotal, onTaxChange }) {
  const [cgstRate, setCgstRate] = useState('');
  const [sgstRate, setSgstRate] = useState('');
  const [igstRate, setIgstRate] = useState('');
  const [cgstAmount, setCgstAmount] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [igstAmount, setIgstAmount] = useState(0);
  const [totalGst, setTotalGst] = useState(0);

  const calculateTax = useCallback(() => {
    const numericGrandTotal = parseFloat(grandTotal) || 0;
    const numericCgstRate = parseFloat(cgstRate) || 0;
    const numericSgstRate = parseFloat(sgstRate) || 0;
    const numericIgstRate = parseFloat(igstRate) || 0;

    const newCgstAmount = (numericGrandTotal * numericCgstRate) / 100;
    const newSgstAmount = (numericGrandTotal * numericSgstRate) / 100;
    const newIgstAmount = (numericGrandTotal * numericIgstRate) / 100;
    const newTotalGst = newCgstAmount + newSgstAmount + newIgstAmount;

    setCgstAmount(newCgstAmount);
    setSgstAmount(newSgstAmount);
    setIgstAmount(newIgstAmount);
    setTotalGst(newTotalGst);

    // Inform the parent component about the tax changes (INCLUDING RATES)
    if (onTaxChange) {
      onTaxChange({
        cgstRate: numericCgstRate.toString(), // Send the rate as a string
        sgstRate: numericSgstRate.toString(), // Send the rate as a string
        igstRate: numericIgstRate.toString(), // Send the rate as a string
        totalCgst: newCgstAmount,
        totalSgst: newSgstAmount,
        totalIgst: newIgstAmount,
      });
    }
  }, [grandTotal, cgstRate, sgstRate, igstRate, onTaxChange]);

  useEffect(() => {
    calculateTax();
  }, [calculateTax]);

  const handleCgstRateChange = (event) => {
    setCgstRate(event.target.value);
  };

  const handleSgstRateChange = (event) => {
    setSgstRate(event.target.value);
  };

  const handleIgstRateChange = (event) => {
    setIgstRate(event.target.value);
  };

  return (
    <section className="bg-white p-4 w-full mt-2 rounded-lg shadow-md">
      <h2 className="text-blue-600 text-2xl font-bold mb-4 text-center">Tax Information</h2>

      <div className="overflow-x-auto">
        <table id="tax-table" className="w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Sr. No.</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">CGST Rate %</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">CGST Amount</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">SGST Rate %</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">SGST Amount</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">IGST Rate %</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">IGST Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 text-gray-700">1</td>
              <td className="border border-gray-300 p-2 text-gray-700">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded p-1 cgst-rate"
                  value={cgstRate}
                  onChange={handleCgstRateChange}
                  required
                />
              </td>
              <td className="border border-gray-300 p-2 text-gray-700">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded p-1 cgst-amount"
                  value={cgstAmount.toFixed(2)}
                  readOnly
                />
              </td>
              <td className="border border-gray-300 p-2 text-gray-700">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded p-1 sgst-rate"
                  value={sgstRate}
                  onChange={handleSgstRateChange}
                  required
                />
              </td>
              <td className="border border-gray-300 p-2 text-gray-700">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded p-1 sgst-amount"
                  value={sgstAmount.toFixed(2)}
                  readOnly
                />
              </td>
              <td className="border border-gray-300 p-2 text-gray-700">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded p-1 igst-rate"
                  value={igstRate}
                  onChange={handleIgstRateChange}
                  required
                />
              </td>
              <td className="border border-gray-300 p-2 text-gray-700">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded p-1 igst-amount"
                  value={igstAmount.toFixed(2)}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-blue-100 font-bold">
              <td colSpan="6" className="border border-gray-300 text-gray-700 p-2 text-right">Total GST Amount:</td>
              <td id="total-gst" className="border border-gray-300 text-gray-700 p-2">{totalGst.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

export default TaxInformation;