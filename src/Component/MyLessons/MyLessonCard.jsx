import React from "react";
import Link from "next/link";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaGlobeAmericas,
  FaLock,
} from "react-icons/fa";

const MyLessonCard = ({ lesson }) => {
  // Format Date safely
  const formattedDate = lesson.createdAt
    ? new Date(lesson.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown Date";

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="card-body p-5 flex flex-col flex-grow">
        {/* Top Row: Date & Visibility Badge */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-base-content/60 font-medium">
            Published: {formattedDate}
          </span>
          {lesson.visibility?.toLowerCase() === "premium" ? (
            <div className="badge badge-warning gap-1 text-xs font-bold p-3">
              <FaLock className="text-[10px]" /> Premium
            </div>
          ) : (
            <div className="badge badge-success badge-outline gap-1 text-xs font-bold p-3">
              <FaGlobeAmericas className="text-[10px]" /> Public
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h2
          className="card-title text-xl font-extrabold leading-tight line-clamp-2 mt-1"
          title={lesson.title}
        >
          {lesson.title}
        </h2>
        <p
          className="text-sm text-base-content/70 line-clamp-3 mt-2 flex-grow"
          title={lesson.description}
        >
          {lesson.description}
        </p>

        {/* Stats Row */}
        <div className="flex gap-4 mt-4 mb-4 text-sm font-semibold text-base-content/70">
          <span>❤️ {lesson.likes?.length || 0} Likes</span>
          <span>🔖 {lesson.savesCount || 0} Saves</span>
        </div>

        {/* Action Buttons (View, Edit, Delete) */}
        <div className="card-actions w-full mt-auto pt-4 border-t border-base-200 grid grid-cols-3 gap-2">
          <Link
            href={`/lessons/${lesson._id}`}
            className="btn btn-sm btn-ghost text-primary hover:bg-primary/10 w-full flex-col gap-1 h-auto py-2"
          >
            <FaEye className="text-lg" />
            <span className="text-[10px] uppercase">View</span>
          </Link>

          {/* Note: You will need to create an /edit-lesson/[id] page later! */}
          <Link
            href={`/edit-lesson/${lesson._id}`}
            className="btn btn-sm btn-ghost text-info hover:bg-info/10 w-full flex-col gap-1 h-auto py-2"
          >
            <FaEdit className="text-lg" />
            <span className="text-[10px] uppercase">Edit</span>
          </Link>

          <button
            onClick={() =>
              document.getElementById(`delete_modal_${lesson._id}`).showModal()
            }
            className="btn btn-sm btn-ghost text-error hover:bg-error/10 w-full flex-col gap-1 h-auto py-2"
          >
            <FaTrash className="text-lg" />
            <span className="text-[10px] uppercase">Delete</span>
          </button>
        </div>
      </div>

      {/* Unique Delete Confirmation Modal for each card */}
      <dialog id={`delete_modal_${lesson._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">Delete Lesson?</h3>
          <p className="py-4">
            Are you sure you want to delete <strong>"{lesson.title}"</strong>?
            This action cannot be undone.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2 w-full">
              <button className="btn btn-outline flex-1">Cancel</button>
              {/* TODO: Add onClick handler to actually delete from MongoDB */}
              <button className="btn btn-error flex-1">Yes, Delete</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyLessonCard;
