import React from "react";

const CompanyDetails = (props) => {
  const {
    companyName,
    setCompanyName,
    gstNo,
    setGstNo,
    cinNo,
    setCinNo,
    contact,
    setContact,
    tandc,
    setTandC,
  } = props;
  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Organization Details
      </h2>
      <input
        type="text"
        className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-64 mb-3"
        placeholder="Organization Name"
        value={companyName}
        onChange={(e) => {
          setCompanyName(e.target.value);
        }}
      />
      <input
        type="text"
        className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-64 mb-3"
        placeholder="GST Number"
        value={gstNo}
        onChange={(e) => {
          setGstNo(e.target.value);
        }}
      />
      <input
        type="text"
        className="border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 w-64 mb-3"
        placeholder="CIN Number"
        value={cinNo}
        onChange={(e) => {
          setCinNo(e.target.value);
        }}
      />
      <textarea
        className="whitespace-pre-wrap border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1 mb-3"
        cols="30"
        rows="3"
        placeholder="Contact Details"
        value={contact}
        onChange={(e) => {
          setContact(e.target.value);
        }}
      ></textarea>
      

      <textarea
        className="whitespace-pre-wrap border border-transparent hover:border hover:border-indigo-400 rounded bg-gray-100 text-gray-600 px-2 py-1"
        cols="30"
        rows="3"
        placeholder="Terms and Conditions"
        value={tandc}
        onChange={(e) => {
          setTandC(e.target.value);
        }}
      ></textarea>
    </div>
  );
};

export default CompanyDetails;
