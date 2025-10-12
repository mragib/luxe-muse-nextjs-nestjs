import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function changeForSelectArray(data) {
  return data.map((item) => {
    return {
      label: capitalize(item.name),
      value: item.id,
    };
  });
}

export function changeForDatabaseArray(data) {
  return data.map((item) => {
    return {
      name: item.label,
      id: item.value,
    };
  });
}

export function changeForSelectObject(data) {
  return data
    ? {
        label: capitalize(data.name),
        value: data.id,
      }
    : null;
}

export function changeForDatabaseObject(data) {
  return {
    name: data.label,
    id: data.value,
  };
}
