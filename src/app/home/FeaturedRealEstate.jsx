"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedRealEstate() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://homenest-server-nine.vercel.app/featured-properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-3">
        Featured Real Estate
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((p) => (
          <div
            key={p._id}
            className="bg-base-100 border border-gray-700/30 rounded-2xl shadow-lg hover:-translate-y-2 transition"
          >
            <img src={p.image} className="h-56 w-full object-cover" />

            <div className="p-5">
              <h3 className="text-xl font-bold text-primary">{p.propertyName}</h3>
              <p className="text-sm text-gray-500">{p.location}</p>

              <p className="text-gray-300 mt-1">
                {p.description?.slice(0, 60)}...
              </p>

              <p className="mt-2 text-xl text-green-400 font-semibold">
                ৳ {p.price}
              </p>

              <div className="mt-4 text-right">
                <Link
                  href={`/details/${p._id}`}
                  className="btn btn-outline btn-sm text-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
