"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FaBookmark, FaEye, FaHeartBroken, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { getFavorites, removeFavorite } from "@/lib/actions/favorites";
import Image from "next/image";

export default function MyFavoritesPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");

  useEffect(() => {
    const fetchMyFavorites = async () => {
      try {
        const myFavourites = await getFavorites();
        console.log(myFavourites);
        const myFavs = myFavourites.filter(
          (item) => item.userEmail === user?.email,
        );
        const safeFavs = Array.isArray(myFavs) ? myFavs : [];

        setFavorites(safeFavs);
        setFilteredFavorites(safeFavs);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchMyFavorites();
    } else if (!isPending) {
      setIsLoading(false);
    }
  }, [user, isPending]);

  console.log(favorites);

  useEffect(() => {
    let result = favorites;

    if (categoryFilter !== "All") {
      result = result.filter((lesson) => lesson.category === categoryFilter);
    }
    if (toneFilter !== "All") {
      result = result.filter((lesson) => lesson.tone === toneFilter);
    }

    setFilteredFavorites(result);
  }, [categoryFilter, toneFilter, favorites]);

  const handleRemoveFavorite = async (id) => {
    const previousFavorites = [...favorites];

    setFavorites(favorites.filter((lesson) => lesson._id !== id));
    toast.success("Removed from favorites");

    try {
      const res = await removeFavorite(id);

      if (res.error) throw new Error(res.error);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove. Restoring lesson.");

      setFavorites(previousFavorites);
    }
  };

  if (isPending || (user && isLoading)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="mb-4">You must be logged in to view your favorites.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content flex items-center gap-3 mb-2">
          <FaBookmark className="text-primary" />
          My Favorites
        </h1>
        <p className="text-base-content/70">
          The life lessons, stories, and insights you've saved for later.
        </p>
      </div>

      {favorites.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-base-200 p-4 rounded-xl border border-base-300">
          <div className="flex items-center gap-2 font-bold text-base-content/70 px-2">
            <FaSearch /> Filters:
          </div>

          <select
            className="select select-bordered select-sm w-full md:w-auto"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>

          <select
            className="select select-bordered select-sm w-full md:w-auto"
            value={toneFilter}
            onChange={(e) => setToneFilter(e.target.value)}
          >
            <option value="All">All Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </div>
      )}

      {favorites.length > 0 ? (
        filteredFavorites.length > 0 ? (
          <div className="overflow-x-auto bg-base-100 rounded-box border border-base-200 shadow-sm">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>Lesson</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFavorites.map((lesson) => (
                  <tr key={lesson._id}>
                    <td>
                      <div
                        className="font-bold text-base-content line-clamp-1 max-w-sm"
                        title={lesson.title}
                      >
                        {lesson.title}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="badge badge-ghost badge-sm">
                          {lesson.category}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-base-content/50">
                          {lesson.tone}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {lesson.creatorProfileImage ? (
                          <Image
                            src={lesson.creatorProfileImage}
                            alt="Author"
                            height={24}
                            width={24}
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-content flex items-center justify-center text-[10px] font-bold">
                            {lesson.creatorName?.charAt(0) || "U"}
                          </div>
                        )}
                        <span className="text-sm font-medium">
                          {lesson.creatorName}
                        </span>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/lessons/${lesson._id}`}
                          className="btn btn-sm btn-square btn-ghost text-primary"
                          title="Read Lesson"
                        >
                          <FaEye className="text-lg" />
                        </Link>

                        <button
                          onClick={() => handleRemoveFavorite(lesson._id)}
                          className="btn btn-sm btn-square btn-ghost text-base-content/40 hover:text-error"
                          title="Remove from favorites"
                        >
                          <FaHeartBroken className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-base-100 border border-base-200 rounded-xl">
            <p className="text-base-content/60 font-medium">
              No saved lessons match your current filters.
            </p>
            <button
              onClick={() => {
                setCategoryFilter("All");
                setToneFilter("All");
              }}
              className="btn btn-sm btn-outline mt-4"
            >
              Clear Filters
            </button>
          </div>
        )
      ) : (
        <div className="card w-full bg-base-100 shadow-sm border border-base-200 text-center py-16 px-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center border-8 border-base-100 shadow-sm">
              <FaBookmark className="text-4xl text-base-content/30" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3">No Favorites Yet</h2>
          <p className="text-base-content/60 mb-6 max-w-sm mx-auto">
            You haven't saved any lessons yet. Browse the community and bookmark
            the stories that resonate with you!
          </p>
          <Link href="/lessons" className="btn btn-primary w-fit mx-auto">
            Explore Lessons
          </Link>
        </div>
      )}
    </div>
  );
}
