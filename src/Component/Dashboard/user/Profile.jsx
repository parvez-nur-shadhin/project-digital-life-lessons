"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  FaUserEdit,
  FaStar,
  FaEnvelope,
  FaBookOpen,
  FaBookmark,
  FaFolderOpen,
  FaSpinner,
} from "react-icons/fa";
// NOTE: Using the standard LessonCard from your homepage, NOT the MyLessonCard!
import LessonCard from "@/Component/Lessons/LessonCard";
import { gettingLessons } from "@/lib/actions/lessons";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // States for data
  const [publicLessons, setPublicLessons] = useState([]);
  const [totalCreated, setTotalCreated] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // States for Edit Profile Modal
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const isPremium = user?.plan === "premium";

  // Pre-fill the edit form when user data loads
  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditImage(user.image || "");
    }
  }, [user]);

  // Fetch Lessons Data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const allLessons = await gettingLessons();
        const safeLessons = Array.isArray(allLessons) ? allLessons : [];

        // 1. Get ALL lessons created by this user to get their total count
        const allMyLessons = safeLessons.filter(
          (item) =>
            item.creatorId === user?.id || item.creatorEmail === user?.email,
        );
        setTotalCreated(allMyLessons.length);

        // 2. Filter down to ONLY PUBLIC/PREMIUM lessons for the display grid
        // (We don't want to show private lessons on a public-facing profile style page)
        const publicOnly = allMyLessons
          .filter(
            (item) =>
              item.visibility !== "private" &&
              item.visibilityStatus !== "private",
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPublicLessons(publicOnly);

        // NOTE: Placeholder for favorites count. Fetch user's actual saves here later!
        setTotalSaved(0);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    } else if (!isPending) {
      setIsLoading(false);
    }
  }, [user, isPending]);

  // Handle Profile Update via better-auth
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return toast.error("Name cannot be empty");

    setIsUpdating(true);
    try {
      // Update via Better Auth client
      await authClient.updateUser({
        name: editName,
        image: editImage,
      });

      toast.success("Profile updated successfully!");
      document.getElementById("edit_profile_modal").close();

      // Force a hard refresh to update the layout Navbar/Sidebar avatars
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  // 1. Loading State
  if (isPending || (user && isLoading)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. Access Denied State
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="mb-4">You must be logged in to view your profile.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* --- PROFILE HEADER CARD --- */}
      <div className="card bg-base-100 shadow-sm border border-base-200 mb-12">
        <div className="card-body p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Area */}
          <div className="relative flex gap-4 items-center flex-col">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-base-200 ring-offset-base-100 ring-offset-4 shadow-xl">
                {user.image ? (
                  <Image src={user.image} alt={user.name} height={100} width={100} />
                ) : (
                  <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-5xl font-bold uppercase">
                    {user.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>
            {isPremium && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 badge badge-warning gap-1 font-bold shadow-md px-3 py-3 border-2 border-base-100">
                <FaStar className="text-[10px]" /> Premium
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-base-content mb-1">
              {user.name}
            </h1>
            <p className="text-base-content/60 flex items-center justify-center md:justify-start gap-2 mb-6 font-medium">
              <FaEnvelope /> {user.email}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-lg">
                <FaBookOpen className="text-primary" />
                <span className="font-bold text-base-content">
                  {totalCreated}
                </span>
                <span className="text-sm text-base-content/60">
                  Lessons Created
                </span>
              </div>
              <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-lg">
                <FaBookmark className="text-secondary" />
                <span className="font-bold text-base-content">
                  {totalSaved}
                </span>
                <span className="text-sm text-base-content/60">Saved</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-4 md:mt-0">
            <button
              onClick={() =>
                document.getElementById("edit_profile_modal").showModal()
              }
              className="btn btn-outline btn-primary gap-2"
            >
              <FaUserEdit className="text-lg" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* --- PUBLIC PORTFOLIO SECTION --- */}
      <div className="mb-6 border-b border-base-200 pb-4">
        <h2 className="text-2xl font-bold text-base-content">
          My Public Portfolio
        </h2>
        <p className="text-base-content/60">
          This is how your lessons appear to the rest of the world.
        </p>
      </div>

      {publicLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {publicLessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-base-100 rounded-box border border-base-200 shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center">
              <FaFolderOpen className="text-2xl text-base-content/40" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">No public lessons yet</h3>
          <p className="text-base-content/60 mb-6">
            You don't have any lessons visible to the public.
          </p>
          <Link href="/dashboard/add-lesson" className="btn btn-primary btn-sm">
            Publish a Lesson
          </Link>
        </div>
      )}

      {/* --- EDIT PROFILE MODAL --- */}
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <FaUserEdit className="text-primary" /> Edit Profile
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Read-Only Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="input input-bordered w-full flex items-center bg-base-200 text-base-content/50 cursor-not-allowed">
                <FaEnvelope className="mr-3" />
                {user.email}
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Your email address cannot be changed.
                </span>
              </label>
            </div>

            {/* Display Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Display Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full focus:input-primary"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>

            {/* Profile Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Profile Photo URL
                </span>
              </label>
              <input
                type="url"
                placeholder="https://..."
                className="input input-bordered w-full focus:input-primary"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="modal-action mt-6">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  document.getElementById("edit_profile_modal").close()
                }
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary min-w-[120px]"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button disabled={isUpdating}>close</button>
        </form>
      </dialog>
    </div>
  );
}
