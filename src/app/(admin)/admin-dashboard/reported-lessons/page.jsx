"use client";

import React, { useEffect, useState } from "react";
import { FaFlag, FaTrash, FaCheck, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  deleteLesson,
  getReportedLessons,
  ignoreLessonReports,
} from "@/lib/actions/report";

export default function ReportedLessonsPage() {
  const [reportedLessons, setReportedLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Fetch Flagged Lessons
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReportedLessons();
        setReportedLessons(data);
      } catch (error) {
        toast.error("Failed to load reported lessons");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Handler: Ignore & Clear Reports
  const handleIgnore = async (lessonId) => {
    const previousState = [...reportedLessons];

    // Optimistic UI: Instantly remove from the flagged list
    setReportedLessons(reportedLessons.filter((l) => l._id !== lessonId));
    toast.success("Lesson ignored and reports cleared.");

    try {
      const res = await ignoreLessonReports(lessonId);
      if (res.error) throw new Error(res.error);
    } catch (error) {
      toast.error("Failed to clear reports. Restoring list.");
      setReportedLessons(previousState);
    }
  };

  // Handler: Permanently Delete Lesson
  const handleDelete = async (lessonId) => {
    if (
      !window.confirm("Are you sure you want to completely delete this lesson?")
    )
      return;

    const previousState = [...reportedLessons];

    // Optimistic UI Update
    setReportedLessons(reportedLessons.filter((l) => l._id !== lessonId));
    toast.success("Lesson deleted permanently.");

    try {
      const res = await deleteLesson(lessonId);
      if (res.error) throw new Error(res.error);
    } catch (error) {
      toast.error("Failed to delete lesson. Restoring list.");
      setReportedLessons(previousState);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaFlag className="text-error" /> Reported Lessons
          </h1>
          <p className="text-base-content/70 mt-1">
            Review flagged content. Ignore false reports or delete violating
            lessons.
          </p>
        </div>
        <div className="badge badge-error badge-outline font-bold py-3 px-4 shadow-sm">
          {reportedLessons.length} Pending
        </div>
      </div>

      {/* Flagged Lessons Table */}
      <div className="overflow-x-auto bg-base-100 rounded-box border border-base-200 shadow-sm">
        <table className="table table-zebra w-full">
          <thead className="bg-error/10 text-error">
            <tr>
              <th>Lesson Title</th>
              <th>Author</th>
              <th>Report Count</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedLessons.map((lesson) => (
              <tr key={lesson._id}>
                <td
                  className="font-bold text-base-content max-w-[250px] truncate"
                  title={lesson.title}
                >
                  {lesson.title}
                </td>
                <td>{lesson.creatorName || lesson.author || "Unknown"}</td>
                <td>
                  <div className="badge badge-error gap-1 font-bold">
                    <FaFlag className="text-[10px]" />{" "}
                    {lesson.reports?.length || 1}
                  </div>
                </td>
                <td className="text-right flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedLesson(lesson);
                      document.getElementById("reasons_modal").showModal();
                    }}
                    className="btn btn-sm btn-info text-white"
                    title="View reasons"
                  >
                    <FaEye /> Reasons
                  </button>
                  <button
                    onClick={() => handleIgnore(lesson._id)}
                    className="btn btn-sm btn-ghost hover:bg-success hover:text-white"
                    title="Ignore & Clear Reports"
                  >
                    <FaCheck /> Ignore
                  </button>
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="btn btn-sm btn-error"
                    title="Delete Lesson Permanently"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {reportedLessons.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-base-content/50 font-medium"
                >
                  <FaCheck className="inline-block text-4xl text-success/50 mb-3 block mx-auto" />
                  All caught up! No flagged lessons at the moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reasons Modal */}
      <dialog id="reasons_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error flex items-center gap-2 border-b border-base-200 pb-3">
            <FaFlag /> Report Details
          </h3>

          <div className="py-4">
            <p className="font-semibold mb-4 text-sm text-base-content/70 uppercase tracking-widest">
              Title:{" "}
              <span className="text-base-content normal-case font-bold">
                {selectedLesson?.title}
              </span>
            </p>

            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
              {selectedLesson?.reports?.map((report, idx) => (
                <div
                  key={idx}
                  className="bg-base-200 p-3 rounded-lg border border-base-300"
                >
                  <p className="font-medium text-base-content">
                    "{report.reason}"
                  </p>
                  <p className="text-xs text-base-content/50 mt-1">
                    Reported by:{" "}
                    <span className="font-semibold">
                      {report.reporterEmail || "Anonymous"}
                    </span>
                  </p>
                </div>
              ))}

              {/* Fallback if the reports array is empty or malformed */}
              {(!selectedLesson?.reports ||
                selectedLesson.reports.length === 0) && (
                <div className="bg-base-200 p-3 rounded-lg border border-base-300">
                  <p className="font-medium text-base-content">
                    No specific reason provided.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close Window</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
