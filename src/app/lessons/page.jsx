import LessonCard from "@/Component/Lessons/LessonCard";
import NoLessonsPage from "@/Component/Lessons/NoLessonPage";

import { gettingLessons } from "@/lib/actions/lessons";
import { gettingSession } from "@/lib/Core/session";
import { redirect } from "next/navigation";

export default async function AllLessonsPage() {

  const lessons = await gettingLessons();



  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 md:px-8">
      {lessons.length !== 0 ? (
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-base-content">
              Explore Life Lessons
            </h1>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Browse through a collection of life lessons, insights, and stories
              shared by our community. Discover both free insights and exclusive
              Premium wisdom.
            </p>
          </div>

          {/* The Grid Map Loop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        </div>
      ) : (
        <NoLessonsPage />
      )}
    </div>
  );
}
