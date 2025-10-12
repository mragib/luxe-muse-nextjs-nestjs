"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category?: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
  description: string;
  image_url?: string;
}

export default function CollectionsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchCollections();
    fetchCategories();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/products/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category?.id === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Collections</h1>
          <p className="text-lg text-gray-600">
            Discover our curated fashion collections
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedCategory === null
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👕</div>
                <p className="text-sm font-medium">All</p>
              </div>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedCategory === category.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {category.name === "Clothing"
                      ? "👕"
                      : category.name === "Shoes"
                      ? "👟"
                      : category.name === "Accessories"
                      ? "👜"
                      : "📦"}
                  </div>
                  <p className="text-sm font-medium">{category.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Filter Controls */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Showing {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different category or check back later.
            </p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-200 relative">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {product.category?.name === "Clothing"
                        ? "👕"
                        : product.category?.name === "Shoes"
                        ? "👟"
                        : product.category?.name === "Accessories"
                        ? "👜"
                        : "📦"}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Collections */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/collections/new-arrivals" className="group">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                <p className="text-blue-100 mb-4">
                  Discover the latest fashion trends
                </p>
                <span className="inline-flex items-center text-sm font-medium">
                  Shop Now →
                </span>
              </div>
            </Link>

            <Link href="/collections/summer" className="group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-8 text-white hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2">Summer Collection</h3>
                <p className="text-orange-100 mb-4">
                  Light and breezy summer styles
                </p>
                <span className="inline-flex items-center text-sm font-medium">
                  Shop Now →
                </span>
              </div>
            </Link>

            <Link href="/collections/winter" className="group">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-8 text-white hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2">Winter Collection</h3>
                <p className="text-gray-300 mb-4">
                  Warm and stylish winter wear
                </p>
                <span className="inline-flex items-center text-sm font-medium">
                  Shop Now →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
