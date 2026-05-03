"use client";

import { useSession } from "next-auth/react";

export default function AnimalCard({ animal }) {
  const { data: session } = useSession();

  const handleBook = () => {
    if (!session) {
      alert("Please login first");
      return;
    }

    const booking = {
      animalId: animal.id,
      animalName: animal.name,
      price: animal.price,
      image: animal.image,
      userEmail: session.user.email,
      userName: session.user.name,
      time: new Date().toISOString(),
    };

    const oldBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem(
      "bookings",
      JSON.stringify([...oldBookings, booking])
    );

    alert("Booking successful!");
  };

  return (
    <div className="border rounded-lg p-3 shadow-md bg-white">

      {/* IMAGE */}
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-48 object-cover rounded"
      />

      {/* INFO */}
      <h2 className="text-xl font-bold mt-2">
        {animal.name}
      </h2>

      <p className="text-gray-600">
        Price: {animal.price} BDT
      </p>

      {/* BUTTON */}
      <button
        onClick={handleBook}
        className="bg-green-600 text-white px-3 py-1 mt-3 rounded w-full"
      >
        Book Now
      </button>
    </div>
  );
}