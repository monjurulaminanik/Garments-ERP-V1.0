import React, { useState } from 'react';

// Premium Reusable components for clear, smart ERP look
const Section = ({ title, children, className = '', contentClassName = '' }: any) => (
  <div className={`border border-slate-200 rounded-md shadow-sm mb-1.5 bg-white transition-all flex flex-col ${className}`}>
    <div className="bg-slate-50/80 px-2 py-1 font-semibold text-[10px] text-slate-700 border-b border-slate-200 uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
      {title}
    </div>
    <div className={`p-1.5 flex-1 ${contentClassName}`}>
      {children}
    </div>
  </div>
);

const Label = ({ children, className = '' }: any) => (
  <label className={`text-[9px] font-medium text-slate-500 whitespace-nowrap min-w-[70px] xl:text-right ${className}`}>{children}</label>
);

const Input = ({ className = '', ...props }: any) => (
  <input 
    className={`border border-slate-200 rounded-sm h-[20px] px-1 text-[10px] font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 w-full transition-all disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-100 disabled:shadow-none ${className}`} 
    {...props} 
  />
);

const Select = ({ className = '', children, ...props }: any) => (
  <select 
    className={`border border-slate-200 rounded-sm h-[20px] px-0.5 text-[10px] font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 w-full transition-all bg-white ${className}`} 
    {...props}
  >
    {children}
  </select>
);

const Th = ({ children, className = '' }: any) => (
  <th className={`border-b border-slate-200 bg-slate-50 px-1 py-1 text-center text-[9px] font-semibold text-slate-600 whitespace-nowrap ${className}`}>
    {children}
  </th>
);

const Td = ({ children, className = '' }: any) => (
  <td className={`border-b border-slate-100 px-1 py-0.5 text-[9.5px] text-slate-800 group-hover:bg-blue-50/50 transition-colors ${className}`}>
    {children}
  </td>
);

const SummaryRow = ({ label, value, isBold = false, isTotal = false, colorClass = "text-slate-800", bgClass = "" }: any) => (
  <div className={`flex justify-between items-center p-1 rounded-sm ${bgClass} ${isTotal ? 'border-t border-slate-200 mt-0.5' : ''}`}>
    <span className={`text-[10px] ${isBold ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>{label}</span>
    <span className={`text-[10.5px] font-mono ${isBold ? 'font-bold' : 'font-semibold'} ${colorClass}`}>{value}</span>
  </div>
);

export default function QuotationEntryDialog({ onClose, onSave }: { onClose: () => void, onSave?: (data: any) => void }) {
  // --- STATE ---
  const initialFabricRows = [
    { id: 1, usedPlace: 'Body', fabricCode: 'FC-101', fabricDesc: '100% Cotton Single Jersey', actCons: 1.2, quotedCons: 1.25, wPercent: 5, preQtdPrice: 2.50, quotedPrice: 2.60, delQty: 5000 },
    { id: 2, usedPlace: 'Sleeve', fabricCode: 'FC-102', fabricDesc: '95% Cotton 5% Spandex Rib', actCons: 0.3, quotedCons: 0.35, wPercent: 5, preQtdPrice: 3.00, quotedPrice: 3.10, delQty: 5000 }
  ];

  const initialTrimsRows = [
    { id: 1, trimsName: 'Main Label', description: 'Woven', consDz: 12, wPercent: 2, prePrice: 0.05, quotedPrice: 0.05 },
    { id: 2, trimsName: 'Sewing Thread', description: '40/2 Spun Poly', consDz: 1.5, wPercent: 5, prePrice: 0.80, quotedPrice: 0.85 }
  ];

  const initialCosting = {
    financeCost: 0.15,
    cmLaborCost: 1.50,
    overheadCost: 0.30,
    commission: 0.25,
    buyingOp: 0.50,
    fob: 7.50
  };

  const [fabricRows, setFabricRows] = useState(initialFabricRows);
  const [trimsRows, setTrimsRows] = useState(initialTrimsRows);
  const [costing, setCosting] = useState(initialCosting);
  

  // --- HANDLERS ---
  const handleFabricChange = (id: number, field: string, value: number) => {
    setFabricRows(rows => rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };
  const handleTrimsChange = (id: number, field: string, value: number) => {
    setTrimsRows(rows => rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };
  const handleCostingChange = (field: string, value: number) => {
    setCosting(c => ({ ...c, [field]: value }));
  };

  const addFabricRow = () => setFabricRows([...fabricRows, { id: Date.now(), actCons: 0, quotedCons: 0, wPercent: 0, preQtdPrice: 0, quotedPrice: 0, delQty: 0 }]);
  const removeFabricRow = () => { if(fabricRows.length > 0) setFabricRows(fabricRows.slice(0, -1)); };
  
  const addTrimsRow = () => setTrimsRows([...trimsRows, { id: Date.now(), consDz: 0, wPercent: 0, prePrice: 0, quotedPrice: 0 }]);
  const removeTrimsRow = () => { if(trimsRows.length > 0) setTrimsRows(trimsRows.slice(0, -1)); };

  // --- CALCULATIONS ---
  const calculatedFabric = fabricRows.map(row => {
    const totalCons = row.quotedCons * (1 + row.wPercent / 100);
    const amtPcs = totalCons * row.quotedPrice;
    const amtDz = amtPcs * 12;
    return { ...row, totalCons, amtDz, amtPcs };
  });
  const totalFabricCostPcs = calculatedFabric.reduce((acc, row) => acc + row.amtPcs, 0);

  const calculatedTrims = trimsRows.map(row => {
    const totalQty = row.consDz * (1 + row.wPercent / 100);
    const amtDz = totalQty * row.quotedPrice;
    const amtPcs = amtDz / 12;
    return { ...row, totalQty, amtDz, amtPcs };
  });
  const totalTrimsCostPcs = calculatedTrims.reduce((acc, row) => acc + row.amtPcs, 0);

  const totalMaterialCost = totalFabricCostPcs + totalTrimsCostPcs;
  const totalCostNet = totalMaterialCost + costing.financeCost + costing.cmLaborCost + costing.overheadCost;
  
  const netFob = costing.fob - costing.commission - costing.buyingOp;
  const netCm = netFob - totalCostNet;
  const marginPercent = costing.fob > 0 ? (netCm / costing.fob) * 100 : 0;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-100/95 backdrop-blur-sm flex flex-col font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3 flex-shrink-0 shadow-lg z-10 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white px-2 py-1.5 rounded-md text-[11px] font-bold transition-colors flex items-center gap-1 shadow-sm mr-2 border border-slate-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            <span>Back</span>
          </button>
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-inner">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-wide">Quotation / Costing Entry</h1>
            <p className="text-[10px] text-slate-400 font-medium">Create and manage detailed garment costings</p>
          </div>
        </div>
        <button onClick={onClose} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors flex items-center gap-1.5 shadow-sm">
          <span>Close</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-1.5 flex flex-col xl:flex-row items-start gap-2 min-h-0">
        {/* Left/Main Column */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          
          <Section title="Quotation Header">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-1">
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>User:</Label><Input defaultValue="Admin" disabled /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row">
                 <Label>Type:</Label>
                 <div className="flex gap-2 w-full bg-slate-50 border border-slate-200 rounded-sm px-1 py-[1px]">
                   <label className="text-[9px] font-medium flex items-center gap-1 cursor-pointer"><input type="radio" name="cf" defaultChecked className="accent-blue-600"/> Casual</label>
                   <label className="text-[9px] font-medium flex items-center gap-1 cursor-pointer"><input type="radio" name="cf" className="accent-blue-600"/> Formal</label>
                 </div>
              </div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Our Ref:</Label><Input /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row">
                 <Label>Order Type:</Label>
                 <div className="flex gap-2 w-full bg-slate-50 border border-slate-200 rounded-sm px-1 py-[1px]">
                   <label className="text-[9px] font-medium flex items-center gap-1 cursor-pointer"><input type="radio" name="sr" defaultChecked className="accent-blue-600"/> Regular</label>
                   <label className="text-[9px] font-medium flex items-center gap-1 cursor-pointer"><input type="radio" name="sr" className="accent-blue-600"/> SMS</label>
                 </div>
              </div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Quotation No:</Label><Input className="font-bold text-blue-700 bg-blue-50" defaultValue="Q-2026-001" /></div>
              
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Masking No:</Label><Input /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Buyer:</Label><Select><option>HM</option><option>ZARA</option></Select></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Season:</Label><Select><option>SUMMER</option><option>WINTER</option></Select></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Option:</Label><Input /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>TNA:</Label><Select><option>Regular</option></Select></div>
              
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Revised No:</Label><Input /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Offer FOB:</Label><Input type="number" value={costing.fob} onChange={e => handleCostingChange('fob', parseFloat(e.target.value) || 0)} className="font-bold text-green-700 bg-green-50" /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Merchandiser:</Label><Select><option>ALAVI</option></Select></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>A/C Holder:</Label><Select><option>KAMAL</option></Select></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Style No:</Label><Input defaultValue="ST-1002" className="font-semibold" /></div>
              
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>G. Item:</Label><Select><option>TSHIRT</option></Select></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Department:</Label><Select><option>MEN</option></Select></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Style/GMT Item:</Label><Input /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Delivery:</Label><Input type="date" /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>First Delivery:</Label><Input type="date" /></div>
            </div>
          </Section>

          <Section title="Fabric Details" contentClassName="p-0">
            <div className="w-full overflow-x-auto pb-2">
            <table className="w-full min-w-max border-collapse">
              <thead>
                <tr>
                  <Th className="w-6 rounded-tl-sm"></Th>
                  <Th>Used Place</Th>
                  <Th>Supplier</Th>
                  <Th>Status</Th>
                  <Th>Fabric Code</Th>
                  <Th>Mill Code</Th>
                  <Th>Fabric Description</Th>
                  <Th className="w-12">Width</Th>
                  <Th className="w-16">Act. Cons</Th>
                  <Th className="w-16 bg-blue-50/50">Quoted Cons</Th>
                  <Th className="w-12 bg-blue-50/50">W%</Th>
                  <Th className="w-16">Total Cons</Th>
                  <Th className="w-12">Unit</Th>
                  <Th className="w-16">Pre. Qtd Price</Th>
                  <Th className="w-16 bg-green-50/50">Quoted Price</Th>
                  <Th className="w-16">Amt/DZ</Th>
                  <Th className="w-16 rounded-tr-sm">Amt/PCS</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {calculatedFabric.map((row) => (
                  <tr key={row.id} className="group transition-colors">
                    <Td className="text-center"><input type="checkbox" className="accent-blue-600 cursor-pointer"/></Td>
                    <Td><Select><option>Body</option><option>Sleeve</option></Select></Td>
                    <Td><Select><option>Sup. A</option></Select></Td>
                    <Td><Select><option>Active</option></Select></Td>
                    <Td><Input value={row.fabricCode || ''} onChange={e => handleFabricChange(row.id, 'fabricCode', e.target.value as any)} /></Td>
                    <Td><Input /></Td>
                    <Td><Input value={row.fabricDesc || ''} onChange={e => handleFabricChange(row.id, 'fabricDesc', e.target.value as any)} /></Td>
                    <Td><Input /></Td>
                    <Td><Input type="number" step="0.01" value={row.actCons} onChange={e => handleFabricChange(row.id, 'actCons', parseFloat(e.target.value) || 0)} className="text-right" /></Td>
                    <Td><Input type="number" step="0.01" value={row.quotedCons} onChange={e => handleFabricChange(row.id, 'quotedCons', parseFloat(e.target.value) || 0)} className="text-right font-semibold bg-blue-50/30 border-blue-200" /></Td>
                    <Td><Input type="number" value={row.wPercent} onChange={e => handleFabricChange(row.id, 'wPercent', parseFloat(e.target.value) || 0)} className="text-right font-semibold bg-blue-50/30 border-blue-200" /></Td>
                    <Td><Input type="number" disabled value={row.totalCons.toFixed(3)} className="text-right font-bold text-slate-600" /></Td>
                    <Td><Select><option>YDS</option></Select></Td>
                    <Td><Input type="number" step="0.01" value={row.preQtdPrice} onChange={e => handleFabricChange(row.id, 'preQtdPrice', parseFloat(e.target.value) || 0)} className="text-right text-slate-500" /></Td>
                    <Td><Input type="number" step="0.01" value={row.quotedPrice} onChange={e => handleFabricChange(row.id, 'quotedPrice', parseFloat(e.target.value) || 0)} className="text-right font-semibold bg-green-50/30 border-green-200 text-green-700" /></Td>
                    <Td><Input type="number" disabled value={row.amtDz.toFixed(2)} className="text-right font-semibold" /></Td>
                    <Td><Input type="number" disabled value={row.amtPcs.toFixed(2)} className="text-right font-bold text-blue-700 bg-blue-50" /></Td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="flex gap-1.5 px-2 pb-1.5 pt-0.5">
              <button onClick={addFabricRow} className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 text-[9px] font-bold rounded hover:bg-slate-200 transition-colors flex items-center gap-1">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> Add Fabric Row
              </button>
              <button onClick={removeFabricRow} className="bg-white border border-red-200 text-red-600 px-2 py-0.5 text-[9px] font-bold rounded hover:bg-red-50 transition-colors">Remove Last</button>
            </div>
          </Section>

          <Section title="Trims / Accessories" contentClassName="p-0">
            <div className="w-full overflow-x-auto pb-2">
            <table className="w-full min-w-max border-collapse">
              <thead>
                <tr>
                  <Th className="w-6 rounded-tl-sm"></Th>
                  <Th>Used Place</Th>
                  <Th>Trims Name</Th>
                  <Th>Description</Th>
                  <Th>Supplier</Th>
                  <Th>Status</Th>
                  <Th className="w-16 bg-blue-50/50">Cons/DZ</Th>
                  <Th className="w-12">Unit</Th>
                  <Th className="w-12 bg-blue-50/50">W%</Th>
                  <Th className="w-16">Total Qty</Th>
                  <Th className="w-12">Pack Unit</Th>
                  <Th className="w-16">Pre. Price</Th>
                  <Th className="w-16 bg-green-50/50">Quoted Price</Th>
                  <Th className="w-16">Amt/DZ</Th>
                  <Th className="w-16 rounded-tr-sm">Amt/PCS</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {calculatedTrims.map((row) => (
                  <tr key={row.id} className="group transition-colors">
                    <Td className="text-center"><input type="checkbox" className="accent-blue-600 cursor-pointer"/></Td>
                    <Td><Select><option>Body</option></Select></Td>
                    <Td><Input value={row.trimsName || ''} onChange={e => handleTrimsChange(row.id, 'trimsName', e.target.value as any)} /></Td>
                    <Td><Input value={row.description || ''} onChange={e => handleTrimsChange(row.id, 'description', e.target.value as any)} /></Td>
                    <Td><Select><option>Sup. B</option></Select></Td>
                    <Td><Select><option>Active</option></Select></Td>
                    <Td><Input type="number" step="0.01" value={row.consDz} onChange={e => handleTrimsChange(row.id, 'consDz', parseFloat(e.target.value) || 0)} className="text-right font-semibold bg-blue-50/30 border-blue-200" /></Td>
                    <Td><Select><option>PCS</option></Select></Td>
                    <Td><Input type="number" value={row.wPercent} onChange={e => handleTrimsChange(row.id, 'wPercent', parseFloat(e.target.value) || 0)} className="text-right font-semibold bg-blue-50/30 border-blue-200" /></Td>
                    <Td><Input type="number" disabled value={row.totalQty.toFixed(2)} className="text-right font-bold text-slate-600" /></Td>
                    <Td><Input /></Td>
                    <Td><Input type="number" step="0.01" value={row.prePrice} onChange={e => handleTrimsChange(row.id, 'prePrice', parseFloat(e.target.value) || 0)} className="text-right text-slate-500" /></Td>
                    <Td><Input type="number" step="0.01" value={row.quotedPrice} onChange={e => handleTrimsChange(row.id, 'quotedPrice', parseFloat(e.target.value) || 0)} className="text-right font-semibold bg-green-50/30 border-green-200 text-green-700" /></Td>
                    <Td><Input type="number" disabled value={row.amtDz.toFixed(2)} className="text-right font-semibold" /></Td>
                    <Td><Input type="number" disabled value={row.amtPcs.toFixed(3)} className="text-right font-bold text-blue-700 bg-blue-50" /></Td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="flex gap-1.5 px-2 pb-1.5 pt-0.5">
              <button onClick={addTrimsRow} className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 text-[9px] font-bold rounded hover:bg-slate-200 transition-colors flex items-center gap-1">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> Add Trim Row
              </button>
              <button onClick={removeTrimsRow} className="bg-white border border-red-200 text-red-600 px-2 py-0.5 text-[9px] font-bold rounded hover:bg-red-50 transition-colors">Remove Last</button>
            </div>
          </Section>

          <Section title="Costing / CM Section">
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-1">
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Finance Cost:</Label><Input type="number" step="0.01" value={costing.financeCost} onChange={e => handleCostingChange('financeCost', parseFloat(e.target.value) || 0)} className="text-right" /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Finance %:</Label><Input type="number" defaultValue="2" className="text-right" /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>O/H Cost:</Label><Input type="number" step="0.01" value={costing.overheadCost} onChange={e => handleCostingChange('overheadCost', parseFloat(e.target.value) || 0)} className="text-right" /></div>
              
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>CM/Labor Cost:</Label><Input type="number" step="0.01" value={costing.cmLaborCost} onChange={e => handleCostingChange('cmLaborCost', parseFloat(e.target.value) || 0)} className="text-right font-semibold bg-orange-50 border-orange-200" /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Mac. Eff %:</Label><Input type="number" defaultValue="60" className="text-right" /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>SMV:</Label><Input type="number" defaultValue="15" className="text-right" /></div>
              
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Commission:</Label><Input type="number" step="0.01" value={costing.commission} onChange={e => handleCostingChange('commission', parseFloat(e.target.value) || 0)} className="text-right" /></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Buying OP:</Label><Input type="number" step="0.01" value={costing.buyingOp} onChange={e => handleCostingChange('buyingOp', parseFloat(e.target.value) || 0)} className="text-right" /></div>
              
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Net CM:</Label><div className="flex-1 px-1 py-[2px] text-right text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-sm">${netCm.toFixed(2)}</div></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Gross CM:</Label><div className="flex-1 px-1 py-[2px] text-right text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-sm">${(netCm + costing.overheadCost).toFixed(2)}</div></div>
              
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Net FOB:</Label><div className="flex-1 px-1 py-[2px] text-right text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-sm">${netFob.toFixed(2)}</div></div>
              <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Margin %:</Label><div className="flex-1 px-1 py-[2px] text-right text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-sm">{marginPercent.toFixed(2)}%</div></div>
            </div>
          </Section>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            <Section title="Offer Details" className="mb-0">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
                <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Offer No.:</Label><Input defaultValue="OFR-9981" /></div>
                <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>FOB:</Label><Input type="number" step="0.01" value={costing.fob} onChange={e => handleCostingChange('fob', parseFloat(e.target.value) || 0)} className="font-bold text-green-700" /></div>
                <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Ach. CM/DZ:</Label><Input type="number" value={(netCm * 12).toFixed(2)} disabled className="font-bold text-blue-700" /></div>
                <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Commission:</Label><Input type="number" step="0.01" value={costing.commission} onChange={e => handleCostingChange('commission', parseFloat(e.target.value) || 0)} /></div>
                <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Status:</Label><Select><option>Pending</option><option>Approved</option></Select></div>
                <div className="flex xl:items-center gap-1 xl:gap-2 flex-col xl:flex-row"><Label>Submit Date:</Label><Input type="date" /></div>
              </div>
            </Section>

            <Section title="Amendment / Deviation" className="mb-0 h-full flex flex-col">
              <textarea className="w-full flex-1 border border-slate-200 rounded-md p-1.5 text-[10px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none shadow-inner bg-slate-50/50 min-h-[40px]" placeholder="Enter amendment details here..."></textarea>
            </Section>
          </div>
        </div>

        {/* Right Column / Sticky Sidebar */}
        <div className="w-full xl:w-[260px] flex-shrink-0 flex flex-col gap-1.5">
          <div className="bg-white border border-slate-200 rounded-lg shadow-md xl:sticky xl:top-0 overflow-hidden">
            <div className="bg-slate-800 text-white px-3 py-1.5 font-bold text-[11px] tracking-wide flex items-center justify-between">
              <span>Costing Summary</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            
            <div className="p-2 flex flex-col gap-1">
              <SummaryRow label="Fabric Cost (PCS)" value={`$${totalFabricCostPcs.toFixed(3)}`} />
              <SummaryRow label="Trims Cost (PCS)" value={`$${totalTrimsCostPcs.toFixed(3)}`} />
              <SummaryRow label="Total Material Cost" value={`$${totalMaterialCost.toFixed(3)}`} isBold colorClass="text-blue-700" bgClass="bg-blue-50/50 border border-blue-100" />
              
              <div className="h-px bg-slate-100 my-1"></div>
              
              <SummaryRow label="Finance Cost" value={`$${costing.financeCost.toFixed(2)}`} />
              <SummaryRow label="CM / Labor Cost" value={`$${costing.cmLaborCost.toFixed(2)}`} colorClass="text-orange-700" />
              <SummaryRow label="Overhead Cost" value={`$${costing.overheadCost.toFixed(2)}`} />
              <SummaryRow label="Total Cost (Net)" value={`$${totalCostNet.toFixed(2)}`} isBold isTotal colorClass="text-red-600" bgClass="bg-red-50/50 border border-red-100 mt-1" />

              <div className="h-px bg-slate-100 my-1"></div>

              <SummaryRow label="Commission" value={`$${costing.commission.toFixed(2)}`} />
              <SummaryRow label="Buying OP" value={`$${costing.buyingOp.toFixed(2)}`} />

              <SummaryRow label="Gross FOB" value={`$${costing.fob.toFixed(2)}`} isBold colorClass="text-green-700" bgClass="bg-green-50/50 border border-green-100 mt-1" />
              <SummaryRow label="Net FOB" value={`$${netFob.toFixed(2)}`} isBold colorClass="text-emerald-700" bgClass="bg-emerald-50/50 border border-emerald-100" />

              <div className="h-px bg-slate-100 my-1"></div>

              <div className="mt-1 bg-gradient-to-br from-indigo-50 to-blue-50 p-3 rounded-md border border-indigo-100 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-indigo-900">Net CM (PCS)</span>
                  <span className="text-[14px] font-bold text-indigo-700 font-mono">${netCm.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-indigo-900">Margin / CM %</span>
                  <span className="text-[14px] font-bold text-indigo-700 font-mono">{marginPercent.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions - Glassmorphism & Premium Buttons */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 flex flex-wrap items-center justify-center xl:justify-between gap-2 flex-shrink-0 z-10 overflow-x-auto w-full">
        
        <div className="flex gap-1.5 hidden xl:flex">
          <button onClick={() => { setFabricRows(initialFabricRows); setTrimsRows(initialTrimsRows); setCosting(initialCosting); }} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-blue-600 px-3 py-1 text-[10px] font-bold rounded-md transition-all shadow-sm flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> Reset
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-2 py-1 text-[9px] font-bold shadow-sm rounded-md transition-colors">XLS Upload</button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-2 py-1 text-[9px] font-bold shadow-sm rounded-md transition-colors">Qty Replication</button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-2 py-1 text-[9px] font-bold shadow-sm rounded-md transition-colors">Qty Repeat</button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-2 py-1 text-[9px] font-bold shadow-sm rounded-md transition-colors flex items-center gap-1">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg> Attachment
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-1 text-[10px] font-bold shadow-sm rounded-md transition-colors">View</button>
          <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-1 text-[10px] font-bold shadow-sm rounded-md transition-colors">Calculate</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-[10px] font-bold shadow-md shadow-blue-500/20 rounded-md transition-all">Submit</button>
          <button 
            onClick={() => onSave && onSave({ qtnNo: "Q-2026-001", fob: costing.fob, ourRef: "REF-2026", delivery: "15/12/2026" })} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 text-[10px] font-bold shadow-md shadow-emerald-500/20 rounded-md transition-all"
          >
            Save Quotation
          </button>
        </div>
      </div>
    </div>
  );
}
