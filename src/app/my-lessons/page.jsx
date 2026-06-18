"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FaPlus, FaFolderOpen, FaCompass } from "react-icons/fa";
import MyLessonCard from "@/Component/MyLessons/MyLessonCard";
import { gettingLessons } from "@/lib/actions/lessons";
import { redirect } from "next/navigation";


export default function MyLessonsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if(!user) {
    redirect('/sign-up');
  }

  const [myLessons, setMyLessons] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchAndFilterLessons = async () => {
      try {
        const allLessons = await gettingLessons();

        // 1. PREVENT CRASH: Ensure allLessons is actually an array before filtering
        const safeLessons = Array.isArray(allLessons) ? allLessons : [];

        // 2. BULLETPROOF FILTER: Check by ID first, but fallback to Email just in case!
        const filtered = safeLessons.filter(
          (item) =>
            item.creatorId === user?.id || item.creatorEmail === user?.email,
        );

        setMyLessons(filtered);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user) {
      fetchAndFilterLessons();
    } else if (!isPending) {
      setIsLoadingData(false);
    }
  }, [user, isPending]);

  // 1. Show global loading state while checking session or fetching data
  if (isPending || (user && isLoadingData)) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. Access Denied if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="mb-4">You must be logged in to view your lessons.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  // 3. Empty State (No Lessons Found)
  if (myLessons.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
        <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-200 text-center py-12 px-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center border-8 border-base-100 shadow-sm">
              <FaFolderOpen className="text-4xl text-base-content/30" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-base-content">
            No Lessons Yet
          </h2>
          <p className="text-base-content/60 text-lg mb-8 max-w-md mx-auto">
            It looks a little empty in here. You haven't documented any life
            lessons yet. Every great journey starts with a single reflection!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-sm mx-auto">
            <Link
              href="/add-lessons"
              className="btn btn-primary flex-1 gap-2 shadow-lg"
            >
              <FaPlus /> Create Lesson
            </Link>
            <Link
              href="/all-lessons"
              className="btn btn-outline btn-neutral flex-1 gap-2"
            >
              <FaCompass /> Explore Others
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Main Dashboard UI
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-base-content mb-2">
              My Lessons
            </h1>
            <p className="text-base-content/70">
              Manage and edit the life lessons you've shared.
            </p>
          </div>
          <Link href="/add-lesson" className="btn btn-primary shadow-lg gap-2">
            <FaPlus /> Create New Lesson
          </Link>
        </div>

        {/* The Grid Map Loop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myLessons.map((lesson) => (
            <MyLessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}
