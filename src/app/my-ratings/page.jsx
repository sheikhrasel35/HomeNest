"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthProvider";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyRatings() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const [reviews, setReviews] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return; // wait for auth to resolve

    if (!user) {
      // not logged in -> redirect to login
      router.push("/login?from=/my-ratings");
      return;
    }

    const fetchReviews = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(
          `https://homenest-server-nine.vercel.app/my-reviews/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to load reviews.", "error");
      } finally {
        setFetching(false);
      }
    };

    fetchReviews();
  }, [user, loading, router]);

  if (loading || fetching)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-primary mb-10">
        My Ratings & Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          You haven’t added any reviews yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((r, idx) => {
            const created = r?.createdAt ? new Date(r.createdAt) : null;
            const dateText = created
              ? created.toLocaleDateString("en-US")
              : "Unknown date";

            return (
              <div
                key={r._id ?? idx}
                className="bg-base-100 border border-gray-700/30 rounded-2xl overflow-hidden 
                         shadow-md transition-all duration-300 ease-in-out transform 
                         hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(138,180,255,0.3)]"
              >
                <figure className="relative">
                  <img
                    src={r.image || "https://via.placeholder.com/400"}
                    alt={r.propertyName || "Property"}
                    className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </figure>

                <div className="p-5 text-gray-200">
                  <h3 className="font-semibold text-lg text-primary mb-1">
                    {r.propertyName || "Unnamed Property"}
                  </h3>

                  <p className="text-sm text-gray-400 mb-2">
                    Reviewer:{" "}
                    <span className="font-medium text-gray-300">
                      {r.reviewerName || user.displayName || "You"}
                    </span>
                  </p>

                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    {"⭐".repeat(Math.max(0, Math.min(5, r.rating || 0)))}
                    <span className="text-gray-400 text-sm ml-1">
                      ({r.rating ?? 0}/5)
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm italic mb-3">
                    “{r.comment || "No comment provided."}”
                  </p>

                  <p className="text-xs text-gray-500">
                    Reviewed on:{" "}
                    <span className="text-gray-400">{dateText}</span>
                  </p>

                  <div className="flex justify-end mt-4">
                    <Link
                      href={`/details/${r.propertyId}`}
                      className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      View Property
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
