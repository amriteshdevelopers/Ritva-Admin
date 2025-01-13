import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Adjust the path to your Firebase setup file
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("today"); // Default filter is "today"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const usersCollection = collection(db, "Users");
        const usersSnapshot = await getDocs(usersCollection);

        let allOrders = [];
        for (const userDoc of usersSnapshot.docs) {
          const ordersCollection = collection(userDoc.ref, "orders");
          const ordersSnapshot = await getDocs(ordersCollection);

          ordersSnapshot.docs.forEach((orderDoc) => {
            allOrders.push({ id: orderDoc.id, ...orderDoc.data() });
          });
        }

        // Sort orders by orderDate in descending order
        allOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

        setOrders(allOrders);
        handleFilterChange("today", allOrders); // Automatically filter "today" on load
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (filterType, ordersToFilter = orders) => {
    setFilter(filterType);
    const now = new Date();

    const filtered = ordersToFilter.filter((order) => {
      const orderDate = new Date(order.orderDate);

      if (filterType === "today") {
        return orderDate.toDateString() === now.toDateString();
      } else if (filterType === "last2days") {
        const twoDaysAgo = new Date(now);
        twoDaysAgo.setDate(now.getDate() - 2);
        return orderDate >= twoDaysAgo;
      } else if (filterType === "lastWeek") {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return orderDate >= oneWeekAgo;
      } else if (filterType === "lastMonth") {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return orderDate >= oneMonthAgo;
      }
      return true; // Default: show all orders
    });

    setFilteredOrders(filtered);
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  const handleOrderClick = (order) => {
    navigate(`/order-details/${order.id}`, { state: { order } });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">All User Orders</h1>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${filter === "today" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleFilterChange("today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 mr-2 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleFilterChange("all")}
        >
          All Orders
        </button>
        <button
          className={`px-4 py-2 mr-2 ${filter === "last2days" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleFilterChange("last2days")}
        >
          Last 2 Days
        </button>
        <button
          className={`px-4 py-2 mr-2 ${filter === "lastWeek" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleFilterChange("lastWeek")}
        >
          Last Week
        </button>
        <button
          className={`px-4 py-2 ${filter === "lastMonth" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleFilterChange("lastMonth")}
        >
          Last Month
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">User Email</th>
            <th className="border border-gray-300 px-4 py-2">User Number</th>
            <th className="border border-gray-300 px-4 py-2">Items</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleOrderClick(order)}
            >
              <td className="border border-gray-300 px-4 py-2">
                {order.accountName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.accountEmail}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.accountPhone}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.items.map((item, index) => (
                  <div key={index}>
                    {item.itemName} - {item.itemQuantity}
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Rs. {order.total?.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.orderDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
