import React, { useEffect, useState } from "react";
import { collectionGroup, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Adjust the path to your Firebase setup file

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollectionGroup = collectionGroup(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollectionGroup);
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          docPath: doc.ref.path, // Include the full document path
          ...doc.data(),
        })).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));;
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  const handleOrderClick = (order) => {
    navigate(`/order-details/${order.id}`, { state: { order } });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">All User Orders</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">User Email</th>
            <th className="border border-gray-300 px-4 py-2">User Number</th>
            <th className="border border-gray-300 px-4 py-2">Items</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Order Date</th>
            <th className="border border-gray-300 px-4 py-2">Current status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
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
                Rs. {order.total.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.orderDate).toLocaleString()}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${
                  order.orderStatus === "Order in Process"
                    ? "bg-yellow-500 text-white font-bold"
                    : order.orderStatus === "Order Completed"
                    ? "bg-green-500 text-white font-bold"
                    : "bg-red-600 text-white font-bold"
                }`}
              >
                {order.orderStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
