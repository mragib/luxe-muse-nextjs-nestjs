import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase();
}

export function changeForSelectArray(data: any[] | null | undefined) {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => {
      // Skip items without proper id or name
      if (!item || item.id == null || !item.name) {
        return null;
      }

      return {
        label: capitalize(String(item.name)),
        value: String(item.id), // Ensure value is always a string
      };
    })
    .filter((item): item is { label: string; value: string } => item !== null); // Type guard to filter out nulls
}

export function changeForDatabaseArray(data: any[] | null | undefined) {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => {
      if (!item || item.value == null || !item.label) {
        return null;
      }

      return {
        name: String(item.label),
        id: item.value, // Keep original type (could be string or number)
      };
    })
    .filter((item): item is { name: string; id: any } => item !== null);
}

export function changeForSelectObject(data: any) {
  if (!data || data.id == null || !data.name) {
    return null;
  }

  return {
    label: capitalize(String(data.name)),
    value: String(data.id), // Ensure value is always a string
  };
}

export function changeForDatabaseObject(data: any) {
  if (!data || data.value == null || !data.label) {
    return null;
  }

  return {
    name: String(data.label),
    id: data.value, // Keep original type
  };
}

// Additional safe utility functions
export function safeChangeForSelectArray(
  data: any[] | null | undefined,
  fallback: any[] = []
) {
  try {
    return changeForSelectArray(data) || fallback;
  } catch (error) {
    console.error("Error in safeChangeForSelectArray:", error);
    return fallback;
  }
}

export function safeChangeForSelectObject(data: any, fallback: any = null) {
  try {
    return changeForSelectObject(data) || fallback;
  } catch (error) {
    console.error("Error in safeChangeForSelectObject:", error);
    return fallback;
  }
}
