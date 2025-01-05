import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { deleteDoc } from "firebase/firestore";

const UpdateItem = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    images: [""],
    company: "",
    itemName: "",
    currentPrice: "",
    description: "",
    soldOut: false,
    category: "",
    subCategory: "",
    unit: "",
    application: "",
    minQuantity: "",
    domesticMarket: "",
    brand: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [adminUid, setAdminUid] = useState(null);

  // Track the currently logged-in admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminUid(user.uid);
      } else {
        setAdminUid(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch items owned by the logged-in admin
  useEffect(() => {
    const fetchItems = async () => {
      if (!adminUid) return; // Wait until adminUid is set
      try {
        const itemsRef = collection(db, "admins", adminUid, "items");
        const querySnapshot = await getDocs(itemsRef);
        const fetchedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };
    fetchItems();
  }, [adminUid]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Edit button click
  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      images: item.images || [""], // Ensure images are populated
      company: item.company || "",
      itemName: item.itemName || "",
      currentPrice: item.currentPrice || "",
      description: item.description || "",
      soldOut: item.soldOut || false,
      category: item.category || "",
      subCategory: item.subCategory || "",
      unit: item.unit || "",
      application: item.application || "",
      minQuantity: item.minQuantity || "",
      domesticMarket: item.domesticMarket || "",
      brand: item.brand || "",
    });
    setIsPopupOpen(true);
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImageField = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) {
      alert("No item selected for updating.");
      return;
    }

    try {
      const itemRef = doc(db, "admins", adminUid, "items", selectedItem.id);
      await updateDoc(itemRef, {
        ...formData,
        currentPrice: Number(formData.currentPrice),
      });
      alert("Item updated successfully!");
      setIsPopupOpen(false);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItem.id ? { ...item, ...formData } : item
        )
      );
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };

   // Handle delete action
   const handleDelete = async () => {
    if (!selectedItem) {
      alert("No item selected for deletion.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the item "${selectedItem.itemName}"?`
    );
    if (!confirmDelete) return;

    try {
      const itemRef = doc(db, "admins", adminUid, "items", selectedItem.id);
      await deleteDoc(itemRef);
      alert("Item deleted successfully!");
      setIsPopupOpen(false);
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItem.id)
      );
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  return (
    <div className="pt-[100px] px-4 lg:px-16">
      <h1 className="text-2xl lg:text-4xl font-bold text-center mb-8 text-gray-800">
        Manage Items
      </h1>

      {/* Display Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={item.images[0]}
              alt={item.itemName}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{item.itemName}</h2>
            <p className="text-sm text-gray-600">
              Price: Rs. {item.currentPrice}
            </p>
            <button
              onClick={() => handleEdit(item)}
              className="mt-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
            >
              UPDATE
            </button>
          </div>
        ))}
      </div>

      {/* Update Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold mb-4">Update Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Image URLs</label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-4 mb-2">
                    <input
                      type="text"
                      placeholder={`Image URL ${index + 1}`}
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  + Add Another Image
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                {/* Item Name */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    placeholder="Item Name"
                    value={formData.itemName}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                {/* Current Price */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Current Price</label>
                  <input
                    type="number"
                    name="currentPrice"
                    placeholder="Current Price"
                    value={formData.currentPrice}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                {/* Category */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                {/* Sub Category */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Sub Category</label>
                  <input
                    type="text"
                    name="subCategory"
                    placeholder="Sub Category"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field border border-gray-300 rounded px-3 py-2 h-24 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Unit */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    placeholder="Unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                {/* Application */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Application</label>
                  <input
                    type="text"
                    name="application"
                    placeholder="Application"
                    value={formData.application}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Minimum Order Quantity */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Minimum Order Quantity</label>
                  <input
                    type="text"
                    name="minQuantity"
                    placeholder="Minimum Order Quantity"
                    value={formData.minQuantity}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                {/* Main Domestic Market */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Main Domestic Market</label>
                  <input
                    type="text"
                    name="domesticMarket"
                    placeholder="Main Domestic Market"
                    value={formData.domesticMarket}
                    onChange={handleChange}
                    className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand Name"
                  value={formData.brand}
                  onChange={handleChange}
                  className="input-field border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Sold Out Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="soldOut"
                  checked={formData.soldOut}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                />
                <label className="font-medium text-gray-700">Sold Out</label>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Update
                </button> 
                <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateItem;
