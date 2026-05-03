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

  const animal = animalsData.find(
    (a) => a.id.toString() === id
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!animal) {
    return (
      <div className="text-center mt-10 text-red-500">
        Animal not found ❌
      </div>
    );
  }

  // 🔐 LOGIN CHECK
  if (!session) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">
          Please login to book this animal 🔐
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

  // 📝 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 SUBMIT (SAVE + TOAST + RESET)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill all fields ⚠️");
      return;
    }

    // 🔥 SAVE FOR PROFILE
    let bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
      animalName: animal.name,
      price: animal.price,
      userEmail: session.user.email,
      time: new Date().toISOString(),
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    toast.success("Booking Successful 🎉");

    // 🔄 RESET FORM
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* IMAGE */}
      <img
        src={animal.image}
        className="w-full h-80 object-cover rounded-xl shadow"
      />

      {/* NAME */}
      <h1 className="text-3xl font-bold mt-4">
        {animal.name}
      </h1>

      {/* PRICE */}
      <p className="text-green-600 text-xl font-semibold mt-2">
        {animal.price} BDT
      </p>

      {/* DETAILS */}
      <div className="grid md:grid-cols-2 gap-4 mt-5 text-gray-700">

        <p><b>Type:</b> {animal.type}</p>
        <p><b>Breed:</b> {animal.breed}</p>
        <p><b>Weight:</b> {animal.weight} kg</p>
        <p><b>Age:</b> {animal.age} years</p>
        <p><b>Location:</b> {animal.location}</p>
        <p><b>Category:</b> {animal.category}</p>

      </div>

      {/* DESCRIPTION */}
      <p className="mt-4 text-gray-600">
        {animal.description}
      </p>

      {/* 📝 BOOKING FORM */}
      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Book This Animal 🐄
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />

          <textarea
            name="address"
            placeholder="Your Address"
            value={form.address}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          ></textarea>

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