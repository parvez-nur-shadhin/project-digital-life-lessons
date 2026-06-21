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
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import { addFavoriteLesson, reportLesson } from "@/lib/actions/lessons";

export default function LessonInteractionBar({ lesson }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [hasLiked, setHasLiked] = useState(
    user ? lesson.likes?.includes(user.id) : false,
  );
  const [likesCount, setLikesCount] = useState(lesson.likes?.length || 0);
  const [hasSaved, setHasSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(lesson.savesCount || 0);

  const [reportReason, setReportReason] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleLike = async () => {
    if (!user) return toast.error("Please log in to like this lesson");
    setHasLiked(!hasLiked);
    setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleSave = async () => {
    if (!user) return toast.error("Please log in to save lessons");
    setHasSaved(!hasSaved);
    setSavesCount(hasSaved ? savesCount - 1 : savesCount + 1);
    toast.success(hasSaved ? "Removed from favorites" : "Saved to favorites!");

    const lessonToSave = { ...lesson, userEmail: user.email };
    const res = await addFavoriteLesson(lessonToSave);

    if (res?.error) {
      toast.error("Failed to save to database");
      setHasSaved(!hasSaved);
    }
  };

  const handleReportOpen = () => {
    if (!user) return toast.error("Please log in to report content");
    document.getElementById("report_modal").showModal();
  };

  const submitReport = async () => {
    if (!reportReason) return toast.error("Please select a reason");

    setIsReporting(true);

    const reportData = {
      reason: reportReason,
      reporterEmail: user.email,
      reportedAt: new Date().toISOString(),
    };

    try {
      const res = await reportLesson(lesson._id, reportData);
      if (res.error) throw new Error(res.error);

      toast.success("Report submitted successfully.");

      document.getElementById("report_modal").close();
      setReportReason("");
    } catch (error) {
      toast.error("Failed to submit report.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

        <div className="flex items-center gap-2">
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
            onClick={handleReportOpen}
            className="btn btn-ghost btn-sm text-base-content/50 hover:text-error gap-2"
          >
            <FaFlag /> Report
          </button>
        </div>
      </div>

      <dialog id="report_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error flex items-center gap-2">
            <FaFlag /> Report this lesson
          </h3>
          <p className="py-4">Why are you reporting this content?</p>

          <select
            className="select select-bordered w-full mb-6"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          >
            <option value="" disabled>
              Select a reason
            </option>
            <option value="Spam or misleading">Spam or misleading</option>
            <option value="Inappropriate content">Inappropriate content</option>
            <option value="Harassment or hate speech">
              Harassment or hate speech
            </option>
            <option value="Plagiarism">Plagiarism</option>
          </select>

          <div className="modal-action flex gap-2 w-full mt-0">
            <form method="dialog" className="flex-1 flex">
              <button className="btn btn-outline flex-1">Cancel</button>
            </form>

            <button
              onClick={submitReport}
              disabled={isReporting || !reportReason}
              className="btn btn-error flex-1 text-white"
            >
              {isReporting ? (
                <span className="loading loading-spinner"></span>
              ) : null}
              Submit Report
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
