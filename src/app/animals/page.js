"use client";

import { useState } from "react";
import animalsData from "@/data/animals.json";
import AnimalCard from "@/components/AnimalCard";

export default function AnimalsPage() {
  const [animals, setAnimals] = useState(animalsData);

  const sortLowToHigh = () => {
    const sorted = [...animals].sort((a, b) => a.price - b.price);
    setAnimals(sorted);
  };

  const sortHighToLow = () => {
    const sorted = [...animals].sort((a, b) => b.price - a.price);
    setAnimals(sorted);
  };

  return (
    <div className="p-4">

      <h1 className="text-3xl font-bold mb-4">
        All Animals 🐄
      </h1>

      {/* SORT BUTTONS */}
      <div className="mb-4 space-x-3">
        <button
          onClick={sortLowToHigh}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Low → High
        </button>

        <button
          onClick={sortHighToLow}
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          High → Low
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>

    </div>
  );
}