"use client";

import React from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export default function AdminOverviewTables() {
  const topContributors = [
    { id: 1, name: "Parvez Nur", lessons: 42, role: "Admin" },
    { id: 2, name: "Sarah Connor", lessons: 28, role: "Premium" },
    { id: 3, name: "Alex Smith", lessons: 15, role: "User" },
  ];

  const recentLessons = [
    {
      id: 101,
      title: "Why I quit my corporate job",
      author: "Sarah Connor",
      category: "Career",
    },
    {
      id: 102,
      title: "The power of saying No",
      author: "Alex Smith",
      category: "Mindset",
    },
    {
      id: 103,
      title: "Finding peace in chaos",
      author: "John Doe",
      category: "Personal Growth",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Most Active Contributors */}
      <div className="card bg-base-100 shadow-sm border border-base-200 col-span-1">
        <div className="card-body p-5">
          <h2 className="card-title text-lg mb-4">Top Contributors</h2>
          <div className="space-y-4">
            {topContributors.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      <span>{user.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs text-base-content/60">{user.role}</p>
                  </div>
                </div>
                <div className="badge badge-primary badge-sm font-bold">
                  {user.lessons}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm border border-base-200 col-span-1 lg:col-span-2">
        <div className="card-body p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-lg">Today's New Lessons</h2>
            <Link
              href="/dashboard/admin/manage-lessons"
              className="btn btn-xs btn-ghost text-primary"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-sm w-full">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentLessons.map((lesson) => (
                  <tr key={lesson.id}>
                    <td
                      className="font-semibold text-base-content line-clamp-1 max-w-[200px]"
                      title={lesson.title}
                    >
                      {lesson.title}
                    </td>
                    <td className="text-sm">{lesson.author}</td>
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        {lesson.category}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        className="btn btn-square btn-ghost btn-sm text-primary"
                        title="View Lesson"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
