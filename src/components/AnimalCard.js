"use client";

import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function AnimalCard({ animal }) {
  const { data: session } = useSession();

  // check already booked
  const isAlreadyBooked = () => {
    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    return bookings.some(
      (b) =>
        b.animalId === animal.id &&
        b.userEmail === session?.user?.email
    );
  };

  const handleBook = () => {
    if (!session) {
      toast.error("Please login first");
      return;
    }

    if (isAlreadyBooked()) {
      toast.error("Already booked!");
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

    const old =
      JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem(
      "bookings",
      JSON.stringify([...old, booking])
    );

    toast.success("Booking successful!");
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
        disabled={
          !session || isAlreadyBooked()
        }
        className={`w-full mt-3 px-3 py-2 rounded text-white font-semibold transition ${
          !session
            ? "bg-gray-400 cursor-not-allowed"
            : isAlreadyBooked()
            ? "bg-yellow-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {!session
          ? "Login to Book"
          : isAlreadyBooked()
          ? "Already Booked"
          : "Book Now"}
      </button>
    </div>
  );
}