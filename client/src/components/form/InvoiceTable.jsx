import React, { useState, useEffect } from "react";
import InvoiceItem from "./InvoiceItem";
import { FiPlusCircle } from "react-icons/fi";
import { v4 } from "uuid";

const InvoiceTable = ({
  items,
  setItems,
  deleteItemHandler,
  editItemHandler,
}) => {
  const [isScreenSmallerThanMd, setIsScreenSmallerThanMd] = useState(
    window.innerWidth < 768 // Example breakpoint: 768px (md)
  );

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmallerThanMd(window.innerWidth < 768);
      console.log(isScreenSmallerThanMd);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to add an empty item to the list of items
  const addItemHandler = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        id: v4(),
        name: "",
        hsn: "",
        price: 0.0,
        dis: 0,
        qty: 0,
        sgst: 0,
        cgst: 0,
        cess: 0,
      },
    ]);
  };

  // Generate an array of JSX elements representing the table rows
  const tableRows = items.map((item, index) => (
    <InvoiceItem
      key={item.id}
      idx={index + 1}
      id={item.id}
      name={item.name}
      hsn={item.hsn}
      price={item.price}
      dis={item.dis}
      qty={item.qty}
      sgst={item.sgst}
      cgst={item.cgst}
      cess={item.cess}
      onDeleteItem={deleteItemHandler}
      onEditItem={editItemHandler}
    />
  ));
  return (
    <div>
      <div className="md:overflow-x-auto rounded-lg">
        <table className="w-full p-4">
          {isScreenSmallerThanMd ? (
            <></>
          ) : (
            <thead>
              <tr className="invisible md:visible border-gray-400 bg-indigo-600 text-gray-200 rounded-lg">
                <th className="py-2 text-center text-sm uppercase">S No.</th>
                <th className="py-2 text-center text-sm uppercase">
                  Item Description
                </th>
                <th className="py-2 text-center text-sm uppercase">Price</th>
                <th className="py-2 text-center text-sm uppercase">
                  Discount(%)
                </th>
                <th className="py-2 text-center text-sm uppercase">Quantity</th>
                <th className="py-2 text-center text-sm uppercase">SGST(%)</th>
                <th className="py-2 text-center text-sm uppercase">CGST(%)</th>
                <th className="py-2 text-center text-sm uppercase">Cess(%)</th>
                <th className="py-2 text-center text-sm uppercase">Total</th>
                <th className="py-2 text-center text-sm uppercase"></th>
              </tr>
            </thead>
          )}

          <tbody>{tableRows}</tbody>
        </table>
      </div>

      <div className="flex justify-end py-4 text-lg">
        <button
          className="flex px-4 py-2  text-indigo-500 hover:text-indigo-700"
          type="button"
          onClick={addItemHandler}
        >
          <FiPlusCircle className="mr-1 mt-1" size={20} />
          <span className="">Add Item</span>
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
