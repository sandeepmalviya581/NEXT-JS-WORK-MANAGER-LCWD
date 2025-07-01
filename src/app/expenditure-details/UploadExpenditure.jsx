"use client"




import { addMultipleExpd } from "@/services/expenditureService";
import { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const UploadExpenditure = () => {
  const [excelData, setExcelData] = useState([]);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showResponseTable, setShowResponseTable] = useState(false);
  const [responseTable, setResponseTable] = useState([]);
  const [isDisableBtn, setIsDisableBtn] = useState(false);


  const convertExcelDate = (serial) => {
    if(serial == '' || serial == undefined || serial == null){
      return null;
    }
    console.log(serial);
    const dateObj = XLSX.SSF.parse_date_code(serial);
    console.log(dateObj);
    if (!dateObj) return null;

    const year = dateObj.y;
    const month = String(dateObj.m).padStart(2, '0');
    const day = String(dateObj.d).padStart(2, '0');
    
    if( year == '1900'){
      return null;
    }
    return `${year}-${month}-${day}`;
  };


  const toastWarn = (value) => {
    toast.warn(value, {
      position: 'top-right'
    });
  }

  const toastError = (value) => {
    toast.error(value, {
      position: 'top-right'
    });
  }

  const toastSuccess = (value) => {
    toast.success(value, {
      position: 'top-right'
    });
  }

  const handleFileUpload = (e) => {
    setShowTable(false)
    setShowResponseTable(false)
    setResponseTable([])
    setExcelData([]);

    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { defval: "" });
      console.log('data', data);

      const formatted = data.map((row, idx) => ({
        description: row.description || row.Description || "",
        amount: row.amount || row.Amount || "",
        expenditure_date: convertExcelDate(row.expenditure_date) || "",
        rowNumber: idx + 2,
      }));
      console.log('formatted', formatted);

      const invalid = formatted.find(
        (row) => !row.description || !row.amount
      );

      if (invalid) {
        setError(`Missing required fields at row ${invalid.rowNumber}`);
        setExcelData([]);
        setShowTable(false);
      } else {
        setError(null);
        setExcelData(formatted);
        setShowTable(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    setIsDisableBtn(true);
    if (excelData.length === 0) {
      setError("Please upload and validate an Excel file first.");
      return;
    }
    // Show table first
    setShowResponseTable(true);
    try {
      let payload = { "expditureList": excelData };
      const respResult = await addMultipleExpd(payload);
      console.log(respResult);
      setResponseTable(respResult);
      toastSuccess("File uploaded successfully");
    } catch (err) {
      let e = JSON.parse(JSON.stringify(err));
      setError(e.message);
    }
    setIsDisableBtn(false);
  };

  const previewUploadedData = async () => {
    if (excelData.length === 0) {
      setError("Please upload and validate an Excel file first.");
      return;
    }
    // Show table first
    setShowTable(true);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Upload Excel File</h1>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="mb-3"
        />

        {fileName && (
          <p className="text-sm text-gray-600 mb-2">Selected file: {fileName}</p>
        )}

        {error && (
          <p className="text-red-600 mb-3 font-medium">{error}</p>
        )}

        {/* <button
          onClick={handleUpload}
          disabled= {true}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Upload
        </button>
         */}


        <button
          onClick={handleUpload}
          disabled={isDisableBtn}
          className={`px-4 py-2 rounded-lg ${isDisableBtn ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          Upload
        </button>


        <button
          onClick={previewUploadedData}
          className={`px-4 py-2 rounded-lg ${isDisableBtn ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}        >
          Preview Data
        </button>


        {showTable && excelData.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 border text-center">{idx + 1}</td>
                    <td className="px-4 py-2 border">{row.description}</td>
                    <td className="px-4 py-2 border">{row.amount}</td>
                    <td className="px-4 py-2 border">{row.expenditure_date || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showResponseTable && responseTable.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {responseTable.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 border text-center">{idx + 1}</td>
                    <td className="px-4 py-2 border">{row._id}</td>
                    <td className="px-4 py-2 border">{row.description}</td>
                    <td className="px-4 py-2 border">{row.amount}</td>
                    <td className="px-4 py-2 border">{row.expenditure_date || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


export default UploadExpenditure;