import Link from "next/link";

export default function AnimalCard({ animal }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition bg-white">

      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-3">
        <h2 className="text-lg font-bold">{animal.name}</h2>
        <p className="text-gray-600">{animal.type}</p>

        <p className="font-semibold text-green-600">
          ৳ {animal.price}
        </p>

        <Link href={`/details/${animal.id}`}>
          <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}