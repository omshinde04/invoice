import React, { useState, useCallback } from 'react';

function InvoiceItems({ onItemsSubmit }) {
  const [items, setItems] = useState([
    {
      id: Date.now(),
      description: '',
      hsnSacCode: '',
      quantity: 0, // Changed default to 0
      unit: '',
      rate: 0,
      totalSale: 0,
      cgstRate: '',
      sgstRate: '',
      igstRate: '',
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0,
      totalAmountIncludingTax: 0,
    },
  ]);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        description: '',
        hsnSacCode: '',
        quantity: 0, // Changed default to 0 here as well
        unit: '',
        rate: 0,
        totalSale: 0,
        cgstRate: '',
        sgstRate: '',
        igstRate: '',
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0,
        totalAmountIncludingTax: 0,
      },
    ]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChange = (id, name, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [name]: value };
          if (name === 'quantity' || name === 'rate' || name === 'cgstRate' || name === 'sgstRate' || name === 'igstRate') {
            const qty = parseFloat(updatedItem.quantity || 0);
            const rate = parseFloat(updatedItem.rate || 0);
            updatedItem.totalSale = qty * rate;

            const cgst = parseFloat(updatedItem.cgstRate || 0);
            const sgst = parseFloat(updatedItem.sgstRate || 0);
            const igst = parseFloat(updatedItem.igstRate || 0);

            updatedItem.cgstAmount = (updatedItem.totalSale * cgst) / 100;
            updatedItem.sgstAmount = (updatedItem.totalSale * sgst) / 100;
            updatedItem.igstAmount = (updatedItem.totalSale * igst) / 100;
            updatedItem.totalAmountIncludingTax = updatedItem.totalSale + updatedItem.cgstAmount + updatedItem.sgstAmount + updatedItem.igstAmount;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateGrandTotal = useCallback(() => {
    return items.reduce((total, item) => total + (parseFloat(item.totalAmountIncludingTax) || 0), 0);
  }, [items]);

  const handleSubmit = () => {
    if (onItemsSubmit) {
      onItemsSubmit(items);
      setSubmissionStatus('success');
      // Removed the setTimeout that cleared the form
    } else {
      console.log('Invoice Items Data:', items);
      setSubmissionStatus('success');
      alert('Data submitted (check console)');
      // Removed the setTimeout that cleared the form
    }
  };

  return (
    <section className="bg-white p-4 w-full mt-2 rounded-lg shadow-md">
      <h2 className="text-blue-600 text-2xl font-bold mb-4 text-center">Product/Service-wise Details</h2>

      {submissionStatus === 'success' && (
        <div className="bg-green-200 text-green-700 p-3 rounded mb-4">
          Data submitted successfully!
        </div>
      )}

      <div className="overflow-x-auto">
        <table id="product-table" className="w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Sr. No.</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Description</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">HSN/SAC Code</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Qty</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Unit</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Rate</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">CGST Rate %</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">SGST Rate %</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">IGST Rate %</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Total Sale</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Total Amount (Incl. Tax)</th>
              <th className="border border-gray-300 text-gray-700 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2 text-gray-700">{index + 1}</td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="text"
                    className="description w-full p-1"
                    value={item.description}
                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                    required
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="text"
                    className="hsn-code w-full p-1"
                    value={item.hsnSacCode}
                    onChange={(e) => handleChange(item.id, 'hsnSacCode', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="number"
                    className="qty w-full p-1"
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, 'quantity', parseFloat(e.target.value))}
                    required
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="text"
                    className="unit w-full p-1"
                    value={item.unit}
                    onChange={(e) => handleChange(item.id, 'unit', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="number"
                    className="rate w-full p-1"
                    value={item.rate}
                    onChange={(e) => handleChange(item.id, 'rate', parseFloat(e.target.value))}
                    required
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="number"
                    className="cgst-rate w-full p-1"
                    value={item.cgstRate}
                    onChange={(e) => handleChange(item.id, 'cgstRate', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="number"
                    className="sgst-rate w-full p-1"
                    value={item.sgstRate}
                    onChange={(e) => handleChange(item.id, 'sgstRate', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="number"
                    className="igst-rate w-full p-1"
                    value={item.igstRate}
                    onChange={(e) => handleChange(item.id, 'igstRate', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="number"
                    className="total-sale w-full p-1"
                    value={item.totalSale}
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <input
                    type="number"
                    className="total-amount-with-tax w-full p-1"
                    value={item.totalAmountIncludingTax.toFixed(2)}
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 p-2 text-gray-700">
                  <button
                    type="button"
                    className="delete-row bg-red-500 text-white p-1 rounded"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-100 font-bold">
              <td colSpan="10" className="text-right p-2 border">Grand Total (Incl. Tax):</td>
              <td id="grand-total" className="p-2 border">{calculateGrandTotal().toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-4">
        <button id="add-row" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700" onClick={handleAddItem}>
          Add Row
        </button>
        <button
          id="submit-data"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default InvoiceItems;