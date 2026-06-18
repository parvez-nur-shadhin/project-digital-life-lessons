import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import LessonInteractionBar from "./components/LessonInteractionBar";
import AuthorCard from "./components/AuthorCard";
import CommentSection from "./components/CommentSection";
import { gettingLessons } from "@/lib/actions/lessons";
import { gettingSession } from "@/lib/Core/session";
import { redirect } from "next/navigation";
import Image from "next/image";
// import { getLessonById } from "@/lib/actions/lessons";

export default async function LessonDetailsPage({ params }) {
  const { id } = await params;
  const session = await gettingSession();
  const user = session?.user;

  const lessons = await gettingLessons();
  const lesson = lessons.find((item) => item?._id == id);

    if (!user) {
    redirect("/sign-up");
  }
  if (user?.plan !== lesson.creatorPlan) {
    redirect("/pricing-plan");
  }

  // Estimate read time (roughly 200 words per minute)
  const wordCount = lesson.description.split(" ").length;
  const readingTime = Math.ceil(wordCount / 200);

  // Static Views (as requested)
  const viewsCount = Math.floor(Math.random() * 5000) + 1000;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link href="/lessons" className="btn btn-ghost btn-sm gap-2 w-fit">
          <FaArrowLeft /> Back to Lessons
        </Link>

        {/* --- MAIN CONTENT CARD --- */}
        <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
          {/* 1. Featured Image */}
          {lesson.image && (
            <figure className="w-full h-[400px]">
              <Image
                src={lesson.image}
                alt={lesson.title}
                height={400}
                width={896}
              />
            </figure>
          )}

          <div className="card-body p-6 md:p-10">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="badge badge-primary">{lesson.category}</div>
              <div className="badge badge-neutral">{lesson.tone}</div>
            </div>

            {/* 1. Lesson Information Section */}
            <h1 className="text-3xl md:text-5xl font-black text-base-content mb-6 leading-tight">
              {lesson.title}
            </h1>

            {/* 2. Lesson Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60 border-b border-base-200 pb-6 mb-6">
              <span>
                Published:{" "}
                {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span>{readingTime} min read</span>
              <span>•</span>
              <span className="capitalize">{lesson.visibility}</span>
              <span>•</span>
              <span>{viewsCount.toLocaleString()} Views</span>
            </div>

            {/* Description / Story (using whitespace-pre-wrap to respect line breaks) */}
            <div className="prose prose-lg max-w-none text-base-content/80 whitespace-pre-wrap">
              {lesson.description}
            </div>

            {/* 4 & 5. Stats & Interactive Buttons (Client Component) */}
            <div className="mt-10 border-t border-base-200 pt-6">
              <LessonInteractionBar lesson={lesson} />
            </div>
          </div>
        </div>

        {/* --- AUTHOR & COMMENTS ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Comments */}
          <div className="lg:col-span-2">
            <CommentSection lessonId={lesson._id} />
          </div>

          {/* Sidebar Column: Author Info */}
          <div className="lg:col-span-1">
            {/* 3. Author / Creator Section */}
            <AuthorCard
              creatorId={lesson.creatorId}
              name={lesson.creatorName}
              image={lesson.creatorProfileImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
