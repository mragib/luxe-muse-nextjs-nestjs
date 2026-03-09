"use server";

import { refreshToken } from "@/action/auth";
import { BACKEND_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { getSession } from "./session";
import {
  ApiResponse,
  APIStatus,
  AttributeFormSchema,
  AttributeValueFormSchema,
  BranchFormSchema,
  Brand,
  BrandFormSchema,
  Category,
  CategoryFormSchema,
  ChartOfAccountFormSchema,
  Product,
  ProductFormSchema,
  UserFormSchema,
} from "./type";

export interface AuthFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: AuthFetchOptions = {},
) => {
  let session = await getSession();
  if (!session?.accessToken) throw new Error("No access token found");

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }

    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, options);
    }
  }

  return response;
};

export const authPostOrPatch = async (
  url: string | URL,
  method: string,
  data: any,
  options: AuthFetchOptions = {},
) => {
  let session = await getSession();
  if (!session?.accessToken) throw new Error("No access token found");

  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.accessToken}`,
  };

  let response = await fetch(url, {
    method: method,
    body: data,
    ...options,
  });

  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }

    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,

        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, {
        method: method,
        body: data,
        ...options,
      });
    }
  }

  return response;
};

export const authDelete = async (
  url: string | URL,
  options: AuthFetchOptions = {},
) => {
  let session = await getSession();
  if (!session?.accessToken) throw new Error("No access token found");
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };
  let response = await fetch(url, { method: "DELETE", ...options });
  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }
    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, { method: "DELETE", ...options });
    }
  }
  return response;
};

export const authFileUpload = async (
  url: string | URL,
  data: FormData,
  options: AuthFetchOptions = {},
) => {
  let session = await getSession();
  if (!session?.accessToken) throw new Error("No access token found");

  // Remove Content-Type header - let the browser set it automatically
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };

  let response = await fetch(url, {
    body: data,
    method: "POST",
    ...options,
  });

  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }

    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, {
        method: "POST",
        body: data,
        ...options,
      });
    }
  }

  return response;
};

export const publicFetch = async (url: string) => {
  const response = await fetch(url);
  return response;
};

export const getProfile = async () => {
  const response = await authFetch(`${BACKEND_URL}/auth/profile`);
  const user = await response.json();
  return user;
};

export const getProtect = async () => {
  const response = await authFetch(`${BACKEND_URL}/auth/protacted`);
  const data = await response.json();

  return data;
};

export const createSessionDB = async ({
  userId,
  session,
}: {
  userId: string;
  session: string;
}) => {
  const data = {
    userId,
    session,
  };

  const response = await fetch(`${BACKEND_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Session is not created");
  }

  const { user } = await response.json();

  return user;
};

export const getSessionBySessionId = async (sessionId: string) => {
  const response = await fetch(`${BACKEND_URL}/session/` + sessionId);
  if (!response.ok) throw new Error("Session Id is not found");
  const data = await response.json();

  return data;
};

export const getUsers = async (): Promise<ApiResponse> => {
  const response = await authFetch(`${BACKEND_URL}/user`);
  const data = await response.json();
  return data;
};

export const addUserService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const phone = data.get("phone");
  const address = data.get("address");
  const role = data.get("role");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  const validationFields = UserFormSchema.safeParse({
    name,
    email,
    password,
    phone,
    address,
    role,
    is_active,
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/user`,
    "POST",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const updateUserService = async (
  state: ApiResponse,
  editId: string,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const phone = data.get("phone");
  const address = data.get("address");
  const role = data.get("role");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  const validationFields = UserFormSchema.safeParse({
    name,
    email,
    password,
    phone,
    address,
    role,
    is_active,
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/user/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const deleteUserService = async (id: string): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/user/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const userRoleChangeService = async (
  state: ApiResponse,
  id: string,
  data: FormData,
): Promise<ApiResponse> => {
  const role = data.get("role");

  const response = await authPostOrPatch(
    `${BACKEND_URL}/user/change-role`,
    "POST",
    JSON.stringify({ userId: id, role }),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

// brand services
export const getBrands = async (): Promise<ApiResponse> => {
  const response = await publicFetch(`${BACKEND_URL}/brand`);
  const data = await response.json();

  const processData = data.data.map((brand: Brand) => {
    return {
      ...brand,
      image_url: brand.image_url ? `${BACKEND_URL}${brand.image_url}` : null,
    };
  });

  return {
    ...data,
    data: processData,
  };
};

export const addBrandService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const image = data.get("image");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  let image_url: string | undefined = undefined;

  // ✅ Upload image only if actually selected
  if (image instanceof File && image.size > 0) {
    const imageName =
      `${Math.trunc(Math.random() * 100000)}-${name}`.replaceAll(/[./\s]/g, "");

    const fileExtension = image.name.split(".").pop();
    const newFileName = `${imageName}.${fileExtension}`;

    const renamedFile = new File([image], newFileName, {
      type: image.type,
    });

    const uploadFormData = new FormData();
    uploadFormData.append("file", renamedFile);

    const uploadResponse = await authFileUpload(
      `${BACKEND_URL}/brand/upload-brand-image`,
      uploadFormData,
    );

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) return uploadData;

    image_url = uploadData.path;
  }

  // ✅ Build payload dynamically
  const payload: any = {
    name,
    description,
    is_active,
  };

  if (image_url) {
    payload.image_url = image_url;
  }

  // ✅ Validate only what we send
  const validationFields = BrandFormSchema.safeParse(payload);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/brand`,
    "POST",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();

  if (response.ok) {
    revalidatePath("/admin/brands");
  }

  return resData;
};

export const updateBrandService = async (
  state: ApiResponse,
  editId: string,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const image = data.get("image");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  let image_url: string | undefined = undefined;

  // ✅ Upload new image only if selected
  if (image instanceof File && image.size > 0) {
    const imageName =
      `${Math.trunc(Math.random() * 100000)}-${name}`.replaceAll(/[./\s]/g, "");

    const fileExtension = image.name.split(".").pop();
    const newFileName = `${imageName}.${fileExtension}`;

    const renamedFile = new File([image], newFileName, {
      type: image.type,
    });

    const uploadFormData = new FormData();
    uploadFormData.append("file", renamedFile);

    const uploadResponse = await authFileUpload(
      `${BACKEND_URL}/brand/upload-brand-image`,
      uploadFormData,
    );

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) return uploadData;

    image_url = uploadData.path;
  }

  // ✅ Build payload dynamically (avoid overwriting image)
  const payload: any = {
    name,
    description,
    is_active,
  };

  if (image_url) {
    payload.image_url = image_url;
  }

  // ✅ Validate only what we send
  const validationFields = BrandFormSchema.safeParse(payload);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/brand/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();

  if (response.ok) {
    revalidatePath("/admin/brands");
  }

  return resData;
};
export const deleteBrandService = async (id: string): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/brand/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/brands");
  return resData;
};

// category services
export const getCategory = async (): Promise<ApiResponse> => {
  const response = await publicFetch(`${BACKEND_URL}/category`);
  const data = await response.json();

  const processData = data.data.map((category: Category) => {
    return {
      ...category,
      image_url: category.image_url
        ? `${BACKEND_URL}${category.image_url}`
        : null,
    };
  });

  return {
    ...data,
    data: processData,
  };
};

export const addCategoryService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name") as string;
  const description = (data.get("description") as string) || null;
  const image = data.get("image");
  let parentId = data.get("parentId");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  const is_leaf =
    data.get("is_leaf") === "true" || data.get("is_leaf") === "on";

  // ✅ Normalize parentId
  if (!parentId || parentId === "undefined" || parentId === "") {
    parentId = null;
  } else {
    parentId = parentId.toString();
  }

  let image_url: string | undefined = undefined;

  // ✅ Upload image only if selected
  if (image instanceof File && image.size > 0) {
    const imageName =
      `${Math.trunc(Math.random() * 100000)}-${name}`.replaceAll(/[./\s]/g, "");

    const fileExtension = image.name.split(".").pop();
    const newFileName = `${imageName}.${fileExtension}`;

    const renamedFile = new File([image], newFileName, {
      type: image.type,
    });

    const uploadFormData = new FormData();
    uploadFormData.append("file", renamedFile);

    const uploadResponse = await authFileUpload(
      `${BACKEND_URL}/category/upload-image`,
      uploadFormData,
    );

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) return uploadData;

    image_url = uploadData.path;
  }

  // ✅ Build payload dynamically
  const payload: any = {
    name,
    description,
    is_active,
    parentId,
    is_leaf,
  };

  if (image_url) {
    payload.image_url = image_url;
  }

  const validationFields = CategoryFormSchema.safeParse(payload);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/category`,
    "POST",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();

  if (response.ok) {
    revalidatePath("/admin/category");
  }

  return resData;
};

export const updateCategoryService = async (
  state: ApiResponse,
  editId: string,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name") as string;
  const description = (data.get("description") as string) || null;
  const image = data.get("image");
  let parentId = data.get("parentId");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";
  const is_leaf =
    data.get("is_leaf") === "true" || data.get("is_leaf") === "on";

  // ✅ Normalize parentId
  if (!parentId || parentId === "undefined" || parentId === "") {
    parentId = null;
  } else {
    parentId = parentId.toString();
  }

  let image_url: string | undefined = undefined;

  // ✅ Upload new image only if selected
  if (image instanceof File && image.size > 0) {
    const imageName =
      `${Math.trunc(Math.random() * 100000)}-${name}`.replaceAll(/[./\s]/g, "");

    const fileExtension = image.name.split(".").pop();
    const newFileName = `${imageName}.${fileExtension}`;

    const renamedFile = new File([image], newFileName, {
      type: image.type,
    });

    const uploadFormData = new FormData();
    uploadFormData.append("file", renamedFile);

    const uploadResponse = await authFileUpload(
      `${BACKEND_URL}/category/upload-image`,
      uploadFormData,
    );

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) return uploadData;

    image_url = uploadData.path;
  }

  // ✅ Build payload dynamically (do not overwrite image if not changed)
  const payload: any = {
    name,
    description,
    is_active,
    parentId,
    is_leaf,
  };

  if (image_url) {
    payload.image_url = image_url;
  }

  // ✅ Validate only what we send
  const validationFields = CategoryFormSchema.safeParse(payload);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/category/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();

  if (response.ok) {
    revalidatePath("/admin/category");
  }

  return resData;
};

export const deleteCategoryService = async (
  id: string,
): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/category/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/category");
  return resData;
};

// Attribute Services
export const getAttributes = async (): Promise<ApiResponse> => {
  const response = await publicFetch(`${BACKEND_URL}/attribute`);
  const data = await response.json();
  return data;
};

export const addAttributeService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  const payload: any = {
    name,
    description,
    is_active,
  };

  const validationFields = AttributeFormSchema.safeParse(payload);
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/attribute`,
    "POST",
    JSON.stringify(validationFields.data),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/attribute");
  return resData;
};

export const updateAttributeService = async (
  state: ApiResponse,
  editId: string,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";
  const payload: any = {
    name,
    description,
    is_active,
  };
  const validationFields = AttributeFormSchema.safeParse(payload);
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }
  const response = await authPostOrPatch(
    `${BACKEND_URL}/attribute/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/attribute");
  return resData;
};

export const deleteAttributeService = async (
  id: string,
): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/attribute/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/attribute");
  return resData;
};

// Attribute Value Services
export const getAttributeValues = async (): Promise<ApiResponse> => {
  const response = await publicFetch(`${BACKEND_URL}/attribute-value`);
  const data = await response.json();
  return data;
};

export const addAttributeValueService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const attributeId = data.get("attributeId") as string;
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";
  const payload: any = {
    name,
    description,
    attributeId,
    is_active,
  };
  const validationFields = AttributeValueFormSchema.safeParse(payload);
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }
  const response = await authPostOrPatch(
    `${BACKEND_URL}/attribute-value`,
    "POST",
    JSON.stringify(validationFields.data),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/attribute-value");
  return resData;
};

export const updateAttributeValueService = async (
  state: ApiResponse,
  editId: string,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const attributeId = data.get("attributeId") as string;
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";
  const payload: any = {
    name,
    description,
    attributeId,
    is_active,
  };

  const validationFields = AttributeValueFormSchema.safeParse(payload);
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }
  const response = await authPostOrPatch(
    `${BACKEND_URL}/attribute-value/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/attribute-value");
  return resData;
};

export const deleteAttributeValueService = async (
  id: string,
): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/attribute-value/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/attribute-value");
  return resData;
};

// Product Services
export const getProducts = async (): Promise<ApiResponse> => {
  const response = await publicFetch(`${BACKEND_URL}/product`);
  const data = await response.json();
  const processData = data.data.map((product: Product) => {
    return {
      ...product,
      image_url: product.image_url
        ? `${BACKEND_URL}${product.image_url}`
        : null,
    };
  });
  return { ...data, data: processData };
};

export const addProductService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const categoryId = data.get("categoryId");
  const brandId = data.get("brandId");

  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const image = data.get("image");
  const unit = data.get("unit") as string | null;
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  let image_url: string | undefined = undefined;

  // ✅ Upload image only if selected
  if (image instanceof File && image.size > 0) {
    const imageName =
      `${Math.trunc(Math.random() * 100000)}-${name}`.replaceAll(/[./\s]/g, "");

    const fileExtension = image.name.split(".").pop();
    const newFileName = `${imageName}.${fileExtension}`;

    const renamedFile = new File([image], newFileName, {
      type: image.type,
    });

    const uploadFormData = new FormData();
    uploadFormData.append("file", renamedFile);

    const uploadResponse = await authFileUpload(
      `${BACKEND_URL}/product/upload-image`,
      uploadFormData,
    );

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) return uploadData;

    image_url = uploadData.path;
  }

  const payload: any = {
    name,
    description,
    image_url,
    unit,
    is_active,
    categoryId,
    brandId,
    // sellingUnitPrice: parseFloat(sellingUnitPriceStr) || 0,
    // costUnitPrice: parseFloat(costUnitPriceStr) || 0,
    // wholesaleUnitPrice: parseFloat(wholesaleUnitPriceStr) || 0,
  };

  console.log("payload", payload);

  const validationFields = ProductFormSchema.safeParse(payload);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/product`,
    "POST",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();

  if (response.ok) revalidatePath("/admin/product");
  return resData;
};

export const updateProductService = async (
  state: ApiResponse,
  editId: string,
  data: FormData,
): Promise<ApiResponse> => {
  const categoryId = data.get("categoryId");
  const brandId = data.get("brandId");
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const image = data.get("image");
  const unit = data.get("unit") as string | null;
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";
  // const sellingUnitPriceStr = data.get("sellingUnitPrice") as string;
  // const costUnitPriceStr = data.get("costUnitPrice") as string;
  // const wholesaleUnitPriceStr = data.get("wholesaleUnitPrice") as string;

  let image_url: string | undefined = undefined;

  if (image instanceof File && image.size > 0) {
    const imageName =
      `${Math.trunc(Math.random() * 100000)}-${name}`.replaceAll(/[./\s]/g, "");

    const fileExtension = image.name.split(".").pop();
    const newFileName = `${imageName}.${fileExtension}`;

    const renamedFile = new File([image], newFileName, {
      type: image.type,
    });

    const uploadFormData = new FormData();
    uploadFormData.append("file", renamedFile);

    const uploadResponse = await authFileUpload(
      `${BACKEND_URL}/product/upload-image`,
      uploadFormData,
    );

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) return uploadData;

    image_url = uploadData.path;
  }

  const payload: any = {
    categoryId,
    brandId,
    name,
    description,
    unit,
    is_active,
    image_url,
  };
  const validationFields = ProductFormSchema.safeParse(payload);
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }
  const response = await authPostOrPatch(
    `${BACKEND_URL}/product/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/product");
  return resData;
};

export const deleteProductService = async (
  id: string,
): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/product/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/product");
  return resData;
};

//chart of account services
export const getChartOfAccount = async (): Promise<ApiResponse> => {
  const response = await authFetch(`${BACKEND_URL}/chart-of-account`);
  const data = await response.json();

  return data;
};

export const addChartOfAccountService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  // ✅ Convert FormData → plain object
  const payload = Object.fromEntries(data.entries());

  // ✅ Validate + transform using Zod
  const validation = ChartOfAccountFormSchema.safeParse(payload);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  // ✅ Send validated & typed data
  const response = await authPostOrPatch(
    `${BACKEND_URL}/chart-of-account`,
    "POST",
    JSON.stringify(validation.data),
  );

  const resData = await response.json();

  if (response.ok) {
    revalidatePath("/admin/chart-of-account");
  }

  return resData;
};

export const updateChartOfAccountService = async (
  state: ApiResponse,
  editId: number,
  data: FormData,
): Promise<ApiResponse> => {
  const payload = Object.fromEntries(data.entries());
  const validationFields = ChartOfAccountFormSchema.safeParse(payload);
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }
  const response = await authPostOrPatch(
    `${BACKEND_URL}/chart-of-account/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/chart-of-account");
  return resData;
};

export const deleteChartOfAccountService = async (
  id: number,
): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/chart-of-account/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/chart-of-account");
  return resData;
};

export const InsertInitialChartOfAccount = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const file = data.get("file") as File;
  const formData = new FormData();
  formData.append("file", file);
  const response = await authFileUpload(
    `${BACKEND_URL}/chart-of-account/upload-csv`,
    formData,
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/chart-of-account");
  return resData;
};

// branch services
export const getBranches = async (): Promise<ApiResponse> => {
  const response = await publicFetch(`${BACKEND_URL}/branch`);
  const data = await response.json();
  return data;
};

export const addBranchService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  // ✅ Convert FormData → plain object
  const payload = Object.fromEntries(data.entries());

  // ✅ Validate + transform using Zod
  const validation = BranchFormSchema.safeParse(payload);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }
  const response = await authPostOrPatch(
    `${BACKEND_URL}/branch`,
    "POST",
    JSON.stringify(validation.data),
  );

  const resData = await response.json();

  if (response.ok) {
    revalidatePath("/admin/branch");
  }

  return resData;
};

export const updateBranchService = async (
  state: ApiResponse,
  editId: string,
  data: FormData,
): Promise<ApiResponse> => {
  const payload = Object.fromEntries(data.entries());
  const validationFields = BranchFormSchema.safeParse(payload);
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }
  const response = await authPostOrPatch(
    `${BACKEND_URL}/branch/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/branch");
  return resData;
};

export const deleteBranchService = async (id: string): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/branch/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/branch");
  return resData;
};
