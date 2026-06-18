import React from "react";
import Link from "next/link";

export default function AuthorCard({ creatorId, name, image }) {
  // In a real app, you might fetch their total lesson count here
  const totalLessons = 12;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-24">
      <div className="card-body items-center text-center">
        
        <div className="avatar mb-2">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {image ? (
              <img src={image} alt={name} />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-3xl font-bold bg-base-300">
                {name?.charAt(0)}
              </span>
            )}
          </div>
        </div>
        
        <h3 className="card-title text-xl">{name}</h3>
        <p className="text-sm text-base-content/60 mb-4">
          Author • {totalLessons} Lessons Created
        </p>

        <div className="w-full border-t border-base-200 pt-4 mt-2">
          <Link href={`/profile/${creatorId}`} className="btn btn-primary btn-outline w-full">
            View All Lessons
          </Link>
        </div>

      </div>
    </div>
  );
}