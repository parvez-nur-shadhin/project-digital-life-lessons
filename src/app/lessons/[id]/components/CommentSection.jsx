"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CommentSection({ lessonId }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [commentText, setCommentText] = useState("");
  // Mock Comments
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to leave a comment.");
    if (!commentText.trim()) return;

    // Add to UI immediately
    const newComment = {
      id: Date.now(),
      name: user.name,
      text: commentText,
      date: "Just now",
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    toast.success("Comment posted!");

    // TODO: Send to database
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          Comments ({comments.length})
        </h2>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            className="textarea textarea-bordered w-full h-24 mb-2"
            placeholder={
              user ? "Share your thoughts..." : "Please log in to comment..."
            }
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={!user}
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!user || !commentText.trim()}
              className="btn btn-primary"
            >
              Post Comment
            </button>
          </div>
        </form>

        {/* Comment List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 items-center">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div className="flex-1 bg-base-200 p-4 rounded-box">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">{comment.name}</span>
                  <span className="text-xs text-base-content/60">
                    {comment.date}
                  </span>
                </div>
                <p className="text-sm text-base-content/80">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
