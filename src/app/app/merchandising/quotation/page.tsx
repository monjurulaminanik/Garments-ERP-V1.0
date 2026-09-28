"use client";
import React, { useEffect, useState } from "react";
import { useMerchandisingData } from "@/hooks/useMerchandisingData";
import QuotationEntryDialog from "./QuotationEntryDialog";

const Th = ({ children, className }: any) => (
  <th className={`border border-slate-300 bg-slate-200/50 px-1 py-1 text-center text-[10px] font-semibold text-slate-700 whitespace-nowrap ${className || ""}`}>
    {children}
  </th>
);

const Td = ({ children, className }: any) => (
  <td className={`border border-slate-300 px-1 py-1 text-[10px] text-slate-800 ${className || ""}`}>
    {children}
  </td>
);

const FilterInput = () => (
  <input type="text" className="w-full h-4 text-[9px] border border-slate-300 px-0.5 focus:outline-none" />
);

const initialRows = [
  { id: "1", qtnDt: "11/11/26", delDt: "12/12/26", qtnNo: "Q-100", amend: "0", ourRef: "REF-1", buyer: "ZARA", buyerRef: "ZR-01", gi: "PANT", mp: "100", smv: "15", pph: "120", eff: "60", qty: "5000", gCm: "1.2", aCm: "1.1", nFob: "5.5", fFob: "6.0", oMer: "ALAVI" },
  { id: "2", qtnDt: "12/11/26", delDt: "15/12/26", qtnNo: "Q-101", amend: "1", ourRef: "REF-2", buyer: "H&M", buyerRef: "HM-02", gi: "SHIRT", mp: "80", smv: "12", pph: "150", eff: "65", qty: "10000", gCm: "0.8", aCm: "0.7", nFob: "4.2", fFob: "4.5", oMer: "KHALID" },
];

export default function QuotationRegister() {
  const { refresh } = useMerchandisingData();
  const [isQuotationDialogOpen, setIsQuotationDialogOpen] = useState(false);
  const [localRows, setLocalRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAddDummy = () => {
    setLocalRows([...localRows, {
      id: Date.now().toString(),
      qtnDt: "15/11/26", delDt: "20/12/26", qtnNo: "Q-NEW-DUMMY", amend: "0", ourRef: "NEW-REF", buyer: "MANGO", buyerRef: "MN-12", gi: "JACKET", mp: "150", smv: "25", pph: "80", eff: "55", qty: "2000", gCm: "2.5", aCm: "2.3", nFob: "12.0", fFob: "13.5", oMer: "ALAVI"
    }]);
  };

  const handleSaveQuotation = (data: any) => {
    setLocalRows([...localRows, {
      id: Date.now().toString(),
      qtnDt: new Date().toLocaleDateString('en-GB'),
      delDt: "TBD",
      qtnNo: data.qtnNo || `Q-2026-${localRows.length + 100}`,
      amend: "0",
      ourRef: "-",
      buyer: "HM",
      buyerRef: "-",
      gi: "TSHIRT",
      mp: "100",
      smv: "15",
      pph: "120",
      eff: "60",
      qty: "5000",
      gCm: "1.2",
      aCm: "1.1",
      nFob: data.fob?.toString() || "7.50",
      fFob: "8.0",
      oMer: "ALAVI"
    }]);
    setIsQuotationDialogOpen(false);
  };

  return (
    <div className="flex flex-col bg-slate-100 font-sans text-slate-800 h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-200 border-b border-slate-300 p-1 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.back()} className="bg-slate-500 hover:bg-slate-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
            &larr; Back
          </button>
          <div className="text-[14px] font-bold text-green-700">Quotation/Costing Register</div>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm mr-1">X</button>
      </div>

      {/* Main Grid Area */}
      <div className="flex-1 overflow-auto border border-slate-300 m-1 bg-white">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-slate-200 shadow-sm z-10">
            {/* Filter Row */}
            <tr>
              <th className="p-0.5 w-16"><FilterInput /></th>
              <th className="p-0.5 w-16"><FilterInput /></th>
              <th className="p-0.5 w-16"><FilterInput /></th>
              <th className="p-0.5 w-8"></th>
              <th className="p-0.5 w-24"><FilterInput /></th>
              <th className="p-0.5 w-6"></th>
              <th className="p-0.5 w-12"><FilterInput /></th>
              <th className="p-0.5 w-6"></th>
              <th className="p-0.5 w-24"><FilterInput /></th>
              <th className="p-0.5 w-6"></th>
              <th className="p-0.5 w-24"><FilterInput /></th>
              <th className="p-0.5 w-24"><FilterInput /></th>
              <th className="p-0.5 w-10"><FilterInput /></th>
              <th className="p-0.5 w-10"><FilterInput /></th>
              <th className="p-0.5 w-12"><FilterInput /></th>
              <th className="p-0.5 w-10"><FilterInput /></th>
              <th className="p-0.5 w-10"><FilterInput /></th>
              <th className="p-0.5 w-16"><FilterInput /></th>
              <th className="p-0.5 w-12"><FilterInput /></th>
              <th className="p-0.5 w-12"><FilterInput /></th>
              <th className="p-0.5 w-12"><FilterInput /></th>
              <th className="p-0.5 w-12"><FilterInput /></th>
              <th className="p-0.5 w-16"><FilterInput /></th>
              <th className="p-0.5 w-6"><FilterInput /></th>
              <th className="p-0.5 w-6"><div className="flex justify-center"><input type="checkbox" className="w-3 h-3" /></div></th>
              <th className="p-0.5 w-24"><button className="bg-orange-500 text-white w-full h-full text-[9px] font-bold">App Status&gt;&gt;</button></th>
            </tr>
            {/* Header Row */}
            <tr>
              <Th>Qtn Dt</Th>
              <Th>Del Dt</Th>
              <Th>Option</Th>
              <Th></Th>
              <Th>Quotation No</Th>
              <Th>R</Th>
              <Th>Amend</Th>
              <Th></Th>
              <Th>Our Ref</Th>
              <Th></Th>
              <Th className="text-red-600">Buyer</Th>
              <Th className="text-blue-700">Buyer Ref</Th>
              <Th>G.I</Th>
              <Th>MP</Th>
              <Th>SMV</Th>
              <Th>PPH</Th>
              <Th>Eff%</Th>
              <Th>Qty</Th>
              <Th>G.CM</Th>
              <Th>A.CM</Th>
              <Th>N.FOB</Th>
              <Th>F.FOB</Th>
              <Th className="text-red-600">O/Mer</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {localRows.map((row) => (
              <tr 
                key={row.id} 
                onClick={() => setSelectedRow(row)}
                className={`cursor-pointer border-b border-slate-200 transition-colors ${selectedRow?.id === row.id ? 'bg-blue-200 hover:bg-blue-200' : 'hover:bg-blue-50 even:bg-slate-50'}`}
              >
                <Td className="text-blue-700 border-r-0">{row.qtnDt}</Td>
                <Td className="border-l-0">{row.delDt}</Td>
                <Td></Td>
                <Td className="text-center font-bold text-blue-800">ST</Td>
                <Td>{row.qtnNo}</Td>
                <Td className="text-center font-bold text-blue-800">R</Td>
                <Td className="text-center">{row.amend}</Td>
                <Td className="text-center font-bold text-blue-800">C <span className="ml-1">A</span></Td>
                <Td>{row.ourRef}</Td>
                <Td className="text-center font-bold text-blue-800">R</Td>
                <Td>{row.buyer}</Td>
                <Td>{row.buyerRef}</Td>
                <Td>{row.gi}</Td>
                <Td className="text-right">{row.mp}</Td>
                <Td className="text-right">{row.smv}</Td>
                <Td className="text-right">{row.pph}</Td>
                <Td className="text-right">{row.eff}</Td>
                <Td className="text-right font-bold">{row.qty}</Td>
                <Td className="text-right">{row.gCm}</Td>
                <Td className="text-right">{row.aCm}</Td>
                <Td className="text-right text-blue-700 font-bold">{row.nFob}</Td>
                <Td className="text-right text-green-700 font-bold">{row.fFob}</Td>
                <Td className="text-center">{row.oMer}</Td>
                <Td className="text-center font-bold text-blue-800">&lt;&lt;</Td>
                <Td className="text-center"><input type="checkbox" className="w-3 h-3" /></Td>
                <Td className="bg-orange-500"></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Totals */}
      <div className="bg-slate-200 border-x border-t border-slate-300 mx-1 flex justify-between px-4 py-0.5 text-[11px] font-bold flex-shrink-0">
        <div>Number of Qtn: <span className="text-slate-800 ml-1">{localRows.length}</span></div>
        <div>Number of Buyer: <span className="text-slate-800 ml-1">...</span></div>
        <div>Buyer Ref: <span className="text-slate-800 ml-1">...</span></div>
        <div>Total Qty: <span className="text-slate-800 ml-1">...</span></div>
        <div>Number of Merchandiser: <span className="text-slate-800 ml-1">...</span></div>
      </div>

      {/* Footer Form */}
      <div className="bg-slate-100 border border-slate-300 mx-1 mb-1 p-1 flex flex-col xl:flex-row gap-2 text-[10px] font-semibold flex-shrink-0">
        {/* Left Form Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-1 p-1 flex-1">
          <div className="flex items-center gap-1 justify-end">
            <span>Masking Qtn No :</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
            <span>=</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span>Buyer Dept :</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
            <span>=</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span>Offer Sts :</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
            <span>=</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span>CT :</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
            <span>=</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
          </div>

          <div className="flex items-center gap-1 justify-end">
            <span>Account Holder :</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
            <span>=</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span>Team Head :</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
            <span>=</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span>B/S :</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
            <span>=</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span>GT :</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
            <span>=</span>
            <input type="text" className="w-16 border border-slate-300 h-4 focus:outline-none" />
          </div>
        </div>

        {/* Legend Grid */}
        <div className="w-full xl:w-[450px] border border-slate-400 bg-white p-1 text-[9px] font-medium leading-tight text-slate-700">
          <div className="flex justify-between">
            <span className="w-1/4">A = No. of Amendment</span>
            <span className="w-1/4">G.I = Garments Item</span>
            <span className="w-1/4">G.CM = Gross CM</span>
            <span className="w-1/4 text-red-600">O/Mer = Our Merchandiser</span>
          </div>
          <div className="flex justify-between">
            <span className="w-1/4">B/Dept = Buyer Department</span>
            <span className="w-1/4">MP = Manpower</span>
            <span className="w-1/4">F.FOB = Final FOB</span>
            <span className="w-1/4">CT = Cost Type</span>
          </div>
          <div className="flex justify-between">
            <span className="w-1/4">B/S = Buyer Season</span>
            <span className="w-1/4">SMV = Standard Minute Value</span>
            <span className="w-1/4">N.FOB = Net FOB</span>
            <span className="w-1/4">GT = Garments Type</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="bg-slate-200 border-t border-slate-300 px-2 py-1.5 flex flex-wrap gap-2 items-center justify-center xl:justify-start text-[11px] font-bold flex-shrink-0">
        <input type="text" defaultValue="13/06/2026" className="w-20 border border-slate-300 h-6 px-1 focus:outline-none text-center bg-yellow-50" />
        <span className="text-slate-600">to</span>
        <input type="text" defaultValue="10/03/2027" className="w-20 border border-slate-300 h-6 px-1 focus:outline-none text-center bg-yellow-50" />
        
        <select className="border border-slate-300 h-6 px-1 focus:outline-none w-24">
          <option>Qtn Dt</option>
        </select>
        
        <button onClick={handleAddDummy} className="bg-orange-400 border border-orange-500 hover:bg-orange-500 text-white px-3 py-1 shadow-sm">Refresh</button>
        
        <div className="flex items-center gap-1">
          <span>Qty :</span>
          <input type="text" className="w-12 border border-slate-300 h-6 px-1 focus:outline-none" />
          <span>=</span>
          <input type="text" className="w-16 border border-slate-300 h-6 px-1 focus:outline-none" />
        </div>

        <div className="flex items-center gap-1">
          <span>Display :</span>
          <select className="border border-slate-300 h-6 px-1 focus:outline-none w-24">
            <option></option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-orange-600 ml-2">
          <label className="flex items-center gap-1"><input type="radio" name="task" defaultChecked /> My Task</label>
          <label className="flex items-center gap-1 text-slate-800"><input type="radio" name="task" /> All</label>
        </div>

        <div className="hidden xl:block flex-1"></div>
        
        <div className="flex flex-wrap gap-2 justify-center w-full xl:w-auto mt-2 xl:mt-0">
          <button className="bg-blue-100 border border-blue-400 text-blue-900 hover:bg-blue-200 px-4 py-1 shadow-sm">Order Entry</button>
          <button onClick={() => setIsQuotationDialogOpen(true)} className="bg-blue-100 border border-blue-400 text-blue-900 hover:bg-blue-200 px-4 py-1 shadow-sm">Quotation Entry</button>
          <button className="bg-teal-50 border border-teal-300 text-teal-900 hover:bg-teal-100 px-4 py-1 shadow-sm">Report</button>
          <button className="bg-green-600 border border-green-700 hover:bg-green-700 text-white px-4 py-1 shadow-sm">Excel.xls</button>
        </div>
      </div>
      
      {/* Selected Row Brief Details */}
      {selectedRow && (
        <div className="bg-white border-t-2 border-blue-400 p-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] flex-shrink-0 z-20">
          <div className="flex justify-between items-center mb-1.5 border-b border-slate-100 pb-1">
            <h3 className="text-[12px] font-bold text-blue-800 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Brief Details: {selectedRow.qtnNo}
            </h3>
            <button onClick={() => setSelectedRow(null)} className="text-red-500 hover:text-white hover:bg-red-500 rounded px-2 py-0.5 font-bold text-[10px] transition-colors">Close Details</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-[10px]">
             <div className="bg-slate-50 p-1.5 rounded"><span className="font-semibold text-slate-500 block mb-0.5">Quotation Date:</span> <span className="font-bold text-slate-800">{selectedRow.qtnDt}</span></div>
             <div className="bg-slate-50 p-1.5 rounded"><span className="font-semibold text-slate-500 block mb-0.5">Buyer:</span> <span className="font-bold text-slate-800">{selectedRow.buyer}</span></div>
             <div className="bg-slate-50 p-1.5 rounded"><span className="font-semibold text-slate-500 block mb-0.5">Garments Item:</span> <span className="font-bold text-slate-800">{selectedRow.gi}</span></div>
             <div className="bg-slate-50 p-1.5 rounded"><span className="font-semibold text-slate-500 block mb-0.5">Order Qty:</span> <span className="font-bold text-slate-800">{selectedRow.qty}</span></div>
             <div className="bg-green-50 border border-green-100 p-1.5 rounded"><span className="font-semibold text-green-700 block mb-0.5">Net FOB:</span> <span className="font-bold text-green-800">${selectedRow.nFob}</span></div>
             
             <div className="bg-slate-50 p-1.5 rounded"><span className="font-semibold text-slate-500 block mb-0.5">Delivery Date:</span> <span className="font-bold text-slate-800">{selectedRow.delDt}</span></div>
             <div className="bg-slate-50 p-1.5 rounded"><span className="font-semibold text-slate-500 block mb-0.5">Our Ref:</span> <span className="font-bold text-slate-800">{selectedRow.ourRef}</span></div>
             <div className="bg-slate-50 p-1.5 rounded"><span className="font-semibold text-slate-500 block mb-0.5">Efficiency:</span> <span className="font-bold text-slate-800">{selectedRow.eff}%</span></div>
             <div className="bg-slate-50 p-1.5 rounded"><span className="font-semibold text-slate-500 block mb-0.5">SMV:</span> <span className="font-bold text-slate-800">{selectedRow.smv}</span></div>
             <div className="bg-blue-50 border border-blue-100 p-1.5 rounded"><span className="font-semibold text-blue-700 block mb-0.5">Merchandiser:</span> <span className="font-bold text-blue-800">{selectedRow.oMer}</span></div>
          </div>
        </div>
      )}

      {isQuotationDialogOpen && <QuotationEntryDialog onClose={() => setIsQuotationDialogOpen(false)} onSave={handleSaveQuotation} />}
    </div>
  );
}
