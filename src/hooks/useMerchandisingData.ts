"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { 
  Quotation, 
  ConfirmOrder, 
  OrderStatus, 
  AccRmBooking, 
  FabricBooking, 
  AccessoriesBooking, 
  PiRegister,
  AccEstimation
} from "@/lib/types";

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export interface MerchandisingState {
  quotations: Quotation[];
  confirmOrders: ConfirmOrder[];
  orderStatuses: OrderStatus[];
  accRmBookings: AccRmBooking[];
  fabricBookings: FabricBooking[];
  accessoriesBookings: AccessoriesBooking[];
  piRegisters: PiRegister[];
  accEstimations: AccEstimation[];

  addQuotation: (input: Omit<Quotation, "id">) => Quotation;
  updateQuotation: (id: string, patch: Partial<Omit<Quotation, "id">>) => void;
  deleteQuotation: (id: string) => void;

  addConfirmOrder: (input: Omit<ConfirmOrder, "id">) => ConfirmOrder;
  updateConfirmOrder: (id: string, patch: Partial<Omit<ConfirmOrder, "id">>) => void;
  deleteConfirmOrder: (id: string) => void;

  addOrderStatus: (input: Omit<OrderStatus, "id">) => OrderStatus;
  updateOrderStatus: (id: string, patch: Partial<Omit<OrderStatus, "id">>) => void;
  deleteOrderStatus: (id: string) => void;

  addAccRmBooking: (input: Omit<AccRmBooking, "id">) => AccRmBooking;
  updateAccRmBooking: (id: string, patch: Partial<Omit<AccRmBooking, "id">>) => void;
  deleteAccRmBooking: (id: string) => void;

  addFabricBooking: (input: Omit<FabricBooking, "id">) => FabricBooking;
  updateFabricBooking: (id: string, patch: Partial<Omit<FabricBooking, "id">>) => void;
  deleteFabricBooking: (id: string) => void;

  addAccessoriesBooking: (input: Omit<AccessoriesBooking, "id">) => AccessoriesBooking;
  updateAccessoriesBooking: (id: string, patch: Partial<Omit<AccessoriesBooking, "id">>) => void;
  deleteAccessoriesBooking: (id: string) => void;

  addPiRegister: (input: Omit<PiRegister, "id">) => PiRegister;
  updatePiRegister: (id: string, patch: Partial<Omit<PiRegister, "id">>) => void;
  deletePiRegister: (id: string) => void;

  addAccEstimation: (input: Omit<AccEstimation, "id">) => AccEstimation;
  updateAccEstimation: (id: string, patch: Partial<Omit<AccEstimation, "id">>) => void;
  deleteAccEstimation: (id: string) => void;

  refresh: () => Promise<void>;
}

function persistToServer(state: Partial<MerchandisingState>) {
  if (typeof window === "undefined") return;
  fetch("/api/data?store=merchandising", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: state }),
  }).catch(() => {});
}

export const useMerchandisingData = create<MerchandisingState>()(
  persist(
    (set, get) => {
      const apply = (updater: (state: MerchandisingState) => Partial<MerchandisingState>) => {
        const next = updater(get());
        set(next);
        const { 
          addQuotation, updateQuotation, deleteQuotation, 
          addConfirmOrder, updateConfirmOrder, deleteConfirmOrder,
          addOrderStatus, updateOrderStatus, deleteOrderStatus,
          addAccRmBooking, updateAccRmBooking, deleteAccRmBooking,
          addFabricBooking, updateFabricBooking, deleteFabricBooking,
          addAccessoriesBooking, updateAccessoriesBooking, deleteAccessoriesBooking,
          addPiRegister, updatePiRegister, deletePiRegister,
          addAccEstimation, updateAccEstimation, deleteAccEstimation,
          refresh, ...dataToPersist 
        } = { ...get(), ...next };
        persistToServer(dataToPersist);
      };

      return {
        quotations: [],
        confirmOrders: [],
        orderStatuses: [],
        accRmBookings: [],
        fabricBookings: [],
        accessoriesBookings: [],
        piRegisters: [],
        accEstimations: [],

        refresh: async () => {
          try {
            const res = await fetch("/api/data?store=merchandising");
            const json = await res.json();
            if (json?.success && json.data) {
              set({ ...json.data });
            }
          } catch (e) {}
        },

        addQuotation: (input) => {
          const record: Quotation = { ...input, id: uid("qtn") };
          apply((state) => ({ quotations: [record, ...state.quotations] }));
          return record;
        },
        updateQuotation: (id, patch) => {
          apply((state) => ({ quotations: state.quotations.map(p => p.id === id ? { ...p, ...patch } : p) }));
        },
        deleteQuotation: (id) => {
          apply((state) => ({ quotations: state.quotations.filter(p => p.id !== id) }));
        },

        addConfirmOrder: (input) => {
          const record: ConfirmOrder = { ...input, id: uid("co") };
          apply((state) => ({ confirmOrders: [record, ...state.confirmOrders] }));
          return record;
        },
        updateConfirmOrder: (id, patch) => {
          apply((state) => ({ confirmOrders: state.confirmOrders.map(p => p.id === id ? { ...p, ...patch } : p) }));
        },
        deleteConfirmOrder: (id) => {
          apply((state) => ({ confirmOrders: state.confirmOrders.filter(p => p.id !== id) }));
        },

        addOrderStatus: (input) => {
          const record: OrderStatus = { ...input, id: uid("os") };
          apply((state) => ({ orderStatuses: [record, ...state.orderStatuses] }));
          return record;
        },
        updateOrderStatus: (id, patch) => {
          apply((state) => ({ orderStatuses: state.orderStatuses.map(p => p.id === id ? { ...p, ...patch } : p) }));
        },
        deleteOrderStatus: (id) => {
          apply((state) => ({ orderStatuses: state.orderStatuses.filter(p => p.id !== id) }));
        },

        addAccRmBooking: (input) => {
          const record: AccRmBooking = { ...input, id: uid("acc") };
          apply((state) => ({ accRmBookings: [record, ...state.accRmBookings] }));
          return record;
        },
        updateAccRmBooking: (id, patch) => {
          apply((state) => ({ accRmBookings: state.accRmBookings.map(p => p.id === id ? { ...p, ...patch } : p) }));
        },
        deleteAccRmBooking: (id) => {
          apply((state) => ({ accRmBookings: state.accRmBookings.filter(p => p.id !== id) }));
        },

        addFabricBooking: (input) => {
          const record: FabricBooking = { ...input, id: uid("fab") };
          apply((state) => ({ fabricBookings: [record, ...state.fabricBookings] }));
          return record;
        },
        updateFabricBooking: (id, patch) => {
          apply((state) => ({ fabricBookings: state.fabricBookings.map(p => p.id === id ? { ...p, ...patch } : p) }));
        },
        deleteFabricBooking: (id) => {
          apply((state) => ({ fabricBookings: state.fabricBookings.filter(p => p.id !== id) }));
        },

        addAccessoriesBooking: (input) => {
          const record: AccessoriesBooking = { ...input, id: uid("accb") };
          apply((state) => ({ accessoriesBookings: [record, ...state.accessoriesBookings] }));
          return record;
        },
        updateAccessoriesBooking: (id, patch) => {
          apply((state) => ({ accessoriesBookings: state.accessoriesBookings.map(p => p.id === id ? { ...p, ...patch } : p) }));
        },
        deleteAccessoriesBooking: (id) => {
          apply((state) => ({ accessoriesBookings: state.accessoriesBookings.filter(p => p.id !== id) }));
        },

        addPiRegister: (input) => {
          const record: PiRegister = { ...input, id: uid("pi") };
          apply((state) => ({ piRegisters: [record, ...state.piRegisters] }));
          return record;
        },
        updatePiRegister: (id, patch) => {
          apply((state) => ({ piRegisters: state.piRegisters.map(p => p.id === id ? { ...p, ...patch } : p) }));
        },
        deletePiRegister: (id) => {
          apply((state) => ({ piRegisters: state.piRegisters.filter(p => p.id !== id) }));
        },

        addAccEstimation: (input) => {
          const record: AccEstimation = { ...input, id: uid("ae") };
          apply((state) => ({ accEstimations: [record, ...state.accEstimations] }));
          return record;
        },
        updateAccEstimation: (id, patch) => {
          apply((state) => ({ accEstimations: state.accEstimations.map(p => p.id === id ? { ...p, ...patch } : p) }));
        },
        deleteAccEstimation: (id) => {
          apply((state) => ({ accEstimations: state.accEstimations.filter(p => p.id !== id) }));
        },
      };
    },
    { name: "same-dawat-erp-merchandising", version: 1 }
  )
);
