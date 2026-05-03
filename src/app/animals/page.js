"use client";

import { useState } from "react";
import animalsData from "@/data/animals.json";
import AnimalCard from "@/components/AnimalCard";

export default function AnimalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // 🔥 NEW

  const categories = [
    "All",
    "Deshi Cow",
    "Indian Cow",
    "Foreign Cow",
  ];

  // 🔥 FILTER + SEARCH + SORT COMBO
  const filteredAnimals = animalsData
    // CATEGORY FILTER
    .filter((a) =>
      selectedCategory === "All"
        ? true
        : a.type === selectedCategory
    )

    // SEARCH FILTER
    .filter((a) =>
      a.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )

    // SORT
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6">
        All Animals 🐄
      </h1>

      {/* 🔍 SEARCH BOX */}
      <div className="flex justify-center mb-5">

        <input
          type="text"
          placeholder="Search animals..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      {/* 🐄 CATEGORY FILTER */}
      <div className="flex flex-wrap justify-center gap-3 mb-5">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-4 py-2 rounded-full border cursor-pointer
              transition-all duration-300
              hover:scale-105 hover:shadow-md

              ${
                selectedCategory === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
              }
            `}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* 💰 SORT BUTTONS */}
      <div className="flex justify-center gap-3 mb-6">

        <button
          onClick={() => setSortOrder("low")}
          className={`
            px-4 py-2 rounded-full border cursor-pointer
            transition hover:scale-105
            ${
              sortOrder === "low"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white"
            }
          `}
        >
          Low → High
        </button>

        <button
          onClick={() => setSortOrder("high")}
          className={`
            px-4 py-2 rounded-full border cursor-pointer
            transition hover:scale-105
            ${
              sortOrder === "high"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white"
            }
          `}
        >
          High → Low
        </button>

      </div>

      {/* COUNT */}
      <p className="text-center text-gray-500 mb-4">
        Showing {filteredAnimals.length} animals
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {filteredAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}

      </div>

    </div>
  );
}