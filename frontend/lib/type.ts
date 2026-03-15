import z from "zod";
import { AccountType, PaymentMethodType } from "./constants";

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type ApiResponse =
  | {
      error?: any; // Can be string or field errors object
      message?: string;
      status?: string;
      statusCode?: number;
      data?: any;
    }
  | undefined;

export const SignupFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),
});

export const SigninFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password field cannot be empty"),
});

export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CUSTOMER = "CUSTOMER",
}

export enum APIStatus {
  SUCCESS = "success",
  FAIL = "fail",
}

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
  role: Role;
};

export const UserFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),

  phone: z
    .string("Phone number should not be empty")
    .regex(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Provide proper phone number",
    )
    .trim(),
  address: z.string("Please provide address").trim(),
  role: z.enum(Role),
  is_active: z.boolean(),
});

export type Brand = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
};

export const BrandFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  is_active: z.boolean(),
});

export type Category = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  parent?: Category;
  parentId?: string;
  is_active: boolean;
  children?: Category[];
  is_leaf: boolean;
};

export const CategoryFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  description: z.string().nullable().optional(),
  image_url: z.string().optional(),
  is_active: z.boolean(),
  parentId: z.string().nullable().optional(),
  is_leaf: z.boolean(),
});

export type Attribute = {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
};

export const AttributeFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  description: z.string().optional(),
  is_active: z.boolean(),
});

export type AttributeValue = {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  attributeId: string;
  attribute?: Attribute;
};

export const AttributeValueFormSchema = z.object({
  name: z.string().min(1, "Value should be at least 1 character long").trim(),
  description: z.string().optional(),
  is_active: z.boolean(),
  attributeId: z.string(),
});

export type Product = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  image_url?: string;
  is_active: boolean;
  unit: string;
  brandId: string;
  brand?: Brand;
  categoryId: string;
  category?: Category;
};

export const ProductFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  is_active: z.boolean().optional(),
  unit: z.string().min(1, "Unit cannot be empty").trim(),
  categoryId: z.string(),
  brandId: z.string(),
});

export type ChartOfAccount = {
  id: number;
  code: number;
  name: string;
  gl_type: AccountType;
  is_leaf: boolean;
  dr_amount: number;
  cr_amount: number;
  parent?: ChartOfAccount;
  parentId?: string;
  child?: ChartOfAccount[];
};

export const ChartOfAccountFormSchema = z.object({
  code: z.coerce.number().positive("Code must be a positive number"),

  name: z.string().min(2, "Name should be at least 2 characters long").trim(),

  description: z.string().optional(),

  parentId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.coerce.number().nullable().optional(),
  ),

  is_active: z.coerce.boolean(),

  gl_type: z.enum(AccountType, {
    message: "Please select a valid account type",
  }),

  dr_amount: z.coerce.number().nonnegative("Debit amount cannot be negative"),

  cr_amount: z.coerce.number().nonnegative("Credit amount cannot be negative"),
});

export type branch = {
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  countryId: number;
  managerId: string;
  is_active: boolean;
};

export const BranchFormSchema = z.object({
  name: z.coerce
    .string()
    .min(2, "Name should be at least 2 characters long")
    .trim(),
  code: z.coerce
    .string()
    .min(2, "Code should be at least 2 characters long")
    .trim(),
  address: z
    .string()
    .min(5, "Address should be at least 5 characters long")
    .trim(),
  phone: z
    .string()
    .trim()
    .regex(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Provide proper phone number",
    )
    .nullable()
    .optional(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Provide a valid email address")
    .nullable()
    .optional(),

  city: z
    .string()
    .min(2, "City should be at least 2 characters long")
    .trim()
    .nullable()
    .optional(),
  countryId: z.coerce
    .number()
    .positive("Country ID must be a positive number")
    .nullable()
    .optional(),
  managerId: z.string().trim().nullable().optional(),
  is_active: z.coerce.boolean(),
});

export type Transaction = {
  description: string;
  transaction_date: Date;
  total_amount: number;
  transaction_type: string;
};

export type FinancialAccount = {
  id: number;
  name: string;
  code: number;
  account_number?: string;
  is_active: boolean;
  type: PaymentMethodType;
  balance: number;
  chartOfAccount?: ChartOfAccount;
  chartOfAccountId?: string;
};

export const FinancialAccountFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  code: z.coerce.number().positive("Code must be a positive number"),
  account_number: z.string().optional(),
  is_active: z.coerce.boolean(),
  type: z.enum(PaymentMethodType, {
    message: "Please select a valid payment method type",
  }),
  balance: z.coerce.number().nonnegative("Balance cannot be negative"),
  chartOfAccountId: z.string().optional(),
});
