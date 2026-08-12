"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import Link from "next/link";

type OrderItem = {
  product_slug: string;
  product_name: string;
  size: string;
  quantity: number;
  price_value: number;
};

type Order = {
  id: string;
  user_id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pin_code: string;
  payment_method: string;
  total_amount: number;
  items: OrderItem[];
  status: string;
  created_at: string;
};

type DbUser = {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string;
  created_at: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dbUsers, setDbUsers] = useState<DbUser[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "customers">("orders");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Standalone Auth States
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Password Management States
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setIsClient(true);
    
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/check-session");
        const result = await res.json();
        if (result.authenticated) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Error checking admin session:", err);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setIsLoggedIn(true);
        setLoginError("");
        toast.success("Welcome to the Admin Dashboard!");
      } else {
        setLoginError(result.error || "Invalid email or password. Please try again.");
        toast.error("Login failed");
      }
    } catch (err: any) {
      setLoginError("Failed to connect to the server. Please try again.");
      toast.error("Connection error");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      setIsLoggedIn(false);
      toast.success("Logged out");
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      toast.error("Password cannot be empty");
      return;
    }
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setIsChangePasswordOpen(false);
        setNewPassword("");
        toast.success("Password updated successfully!");
      } else {
        toast.error(result.error || "Failed to update password");
      }
    } catch (err) {
      toast.error("Failed to connect to the server");
    }
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch("/api/admin/orders");
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to load orders");
      }
      setOrders(result.data || []);
    } catch (err: any) {
      toast.error("Failed to load orders", {
        description: err.message || "Please check your connection.",
      });
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch("/api/admin/users");
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to load customers directory");
      }
      setDbUsers(result.data || []);
    } catch (err: any) {
      toast.error("Failed to load customers directory", {
        description: err.message || "Please check your connection.",
      });
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
      fetchUsers();
    }
  }, [isLoggedIn, fetchOrders, fetchUsers]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrderId(orderId);
      
      const res = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to update status");
      }

      // Update local state immediately
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error("Failed to update status", {
        description: err.message || "Please try again.",
      });
      console.error(err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Hydration protection
  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-anna-background text-anna-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-anna-brand border-t-transparent" />
          <p className="font-display text-lg text-anna-brand font-medium animate-pulse">Loading Portal...</p>
        </div>
      </div>
    );
  }

  // Standalone Login Card Gate
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-anna-background text-anna-foreground px-4 py-16">
        <div className="mx-auto w-full max-w-md rounded-xl border border-anna-brand/20 bg-[#FFF7E8] p-8 shadow-md">
          {/* Logo / Header */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="font-display text-4xl font-bold text-anna-brand leading-none">ANNA VALAM</h2>
            <span className="font-script text-2xl text-anna-copper mt-1">Owner Portal</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                placeholder="admin@annavalam.shop"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/35 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/35 transition-colors"
                required
              />
            </div>

            {loginError && (
              <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded bg-anna-brand py-3 text-center font-display text-lg text-white font-bold hover:bg-anna-forest transition-colors"
            >
              Login to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-anna-brand/70 hover:text-anna-copper font-bold transition-colors">
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalOrdersCount = orders.length;
  const totalCustomersCount = dbUsers.length;
  const pendingOrdersCount = orders.filter((order) => order.status === "Pending").length;

  // Filtered lists
  const filteredOrders = orders.filter((order) => {
    const nameStr = `${order.first_name || ""} ${order.last_name || ""}`.toLowerCase();
    const emailStr = (order.email || "").toLowerCase();
    const phoneStr = (order.phone || "").toLowerCase();
    const orderIdStr = (order.id || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      nameStr.includes(query) ||
      emailStr.includes(query) ||
      phoneStr.includes(query) ||
      orderIdStr.includes(query);

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredUsers = dbUsers.filter((u) => {
    const nameStr = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
    const emailStr = (u.email || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    return nameStr.includes(query) || emailStr.includes(query);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100/70 text-yellow-800 border border-yellow-200";
      case "Processing":
        return "bg-blue-100/70 text-blue-800 border border-blue-200";
      case "Shipped":
        return "bg-purple-100/70 text-purple-800 border border-purple-200";
      case "Delivered":
        return "bg-green-100/70 text-green-800 border border-green-200";
      default:
        return "bg-gray-100/70 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-anna-background text-anna-foreground pt-[100px] pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-anna-brand">Owner Portal</h1>
            <p className="font-sans text-sm text-anna-brand font-medium mt-1">
              Monitor orders, manage fulfillment statuses, and view registered customers.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="rounded-md border border-anna-brand/20 bg-white px-4 py-2 text-sm font-medium text-anna-brand hover:bg-black/5 transition-colors font-bold"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md bg-anna-brand px-4 py-2 text-sm font-medium text-white hover:bg-anna-forest transition-colors font-bold"
            >
              Logout
            </button>
            <Link
              href="/"
              className="rounded-md border border-anna-brand/20 bg-white px-4 py-2 text-sm font-medium text-anna-brand hover:bg-black/5 transition-colors font-bold"
            >
              ← Back to Storefront
            </Link>
          </div>
        </div>

        {/* KPI metrics section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          
          {/* Revenue */}
          <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform text-anna-brand">
            <div>
              <p className="font-sans text-xs font-bold text-anna-brand uppercase tracking-wider">Total Revenue</p>
              <h3 className="font-display text-3xl font-bold text-anna-copper mt-2">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-700 font-bold">
              <span>All complete order value</span>
            </div>
          </div>

          {/* Total Orders */}
          <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform text-anna-brand">
            <div>
              <p className="font-sans text-xs font-bold text-anna-brand uppercase tracking-wider">Total Orders</p>
              <h3 className="font-display text-3xl font-bold text-anna-brand mt-2">
                {totalOrdersCount}
              </h3>
            </div>
            <div className="mt-4 flex items-center text-xs text-anna-brand/70 font-semibold">
              <span>Overall database order rows</span>
            </div>
          </div>

          {/* Total Customers */}
          <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform text-anna-brand">
            <div>
              <p className="font-sans text-xs font-bold text-anna-brand uppercase tracking-wider">Registered Customers</p>
              <h3 className="font-display text-3xl font-bold text-anna-brand mt-2">
                {totalCustomersCount}
              </h3>
            </div>
            <div className="mt-4 flex items-center text-xs text-anna-brand/70 font-semibold">
              <span>Synced Clerk profile records</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform text-anna-brand">
            <div>
              <p className="font-sans text-xs font-bold text-anna-brand uppercase tracking-wider">Pending Orders</p>
              <h3 className={`font-display text-3xl font-bold mt-2 ${pendingOrdersCount > 0 ? "text-anna-copper" : "text-anna-brand"}`}>
                {pendingOrdersCount}
              </h3>
            </div>
            <div className="mt-4 flex items-center text-xs text-anna-brand/70 font-semibold">
              <span>Awaiting packaging or dispatch</span>
            </div>
          </div>

        </div>

        {/* Tab Toggle Control */}
        <div className="flex border-b border-anna-brand/15 mb-6">
          <button
            onClick={() => { setActiveTab("orders"); setSearchQuery(""); }}
            className={`py-3 px-6 font-display text-lg font-bold transition-all border-b-2 ${
              activeTab === "orders"
                ? "border-anna-copper text-anna-copper"
                : "border-transparent text-anna-brand hover:text-anna-copper"
            }`}
          >
            Orders Management
          </button>
          <button
            onClick={() => { setActiveTab("customers"); setSearchQuery(""); }}
            className={`py-3 px-6 font-display text-lg font-bold transition-all border-b-2 ${
              activeTab === "customers"
                ? "border-anna-copper text-anna-copper"
                : "border-transparent text-anna-brand hover:text-anna-copper"
            }`}
          >
            Customer Directory
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-anna-brand font-medium pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder={activeTab === "orders" ? "Search orders by customer name, email, phone, or ID..." : "Search customers by name or email..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white pl-10 pr-3 py-2 font-sans text-sm text-anna-brand placeholder-black/50 transition-colors"
            />
          </div>

          {activeTab === "orders" && (
            <div className="flex items-center gap-2">
              <label htmlFor="status-filter" className="font-sans text-xs font-bold text-anna-brand uppercase">Status Filter:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-1.5 font-sans text-sm text-anna-brand font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab content panel */}
        {activeTab === "orders" ? (
          /* Orders Management */
          <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 shadow-sm overflow-hidden text-anna-brand">
            {loadingOrders ? (
              <div className="p-12 text-center text-anna-brand font-medium font-sans">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-anna-brand border-t-transparent mx-auto mb-3" />
                Loading orders database...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-anna-brand font-medium font-sans">
                No orders match your search parameters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm border-collapse">
                  <thead>
                    <tr className="bg-anna-cream/65 border-b border-anna-brand/20 text-anna-brand font-bold uppercase tracking-wider text-xs">
                      <th className="px-6 py-4">Order details</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Items Ordered</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Shipping Address</th>
                      <th className="px-6 py-4">Payment</th>
                      <th className="px-6 py-4 text-center">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-anna-brand/10">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-anna-brand/5 transition-colors">
                        {/* ID & Date */}
                        <td className="px-6 py-4 whitespace-nowrap align-top">
                          <p className="font-semibold text-black">#{order.id.slice(0, 8)}</p>
                          <p className="text-xs text-anna-brand font-bold mt-1">
                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            })}
                          </p>
                          <p className="text-[10px] text-anna-brand font-semibold">
                            {new Date(order.created_at).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </p>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4 align-top">
                          <p className="font-semibold text-black">
                            {order.first_name} {order.last_name}
                          </p>
                          <p className="text-xs text-anna-brand font-semibold mt-0.5">{order.email}</p>
                          <p className="text-xs text-anna-brand font-semibold mt-0.5">{order.phone}</p>
                        </td>

                        {/* Items */}
                        <td className="px-6 py-4 align-top">
                          <div className="space-y-1 max-w-[220px]">
                            {Array.isArray(order.items) ? (
                              order.items.map((item, idx) => (
                                <div key={idx} className="text-xs text-anna-brand font-medium flex justify-between gap-2 border-b border-anna-brand/5 pb-0.5 last:border-0 last:pb-0">
                                  <span className="truncate">{item.product_name} ({item.size})</span>
                                  <span className="shrink-0 font-bold">x{item.quantity}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-xs text-anna-brand font-medium">Invalid items format</span>
                            )}
                          </div>
                        </td>

                        {/* Total Price */}
                        <td className="px-6 py-4 whitespace-nowrap align-top font-bold text-anna-brand">
                          ₹{(order.total_amount || 0).toLocaleString("en-IN")}
                        </td>

                        {/* Shipping Address */}
                        <td className="px-6 py-4 align-top text-xs text-anna-brand font-medium max-w-[200px]">
                          <p className="text-black font-semibold">{order.address}</p>
                          {order.apartment && <p>{order.apartment}</p>}
                          <p>{order.city}, {order.state} - {order.pin_code}</p>
                        </td>

                        {/* Payment */}
                        <td className="px-6 py-4 whitespace-nowrap align-top">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                            order.payment_method === "razorpay" 
                              ? "bg-green-50 text-green-700 border border-green-200" 
                              : "bg-orange-50 text-orange-700 border border-orange-200"
                          }`}>
                            {order.payment_method === "razorpay" ? "Razorpay" : "COD"}
                          </span>
                        </td>

                        {/* Status Select dropdown */}
                        <td className="px-6 py-4 align-top text-center">
                          <div className="relative inline-block w-[140px] text-left">
                            <select
                              value={order.status}
                              disabled={updatingOrderId === order.id}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className={`w-full rounded-md border px-2.5 py-1.5 text-xs font-bold focus:outline-none transition-colors cursor-pointer text-center ${getStatusColor(order.status)}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                            {updatingOrderId === order.id && (
                              <div className="absolute right-2 top-2.5">
                                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-anna-brand border-t-transparent" />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Customer Directory */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-anna-brand">
            {loadingUsers ? (
              <div className="col-span-full py-12 text-center text-anna-brand font-medium font-sans">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-anna-brand border-t-transparent mx-auto mb-3" />
                Loading customers...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="col-span-full py-12 text-center text-anna-brand font-medium font-sans">
                No registered customers found.
              </div>
            ) : (
              filteredUsers.map((dbUser) => (
                <div
                  key={dbUser.id}
                  className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-5 shadow-sm flex items-start gap-4 hover:scale-[1.01] transition-transform"
                >
                  <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-anna-cream/50 border border-anna-brand/10 flex items-center justify-center font-display text-xl font-bold text-anna-brand">
                    {dbUser.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={dbUser.image_url}
                        alt={`${dbUser.first_name || ""} profile`}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      `${(dbUser.first_name || "C").charAt(0)}${(dbUser.last_name || "").charAt(0)}`
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg font-bold text-black truncate">
                      {dbUser.first_name || "Guest"} {dbUser.last_name || "User"}
                    </h4>
                    <p className="font-sans text-xs text-anna-brand font-bold truncate mt-0.5">{dbUser.email}</p>
                    <p className="font-sans text-[10px] text-anna-brand/70 font-semibold mt-1 truncate">Clerk ID: {dbUser.clerk_id}</p>
                    
                    <div className="mt-3 pt-3 border-t border-anna-brand/10 flex justify-between items-center text-[10px] text-anna-brand font-medium">
                      <span>Joined site:</span>
                      <span className="font-bold text-black">
                        {dbUser.created_at
                          ? new Date(dbUser.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })
                          : "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Change Password Modal */}
        {isChangePasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
            <div className="w-full max-w-md rounded-xl border border-anna-brand/20 bg-anna-background p-8 shadow-2xl">
              <h3 className="font-display text-2xl font-bold text-anna-brand mb-2">Change Owner Password</h3>
              <p className="font-sans text-sm text-anna-brand/70 mb-5">
                Set a new password for future dashboard login sessions.
              </p>

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="new-password" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2 font-sans text-sm text-anna-foreground transition-colors"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 rounded bg-anna-brand py-2.5 text-center font-display text-sm text-white font-bold hover:bg-anna-forest transition-colors"
                  >
                    Save Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangePasswordOpen(false);
                      setNewPassword("");
                    }}
                    className="flex-1 rounded border border-anna-brand/20 bg-white py-2.5 text-center font-display text-sm text-anna-brand hover:bg-black/5 transition-colors font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
