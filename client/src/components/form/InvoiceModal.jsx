import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import saveAsPDF from "../../helpers/saveToPDF";

// Functional component to display the Invoice Modal
const InvoiceModal = ({
  isOpen,
  setIsOpen,
  billInfo,
  items,
  companyInfo,
  amount,
}) => {
  // Function to close the modal
  function closeModal() {
    setIsOpen(false);
  }

  // Function to handle the "Download" button click
  const SaveAsPDFHandler = () => {
    saveAsPDF(billInfo.invoiceNumber);
  };

  const tableRows = items.map((item, index) => {
    let total = item.price * item.qty;
    total -= (item.dis * total) / 100;
    total = total.toFixed(2);

    return (
      <tr className="font-sm" key={item.id}>
        <td className="py-3">{index + 1}</td>
        <td className="py-3">
          {item.name}
          {item.hsn ? (
            <p className="font-thin text-xs">HSN: {item.hsn}</p>
          ) : (
            <></>
          )}
        </td>
        <td className="py-3">{item.qty}</td>
        <td className="py-3">{item.price}</td>
        <td className="py-3">{item.dis}</td>
        <td className="py-3">{item.sgst}</td>
        <td className="py-3">{item.cgst}</td>
        <td className="py-3">{item.cess}</td>
        <td className="py-3">{total}</td>
      </tr>
    );
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto overflow-x-hidden"
        onClose={closeModal}
      >
        {/* Modal content */}
        <div className="min-h-screen flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* Modal container */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="overflow-x-auto">
              <div className="max-h-screen min-w-max md:max-w-4xl overflow-auto rounded-lg bg-white text-left shadow-xl">
                {/* Main div, inside this div everything will be printed */}
                <div className="p-4" id="print">
                  <h2 className="text-4xl uppercase mb-4 mt-2 text-center">
                    Tax Invoice
                  </h2>

                  <div className="text-3xl m-2 border-2 border-black">
                    <div className="grid grid-rows-2 grid-cols-2">
                      <div className="p-3 w-full">
                        <h1 className="text-2xl font-semibold">Sender</h1>
                        <h2 className="my-2 text-xl font-semibold">
                          {companyInfo.companyName}
                        </h2>
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: companyInfo.contact.replace(/\n/g, "<br>"),
                          }}
                        />
                        <br />
                        <p className="text-sm">
                          GSTIN:{companyInfo.gstNo}
                          <br />
                          CIN No:{companyInfo.cinNo}
                        </p>
                      </div>

                      <div className="border-1 border-black grid grid-cols-3">
                        <div className="border-l-2 border-r-2 border-black text-xl text-center font-semibold py-14 px-2">
                          Invoice No.{" "}
                          <p className="text-sm font-normal">
                            {billInfo.invoiceNumber}
                          </p>
                        </div>
                        <div className="border-1 grid grid-rows-2 h-[190px]">
                          <div className="border-d-1 text-xl text-center font-semibold py-6 px-2">
                            Invoice Date{" "}
                            <p className="text-sm font-normal">
                              {billInfo.billingDate}
                            </p>
                          </div>
                          <div className="border-t-2 border-black text-xl text-center font-semibold py-6 px-2">
                            Invoice Due{" "}
                            <p className="text-sm font-normal">
                              {billInfo.dueDate}
                            </p>
                          </div>
                        </div>
                        <div className="border-l-2 border-black  p-8 pt-10"></div>
                      </div>

                      <div className="border-t-2 border-black  p-2">
                        <h1 className="text-xl font-semibold">Bill To</h1>
                        <h2 className="my-2 text-xl font-semibold">
                          {billInfo.customerName}
                        </h2>
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: billInfo.billingAddress.replace(
                              /\n/g,
                              "<br>"
                            ),
                          }}
                        />
                        <p className="text-sm">
                          <br />
                          Ph No: {billInfo.contactNumber}
                          {billInfo.customerGST === "" ? (
                            <></>
                          ) : (
                            <>
                              <br />
                              GST No: {billInfo.customerGST}
                            </>
                          )}
                        </p>
                      </div>

                      <div className="border-t-2 border-l-2 border-black p-2">
                        <h1 className="text-xl font-semibold">Deliver To</h1>
                        <h2 className="my-2 text-xl font-semibold">
                          {billInfo.customerName}
                        </h2>
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: billInfo.shippingAddress.replace(
                              /\n/g,
                              "<br>"
                            ),
                          }}
                        />
                        <p className="text-sm">
                          <br />
                          Ph No: {billInfo.contactNumber}
                          {billInfo.customerGST === "" ? (
                            <></>
                          ) : (
                            <>
                              <br />
                              GST No: {billInfo.customerGST}
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className=" pt-2 pb-2 flex-auto border-t-2 border-black h-auto text-center ">
                      <table className="text-sm text-auto h-auto w-full">
                        <thead>
                          <tr className="border-b-2 border-black">
                            <th>S.No.</th>
                            <th className="w-[170px]">Product Name</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Discount%</th>
                            <th>SGST%</th>
                            <th>CGST%</th>
                            <th>Cess%</th>
                            <th>
                              Total <br /> Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>{tableRows}</tbody>
                      </table>
                    </div>

                    <div className="border-t-2 border-b-2 border-black col-span-2">
                      <table className="table-auto text-sm w-full text-center divide-black divide-y-2">
                        <thead>
                          <tr className=" divide-black divide-x-2">
                            <th>Taxable Amt</th>
                            <th>SGST Amt</th>
                            <th>CGST Amt</th>
                            <th>Cess Amt</th>
                            <th>Shipping</th>
                            <th>Total Invoice Amt</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="divide-x-2 divide-black">
                            <td>{amount.subtotal}</td>
                            <td>{amount.sgst}</td>
                            <td>{amount.cgst}</td>
                            <td>{amount.cess}</td>
                            <td>{amount.shipping}</td>
                            <td>{amount.total}</td>
                          </tr>
                        </tbody>
                      </table>
                      {/* <div className="text-sm p-3 border-t-2 border-black font-semibold">
                        <h1>e-Invoice Details</h1>
                        <div className="flex space-x-8 w-full">
                          <p className="my-2">IRN: <span className="font-normal">918319386594</span> </p>
                          <p className="my-2">Ack No: <span className="font-normal">9183193</span> </p>
                          <p className="my-2">Ack Date: <span className="font-normal">11/08/2023</span> </p>
                          <p className="my-2">Supply Type Code: <span className="font-normal">HS225</span> </p>
                          <p className="my-2">Document Type Code: <span className="font-normal">HS225</span> </p>
                        </div>
                      </div> */}

                      {/* <div className="text-sm p-2 border-t-2 border-black font-semibold">
                        <h1>Transaction Details</h1>
                        <div className="flex space-x-12 w-full">
                          <p className="my-2">Category: <span className="font-normal">918319386594</span> </p>
                          <p className="my-2">Document No: <span className="font-normal">918319386594</span> </p>
                          <p className="my-2">Document Date: <span className="font-normal">11/08/2023</span> </p>
                        </div>
                      </div> */}
                    </div>

                    <div className="flex flex-col  p-3">
                      <h1 className="text-lg font-semibold">Notes</h1>
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: companyInfo.notes.replace(/\n/g, "<br>"),
                        }}
                      />

                      <h2 className="my-2 text-lg font-semibold">
                        Terms and Conditions
                      </h2>
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: companyInfo.tandc.replace(/\n/g, "<br>"),
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Button to download the PDF */}
                <div className="flex flex-row justify-center">
                  <button
                    className="flex rounded-md bg-indigo-600 px-4 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 mb-3"
                    type="submit"
                    onClick={SaveAsPDFHandler}
                  >
                    <span className="text-base uppercase">Download</span>
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
