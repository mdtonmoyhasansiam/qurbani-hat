"use client";

import { useEffect, useState } from "react";
import animalsData from "@/data/animals.json";
import AnimalCard from "@/components/AnimalCard";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const shuffled = [...animalsData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);

    setFeatured(shuffled);
  }, []);

  const features = [
    { icon: "🐄", title: "Healthy Animals", desc: "Verified healthy cows and goats" },
    { icon: "⚡", title: "Easy Booking", desc: "Book in seconds" },
    { icon: "👨‍🌾", title: "Trusted Sellers", desc: "Verified farmers" },
    { icon: "💰", title: "Best Price", desc: "Fair market pricing" },
    { icon: "📞", title: "Fast Support", desc: "24/7 customer support" },
    { icon: "🚚", title: "Home Delivery", desc: "Doorstep delivery available" },
  ];

  return (
    <div>

      {/* HERO SECTION */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg mb-12">

        <img
          src="/cow.jpg"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">

          <h1 className="text-4xl md:text-5xl font-bold">
            Find Healthy Qurbani Animals 🐄
          </h1>

          <p className="mt-3 text-lg text-gray-200">
            Book cows, goats & buffalo easily online
          </p>

          <a
            href="/animals"
            className="mt-6 bg-green-600 px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Browse Animals
          </a>

        </div>
      </div>

      {/* FEATURED ANIMALS SECTION */}
      <div className="max-w-6xl mx-auto px-4 mb-14">

        {/* HEADER */}
        <div className="text-center mb-8">

          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-white text-sm font-medium shadow">
            Featured Collection
          </span>

          <h2 className="text-3xl font-bold mt-3">
            Featured Animals 🐄
          </h2>

          <p className="text-gray-500 mt-1">
            Handpicked healthy animals for you
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {featured.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}

        </div>

      </div>

      {/* WHY CHOOSE SECTION */}
      <div className="max-w-6xl mx-auto px-4 mb-12">

        {/* HEADER */}
        <div className="text-center mb-8">

          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow">
            Trusted Platform
          </span>

          <h2 className="text-3xl font-bold mt-3">
            Why Choose QurbaniHat?
          </h2>

          <p className="text-gray-500 mt-1">
            We ensure quality, safety & trust
          </p>

        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center"
            >

              <div className="text-3xl mb-2">
                {f.icon}
              </div>

              <h3 className="font-bold text-lg">
                {f.title}
              </h3>

              <p className="text-gray-600 text-sm mt-1">
                {f.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}