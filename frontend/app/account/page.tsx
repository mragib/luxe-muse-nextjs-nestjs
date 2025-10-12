import SignOutButton from "@/components/master/signOutButton";
import { getSession } from "@/lib/session";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
}

interface Order {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
}

export default async function AccountPage() {
  const session = await getSession();

  const fetchUserOrders = async () => {
    try {
      // Mock orders data since we don't have orders endpoint yet
      const mockOrders: Order[] = [
        {
          id: 1,
          order_number: "ORD-001",
          status: "delivered",
          total_amount: 89.99,
          created_at: "2025-01-15T10:30:00Z",
        },
        {
          id: 2,
          order_number: "ORD-002",
          status: "processing",
          total_amount: 149.99,
          created_at: "2025-01-20T14:20:00Z",
        },
      ];
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "processing":
        return "text-blue-600 bg-blue-100";
      case "shipped":
        return "text-purple-600 bg-purple-100";
      case "delivered":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access your account.
          </p>
          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {session?.user.name}
              </p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {/* <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profile", icon: "👤" },
                  { id: "orders", label: "Order History", icon: "📦" },
                  { id: "addresses", label: "Addresses", icon: "🏠" },
                  { id: "wishlist", label: "Wishlist", icon: "❤️" },
                  { id: "settings", label: "Settings", icon: "⚙️" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div> */}

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Tab
              {activeTab === "profile" && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Profile Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="bg-gray-50 px-4 py-3 rounded-md">
                        {user?.first_name || "Not provided"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="bg-gray-50 px-4 py-3 rounded-md">
                        {user?.last_name || "Not provided"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="bg-gray-50 px-4 py-3 rounded-md">
                        {user?.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <div className="bg-gray-50 px-4 py-3 rounded-md">
                        {user?.phone || "Not provided"}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {/* {activeTab === "orders" && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Order History
                  </h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📦</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        When you place your first order, it will appear here.
                      </p>
                      <Link
                        href="/collections"
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Order #{order.order_number}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Placed on{" "}
                                {new Date(
                                  order.created_at
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                ${order.total_amount.toFixed(2)}
                              </div>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                              View Details
                            </button>
                            <div className="space-x-2">
                              {order.status === "delivered" && (
                                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
                                  Buy Again
                                </button>
                              )}
                              {["processing", "shipped"].includes(
                                order.status
                              ) && (
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                                  Track Order
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )} */}

              {/* Addresses Tab */}
              {/* {activeTab === "addresses" && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Address Book
                  </h2>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏠</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No addresses saved
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add your shipping and billing addresses for faster
                      checkout.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                      Add New Address
                    </button>
                  </div>
                </div>
              )} */}

              {/* Wishlist Tab */}
              {/* {activeTab === "wishlist" && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    My Wishlist
                  </h2>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">❤️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Save items you love for later by clicking the heart icon.
                    </p>
                    <Link
                      href="/collections"
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                </div>
              )} */}

              {/* Settings Tab */}
              {/* {activeTab === "settings" && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Notifications
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            defaultChecked
                          />
                          <span className="ml-3 text-gray-700">
                            Email me about order updates
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            defaultChecked
                          />
                          <span className="ml-3 text-gray-700">
                            Email me about new products
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <span className="ml-3 text-gray-700">
                            Email me about promotions
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Account Actions
                      </h3>
                      <div className="space-y-3">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Change Password
                        </button>
                        <br />
                        <button className="text-red-600 hover:text-red-700 font-medium">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
