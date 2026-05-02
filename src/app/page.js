import animals from "@/data/animals.json";
import AnimalCard from "@/components/AnimalCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">

      {/* HERO */}
      <div className="bg-green-100 text-center p-10 rounded-lg mb-6">
        <h1 className="text-4xl font-bold mb-3">
          QurbaniHat 🐄
        </h1>

        <p className="mb-4">
          Find the best Qurbani animals easily
        </p>

        <Link href="/animals">
          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Browse Animals
          </button>
        </Link>
      </div>

      {/* FEATURED */}
      <h2 className="text-2xl font-bold mb-4">
        Featured Animals
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {animals.slice(0, 6).map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>

    </div>
  );
}