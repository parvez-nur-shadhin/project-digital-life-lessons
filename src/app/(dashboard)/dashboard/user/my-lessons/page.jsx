"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FaPlus, FaFolderOpen } from "react-icons/fa";
import { gettingLessons } from "@/lib/actions/lessons";
import MyLessonsTable from "@/Component/Dashboard/user/MyLessonsTable";


export default function MyLessonsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [myLessons, setMyLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check subscription status for the table permissions
  const isPremium = user?.plan === "premium";

  useEffect(() => {
    const fetchAndFilterLessons = async () => {
      try {
        const allLessons = await gettingLessons();
        const safeLessons = Array.isArray(allLessons) ? allLessons : [];

        // Filter for this specific user and sort by newest
        const filtered = safeLessons
          .filter(
            (item) =>
              item.creatorId === user?.id || item.creatorEmail === user?.email,
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setMyLessons(filtered);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchAndFilterLessons();
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

  // 2. Access Denied
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="mb-4">You must be logged in to manage your lessons.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            My Lessons Manager
          </h1>
          <p className="text-base-content/70">
            View stats, manage access levels, and edit your existing content.
          </p>
        </div>
        <Link
          href="/dashboard/add-lesson"
          className="btn btn-primary shadow-lg gap-2"
        >
          <FaPlus /> Create New Lesson
        </Link>
      </div>

      {/* Main Content Area */}
      {myLessons.length > 0 ? (
        <MyLessonsTable initialLessons={myLessons} isPremium={isPremium} />
      ) : (
        /* Empty State */
        <div className="card w-full bg-base-100 shadow-sm border border-base-200 text-center py-16 px-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center border-8 border-base-100 shadow-sm">
              <FaFolderOpen className="text-4xl text-base-content/30" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3">No Lessons Found</h2>
          <p className="text-base-content/60 mb-6 max-w-sm mx-auto">
            Your table is empty! Start writing your first life lesson to see
            your stats here.
          </p>
          <Link
            href="/dashboard/add-lesson"
            className="btn btn-primary w-fit mx-auto gap-2"
          >
            <FaPlus /> Write a Lesson
          </Link>
        </div>
      )}
    </div>
  );
}
