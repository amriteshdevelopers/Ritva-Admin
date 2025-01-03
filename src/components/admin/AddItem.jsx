import React, { useState } from "react";
import { db, auth } from "../firebase"; // Ensure auth is imported
import { collection, addDoc } from "firebase/firestore";

const AddItem = () => {
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
    venderDetails:""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = value;
      return { ...prev, images: updatedImages };
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in as an admin to add items.");
        return;
      }

      const itemsCollectionRef = collection(db, "admins", user.uid, "items");

      await addDoc(itemsCollectionRef, {
        ...formData,
        currentPrice: Number(formData.currentPrice) || 0, // Ensure currentPrice is a number
        createdAt: new Date(),
      });

      alert("Item added successfully!");

      // Reset form after successful submission
      setFormData({
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
        venderDetails:"",
      });
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="pt-[100px] px-4 lg:px-16">
      <h1 className="text-2xl lg:text-4xl font-bold text-center mb-1 text-gray-800">
        Add New Item
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image URL */}
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
          {/* Company Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Vender Name</label>
            <input
              type="text"
              name="company"
              placeholder="Vender Name"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Minimum Order Quantity */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Minimum Order Quantity
            </label>
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
            <label className="font-medium text-gray-700">
              Main Domestic Market
            </label>
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
        {/* Company Details */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Vender Details</label>
          <textarea
            name="venderDetails"
            placeholder="Vender Description"
            value={formData.venderDetails}
            onChange={handleChange}
            className="input-field border border-gray-300 rounded px-3 py-2 h-24 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ></textarea>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 shadow-lg"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
