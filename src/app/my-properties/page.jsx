"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthProvider";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyProperties() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Fetch properties
  useEffect(() => {
    if (loading) return;     // Wait until user is loaded

    if (!user) {
      router.push("/login?from=/my-properties");
      return;
    }

    const fetchData = async () => {
      try {
        const token = await user.getIdToken();

        const res = await fetch(
          `https://homenest-server-nine.vercel.app/my-properties/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setProperties(data);
      } catch (err) {
        Swal.fire("Error!", "Failed to load properties.", "error");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [user, loading]);

  // Delete Property
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const token = await user.getIdToken();

      const res = await fetch(
        `https://homenest-server-nine.vercel.app/property/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", "Property removed.", "success");
        setProperties((prev) => prev.filter((p) => p._id !== id));
      } else {
        Swal.fire("Error!", "Delete failed.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", "Server not responding.", "error");
    }
  };

  // Show loading spinner
  if (loading || fetching)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        My Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          You haven’t added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-base-100 border border-gray-700/30 rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 transition-all duration-300"
            >
              <figure>
                <img
                  src={p.image}
                  alt={p.propertyName}
                  className="h-56 w-full object-cover"
                />
              </figure>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-primary">{p.propertyName}</h3>
                <p className="text-sm text-gray-400">{p.location}</p>
                <p className="text-lg text-green-400 mt-2">৳ {p.price}</p>

                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Delete
                  </button>

                  <Link
                    href={`/update-property/${p._id}`}
                    className="btn btn-outline btn-sm border-primary text-primary"
                  >
                    Update
                  </Link>

                  <Link
                    href={`/details/${p._id}`}
                    className="btn btn-outline btn-sm border-primary text-primary"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
