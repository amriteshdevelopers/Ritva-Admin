import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase"; // Ensure this points to your Firebase config
import { collection, getDocs } from "firebase/firestore"; // Import getDocs correctly


const ItemInfo = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [item, setItem] = useState(null); 
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedImage, setSelectedImage] = useState(""); // State for selected image

  // Fetch item data from Firestore
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const adminsSnapshot = await getDocs(collection(db, "admins"));
        let foundItem = null;

        for (const adminDoc of adminsSnapshot.docs) {
          const itemsSnapshot = await getDocs(
            collection(db, "admins", adminDoc.id, "items")
          );
          foundItem = itemsSnapshot.docs.find((doc) => doc.id === id);
          if (foundItem) {
            const itemData = { id: foundItem.id, ...foundItem.data() };
            setItem(itemData);
            setSelectedImage(itemData.images ? itemData.images[0] : ""); // Set the default selected image
            break;
          }
        }

        if (!foundItem) {
          console.error(`Item with ID ${id} not found.`);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);


  if (loading) {
    return (
      <div className="text-center text-gray-500">Loading item details...</div>
    );
  }

  if (!item) {
    return <div className="text-center text-red-500">Item not found!</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row gap-8">
        {/* Left: Item Images */}
        <div className="mt-[60px] flex">
          <div>
            <img
              src={selectedImage || item.images[0]}
              alt="Selected"
              className="w-full h-[400px] rounded-lg shadow-lg"
            />
          </div>
        </div>
        {/* Right: Item Details */}
        <div className="flex-1 sm:mt-[60px]">
          <h1 className="text-3xl font-bold mb-2">{item.itemName}</h1>
          <h1 className="text-xl text-blue-gray-500">{item.company}</h1>
          <p className="text-2xl font-medium">Best Price</p>
          <p className="text-lg font-semibold text-green-600 mb-1">
            Rs. {item.currentPrice}
          </p>
          <p className="font-extrabold">Available Offers</p>
          <p className="text-red-900">No Offers</p>

          <h1 className="py-2 font-bold">Description:</h1>
          <p>{item.description}</p>
        </div>
        <div className="flex-1 sm:mt-[60px]">
        <h1 className="text-2xl font-bold mb-6">Product Specifications</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <table className="table-auto w-full text-sm text-left">
              <tbody>
                <tr>
                  <td className="py-2 font-medium">Unit</td>
                  <td className="py-2">{item.unit}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Application</td>
                  <td className="py-2">{item.application}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Minimum Order Quantity</td>
                  <td className="py-2">{item.minQuantity}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Main Domestic Market</td>
                  <td className="py-2">{item.domesticMarket}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Brand Name</td>
                  <td className="py-2">{item.brand}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-2">
      <h1 className="text-xl font-semibold mb-4">Vender Details</h1>
      <p>{item.venderDetails}</p>
      </div>
    </div>
  );
};

export default ItemInfo;
