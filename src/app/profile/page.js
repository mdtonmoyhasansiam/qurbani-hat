"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const data =
        JSON.parse(localStorage.getItem("bookings")) || [];

      setBookings(data);
    };

    loadData();

    // live sync (important fix)
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  if (!session) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">
          Please login first
        </h2>
      </div>
    );
  }

  // 🔥 FIXED FILTER (supports old + new data)
  const userBookings = bookings.filter(
    (b) =>
      b.user === session.user.email ||
      b.userEmail === session.user.email
  );

  // delete booking
  const deleteBooking = (index) => {
    const updated = [...bookings];

    const realIndex = bookings.findIndex(
      (b) => b === userBookings[index]
    );

    updated.splice(realIndex, 1);

    setBookings(updated);
    localStorage.setItem(
      "bookings",
      JSON.stringify(updated)
    );

    toast.success("Booking removed!");
  };

  return (
    <div className="max-w-5xl mx-auto p-5">

      {/* PROFILE HEADER */}
      <div className="bg-white shadow-lg rounded-xl p-6 text-center mb-6">

        <img
          src={
            session?.user?.image ||
            "https://ui-avatars.com/api/?name=" +
              session.user.name
          }
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-green-500"
        />

        <h2 className="text-2xl font-bold mt-3">
          {session.user.name}
        </h2>

        <p className="text-gray-600">
          {session.user.email}
        </p>

        <div className="mt-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Total Bookings: {userBookings.length}
          </span>
        </div>
      </div>

      {/* BOOKINGS */}
      <h3 className="text-xl font-bold mb-4">
        Your Bookings 🐄
      </h3>

      {userBookings.length === 0 ? (
        <div className="text-center text-gray-500">
          No bookings yet 😔
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {userBookings.map((b, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border"
            >

              <h2 className="text-lg font-bold">
                {b.name || b.animalName}
              </h2>

              <p className="text-gray-600">
                Price: {b.price} BDT
              </p>

              <p className="text-sm text-gray-400">
                {b.time
                  ? new Date(b.time).toLocaleString()
                  : "Recently booked"}
              </p>

              <button
                onClick={() => deleteBooking(index)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancel Booking
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}