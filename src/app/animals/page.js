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
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold text-center mb-6">
        All Animals 🐄
      </h1>

      <div className="flex justify-center gap-3 mb-6">

        <button
          onClick={sortLowToHigh}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Low → High
        </button>

        <button
          onClick={sortHighToLow}
          className="bg-purple-500 text-white px-4 py-2 rounded-full"
        >
          High → Low
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}

      </div>

    </div>
  );
}