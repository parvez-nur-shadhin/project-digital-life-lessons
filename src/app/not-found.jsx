import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";
import "./globals.css";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
   
        <h1 className="text-9xl font-black text-primary drop-shadow-sm mb-4">
          404
        </h1>


        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-base-content">
          Looks like you're lost.
        </h2>
        <p className="text-base-content/70 mb-8 text-lg">
          The life lesson or page you are looking for doesn't exist, has been
          moved, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="btn btn-primary gap-2 shadow-lg">
            <FaHome className="text-lg" />
            Back to Home
          </Link>
          <Link
            href="/lessons"
            className="btn btn-outline btn-neutral gap-2 bg-base-100"
          >
            <FaSearch className="text-lg" />
            Explore Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
