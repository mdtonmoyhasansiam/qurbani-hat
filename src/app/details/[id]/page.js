"use client";

import { useParams } from "next/navigation";
import animals from "@/data/animals.json";
import toast from "react-hot-toast";

export default function DetailsPage() {
  const { id } = useParams();
  const animal = animals.find((a) => a.id == id);

  const handleBooking = (e) => {
    e.preventDefault();
    toast.success("Booking Successful 🐄");
    e.target.reset();
  };

  if (!animal) return <h1>Animal Not Found</h1>;

  return (
    <div className="p-5 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold">{animal.name}</h1>

      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-60 object-cover rounded mt-4"
      />

      <p className="mt-3">{animal.type}</p>
      <p className="font-bold text-green-600">
        ৳ {animal.price}
      </p>

      {/* BOOKING FORM */}
      <form onSubmit={handleBooking} className="mt-5 space-y-3">

        <input className="border p-2 w-full" placeholder="Name" required />
        <input className="border p-2 w-full" placeholder="Phone" required />
        <input className="border p-2 w-full" placeholder="Address" required />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Confirm Booking
        </button>

      </form>

    </div>
  );
}