import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminProfileOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <div>No order details available.</div>;
  }

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
        <p className="font-bold mt-4">Total: Rs. {order.total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AdminProfileOrder;
