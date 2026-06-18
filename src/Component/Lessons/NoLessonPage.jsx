import Link from "next/link";
import { FaFolderOpen, FaPlus, FaCompass } from "react-icons/fa";

export default function NoLessonsPage() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-200 text-center py-12 px-6">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center border-8 border-base-100 shadow-sm">
            <FaFolderOpen className="text-4xl text-base-content/30" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-3 text-base-content">
          No Lessons Yet
        </h2>

        <p className="text-base-content/60 text-lg mb-8 max-w-md mx-auto">
          It looks a little empty in here. You haven't documented any life
          lessons yet. Every great journey starts with a single reflection!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-sm mx-auto">
          <Link
            href="/add-lesson"
            className="btn btn-primary flex-1 gap-2 shadow-lg"
          >
            <FaPlus />
            Create Lesson
          </Link>
        </div>
      </div>
    </div>
  );
}
