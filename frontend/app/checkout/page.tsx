"use client";

import { useState } from "react";
import Link from "next/link";

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    size: "M",
    color: "White",
    quantity: 2,
    image: "/product-1.jpg",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 89.99,
    size: "32",
    color: "Blue",
    quantity: 1,
    image: "/product-2.jpg",
  },
];

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    cost: 9.99,
    days: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    cost: 19.99,
    days: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    cost: 29.99,
    days: "1 business day",
  },
];

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🅿️" },
  { id: "apple", name: "Apple Pay", icon: "📱" },
  { id: "google", name: "Google Pay", icon: "🎯" },
];

export default function CheckoutPage() {
  const [checkoutType, setCheckoutType] = useState<"guest" | "account">(
    "guest"
  );
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [giftMessage, setGiftMessage] = useState("");
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);

  // Form states
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const selectedShipping = shippingMethods.find(
    (method) => method.id === shippingMethod
  );
  const shippingCost = selectedShipping?.cost || 0;
  const tax = (subtotal + shippingCost) * 0.08;
  const giftWrapCost = includeGiftWrap ? 5.99 : 0;
  const total = subtotal + shippingCost + tax + giftWrapCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    alert("Order placed successfully!");
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
            <Link href="/cart" className="hover:text-gray-700">
              Cart
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Checkout</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Checkout</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Checkout Type */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Checkout Options
              </h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkoutType"
                    value="guest"
                    checked={checkoutType === "guest"}
                    onChange={(e) =>
                      setCheckoutType(e.target.value as "guest" | "account")
                    }
                    className="text-black focus:ring-black"
                  />
                  <span className="ml-3 text-gray-700">Checkout as Guest</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkoutType"
                    value="account"
                    checked={checkoutType === "account"}
                    onChange={(e) =>
                      setCheckoutType(e.target.value as "guest" | "account")
                    }
                    className="text-black focus:ring-black"
                  />
                  <span className="ml-3 text-gray-700">Create Account</span>
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.firstName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.lastName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingAddress.email}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        state: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        zipCode: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Billing Address
                </h2>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                    className="text-black focus:ring-black"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Same as shipping address
                  </span>
                </label>
              </div>

              {!billingSameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={billingAddress.firstName}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={billingAddress.lastName}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={billingAddress.address}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={billingAddress.city}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={billingAddress.state}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          state: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={billingAddress.zipCode}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          zipCode: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      value={billingAddress.country}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Shipping Method
              </h2>
              <div className="space-y-3">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-black focus:ring-black"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {method.days}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900">
                      ${method.cost.toFixed(2)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-black focus:ring-black"
                    />
                    <div className="ml-3 flex items-center">
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <span className="font-medium text-gray-900">
                        {method.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      required
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.nameOnCard}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          nameOnCard: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Gift Options */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Gift Options
              </h2>

              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeGiftWrap}
                    onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                    className="text-black focus:ring-black"
                  />
                  <span className="ml-3 text-gray-700">
                    Include gift wrapping (+$5.99)
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gift Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add a personal message..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">👕</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        Size: {item.size} | Color: {item.color} | Qty:{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <div className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {giftWrapCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Gift Wrapping</span>
                    <span>${giftWrapCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800 transition-colors mt-6"
              >
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium text-green-800">
                    Secure Checkout
                  </h3>
                  <p className="text-sm text-green-700">
                    Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
