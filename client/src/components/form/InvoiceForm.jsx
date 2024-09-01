import React, { useState } from "react";
import { v4 } from "uuid";
import InvoiceModal from "./InvoiceModal";
import CompanyDetails from "./CompanyDetails";
import BillDetails from "./BillDetails";
import InvoiceTable from "./InvoiceTable";
import calculateTotals from "../../helpers/calculateTotals";

const InvoiceForm = () => {
  // State variables to manage form fields and data
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [customerGST, setCustomerGST] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [billingDate, setBillingDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [shipping, setShipping] = useState(0);

  const [companyName, setCompanyName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [cinNo, setCinNo] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [tandc, setTandC] = useState("");

  let tableRow = () => {
    return {
      id: v4(),
      name: "",
      hsn: "",
      price: 0.0,
      dis: 0,
      qty: 1,
      sgst: 2.5,
      cgst: 2.5,
      cess: 0,
    };
  };

  // State variables to manage Table rows
  const [items, setItems] = useState([tableRow()]);
  // State variables to manage state of review button
  const [isOpen, setIsOpen] = useState(false);

  // Function to reset relevant form fields
  const resetFormFields = () => {
    setCustomerName("");
    setContactNumber("");
    setCustomerGST("");
    setBillingAddress("");
    setShippingAddress("");
    setInvoiceNumber("");
    setDueDate("");
    setItems([tableRow(), tableRow()]);
  };

  // Function to handle the event when the "Review Invoice" button is clicked
  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  // Function to delete an item from the list of items
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id != id));
  };

  // Function to handle changes to the values of individual item fields
  const editItemHandler = (event) => {
    const { id, name, value } = event.target;

    // Find the index of the item to be updated
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      // Create a new array with the updated item
      const updatedItems = [...items];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        [name]: value,
      };

      // Update the state with the new array
      setItems(updatedItems);
    }
  };

  let { subtotal, sgst, cgst, cess, total } = calculateTotals(items, shipping);

  let totalEntries = [
    { label: "Subtotal", amount: subtotal },
    { label: "SGST", amount: sgst },
    { label: "CGST", amount: cgst },
    { label: "Cess", amount: cess },
    { label: "Shipping Charge", amount: shipping },
  ];

  const totalElements = totalEntries.map((entry) => (
    <div className="flex w-full justify-between md:w-1/2">
      <span className="text-lg text-gray-600">{entry.label}:</span>
      <span className="text-gray-600">Rs.{entry.amount}</span>
    </div>
  ));

  return (
    <form className="py-4" onSubmit={reviewInvoiceHandler}>
      <div className="flex flex-col lg:flex-row space-y-10 m-5 justify-around lg:space-y-0 ">
        <div className="flex flex-col lg:max-w-4xl border border-gray-300 rounded-lg p-5 bg-gray-100">
          {/* Component to handle bill-related details (header)*/}
          <BillDetails
            customerName={customerName}
            setCustomerName={setCustomerName}
            contactNumber={contactNumber}
            setContactNumber={setContactNumber}
            customerGST={customerGST}
            setCustomerGST={setCustomerGST}
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            invoiceNumber={invoiceNumber}
            setInvoiceNumber={setInvoiceNumber}
            billingDate={billingDate}
            setBillingDate={setBillingDate}
            dueDate={dueDate}
            setDueDate={setDueDate}
          />

          <InvoiceTable
            items={items}
            setItems={setItems}
            deleteItemHandler={deleteItemHandler}
            editItemHandler={editItemHandler}
          />

          <div className="flex flex-col  md:flex-row justify-between pb-8">
            <div className="p-4">
              <div className="flex flex-row items-center mb-2 justify-between">
                <label htmlFor="" className="mr-2 text-lg text-gray-600">
                  Shipping Charge:
                </label>
                <input
                  type="number"
                  className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-20"
                  value={shipping}
                  min="0"
                  onChange={(e) => {
                    setShipping(e.target.value);
                  }}
                />
              </div>
              <textarea
                className="whitespace-pre-wrap border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 mb-3"
                cols="30"
                rows="3"
                placeholder="Notes"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="flex flex-col items-end space-y-2 pt-6 flex-grow">
              {totalElements}
              <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
                <span className="text-lg text-gray-600">Total:</span>
                <span className="text-lg text-gray-600">Rs.{total}</span>
              </div>
            </div>
          </div>

          {/* Modal to display the review of the invoice */}
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            billInfo={{
              customerName,
              contactNumber,
              customerGST,
              billingAddress,
              shippingAddress,
              invoiceNumber,
              billingDate,
              dueDate,
            }}
            items={items}
            companyInfo={{
              companyName,
              gstNo,
              cinNo,
              contact,
              notes,
              tandc,
            }}
            amount={{
              subtotal,
              sgst,
              cgst,
              cess,
              shipping,
              total,
            }}
          />
        </div>
        <div className="flex flex-col max-w-4xl">
          <div className="border border-gray-300 bg-gray-100 rounded-lg p-5">
            {/* Component to handle company-related details */}
            <CompanyDetails
              companyName={companyName}
              setCompanyName={setCompanyName}
              gstNo={gstNo}
              setGstNo={setGstNo}
              cinNo={cinNo}
              setCinNo={setCinNo}
              contact={contact}
              setContact={setContact}
              tandc={tandc}
              setTandC={setTandC}
            />
            {/* Buttons to reset and submit the form */}
            <div className="flex flex-row justify-end mt-8 ">
              <button
                className="p-3 items-center justify-center space-x-1 rounded-md border border-gray-400 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-200 mr-3"
                type="reset"
                onClick={resetFormFields}
              >
                <span className="text-base uppercase">Reset</span>
              </button>
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white shadow-sm hover:bg-indigo-700"
                type="submit"
              >
                <span className="text-base uppercase">Review Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
