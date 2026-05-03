"use client";

import animalsData from "@/data/animals.json";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AnimalDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const animal = animalsData.find(
    (a) => a.id.toString() === id
  );

  const [booked, setBooked] = useState(false);

  if (!animal) {
    return (
      <div className="text-center mt-10 text-red-500">
        Animal not found ❌
      </div>
    );
  }

  const handleBook = () => {

    // 🔒 LOGIN CHECK (VERY IMPORTANT)
    if (!session || !session.user) {
      alert("Please login first");
      router.push("/api/auth/signin");
      return;
    }

    let bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const exists = bookings.find(
      (b) =>
        b.id === animal.id &&
        b.user === session.user.email
    );

    if (exists) {
      alert("Already booked!");
      return;
    }

    bookings.push({
      id: animal.id,
      name: animal.name,
      price: animal.price,
      image: animal.image,
      user: session.user.email,
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    setBooked(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <img
        src={animal.image}
        className="w-full h-80 object-cover rounded-xl shadow"
      />

      <h1 className="text-3xl font-bold mt-4">
        {animal.name}
      </h1>

      <p className="text-green-600 text-xl font-semibold mt-2">
        {animal.price} BDT
      </p>

      <p className="text-gray-600 mt-3">
        {animal.description}
      </p>

      <button
        onClick={handleBook}
        disabled={booked}
        className={`mt-6 px-6 py-2 rounded-full text-white ${
          booked
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {booked ? "Booked ✔" : "Book Now"}
      </button>

    </div>
  );
}