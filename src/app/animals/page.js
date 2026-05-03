"use client";

import { useMemo, useState } from "react";
import animalsData from "@/data/animals.json";
import AnimalCard from "@/components/AnimalCard";

export default function AnimalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const categories = ["All", "Deshi Cow", "Indian Cow", "Foreign Cow"];

  // 🔎 Filtering + searching + sorting logic separated
  const filteredAnimals = useMemo(() => {
    return animalsData
      .filter((animal) => {
        if (selectedCategory === "All") return true;
        return animal.type === selectedCategory;
      })
      .filter((animal) =>
        animal.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "low") return a.price - b.price;
        if (sortOrder === "high") return b.price - a.price;
        return 0;
      });
  }, [selectedCategory, searchText, sortOrder]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      
      <h1 className="text-3xl font-bold text-center mb-6">
        All Animals 🐄
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search animals..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 ${
              selectedCategory === cat
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setSortOrder("low")}
          className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
            sortOrder === "low"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white"
          }`}
        >
          Low → High
        </button>

        <button
          onClick={() => setSortOrder("high")}
          className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
            sortOrder === "high"
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white"
          }`}
        >
          High → Low
        </button>
      </div>

      {/* Count */}
      <p className="text-center text-gray-500 mb-4">
        Showing {filteredAnimals.length} animals
      </p>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}