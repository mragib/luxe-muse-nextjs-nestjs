"use server";

import { revalidatePath } from "next/cache";
import { BACKEND_URL } from "@/lib/constants";
import { getSession } from "./session";
import { refreshToken } from "@/action/auth";
import {
  AdminUser,
  ApiResponse,
  APIStatus,
  Brand,
  BrandFormSchema,
  Category,
  CategoryFormSchema,
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
  const response = await authFetch(`${BACKEND_URL}/brand`);
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
  const response = await authFetch(`${BACKEND_URL}/category`);
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
  const description = data.get("description") as string;
  const image = data.get("image");
  let parentId = data.get("parentId");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

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
  const description = data.get("description") as string;
  const image = data.get("image");
  let parentId = data.get("parentId");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

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
