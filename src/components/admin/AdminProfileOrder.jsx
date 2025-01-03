import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust to your Firebase setup file

const AdminProfileOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <div>No order details available.</div>;
  }

  const updateOrderStatus = async (newStatus) => {
    try {
      // Ensure the document path is correct
      if (!order.docPath) {
        throw new Error("Document path for the order is not available.");
      }

      // Reference the specific document using its path
      const orderDocRef = doc(db, order.docPath);

      // Update the orderStatus field in Firestore
      await updateDoc(orderDocRef, {
        orderStatus: newStatus,
      });

      // Update the order object locally for UI feedback
      order.orderStatus = newStatus;
      alert(`Order status updated to "${newStatus}" successfully!`);
    } catch (error) {
      console.error("Error updating order status:", error.message);
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Order Details</h1>
      <div className="border p-4 rounded-md shadow-md">
        <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
        <p>User Name: {order.accountName}</p>
        <p>User Contact Number: {order.accountPhone}</p>
        <p>User Email: {order.accountEmail}</p>
        <p>Shipping Address: {order.shippingAddress}</p>
        <p>Billing Address: {order.billingAddress}</p>
        <p>Shipping Method: {order.shippingMethod}</p>
        <p>Payment Method: {order.paymentMethod}</p>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Items:</h3>
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-4 border p-2 rounded-md"
              onClick={() => navigate(`/iteminfo/${item.itemId}`)}
            >
              <img
                src={item.itemPhoto}
                alt={item.itemName}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="font-bold">{item.itemName}</p>
                <p>Quantity: {item.itemQuantity}</p>
                <p>Price: Rs. {item.itemPrice}</p>
                <p>Total: Rs. {item.itemTotal}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <p className="font-bold mt-4">Total: Rs. {order.total.toFixed(2)}</p>
          <div className="flex gap-3">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => updateOrderStatus("Order in Process")}
            >
              Order in Process
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => updateOrderStatus("Order Completed")}
            >
              Order Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileOrder;
