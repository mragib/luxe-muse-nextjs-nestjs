import Link from "next/link";
import Image from "next/image";
import { getCategory } from "@/lib/data-service";
import Categories from "./Categories";

interface Category {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  parentId?: number;
  subcategories?: Category[];
  productCount?: number;
}

export default async function CategoriesPage() {
  const categories = await getCategory();
  return <Categories categories={categories.data} />;
}
