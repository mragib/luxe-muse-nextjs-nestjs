"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mock cart data
const cartItems = [
  {
    id: 1,
    productId: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "/product-1.jpg",
    size: "M",
    color: "White",
    quantity: 2,
    maxQuantity: 10,
  },
  {
    id: 2,
    productId: 2,
    name: "Denim Jeans",
    price: 89.99,
    image: "/product-2.jpg",
    size: "32",
    color: "Blue",
    quantity: 1,
    maxQuantity: 5,
  },
  {
    id: 3,
    productId: 3,
    name: "Leather Jacket",
    price: 199.99,
    image: "/product-3.jpg",
    size: "L",
    color: "Black",
    quantity: 1,
    maxQuantity: 3,
  },
];

const recommendedProducts = [
  {
    id: 4,
    name: "Summer Dress",
    price: 79.99,
    originalPrice: 99.99,
    image: "/product-4.jpg",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Sneakers",
    price: 129.99,
    image: "/product-5.jpg",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Wool Sweater",
    price: 149.99,
    image: "/product-6.jpg",
    rating: 4.9,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 10 });
    } else {
      alert("Invalid promo code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Shopping Cart</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8"
              />
            </svg>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">👕</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-2 text-gray-600 hover:text-gray-800"
                        >
                          -
                        </button>
                        <span className="px-3 py-2 text-center min-w-[3rem]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-2 text-gray-600 hover:text-gray-800"
                          disabled={item.quantity >= item.maxQuantity}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Promo Code</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-green-600 text-sm mt-2">
                    Promo code {appliedPromo.code} applied!{" "}
                    {appliedPromo.discount}% off
                  </p>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-black text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800 transition-colors block text-center mt-6"
                >
                  Proceed to Checkout
                </Link>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Free shipping on orders over $50
                </p>
              </div>

              {/* Virtual Try-On */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Virtual Try-On
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  See how these items look on you with our AI-powered virtual
                  try-on feature.
                </p>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-md font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors">
                  Try On Virtually
                </button>
              </div>

              {/* Style Advice Chatbot */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Style Advisor
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get personalized style recommendations from our AI fashion
                  expert.
                </p>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                  Chat with Style Advisor
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {items.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden group"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-4xl">👕</span>
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                      <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-800 transition-colors text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
