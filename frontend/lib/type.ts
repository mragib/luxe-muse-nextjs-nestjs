import z from "zod";
import { AccountType } from "./constants";

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
};

export const CategoryFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  is_active: z.boolean(),
  parentId: z.string().nullable().optional(),
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
  sellingUnitPrice: number;
  costUnitPrice: number;
  wholesaleUnitPrice: number;
  image_url?: string;
  is_active: boolean;
  unit: string;
};

export const ProductFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  description: z.string().optional(),
  sellingUnitPrice: z
    .number()
    .positive("Selling price must be a positive number"),
  costUnitPrice: z.number().positive("Cost price must be a positive number"),
  wholesaleUnitPrice: z
    .number()
    .positive("Wholesale price must be a positive number"),
  image_url: z.string().optional(),
  is_active: z.boolean(),
  unit: z.string().min(1, "Unit cannot be empty").trim(),
});

export type ChartOfAccounting = {
  id: string;
  code: number;
  name: string;
  gl_type: AccountType;
  is_leaf: boolean;
  dr_amount: number;
  cr_amount: number;
  parent?: ChartOfAccounting;
  parentId?: string;
  child?: ChartOfAccounting[];
};
