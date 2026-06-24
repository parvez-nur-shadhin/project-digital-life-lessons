import Image from "next/image";
import Link from "next/link";
import LessonCard from "@/Component/Lessons/LessonCard";
import { FaUserCircle } from "react-icons/fa";
import { getUserLessons, getUserProfile } from "@/lib/actions/lessons";

export default async function UserProfilePage({ params }) {
  const { id } = await params;

const userProfile = await getUserProfile(id);
const userLessons = await getUserLessons(id);

  if (!userProfile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
        <p className="text-base-content/70 mb-6">
          This profile doesn't exist or has been removed.
        </p>
        <Link href="/lessons" className="btn btn-primary">
          Back to Lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* --- Profile Header --- */}
        <div className="bg-base-100 rounded-3xl shadow-sm border border-base-300 p-8 mb-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {userProfile.image || userProfile.profileImage ? (
                <Image
                  src={userProfile.image || userProfile.profileImage}
                  alt={userProfile.name}
                  width={128}
                  height={128}
                />
              ) : (
                <div className="w-full h-full bg-base-300 flex items-center justify-center">
                  <FaUserCircle className="text-7xl text-base-content/30" />
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold text-base-content mb-2">
              {userProfile.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="badge badge-primary badge-outline font-semibold">
                {userProfile.plan === "premium" ||
                userProfile.role === "premium"
                  ? "Premium Member"
                  : "Community Member"}
              </span>
              <span className="text-sm text-base-content/60 font-medium">
                {userLessons.length}{" "}
                {userLessons.length === 1 ? "Lesson" : "Lessons"} Shared
              </span>
            </div>
          </div>
        </div>

        {/* --- User's Lessons Grid --- */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Lessons by {userProfile.name.split(" ")[0]}
          </h2>

          {userLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userLessons.map((lesson) => (
                <LessonCard
                  key={lesson._id.$oid || lesson._id}
                  lesson={lesson}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-base-100 rounded-2xl border border-base-200">
              <p className="text-lg text-base-content/60">
                {userProfile.name} hasn't shared any lessons yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
