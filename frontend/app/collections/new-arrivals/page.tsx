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
  created_at: string;
}

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      if (response.ok) {
        const data = await response.json();
        // Simulate new arrivals by sorting by creation date and taking recent ones
        const newArrivals = data
          .sort(
            (a: Product, b: Product) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 12); // Show first 12 as "new arrivals"
        setProducts(newArrivals);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    filterBy === "all"
      ? products
      : products.filter(
          (product) => product.category?.name.toLowerCase() === filterBy
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
      default:
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  });

  const categories = [
    "all",
    ...Array.from(
      new Set(
        products.map((p) => p.category?.name.toLowerCase()).filter(Boolean)
      )
    ),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">New Arrivals</h1>
            <p className="text-xl max-w-3xl mx-auto text-green-100">
              Discover the latest fashion trends and fresh styles that just
              arrived. Be the first to shop our newest collection!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm">New Items</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">Daily</div>
                <div className="text-sm">New Arrivals</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Authentic</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Filter by:
              </label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category
                      ? category.charAt(0).toUpperCase() + category.slice(1)
                      : "Unknown"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group"
            >
              {/* New Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  NEW
                </div>
              </div>

              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Link
                    href={`/products/${product.id}`}
                    className="bg-white text-gray-900 px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium"
                  >
                    Quick View
                  </Link>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.category?.name}
                  </span>
                </div>

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
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>

                {/* Arrival Date */}
                <div className="mt-2 text-xs text-gray-500">
                  Added {new Date(product.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium">
            Load More New Arrivals
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss New Arrivals!</h2>
          <p className="text-xl mb-6 text-blue-100">
            Get notified when we add new products to our collection
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        {/* Related Collections */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Explore More Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/collections" className="group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2">All Collections</h3>
                <p className="text-purple-100 mb-4">
                  Browse our complete fashion collection
                </p>
                <span className="inline-flex items-center text-sm font-medium">
                  Explore Now →
                </span>
              </div>
            </Link>

            <Link href="/sale" className="group">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 text-white hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2">Sale Items</h3>
                <p className="text-red-100 mb-4">
                  Special discounts on selected items
                </p>
                <span className="inline-flex items-center text-sm font-medium">
                  Shop Sale →
                </span>
              </div>
            </Link>

            <Link href="/categories" className="group">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-8 text-white hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2">Shop by Category</h3>
                <p className="text-green-100 mb-4">
                  Find exactly what you're looking for
                </p>
                <span className="inline-flex items-center text-sm font-medium">
                  Browse Categories →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
