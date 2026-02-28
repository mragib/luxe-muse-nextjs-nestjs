"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  parentId?: number;
  subcategories?: Category[];
  productCount?: number;
}

export default function Categories({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const mainCategories = categories.filter((cat) => !cat.parentId);
  const subcategories = categories.filter((cat) => cat.parentId);

  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "clothing":
        return "👕";
      case "shoes":
        return "👟";
      case "accessories":
        return "👜";
      case "t-shirts":
        return "👕";
      case "jeans":
        return "👖";
      case "dresses":
        return "👗";
      default:
        return "📦";
    }
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-red-500 to-red-600",
      "from-yellow-500 to-yellow-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-gray-600">
            Explore our wide range of fashion categories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Main Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainCategories.map((category, index) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div
                  className={`h-48 bg-gradient-to-r ${getCategoryColor(
                    index,
                  )} flex items-center justify-center`}
                >
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">
                      {getCategoryIcon(category.name)}
                    </div>
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.productCount} products
                    </span>
                    <Link
                      href={`/collections?category=${category.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Shop Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Subcategories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {subcategories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/collections?category=${category.id}`}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-4xl mb-3">
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {category.description}
                  </p>
                  <span className="text-xs text-blue-600 font-medium">
                    {category.productCount} items
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Details Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory.name}
                  </h2>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    {selectedCategory.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedCategory.productCount}
                      </div>
                      <div className="text-sm text-gray-600">Products</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        4.8
                      </div>
                      <div className="text-sm text-gray-600">
                        Average Rating
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subcategories for selected category */}
                {subcategories.filter(
                  (sub) => sub.parentId === selectedCategory.id,
                ).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Subcategories
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {subcategories
                        .filter((sub) => sub.parentId === selectedCategory.id)
                        .map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            href={`/collections?category=${subcategory.id}`}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors text-center"
                          >
                            <div className="text-2xl mb-2">
                              {getCategoryIcon(subcategory.name)}
                            </div>
                            <h4 className="font-medium text-gray-900">
                              {subcategory.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {subcategory.productCount} items
                            </p>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Link
                    href={`/collections?category=${selectedCategory.id}`}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-center"
                  >
                    Browse Products
                  </Link>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Category Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {categories.length}
              </div>
              <p className="text-gray-600">Total Categories</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.reduce(
                  (sum, cat) => sum + (cat.productCount || 0),
                  0,
                )}
              </div>
              <p className="text-gray-600">Total Products</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {mainCategories.length}
              </div>
              <p className="text-gray-600">Main Categories</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-6 text-blue-100">
            Explore our complete collection or contact us for personalized
            recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold"
            >
              Browse All Collections
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
