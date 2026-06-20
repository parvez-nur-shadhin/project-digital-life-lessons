import React from "react";
import Link from "next/link";
import { FaArrowRight, FaLock, FaGlobeAmericas } from "react-icons/fa";
import Image from "next/image";

const LessonCard = ({ lesson }) => {
  const formattedDate = new Date(lesson.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="card-body p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-base-300 border border-base-200">
                {lesson.creatorProfileImage ? (
                  <Image
                    src={lesson.creatorProfileImage}
                    alt={lesson.creatorName}
                    height={40}
                    width={40}
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-lg font-bold text-base-content/50">
                    {lesson.creatorName?.charAt(0) || "?"}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-base-content">
                {lesson.creatorName}
              </span>
              <span className="text-xs text-base-content/60">
                {formattedDate}
              </span>
            </div>
          </div>

          {lesson.visibility?.toLowerCase() === "premium" ? (
            <div className="badge badge-warning gap-1 text-xs font-bold shadow-sm p-3 py-4">
              <FaLock className="text-[10px]" /> Premium
            </div>
          ) : (
            <div className="badge badge-success badge-outline gap-1 text-xs font-bold shadow-sm p-3 py-4">
              <FaGlobeAmericas className="text-[10px]" /> Public
            </div>
          )}
        </div>

        <h2
          className="card-title text-xl font-extrabold leading-tight line-clamp-2 mt-2"
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

        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          <div className="badge badge-primary badge-sm font-semibold p-3">
            {lesson.category}
          </div>
          <div className="badge badge-neutral badge-sm bg-base-200 text-base-content border-none p-3">
            {lesson.tone}
          </div>
        </div>

        <div className="card-actions w-full mt-auto pt-2 border-t border-base-200">
          <Link
            href={`/lessons/${lesson._id}`}
            className="btn btn-outline btn-primary w-full gap-2"
          >
            See Details <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
