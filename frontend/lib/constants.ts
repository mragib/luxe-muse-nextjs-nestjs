export const BACKEND_URL = process.env.BACKEND_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const ADMIN_MENU = {
  DASHBOARD: "/admin",
  USERS: "/admin/users",
};

export const UNITNAME = [
  {
    label: "Piece",
    value: "piece",
  },
  {
    label: "Ton",
    value: "ton",
  },
  {
    label: "Kilogram",
    value: "kg",
  },
  {
    label: "Liter",
    value: "liter",
  },
  {
    label: "Meter",
    value: "meter",
  },
  {
    label: "Box",
    value: "box",
  },
  {
    label: "Pack",
    value: "pack",
  },
  {
    label: "Dozen",
    value: "dozen",
  },
  {
    label: "Bottle",
    value: "bottle",
  },
  {
    label: "Can",
    value: "can",
  },
  {
    label: "Bag",
    value: "bag",
  },
];

export enum AccountType {
  Asset = "Asset",
  Liability = "Liability",
  Equity = "Equity",
  Revenue = "Revenue",
  Expense = "Expense",
}

export const AccountTypeForSelect = [
  { value: "Asset", label: "Asset" },
  { value: "Liability", label: "Liability" },
  {
    value: "Equity",
    label: "Equity",
  },
  {
    value: "Revenue",
    label: "Revenue",
  },
  {
    value: "Expense",
    label: "Expense",
  },
];
