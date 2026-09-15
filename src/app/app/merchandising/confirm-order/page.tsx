"use client";
import React, { useEffect } from "react";
import { useMerchandisingData } from "@/hooks/useMerchandisingData";

const InputL = ({ className = "", value, onChange }: any) => (
  <div className={`flex items-center ${className}`}>
    <input type="text" value={value || ""} onChange={onChange} className="h-5 w-full bg-yellow-50 border border-slate-300 px-1 text-[10px] focus:outline-none" />
    <button className="h-5 w-5 bg-slate-200 border border-l-0 border-slate-400 font-bold text-[9px] hover:bg-slate-300">L</button>
  </div>
);

const Input = ({ className = "", value, onChange, readOnly = false, bg = "bg-white" }: any) => (
  <input type="text" value={value || ""} onChange={onChange} readOnly={readOnly} className={`h-5 w-full ${bg} border border-slate-300 px-1 text-[10px] focus:outline-none ${className}`} />
);

const Field = ({ label, children, labelWidth = "w-20" }: any) => (
  <div className="flex items-center mb-1">
    <span className={`text-[10px] font-bold text-slate-700 ${labelWidth} text-right pr-2`}>{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);

const Group = ({ title, children, className = "" }: any) => (
  <div className={`border border-slate-300 rounded-sm relative pt-3 pb-1 px-2 ${className}`}>
    <span className="absolute -top-2 left-2 bg-slate-100 px-1 text-[10px] text-slate-600 font-semibold">{title}</span>
    {children}
  </div>
);

export default function ConfirmOrderDetails() {
  const { 
    confirmOrders, 
    addConfirmOrder, 
    updateConfirmOrder, 
    deleteConfirmOrder,
    refresh
  } = useMerchandisingData();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const totalQty = confirmOrders.reduce((acc, row) => acc + (parseFloat(row.qty) || 0), 0);
  const totalValue = confirmOrders.reduce((acc, row) => acc + (parseFloat(row.value) || 0), 0);

  const handleAddRow = () => {
    addConfirmOrder({
      lot: "", po: "", lcContact: "", bs: "", size: "", qty: "", rate: "", value: "",
      poDate: "", orgDelDt: "", agreedDt: "", exFactDt: "", cuttableQty: "", delMode: "", delPort: ""
    });
  };

  const handleUpdate = (id: string, field: string, val: string) => {
    const row = confirmOrders.find(r => r.id === id);
    if (!row) return;

    let updates: any = { [field]: val };
    
    // Auto-calculate Value = Qty * Rate
    if (field === 'qty' || field === 'rate') {
      const qty = parseFloat(field === 'qty' ? val : row.qty) || 0;
      const rate = parseFloat(field === 'rate' ? val : row.rate) || 0;
      updates.value = qty && rate ? (qty * rate).toFixed(2) : "";
    }
    
    updateConfirmOrder(id, updates);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100 font-sans text-slate-800">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-200 border-b border-slate-300 p-1">
        <div className="text-[11px] font-bold text-blue-800 ml-2">User: <span className="font-semibold text-slate-800">ALAVI</span></div>
        <div className="text-[14px] font-bold text-slate-800">Confirm Order Details</div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm mr-1">X</button>
      </div>

      <div className="flex-1 overflow-auto p-1">
        {/* Top Row */}
        <div className="flex items-center gap-4 bg-slate-100 p-1 border border-slate-300 rounded-sm mb-1">
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <label className="flex items-center gap-1"><input type="radio" name="orderType" defaultChecked /> New Order</label>
            <label className="flex items-center gap-1"><input type="radio" name="orderType" /> Repeat Order</label>
          </div>
          <div className="flex items-center gap-1 w-48">
            <span className="text-[10px] font-bold w-16 text-right">Our Ref:</span>
            <InputL />
          </div>
          <div className="flex items-center gap-1 w-48">
            <span className="text-[10px] font-bold w-16 text-right">Quotation:</span>
            <InputL />
          </div>
          <div className="flex items-center gap-1 w-32">
            <span className="text-[10px] font-bold w-16 text-right">Qtn Qty:</span>
            <Input />
          </div>
          <div className="flex items-center gap-1 w-32">
            <span className="text-[10px] font-bold w-12 text-right">Unit:</span>
            <InputL />
          </div>
        </div>

        {/* Multi-Panel Grid */}
        <div className="flex gap-1 mb-1 items-stretch">
          {/* Column 1 */}
          <div className="flex flex-col gap-1 w-1/4">
            <Group title="Buyer">
              <Field label="Buyer" labelWidth="w-16"><Input bg="bg-slate-200" readOnly /></Field>
              <Field label="Byr Dept" labelWidth="w-16"><Input bg="bg-slate-200" readOnly /></Field>
              <Field label="Byr Mer" labelWidth="w-16"><Input bg="bg-slate-200" readOnly /></Field>
            </Group>
            <Group title="Agent">
              <Field label="Byr Agent" labelWidth="w-16"><InputL /></Field>
              <Field label="Byr Dept" labelWidth="w-16"><InputL /></Field>
              <Field label="Agnt Mer" labelWidth="w-16"><Input /></Field>
            </Group>
            <Group title="Merchandiser">
              <div className="flex gap-1">
                <div className="flex flex-col flex-1">
                  <span className="text-[9px] font-bold text-center">Merchandiser</span>
                  <InputL />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[9px] font-bold text-center">Account Holder</span>
                  <Input />
                </div>
              </div>
            </Group>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-1 w-1/4">
            <Group title="GMT Item" className="h-full">
              <Field label="Buyer Style" labelWidth="w-20"><Input /></Field>
              <Field label="T&A" labelWidth="w-20">
                <div className="flex gap-1 items-center">
                  <button className="bg-blue-100 text-[9px] font-bold text-blue-800 px-2 py-0.5 border border-blue-300">TNA</button>
                  <label className="flex items-center gap-1 text-[9px] font-bold ml-2"><input type="radio" name="styleType" defaultChecked /> Casual</label>
                  <label className="flex items-center gap-1 text-[9px] font-bold"><input type="radio" name="styleType" /> Formal</label>
                </div>
              </Field>
              <Field label="Program" labelWidth="w-20"><Input /></Field>
              <div className="flex gap-1 mb-1">
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[10px] font-bold w-12 text-right">Gmt Item</span>
                  <Input />
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[10px] font-bold text-red-600 w-16 text-right">Qty (Pcs)</span>
                  <Input />
                </div>
              </div>
              <div className="flex gap-1 mb-1">
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[10px] font-bold w-12 text-right">S.Type</span>
                  <Input />
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[10px] font-bold w-16 text-right">Pack Type</span>
                  <InputL />
                </div>
              </div>
              <Field label="Note" labelWidth="w-12"><Input bg="bg-yellow-50" /></Field>
            </Group>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-1 w-1/4">
            <Group title="Delivery">
              <Field label="LOT #" labelWidth="w-16"><Input /></Field>
              <Field label="Quantity" labelWidth="w-16"><Input /></Field>
              <Field label="Del Date" labelWidth="w-16"><Input /></Field>
              <div className="h-4 bg-slate-200 border border-slate-300 rounded mt-1"></div>
            </Group>
            <div className="flex gap-1 flex-1">
              <Group title="Finantial Term" className="flex-1">
                <Field label="Pay Mode" labelWidth="w-16">
                  <select className="h-5 w-full border border-slate-300 text-[10px] focus:outline-none">
                    <option>FOB</option>
                  </select>
                </Field>
                <Field label="Tenors" labelWidth="w-16"><InputL /></Field>
                <Field label="LC UP" labelWidth="w-16">
                  <select className="h-5 w-full border border-slate-300 text-[10px] focus:outline-none">
                    <option>G Rate</option>
                  </select>
                </Field>
              </Group>
              <Group title="Rate" className="flex-1">
                <Field label="Price Type" labelWidth="w-16">
                  <select className="h-5 w-full border border-slate-300 text-[10px] focus:outline-none">
                    <option>Single</option>
                  </select>
                </Field>
                <Field label="U.Price(Pcs)" labelWidth="w-16 text-red-600"><Input /></Field>
              </Group>
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-1 w-1/4">
            <Group title="Schedule">
              <div className="flex gap-1">
                <div className="flex-1">
                  <Field label="Season" labelWidth="w-16"><Input /></Field>
                  <Field label="Year" labelWidth="w-16"><Input /></Field>
                  <Field label="Ord. St." labelWidth="w-16">
                    <select className="h-5 w-full border border-slate-300 text-[10px] focus:outline-none">
                      <option>Confirm</option>
                    </select>
                  </Field>
                </div>
                <div className="flex-1">
                  <Field label="Entry Dt" labelWidth="w-16"><div className="text-[10px] font-bold">11/09/2026</div></Field>
                  <Field label="First Del" labelWidth="w-16"><Input /></Field>
                  <Field label="Conf. Dt" labelWidth="w-16"><Input /></Field>
                </div>
              </div>
            </Group>
            <Group title="Productivity">
              <div className="flex gap-1 mb-1">
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[9px] font-bold text-red-600 w-16 text-right">Qtd. SMV</span>
                  <Input />
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[9px] font-bold w-12 text-right">IE SMV</span>
                  <Input />
                </div>
              </div>
              <div className="flex gap-1 mb-1">
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[9px] font-bold text-red-600 w-16 text-right">Manpower</span>
                  <Input />
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[9px] font-bold w-12 text-right">100% Eff</span>
                  <Input />
                </div>
              </div>
              <div className="flex gap-1 mb-1">
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[9px] font-bold text-red-600 w-16 text-right">PPH Tgt</span>
                  <Input />
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-[9px] font-bold w-12 text-right">.00 % Eff</span>
                  <Input />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold px-1 mt-1">
                <span>Production Required =</span>
                <div className="flex items-center gap-1">
                  <Input className="w-12 bg-slate-200" readOnly />
                  <span>Days</span>
                </div>
              </div>
            </Group>
            <Group title="Commission %">
              <div className="flex gap-1">
                <div className="flex flex-col flex-1"><span className="text-[9px] font-bold text-center">Local</span><Input /></div>
                <div className="flex flex-col flex-1"><span className="text-[9px] font-bold text-center">Foreign</span><Input /></div>
                <div className="flex flex-col flex-1"><span className="text-[9px] font-bold text-center">Special</span><Input /></div>
              </div>
            </Group>
          </div>
        </div>

        {/* Action Row Middle */}
        <div className="flex items-center gap-2 mb-1 p-1 bg-slate-100 border border-slate-300 rounded-sm">
          <div className="flex items-center gap-1 w-32">
            <span className="text-[10px] font-bold">Wash</span>
            <InputL />
          </div>
          <div className="w-16"><InputL /></div>
          
          <div className="flex items-center gap-1 ml-4 text-[10px] font-bold text-red-600 w-24">
            <span>Print</span>
            <select className="h-5 w-full border border-slate-300 focus:outline-none"><option>No</option></select>
          </div>
          <div className="flex items-center gap-1 ml-4 text-[10px] font-bold text-red-600 w-24">
            <span>Embroidery</span>
            <select className="h-5 w-full border border-slate-300 focus:outline-none"><option>No</option></select>
          </div>

          <div className="flex-1"></div>
          
          <button className="bg-slate-200 border border-slate-400 font-bold text-blue-900 text-[10px] px-3 py-0.5 hover:bg-slate-300 underline shadow-sm">Fabric Estimate</button>
          <button className="bg-slate-200 border border-slate-400 font-bold text-blue-900 text-[10px] px-3 py-0.5 hover:bg-slate-300 underline shadow-sm">Access. Estimate</button>
          <button className="bg-slate-200 border border-slate-400 font-bold text-blue-900 text-[10px] px-3 py-0.5 hover:bg-slate-300 shadow-sm">AC Test</button>
        </div>

        {/* Order Detail Grid */}
        <div className="border border-slate-400 bg-white relative">
          <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-600 font-semibold border-x border-t border-slate-300 z-10">Order Detail</span>
          <table className="w-full border-collapse mt-2">
            <thead className="bg-slate-200">
              <tr>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-6"></th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-12">Lot</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-24">PO</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-32">LC / Sales Contact</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-12">BS</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-16">Size</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-16">Qty(Pc)</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-12">Rate</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-16">Value</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-16">PO Date</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-red-600 w-16">Org Del Dt</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-red-600 w-16">Agreed Dt</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-16">(-) Ex-Fact Dt</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-16">(%) Cuttable Qty</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-16">Del Mode</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-16">Del. Port</th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-green-700 w-8"><input type="checkbox" /></th>
                <th className="border border-slate-300 px-1 py-1 text-[10px] font-semibold text-slate-700 w-12">Opt</th>
              </tr>
            </thead>
            <tbody>
              {confirmOrders.map((row) => (
                <tr key={row.id}>
                  <td className="border border-slate-300 text-center"><button onClick={() => deleteConfirmOrder(row.id)} className="text-blue-700 font-bold text-[10px]">X</button></td>
                  <td className="border border-slate-300"><Input value={row.lot} onChange={(e: any) => handleUpdate(row.id, 'lot', e.target.value)} /></td>
                  <td className="border border-slate-300"><Input value={row.po} onChange={(e: any) => handleUpdate(row.id, 'po', e.target.value)} /></td>
                  <td className="border border-slate-300"><InputL value={row.lcContact} onChange={(e: any) => handleUpdate(row.id, 'lcContact', e.target.value)} /></td>
                  <td className="border border-slate-300 bg-yellow-50"><Input bg="bg-yellow-50" value={row.bs} onChange={(e: any) => handleUpdate(row.id, 'bs', e.target.value)} /></td>
                  <td className="border border-slate-300 bg-yellow-50"><Input bg="bg-yellow-50" value={row.size} onChange={(e: any) => handleUpdate(row.id, 'size', e.target.value)} /></td>
                  <td className="border border-slate-300"><Input value={row.qty} onChange={(e: any) => handleUpdate(row.id, 'qty', e.target.value)} /></td>
                  <td className="border border-slate-300"><Input value={row.rate} onChange={(e: any) => handleUpdate(row.id, 'rate', e.target.value)} /></td>
                  <td className="border border-slate-300 bg-slate-200"><Input bg="bg-slate-200" value={row.value} readOnly /></td>
                  <td className="border border-slate-300"><Input value={row.poDate} onChange={(e: any) => handleUpdate(row.id, 'poDate', e.target.value)} /></td>
                  <td className="border border-slate-300"><Input value={row.orgDelDt} onChange={(e: any) => handleUpdate(row.id, 'orgDelDt', e.target.value)} /></td>
                  <td className="border border-slate-300"><Input value={row.agreedDt} onChange={(e: any) => handleUpdate(row.id, 'agreedDt', e.target.value)} /></td>
                  <td className="border border-slate-300 bg-slate-200"><Input bg="bg-slate-200" value={row.exFactDt} onChange={(e: any) => handleUpdate(row.id, 'exFactDt', e.target.value)} /></td>
                  <td className="border border-slate-300 bg-slate-200"><Input bg="bg-slate-200" value={row.cuttableQty} onChange={(e: any) => handleUpdate(row.id, 'cuttableQty', e.target.value)} /></td>
                  <td className="border border-slate-300">
                    <select value={row.delMode} onChange={(e: any) => handleUpdate(row.id, 'delMode', e.target.value)} className="w-full h-5 focus:outline-none text-[10px]">
                      <option></option>
                      <option>Sea</option>
                      <option>Air</option>
                    </select>
                  </td>
                  <td className="border border-slate-300"><InputL value={row.delPort} onChange={(e: any) => handleUpdate(row.id, 'delPort', e.target.value)} /></td>
                  <td className="border border-slate-300 bg-yellow-50"><Input bg="bg-yellow-50" /></td>
                  <td className="border border-slate-300 text-center"><button className="text-blue-700 font-bold text-[10px]">Size</button></td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold">
                <td colSpan={6} className="text-right text-[10px] pr-2 py-1 border border-slate-300">Total:</td>
                <td className="border border-slate-300 bg-white"><Input readOnly value={totalQty > 0 ? totalQty : ""} /></td>
                <td className="border border-slate-300"></td>
                <td className="border border-slate-300 bg-white"><Input readOnly value={totalValue > 0 ? totalValue.toFixed(2) : ""} /></td>
                <td colSpan={8} className="border border-slate-300"></td>
                <td className="border border-slate-300 text-center"><button className="text-red-600 font-bold text-[10px]">Clr</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pre-footer */}
        <div className="flex items-center gap-4 px-2 py-1 mt-1 text-[10px] font-bold">
          <div>No of PO: <span className="text-green-700 ml-1">{confirmOrders.length}</span></div>
          <button className="bg-blue-200 text-blue-900 px-2 py-0.5 border border-slate-300">Comments:</button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">OLT</span>
            <input type="text" className="w-12 h-5 border border-slate-300" />
            <span className="text-slate-500 ml-2">PCD</span>
            <input type="text" className="w-16 h-5 border border-slate-300" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <label className="flex items-center gap-1"><input type="radio" name="sizeOpt" /> Size Wise</label>
            <label className="flex items-center gap-1"><input type="radio" name="sizeOpt" /> In-Seam Wise</label>
            <label className="flex items-center gap-1 text-green-700"><input type="radio" name="sizeOpt" defaultChecked /> RA...</label>
          </div>
        </div>

      </div>

      {/* Bottom Action Bar */}
      <div className="bg-slate-200 border-t border-slate-300 px-2 py-1.5 flex gap-2 items-center text-[11px] font-bold">
        <button className="bg-slate-100 border border-slate-400 hover:bg-slate-200 px-6 py-1 shadow-sm text-blue-900">Legend</button>
        <button className="bg-slate-100 border border-slate-400 hover:bg-slate-200 px-6 py-1 shadow-sm text-blue-900">Attachment</button>
        <button className="bg-slate-100 border border-slate-400 hover:bg-slate-200 px-6 py-1 shadow-sm text-blue-900">Reports</button>
        <button className="bg-slate-100 border border-slate-400 hover:bg-slate-200 px-6 py-1 shadow-sm text-blue-900 underline">View Order</button>
        
        <label className="flex items-center gap-1 ml-2 text-[10px] text-slate-800"><input type="checkbox" /> All Data</label>
        
        <div className="flex-1 text-center">
          <button className="bg-slate-200 border border-slate-400 hover:bg-slate-300 px-6 py-1 shadow-sm text-slate-700 mr-2">ABH</button>
          <button className="bg-slate-200 border border-slate-400 hover:bg-slate-300 px-6 py-1 shadow-sm text-slate-700">FBH</button>
        </div>
        
        <button className="bg-slate-100 border border-slate-400 hover:bg-slate-200 px-6 py-1 shadow-sm text-slate-400 cursor-not-allowed underline">Delete</button>
        <button className="bg-slate-100 border border-slate-400 hover:bg-slate-200 px-6 py-1 shadow-sm text-slate-400 cursor-not-allowed underline">Edit</button>
        <button onClick={handleAddRow} className="bg-slate-100 border border-slate-400 hover:bg-slate-200 px-6 py-1 shadow-sm text-blue-900 underline">New</button>
        <button className="bg-slate-100 border border-slate-400 hover:bg-slate-200 px-6 py-1 shadow-sm text-slate-800 underline">Save</button>
      </div>
    </div>
  );
}
