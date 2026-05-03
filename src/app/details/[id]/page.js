"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import animals from "@/data/animals.json";
import toast from "react-hot-toast";

export default function DetailsPage() {
  const { id } = useParams();
  const animal = animals.find((item) => item.id == id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    toast.success("Booking Successful 🐄");

    setFormData({
      name: "",
      phone: "",
      address: "",
    });

    e.target.reset();
  };

  if (!animal) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-xl font-semibold">Animal Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{animal.name}</h1>

      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-60 object-cover rounded mt-4"
      />

      <p className="mt-3 text-gray-600">{animal.type}</p>

      <p className="font-bold text-green-600">
        ৳ {animal.price}
      </p>

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="mt-5 space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Name"
          required
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Phone"
          required
        />

        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Address"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}