"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

  // load bookings
  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  if (!session) {
    return (
      <div className="p-5 text-center">
        <h2 className="text-xl font-bold">
          Please login first
        </h2>
      </div>
    );
  }

  // delete booking
  const deleteBooking = (index) => {
    const updated = [...bookings];
    updated.splice(index, 1);

    setBookings(updated);
    localStorage.setItem(
      "bookings",
      JSON.stringify(updated)
    );

    toast.success("Booking deleted!");
  };

  // user-specific bookings
  const userBookings = bookings.filter(
    (b) => b.userEmail === session.user.email
  );

  return (
    <div className="p-5 max-w-4xl mx-auto">

      {/* PROFILE CARD */}
      <div className="bg-white shadow-md p-5 rounded-lg mb-5 text-center">

        <img
          src={session.user.image}
          className="w-20 h-20 rounded-full mx-auto"
        />

        <h2 className="text-2xl font-bold mt-2">
          {session.user.name}
        </h2>

        <p className="text-gray-600">
          {session.user.email}
        </p>

        <p className="mt-2 font-semibold text-green-600">
          Total Bookings: {userBookings.length}
        </p>
      </div>

      {/* BOOKINGS SECTION */}
      <h3 className="text-xl font-bold mb-3">
        Your Bookings 🐄
      </h3>

      {userBookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {userBookings.map((b, index) => (
            <div
              key={index}
              className="border p-3 rounded shadow bg-white"
            >

              <h2 className="font-bold text-lg">
                {b.animalName}
              </h2>

              <p>Price: {b.price} BDT</p>

              <p className="text-sm text-gray-500">
                {new Date(b.time).toLocaleString()}
              </p>

              <button
                onClick={() => deleteBooking(index)}
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}