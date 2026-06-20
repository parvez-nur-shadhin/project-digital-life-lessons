"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  FaBookOpen,
  FaBookmark,
  FaArrowRight,
  FaFolderOpen,
} from "react-icons/fa";
import MyLessonCard from "@/Component/MyLessons/MyLessonCard";
import { gettingLessons } from "@/lib/actions/lessons";

export default function DashboardHomePage({ favorites }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [myLessons, setMyLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const allLessons = await gettingLessons();
        const safeLessons = Array.isArray(allLessons) ? allLessons : [];

        const filtered = safeLessons.filter(
          (item) =>
            item.creatorId === user?.id || item.creatorEmail === user?.email,
        );

        const sorted = filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setMyLessons(sorted);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    } else if (!isPending) {
      setIsLoading(false);
    }
  }, [user, isPending]);

  // 1. Loading State
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
        <p className="mb-4">You must be logged in to view your dashboard.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  const totalCreated = myLessons.length;
  const recentLessons = myLessons.slice(0, 3); // Get only the 3 most recent

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">
          Welcome back, {user.name?.split(" ")[0] || "Creator"}!
        </h1>
        <p className="text-base-content/70">
          Here is an overview of your life lessons and engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body flex-row items-center gap-6 p-6 md:p-8">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl">
              <FaBookOpen className="text-3xl" />
            </div>
            <div>
              <p className="text-sm text-base-content/60 font-bold uppercase tracking-wide">
                Lessons Created
              </p>
              <h3 className="text-4xl font-black mt-1">{totalCreated}</h3>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body flex-row items-center gap-6 p-6 md:p-8">
            <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
              <FaBookmark className="text-3xl" />
            </div>
            <div>
              <p className="text-sm text-base-content/60 font-bold uppercase tracking-wide">
                Total Favorites
              </p>
              <h3 className="text-4xl font-black mt-1">{favorites.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-base-content">Recently Added</h2>
        {totalCreated > 0 && (
          <Link
            href="/dashboard/user/my-lessons"
            className="btn btn-ghost btn-sm text-primary gap-2"
          >
            View All <FaArrowRight />
          </Link>
        )}
      </div>

      {totalCreated > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentLessons.map((lesson) => (
            <MyLessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm border border-base-200 text-center py-16 px-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center border-4 border-base-100 shadow-sm">
              <FaFolderOpen className="text-3xl text-base-content/30" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">No lessons created yet</h3>
          <p className="text-base-content/60 mb-6 max-w-sm mx-auto">
            You haven't added any life lessons to your portfolio yet. Start
            sharing your wisdom!
          </p>
          <Link
            href="/dashboard/add-lesson"
            className="btn btn-primary w-fit mx-auto shadow-lg"
          >
            Create Your First Lesson
          </Link>
        </div>
      )}
    </div>
  );
}
