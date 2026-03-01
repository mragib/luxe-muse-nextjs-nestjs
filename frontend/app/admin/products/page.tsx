import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import { getBrands, getCategory, getProducts } from "@/lib/data-service";
import { Brand, Category } from "@/lib/type";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";

const ProductPage = async () => {
  const { data: products } = await getProducts();
  const { data: categories } = await getCategory();
  const { data: brands } = await getBrands();
  const filterCategoryies = categories?.filter(
    (cat: Category) => cat.is_active && cat.is_leaf,
  );
  const filterBrands = brands?.filter((brand: Brand) => brand.is_active);

  return (
    <div>
      <AdminPageHeader heading="Products">
        <AddProduct categories={filterCategoryies} brands={filterBrands} />
      </AdminPageHeader>
      <ProductTable
        products={products}
        categories={filterCategoryies}
        brands={filterBrands}
      />
    </div>
  );
};

export default ProductPage;
