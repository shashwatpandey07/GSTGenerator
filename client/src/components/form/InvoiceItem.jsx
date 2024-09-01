import React, { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";

const InvoiceItem = ({
  id,
  idx,
  name,
  hsn,
  price,
  dis,
  qty,
  sgst,
  cgst,
  cess,
  onDeleteItem,
  onEditItem,
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

  // calculations for total and taxes
  let total = price * qty;
  total -= (dis * total) / 100;
  total = total.toFixed(2);

  let sgst_val = (sgst * total) / 100;
  let cgst_val = (cgst * total) / 100;
  let cess_val = (cess * total) / 100;
  sgst_val = sgst_val.toFixed(2);
  cgst_val = cgst_val.toFixed(2);
  cess_val = cess_val.toFixed(2);

  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <>
      {isScreenSmallerThanMd ? (
        // <div className="w-full">
        <tr className=" py-2 w-auto">
          <td>
            <div className="flex flex-row justify-between w-full border-b border-gray-300">
              {/* details  */}
              <div className="flex flex-row ">
                {/* <div className="flex flex-row justify-start"> */}
                <td className="text-center">
                  <input
                    type="number"
                    className="text-left text-xl font-semibold placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-10 mt-2 -ml-5"
                    placeholder={idx}
                  />
                </td>
                <div className="flex flex-col">
                  <td className="flex flex-col text-center items-start">
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        className="px-2 text-left text-2xl placeholder:text-left border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-40"
                        placeholder={name || "Item Name"}
                        id={id}
                        onChange={(event) => onEditItem(event)}
                      />
                    </div>
                    <div className="my-2">
                      <input
                        type="text"
                        name="hsn"
                        className="px-2 text-left text-sm placeholder:text-left border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-32"
                        placeholder={hsn || "HSN No."}
                        id={id}
                        onChange={(event) => onEditItem(event)}
                      />
                    </div>
                  </td>
                  <td className="text-center flex justify-between">
                    <label htmlFor="" className="text-center text-gray-600">
                      Price:
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-16"
                      placeholder={price}
                      min="0"
                      id={id}
                      onChange={(event) => onEditItem(event)}
                    />
                  </td>
                  <td className="text-center flex justify-between">
                    <label htmlFor="" className="text-center text-gray-600">
                      Discount:
                    </label>
                    <input
                      type="number"
                      name="dis"
                      className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-16"
                      placeholder={dis}
                      min="0"
                      id={id}
                      onChange={(event) => onEditItem(event)}
                    />
                  </td>
                  <td className="text-center flex justify-between">
                    <label htmlFor="" className="text-center text-gray-600">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      name="qty"
                      className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-16"
                      placeholder={qty}
                      min="0"
                      id={id}
                      onChange={(event) => onEditItem(event)}
                    />
                  </td>
                </div>
              </div>
              {/* price  */}
              <div className="flex flex-col items-end space-y-1">
                <td className="flex items-end w-32 justify-end mb-2">
                  <div className="mt-2 text-3xl font-semibold text-gray-600">
                    Rs.{total}
                  </div>
                </td>
                <td className="flex justify-between text-center items-center">
                  <label htmlFor="" className="text-gray-600">
                    SGST:
                  </label>
                  <input
                    type="number"
                    name="sgst"
                    className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-12"
                    placeholder={sgst}
                    min="0"
                    id={id}
                    onChange={(event) => onEditItem(event)}
                  />
                  {/* <span className="text-base text-gray-500 my-2">{sgst_val}</span> */}
                </td>
                <td className=" text-center">
                  <div className="flex justify-between items-center">
                    <label htmlFor="" className="text-gray-600">
                      CGST:
                    </label>
                    <input
                      type="number"
                      name="cgst"
                      className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-12"
                      placeholder={cgst}
                      min="0"
                      id={id}
                      onChange={(event) => onEditItem(event)}
                    />
                    {/* <span className="text-base text-gray-500 my-2">{cgst_val}</span> */}
                  </div>
                </td>

                <td className="flex text-center items-end">
                  <label htmlFor="" className="text-gray-600">
                    Cess:
                  </label>
                  <input
                    type="number"
                    name="cess"
                    className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-12"
                    placeholder={cess}
                    min="0"
                    id={id}
                    onChange={(event) => onEditItem(event)}
                  />
                  {/* <span className="text-base text-gray-500 my-2">{cess_val}</span> */}
                </td>
                <td className="flex items-center justify-end">
                  <button
                    className="flex text-red-600 border border-red-600 py-2 px-4 rounded-lg my-2"
                    type="button"
                    onClick={deleteItemHandler}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </td>
              </div>
            </div>
          </td>
        </tr>
      ) : (
        // </div>
        <tr className="border-b border-gray-300 py-2">
          <td className="text-center align-top">
            <input
              type="number"
              className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-12 mt-2"
              placeholder={idx}
            />
          </td>
          <td className="flex flex-col text-center items-center">
            <div className="mt-2">
              <input
                type="text"
                name="name"
                className="px-2 text-left placeholder:text-left border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-44"
                placeholder={name || "Item Name"}
                id={id}
                onChange={(event) => onEditItem(event)}
              />
            </div>
            <div className="my-2">
              <input
                type="text"
                name="hsn"
                className="px-2 text-left placeholder:text-left border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-44"
                placeholder={hsn || "HSN No."}
                id={id}
                onChange={(event) => onEditItem(event)}
              />
            </div>
          </td>

          <td className="text-center align-top">
            <input
              type="number"
              name="price"
              className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-20 mt-2"
              placeholder={price}
              min="0"
              id={id}
              onChange={(event) => onEditItem(event)}
            />
          </td>
          <td className="text-center align-top">
            <input
              type="number"
              name="dis"
              className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-16 mt-2"
              placeholder={dis}
              min="0"
              id={id}
              onChange={(event) => onEditItem(event)}
            />
          </td>
          <td className="text-center align-top">
            <input
              type="number"
              name="qty"
              className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-16 mt-2"
              placeholder={qty}
              min="0"
              id={id}
              onChange={(event) => onEditItem(event)}
            />
          </td>

          <td className="flex flex-col text-center items-center">
            <input
              type="number"
              name="sgst"
              className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-16 mt-2"
              placeholder={sgst}
              min="0"
              id={id}
              onChange={(event) => onEditItem(event)}
            />
            <span className="text-base text-gray-500 my-2">{sgst_val}</span>
          </td>
          <td className=" text-center">
            <div className="flex flex-col mt-2 items-center">
              <input
                type="number"
                name="cgst"
                className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-16"
                placeholder={cgst}
                min="0"
                id={id}
                onChange={(event) => onEditItem(event)}
              />
              <span className="text-base text-gray-500 my-2">{cgst_val}</span>
            </div>
          </td>

          <td className="flex flex-col text-center items-center">
            <input
              type="number"
              name="cess"
              className="text-center placeholder:text-center placeholder-opacity-100 placeholder-gray-600 border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 w-16"
              placeholder={cess}
              min="0"
              id={id}
              onChange={(event) => onEditItem(event)}
            />
            <span className="text-base text-gray-500 my-2">{cess_val}</span>
          </td>
          <td className="text-center w-16 align-top">
            <div className="mt-2 text-gray-600">{total}</div>
          </td>
          <td className="flex items-center justify-center">
            <button
              className="text-red-600"
              type="button"
              onClick={deleteItemHandler}
            >
              <TiDeleteOutline size={20} />
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default InvoiceItem;
