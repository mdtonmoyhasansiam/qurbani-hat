export default function Home() {
  const features = [
    {
      title: "Healthy Animals",
      desc: "Verified healthy cows and goats",
      icon: "🐄",
    },
    {
      title: "Easy Booking",
      desc: "Book your Qurbani animal in seconds",
      icon: "⚡",
    },
    {
      title: "Trusted Sellers",
      desc: "Only verified farmers and sellers",
      icon: "👨‍🌾",
    },
    {
      title: "Best Price",
      desc: "Affordable and fair market price",
      icon: "💰",
    },
    {
      title: "Fast Support",
      desc: "24/7 customer support available",
      icon: "📞",
    },
    {
      title: "Home Delivery",
      desc: "Get animals delivered to your home",
      icon: "🚚",
    },
  ];

  return (
    <div className="">

      {/* HERO SECTION */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">

        <img
          src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1600&q=80"
          className="absolute w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">

          <h1 className="text-4xl md:text-5xl font-bold">
            Find Healthy Qurbani Animals 🐄
          </h1>

          <p className="mt-3 text-lg text-gray-200">
            Book cows, goats & more easily online
          </p>

          <a
            href="/animals"
            className="mt-6 bg-green-600 px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Browse Animals
          </a>

        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto mt-12 px-4">

        <h2 className="text-2xl font-bold text-center mb-8">
          Why Choose QurbaniHat?
        </h2>

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