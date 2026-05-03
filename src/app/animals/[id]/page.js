"use client";

import animalsData from "@/data/animals.json";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AnimalDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const currentAnimal = animalsData.find(
    (item) => String(item.id) === id
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!currentAnimal) {
    return (
      <div className="text-center mt-10 text-red-500">
        Animal not found ❌
      </div>
    );
  }

  // LOGIN CHECK
  if (!session) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">
          Please login to continue booking 🔐
        </h2>

        <button
          onClick={() => router.push("/api/auth/signin")}
          className="bg-green-600 text-white px-6 py-2 rounded-full cursor-pointer"
        >
          Login Now
        </button>
      </div>
    );
  }

  // HANDLE INPUT CHANGE
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT BOOKING
  const handleBooking = (e) => {
    e.preventDefault();

    const { name, email, phone, address } = formData;

    if (!name || !email || !phone || !address) {
      toast.error("Please fill all fields ⚠️");
      return;
    }

    const existingBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      animalName: currentAnimal.name,
      price: currentAnimal.price,
      userEmail: session.user.email,
      time: new Date().toISOString(),
    };

    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    toast.success("Booking Successful 🎉");

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <img
        src={currentAnimal.image}
        className="w-full h-80 object-cover rounded-xl shadow"
      />

      <h1 className="text-3xl font-bold mt-4">
        {currentAnimal.name}
      </h1>

      <p className="text-green-600 text-xl font-semibold mt-2">
        {currentAnimal.price} BDT
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-5 text-gray-700">
        <p><b>Type:</b> {currentAnimal.type}</p>
        <p><b>Breed:</b> {currentAnimal.breed}</p>
        <p><b>Weight:</b> {currentAnimal.weight} kg</p>
        <p><b>Age:</b> {currentAnimal.age} years</p>
        <p><b>Location:</b> {currentAnimal.location}</p>
        <p><b>Category:</b> {currentAnimal.category}</p>
      </div>

      <p className="mt-4 text-gray-600">
        {currentAnimal.description}
      </p>

      {/* FORM */}
      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Book This Animal 🐄
        </h2>

        <form onSubmit={handleBooking} className="grid gap-4">

          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInput}
            className="border px-4 py-2 rounded"
          />

          <input
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInput}
            className="border px-4 py-2 rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInput}
            className="border px-4 py-2 rounded"
          />

          <textarea
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleInput}
            className="border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition cursor-pointer"
          >
            Submit Booking
          </button>

        </form>
      </div>

    </div>
  );
}