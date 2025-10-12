"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  cost_price?: number;
  image_url?: string;
  category?: {
    id: number;
    name: string;
  };
}

export default function SalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("discount");

  useEffect(() => {
    fetchSaleProducts();
  }, []);

  const fetchSaleProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      if (response.ok) {
        const data = await response.json();
        // Simulate sale products by adding discount information
        const saleProducts = data.map((product: Product) => ({
          ...product,
          originalPrice: product.price,
          discountPercentage: Math.floor(Math.random() * 50) + 10, // 10-60% discount
          price:
            product.price * (1 - (Math.floor(Math.random() * 50) + 10) / 100),
        }));
        setProducts(saleProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "discount":
        return (b as any).discountPercentage - (a as any).discountPercentage;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalSavings = products.reduce((sum, product) => {
    const savings = (product as any).originalPrice - product.price;
    return sum + savings;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">SALE</h1>
            <p className="text-xl mb-6">Up to 60% off on selected items</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm">Items on Sale</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">
                  ${totalSavings.toFixed(0)}
                </div>
                <div className="text-sm">Total Savings</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">Limited Time</div>
                <div className="text-sm">Offer ends soon!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sale Banner */}
        <div className="bg-red-100 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🔥</div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">
                Flash Sale Alert!
              </h2>
              <p className="text-red-700">
                Don't miss out on these amazing deals. Limited stock available!
              </p>
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Showing {sortedProducts.length} sale{" "}
            {sortedProducts.length === 1 ? "item" : "items"}
          </p>
          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const discountPercentage = (product as any).discountPercentage;
            const originalPrice = (product as any).originalPrice;
            const savings = originalPrice - product.price;

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative"
              >
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{discountPercentage}%
                  </div>
                </div>

                {/* Hot Deal Badge */}
                {discountPercentage > 40 && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      🔥 HOT
                    </div>
                  </div>
                )}

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

                  {/* Price Section */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-red-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Save ${savings.toFixed(2)}
                    </div>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-center block font-medium"
                  >
                    View Deal
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sale Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Sale by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-6xl mb-4">👕</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Clothing
              </h3>
              <p className="text-gray-600 mb-4">
                Up to 50% off on all clothing items
              </p>
              <Link
                href="/collections?category=1"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Shop Clothing Sale
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-6xl mb-4">👟</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Shoes
              </h3>
              <p className="text-gray-600 mb-4">Up to 40% off on footwear</p>
              <Link
                href="/collections?category=2"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Shop Shoe Sale
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-6xl mb-4">👜</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Accessories
              </h3>
              <p className="text-gray-600 mb-4">Up to 60% off on accessories</p>
              <Link
                href="/collections?category=3"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Shop Accessory Sale
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Future Sales!</h2>
          <p className="text-xl mb-6 text-red-100">
            Be the first to know about our exclusive deals and flash sales
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-red-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        {/* Sale Timer */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Sale Ends In
          </h3>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">02</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="text-3xl font-bold text-gray-400">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">14</div>
              <div className="text-sm text-gray-600">Hours</div>
            </div>
            <div className="text-3xl font-bold text-gray-400">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">35</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div className="text-3xl font-bold text-gray-400">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">42</div>
              <div className="text-sm text-gray-600">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
