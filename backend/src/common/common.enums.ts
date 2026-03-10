export enum PaymentMethodType {
  Bank = 'bank',
  Cash = 'cash',
  DigitalWallet = 'digital-wallet',
}

export enum DeliveryStatus {
  OrderReceived = 'Order Received',
  Processing = 'Processing',
  Packed = 'Packed',
  Shipped = 'Shipped',
  InTransit = 'In Transit',
  OutforDelivery = 'Out for Delivery',
  Delivered = 'Delivered',
  AttemptedDelivery = 'Attempted Delivery',
  AwaitingPickup = 'Awaiting Pickup',
  Cancelled = 'Cancelled',
  Returned = 'Returned',
  Refunded = 'Refunded',
}

export enum AccountType {
  Asset = 'Asset',
  Liability = 'Liability',
  Equity = 'Equity',
  Revenue = 'Revenue',
  Expense = 'Expense',
}

export enum TransactionType {
  TRANSFER = 'TRANSFER',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
  PURCHASE = 'PURCHASE',
  SALE = 'SALE',
  PAYMENT = 'PAYMENT',
  RECEIPT = 'RECEIPT',
  ADJUSTMENT = 'ADJUSTMENT',
  OPENING_BALANCE = 'OPENING_BALANCE',
  CLOSING_BALANCE = 'CLOSING_BALANCE',
  REFUND = 'REFUND',
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  REVERSAL = 'REVERSAL',
}

export enum DeliveryAction {
  PURCHASE = 'PURCHASE',
  SALE = 'SALE',
}

export enum DeliveryChargePaidBy {
  CUSTOMER = 'CUSTOMER',
  SALLER = 'SALLER',
}

export interface CsvChartOfAccountRow {
  id: string;
  code: string;
  name: string;
  gl_type: AccountType;
  is_leaf: string;
  dr_amount: string;
  cr_amount: string;
  parentId?: string;
  is_active: string;
}

export enum InventoryMovementType {
  OPENING = 'opening',
  PURCHASE = 'purchase',
  SALE = 'sale',
  RETURN = 'return',
  ADJUSTMENT = 'adjustment',
  DAMAGE = 'damage',
}

export const FINISH_GOODS_INVENTORY_ASSET_CODE: number = 1130;
export const OPENING_BALANCE_EQUITY_CODE: number = 3300;
export const ACCOUNT_PAYABLE_CODE: number = 2100;
export const SALES_REVENUE_CODE: number = 4100;
export const ACCOUNT_RECEIVABLE_CODE: number = 1200;
export const COST_OF_GOODS_SOLD_CODE: number = 5100;
export const CASH_IN_HAND_CODE: number = 1300;
export const CASH_IN_BANK_CODE: number = 1320;
