"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaHeart,
  FaBookmark,
  FaGlobeAmericas,
  FaLock,
  FaEyeSlash,
} from "react-icons/fa";

export default function MyLessonsTable({ initialLessons, isPremium }) {
  const [lessons, setLessons] = useState(initialLessons);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  // --- HANDLERS ---

  const handleToggleVisibility = async (id, currentVisibility) => {
    // Determine new state (Assuming your DB uses a boolean or string for this)
    const newVisibility =
      currentVisibility === "private" ? "public" : "private";

    // Optimistic UI Update
    setLessons(
      lessons.map((l) =>
        l._id === id ? { ...l, visibilityStatus: newVisibility } : l,
      ),
    );
    toast.success(`Lesson marked as ${newVisibility}`);

    // TODO: Call your backend to save this change
    // await fetch(`/api/lessons/${id}/visibility`, { method: "PATCH", body: JSON.stringify({ visibilityStatus: newVisibility }) });
  };

  const handleToggleAccess = async (id, currentAccess) => {
    if (!isPremium)
      return toast.error("Only premium users can change access levels.");

    const newAccess = currentAccess === "premium" ? "free" : "premium";

    setLessons(
      lessons.map((l) => (l._id === id ? { ...l, accessLevel: newAccess } : l)),
    );
    toast.success(`Access changed to ${newAccess}`);

    // TODO: Call backend
  };

  const confirmDelete = async () => {
    if (!lessonToDelete) return;

    // Optimistic UI Update
    setLessons(lessons.filter((l) => l._id !== lessonToDelete._id));
    toast.success("Lesson deleted successfully");

    // TODO: Call backend to actually delete
    // await fetch(`/api/lessons/${lessonToDelete._id}`, { method: "DELETE" });

    setLessonToDelete(null);
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-box border border-base-200 shadow-sm">
      <table className="table table-zebra w-full">
        {/* Head */}
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th>Lesson Details</th>
            <th>Stats</th>
            <th>Visibility</th>
            <th>Access Level</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {lessons.map((lesson) => {
            // Safe fallbacks for data
            const likes = lesson.likes?.length || 0;
            const saves = lesson.savesCount || 0;
            const date = new Date(lesson.createdAt).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            );
            const isPrivate = lesson.visibilityStatus === "private";
            const isPremiumAccess =
              lesson.accessLevel === "premium" ||
              lesson.visibility === "premium"; // Fallback to old schema

            return (
              <tr key={lesson._id}>
                {/* 1. Details Column */}
                <td>
                  <div
                    className="font-bold text-base-content line-clamp-1 max-w-xs"
                    title={lesson.title}
                  >
                    {lesson.title}
                  </div>
                  <div className="text-xs text-base-content/60 mt-1 flex gap-2">
                    <span className="badge badge-ghost badge-sm">
                      {lesson.category}
                    </span>
                    <span>• {date}</span>
                  </div>
                </td>

                {/* 2. Stats Column */}
                <td>
                  <div className="flex gap-3 text-sm font-medium text-base-content/70">
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-error" /> {likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBookmark className="text-primary" /> {saves}
                    </span>
                  </div>
                </td>

                {/* 3. Visibility Toggle (Public / Private) */}
                <td>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold w-12">
                      {isPrivate ? "Private" : "Public"}
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-success"
                      checked={!isPrivate}
                      onChange={() =>
                        handleToggleVisibility(
                          lesson._id,
                          lesson.visibilityStatus || "public",
                        )
                      }
                    />
                  </div>
                </td>

                {/* 4. Access Level Toggle (Free / Premium) */}
                <td>
                  <div
                    className={`flex items-center gap-2 ${!isPremium ? "tooltip tooltip-left" : ""}`}
                    data-tip={
                      !isPremium ? "Upgrade to toggle Premium access" : ""
                    }
                  >
                    <span className="text-xs font-semibold w-14 text-warning flex items-center gap-1">
                      {isPremiumAccess ? <FaLock /> : <FaGlobeAmericas />}
                      {isPremiumAccess ? "Premium" : "Free"}
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-warning"
                      checked={isPremiumAccess}
                      disabled={!isPremium}
                      onChange={() =>
                        handleToggleAccess(
                          lesson._id,
                          isPremiumAccess ? "premium" : "free",
                        )
                      }
                    />
                  </div>
                </td>

                {/* 5. Actions Column */}
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/lessons/${lesson._id}`}
                      className="btn btn-sm btn-square btn-ghost text-primary"
                      title="View Lesson"
                    >
                      <FaEye className="text-lg" />
                    </Link>
                    <Link
                      href={`/dashboard/edit-lesson/${lesson._id}`}
                      className="btn btn-sm btn-square btn-ghost text-info"
                      title="Edit Lesson"
                    >
                      <FaEdit className="text-lg" />
                    </Link>
                    <button
                      onClick={() => {
                        setLessonToDelete(lesson);
                        document.getElementById("delete_modal").showModal();
                      }}
                      className="btn btn-sm btn-square btn-ghost text-error"
                      title="Delete Lesson"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error flex items-center gap-2">
            <FaTrash /> Delete Lesson?
          </h3>
          <p className="py-4">
            Are you sure you want to permanently delete{" "}
            <strong>"{lessonToDelete?.title}"</strong>? All likes, saves, and
            comments will be lost. This action cannot be undone.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3 w-full">
              <button className="btn btn-outline flex-1">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  confirmDelete();
                  document.getElementById("delete_modal").close();
                }}
                className="btn btn-error flex-1"
              >
                Yes, Delete it
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
