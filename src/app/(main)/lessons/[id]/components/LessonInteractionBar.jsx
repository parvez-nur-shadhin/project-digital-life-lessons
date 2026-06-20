"use client";

import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
  FaShareAlt,
} from "react-icons/fa";
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from "react-share";
import { authClient } from "@/lib/auth-client"; // Your better-auth client
import toast from "react-hot-toast";
import { addFavoriteLesson } from "@/lib/actions/lessons";

export default function LessonInteractionBar({ lesson }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Initialize States based on current user
  const [hasLiked, setHasLiked] = useState(
    user ? lesson.likes.includes(user.id) : false,
  );
  const [likesCount, setLikesCount] = useState(lesson.likes.length);
  const [hasSaved, setHasSaved] = useState(false); // You would check user's saved list here
  const [savesCount, setSavesCount] = useState(lesson.savesCount);

  // For Sharing
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // --- HANDLERS ---
  const handleLike = async () => {
    if (!user) return toast.error("Please log in to like this lesson");

    // Optimistic UI Update
    setHasLiked(!hasLiked);
    setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1);

    // TODO: Call your serverMutation here to update DB
    // await serverMutation(`/api/lessons/${lesson._id}/like`, { userId: user.id });
  };

  const handleSave = async () => {
    if (!user) return toast.error("Please log in to save lessons");

    setHasSaved(!hasSaved);
    setSavesCount(hasSaved ? savesCount - 1 : savesCount + 1);
    toast.success(hasSaved ? "Removed from favorites" : "Saved to favorites!");

    // Attach the user's email so the backend knows who saved it!
    const lessonToSave = {
      ...lesson,
      userEmail: user.email,
    };

    const res = await addFavoriteLesson(lessonToSave);

    if (res?.error) {
      toast.error("Failed to save to database");
      setHasSaved(!hasSaved); // Rollback on failure
    }
  };

  const handleReport = () => {
    if (!user) return toast.error("Please log in to report content");
    // Ideally open a modal here with a dropdown for reasons
    document.getElementById("report_modal").showModal();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Like & Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`btn btn-ghost gap-2 ${hasLiked ? "text-error" : "text-base-content/70"}`}
          >
            {hasLiked ? (
              <FaHeart className="text-xl" />
            ) : (
              <FaRegHeart className="text-xl" />
            )}
            <span className="font-semibold text-base-content">
              {likesCount}
            </span>
          </button>

          <button
            onClick={handleSave}
            className={`btn btn-ghost gap-2 ${hasSaved ? "text-primary" : "text-base-content/70"}`}
          >
            {hasSaved ? (
              <FaBookmark className="text-xl" />
            ) : (
              <FaRegBookmark className="text-xl" />
            )}
            <span className="font-semibold text-base-content">
              {savesCount}
            </span>
          </button>
        </div>

        {/* Right Side: Share & Report */}
        <div className="flex items-center gap-2">
          {/* Social Share Dropdown */}
          <div className="dropdown dropdown-end md:dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm gap-2 text-base-content/70"
            >
              <FaShareAlt /> Share
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex-row justify-around"
            >
              <li>
                <TwitterShareButton url={shareUrl} title={lesson.title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </li>
              <li>
                <FacebookShareButton url={shareUrl} quote={lesson.title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </li>
              <li>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </li>
            </ul>
          </div>

          <button
            onClick={handleReport}
            className="btn btn-ghost btn-sm text-base-content/50 hover:text-error gap-2"
          >
            <FaFlag /> Report
          </button>
        </div>
      </div>

      {/* Basic DaisyUI Report Modal */}
      <dialog id="report_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Report this lesson</h3>
          <p className="py-4">Why are you reporting this content?</p>
          <select
            className="select select-bordered w-full mb-4"
            defaultValue=""
          >
            {/* 2. Remove 'selected' and give it an empty value matching the default */}
            <option value="" disabled>
              Select a reason
            </option>

            <option value="Spam or misleading">Spam or misleading</option>
            <option value="Inappropriate content">Inappropriate content</option>
            <option value="Harassment or hate speech">
              Harassment or hate speech
            </option>
          </select>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2 w-full">
              <button className="btn btn-outline flex-1">Cancel</button>
              <button
                onClick={() => toast.success("Report submitted")}
                className="btn btn-error flex-1"
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
