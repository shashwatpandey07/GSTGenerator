import React, { useState, useEffect } from "react";

const BillDetails = (props) => {
  const [isSame, setIsSame] = useState(false);
  const {
    customerName,
    setCustomerName,
    contactNumber,
    setContactNumber,
    customerGST,
    setCustomerGST,
    billingAddress,
    setBillingAddress,
    shippingAddress,
    setShippingAddress,
    invoiceNumber,
    setInvoiceNumber,
    billingDate,
    setBillingDate,
    dueDate,
    setDueDate,
  } = props;

  const handleContactNumberChange = (newContactNumber) => {
    let formattedContactNumber = newContactNumber;

    // Remove any non-digit characters
    formattedContactNumber = formattedContactNumber.replace(/\D/g, "");

    // Add +91 country code if missing and the contact number is 10 digits long
    if (
      formattedContactNumber.length === 10 &&
      !formattedContactNumber.startsWith("+91")
    ) {
      formattedContactNumber = "+91 " + formattedContactNumber;
    }

    setContactNumber(formattedContactNumber);
  };

  // Function to get the current date in the format YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Set default billing date to the current date
  const defaultBillingDate = getCurrentDate();

  useEffect(() => {
    setBillingDate(getCurrentDate());
  }, []);

  const handleCheckBox = () => {
    setIsSame(!isSame);
    if (!isSame) {
      setShippingAddress(billingAddress);
    } else {
      setShippingAddress("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between pt-4 pb-8">
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-fit"
          required
          autoFocus
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
        />
        <input
          type="text"
          className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600  px-2 py-1 w-fit"
          placeholder="Contact No."
          value={contactNumber}
          maxLength="10"
          onChange={(e) => {
            handleContactNumberChange(e.target.value);
          }}
        />
        <input
          type="text"
          className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-fit"
          placeholder="Customer's GST No."
          value={customerGST}
          onChange={(e) => {
            setCustomerGST(e.target.value);
          }}
        />
        <textarea
          className="whitespace-pre-wrap border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1"
          cols="26"
          rows="3"
          placeholder="Billing Address"
          value={billingAddress}
          onChange={(e) => {
            setBillingAddress(e.target.value);
          }}
        ></textarea>
        <div className="flex items-end">
          <input
            type="checkbox"
            className="m-1"
            checked={isSame}
            onChange={handleCheckBox}
          />
          <label htmlFor="" className="ml-1 text-gray-600 text-sm">
            {" "}
            Same as Billing Address
          </label>
        </div>
        <textarea
          className="whitespace-pre-wrap border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1"
          cols="26"
          rows="3"
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => {
            setShippingAddress(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="flex flex-col space-y-2 items-start md:items-end flex-grow my-3">
        <div className="flex flex-row items-center">
          <label htmlFor="" className="mr-2 text-lg text-gray-600">
            Invoice No:
          </label>
          <input
            type="number"
            className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-36"
            value={invoiceNumber}
            min="1"
            onChange={(e) => {
              setInvoiceNumber(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <label htmlFor="" className="mr-2 text-lg text-gray-600">
            Date:
          </label>
          <input
            type="date"
            className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-36"
            value={billingDate || defaultBillingDate}
            onChange={(e) => {
              setBillingDate(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <label htmlFor="" className="mr-2 text-lg text-gray-600">
            Due Date:
          </label>
          <input
            type="date"
            className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-36"
            value={dueDate}
            onChange={(e) => {
              // Check if the selected due date is less than the billing date
              if (e.target.value < billingDate) {
                // If so, set the due date to the billing date
                setDueDate(billingDate);
              } else {
                setDueDate(e.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
