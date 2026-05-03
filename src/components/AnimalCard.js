"use client";

import Link from "next/link";

export default function AnimalCard({ animal }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={animal.image}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">

        <h2 className="text-lg font-bold">
          {animal.name}
        </h2>

        <p className="text-green-600 font-semibold">
          {animal.price} BDT
        </p>

        <Link
          href={`/animals/${animal.id}`}
          className="inline-block mt-3 bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}